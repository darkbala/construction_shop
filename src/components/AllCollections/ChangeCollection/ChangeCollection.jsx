import styles from "./ChangeCollection.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URI } from "../../../store/api/api.js";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateProducts = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formState, setFormState] = useState({
        price: 0,
        isProducer: true, // true: "Свой товар", false: "Дистрибуция"
        isPainted: false, // true: "Крашенная", false: "Стандартная"
        isPopular: false,
        isNew: false,
        category_id: null,
        collections: [
            { name: "", description: "", language_code: "ru" },
            { name: "", description: "", language_code: "en" },
            { name: "", description: "", language_code: "kgz" },
        ],
    });

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8080/api/getCollectionById?collection_id=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                const productData = response.data;

                setFormState({
                    price: productData.price || 0,
                    isProducer: productData.isProducer || true,
                    isPainted: productData.isPainted || false,
                    isPopular: productData.is_popular || false,
                    isNew: productData.is_new || false,
                    category_id: productData.category_id || null,
                    collections: productData.collections || [
                        { name: "", description: "", language_code: "ru" },
                        { name: "", description: "", language_code: "en" },
                        { name: "", description: "", language_code: "kgz" },
                    ],
                });

                // Обработка null для photos
                setPhotos(
                    (productData.photos || []).map((photo) => ({
                        file: null, // Загружаемый файл (пустой по умолчанию)
                        isMain: photo.isMain,
                        hashColor: photo.hashColor,
                        url: photo.url, // URL фотографии, если есть
                    }))
                );

                setLoading(false);
            } catch (err) {
                setError("Ошибка загрузки данных товара.");
                console.error(err);
            }
        };

        fetchProductData();
    }, [dispatch, id]);

    const handleFormChange = (field, value) => {
        setFormState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCollectionChange = (index, field, value) => {
        const updatedCollections = [...formState.collections];
        updatedCollections[index][field] = value;
        setFormState((prev) => ({
            ...prev,
            collections: updatedCollections,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPhotos((prevPhotos) => [
                ...prevPhotos,
                { file, previewUrl, isMain: false },
            ]);
        }
    };

    const handlePhotoFieldChange = (index, field, value) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index][field] = value;
        setPhotos(updatedPhotos);
    };

    const handleRemovePhoto = (index) => {
        setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "collection",
            JSON.stringify({
                price: formState.price,
                isProducer: formState.isProducer,
                isPainted: formState.isPainted,
                is_popular: formState.isPopular,
                is_new: formState.isNew,
                collections: formState.collections,
                category_id: formState.category_id,
            })
        );

        photos.forEach((photo, index) => {
            if (photo.file) {
                formData.append(`photos`, photo.file);
                formData.append(`photos[${index}][isMain]`, photo.isMain);
                formData.append(`photos[${index}][hashColor]`, photo.hashColor);
            }
        });

        console.log(formData);
        try {
            await axios.put(`${API_URI}/collection?collection_id=${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            alert("Успешно обновлено");
        } catch (err) {
            setError(err.response?.data || "Ошибка при обновлении товара.");
            console.error("Ошибка:", err);
        }
    };

    if (loading) return <p>Загрузка...</p>;

    return (
        <div className={styles.UpdateProducts}>
            <h2>Коллекции / Изменить коллекцию id {id}</h2>
            <form onSubmit={handleSubmit}>
                {formState.collections.map((item, index) => (
                    <div key={index}>
                        <h3>
                            {item.language_code === "ru"
                                ? "Русский"
                                : item.language_code === "en"
                                    ? "English"
                                    : "Кыргызча"}
                        </h3>
                        <input
                            type="text"
                            placeholder="Название"
                            value={item.name}
                            onChange={(e) => handleCollectionChange(index, "name", e.target.value)}
                        />
                        <textarea
                            placeholder="Описание"
                            value={item.description}
                            onChange={(e) =>
                                handleCollectionChange(index, "description", e.target.value)
                            }
                        />
                    </div>
                ))}

                <div>
                    <h4>Производство</h4>
                    <label>
                        <input
                            type="radio"
                            value={true}
                            checked={formState.isProducer === true}
                            onChange={() => handleFormChange("isProducer", true)}
                        />
                        Свой товар
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={false}
                            checked={formState.isProducer === false}
                            onChange={() => handleFormChange("isProducer", false)}
                        />
                        Дистрибуция
                    </label>
                </div>

                <div>
                    <h4>Тип коллекции</h4>
                    <label>
                        <input
                            type="radio"
                            value={true}
                            checked={formState.isPainted === true}
                            onChange={() => handleFormChange("isPainted", true)}
                        />
                        Крашенная коллекция
                    </label>
                    <label>
                        <input
                            type="radio"
                            value={false}
                            checked={formState.isPainted === false}
                            onChange={() => handleFormChange("isPainted", false)}
                        />
                        Стандартная коллекция
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={formState.isPopular}
                            onChange={() => handleFormChange("isPopular", !formState.isPopular)}
                        />
                        Популярная коллекция
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={formState.isNew}
                            onChange={() => handleFormChange("isNew", !formState.isNew)}
                        />
                        Новая коллекция
                    </label>
                </div>


                <div>
                    <h4>Фотографии</h4>
                    <div className={styles.photoGrid}>
                        {photos.map((photo, index) => (
                            <div key={index} className={styles.photoCard}>
                                <img
                                    src={photo.previewUrl || photo.url}
                                    alt={`Фото ${index + 1}`}
                                    className={styles.photoPreview}
                                />

                                <label>
                                    <input
                                        type="radio"
                                        name="mainPhoto"
                                        checked={photo.isMain}
                                        onChange={() =>
                                            handlePhotoFieldChange(index, "isMain", true)
                                        }
                                    />
                                    Главная
                                </label>
                                <button
                                    type="button"
                                    className={styles.removePhotoButton}
                                    onClick={() => handleRemovePhoto(index)}
                                >
                                    Удалить
                                </button>

                            </div>
                        ))}
                        <label className={styles.addPhotoCard}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={styles.fileInput}
                            />
                            <span className={styles.addPhotoPlaceholder}>+</span>
                            <button
                                type="button"
                                className={styles.removePhotoButton}
                                onClick={() => handleRemovePhoto(index)}
                            >
                                Удалить
                            </button>
                        </label>


                    </div>
                </div>


                <button type="submit" className={styles.save_btn}>Сохранить</button>
                {error && <p style={{color: "red"}}>{error}</p>}
            </form>
        </div>
    );
};

export default UpdateProducts;
