import styles from "./UpdateProducts.module.scss";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URI} from "../../../store/api/api.js";
import Select from "react-select";
import {customStyles} from "../../AllDiscounts/ModifySpecialOffer/ModifySpecialOffer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllCollections} from "../../../store/slices/admin/collections/collections.js";
import {fetchCategories} from "../../../store/slices/getCategories.js";
import {useParams} from "react-router-dom";

const API_URL = "http://localhost:8080";

const UpdateProducts = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const categoriesList = useSelector((state) => state.categories.categories);
    const collectionsList = useSelector((state) => state.collections.data);
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({show: false, message: "", type: ""}); // Для модального окна


    const [formState, setFormState] = useState({
        price: 0,
        isProducer: false,
        isPainted: false,
        isPopular: false,
        isNew: false,
        category_id: null,
        collection_id: null,
        items: [
            {name: "", description: "", language_code: "ru"},
            {name: "", description: "", language_code: "kgz"},
            {name: "", description: "", language_code: "en"},
        ],
    });

    useEffect(() => {
        dispatch(fetchAllCollections());
        dispatch(fetchCategories());

        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/getItemById?item_id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const productData = response.data;

                console.log(productData);

                setFormState({
                    price: productData.price || 0,
                    isProducer: productData.isProducer || false,
                    isPainted: productData.isPainted || false,
                    isPopular: productData.is_popular || false,
                    isNew: productData.is_new || false,
                    category_id: productData.category_id || null,
                    collection_id: productData.collection_id || null,
                    items: productData.items || [
                        {name: "", description: "", language_code: "ru"},
                        {name: "", description: "", language_code: "kgz"},
                        {name: "", description: "", language_code: "en"},
                    ],
                });

                setPhotos(
                    Array.isArray(productData.photos)
                        ? productData.photos.map((photo) => ({
                            file: null,
                            isMain: photo.isMain,
                            hashColor: photo.hashColor,
                            url: photo.url,
                        }))
                        : [] // Если photos нет, устанавливаем пустой массив
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
        const updatedItems = [...formState.items];
        updatedItems[index][field] = value;
        setFormState((prev) => ({
            ...prev,
            items: updatedItems,
        }));
    };

    const handleAddPhoto = () => {
        setPhotos((prevPhotos) => [
            ...prevPhotos,
            {file: null, isMain: false, hashColor: "#ffffff"},
        ]);
    };


    const handleFileReplace = (index) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index].file = null; // Удаляем текущий файл
        updatedPhotos[index].url = null; // Удаляем серверное фото
        setPhotos(updatedPhotos); // Обновляем состояние
    };

    const handleFileChange = (index, file) => {
        const updatedPhotos = [...photos];
        updatedPhotos[index].file = file; // Устанавливаем новый файл
        setPhotos(updatedPhotos); // Обновляем состояние
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
            "item",
            JSON.stringify({
                price: formState.price,
                isProducer: formState.isProducer,
                isPainted: formState.isPainted,
                is_popular: formState.isPopular,
                is_new: formState.isNew,
                items: formState.items,
                collection_id: formState.collection_id,
                category_id: formState.category_id,
                size: "M",
            })
        );

        photos.forEach((photo, index) => {
            if (photo.file) {
                formData.append(`photos`, photo.file);
                formData.append(`photos[${index}][isMain]`, photo.isMain);
                formData.append(`photos[${index}][hashColor]`, photo.hashColor);
            }
        });

        try {
            const response = await axios.put(`${API_URI}/items?item_id=${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });


            setModal({show: true, message: "Товар успешно обновлён", type: "success"});

        } catch (err) {
            setError(err.response?.data || "Ошибка при обновлении товара.");
            console.error("Ошибка:", err);
        }
    };

    const closeModal = () => {
        setModal({show: false, message: "", type: ""});
    };
    if (loading) return <p>Загрузка...</p>;






    console.log("Photos:", photos);

    return (
        <div className={styles.AddCollection}>
            <div className={styles.inner}>
                <section className={styles.title}>
                    <h2>Коллекции / изменить товар {collectionsList.name}</h2>
                    <div className={styles.line}></div>
                </section>

                <form onSubmit={handleSubmit}>

                    <div className={styles.select_section}>
                        <h3>Выберите категорию</h3>
                        <Select
                            options={categoriesList.map((category) => ({
                                value: category.id,
                                label: category.name,
                            }))}
                            styles={customStyles}
                            name="category"
                            placeholder="Выберите категорию"
                            onChange={(selectedOption) =>
                                handleFormChange("category_id", selectedOption.value)
                            }
                        />
                    </div>

                    {/* Select for collections */}
                    <div className={styles.select_section}>
                        <h3>Выберите коллекцию</h3>
                        <Select
                            options={collectionsList.map((collection) => ({
                                value: collection.ID,
                                label: collection.name,
                            }))}
                            styles={customStyles}
                            name="collection"
                            placeholder="Выберите коллекцию"
                            onChange={(selectedOption) =>
                                handleFormChange("collection_id", selectedOption.value)
                            }
                        />
                    </div>

                    {formState.items.map((item, index) => (
                        <section key={index} className={styles.info_container}>
                            <h4>
                                {item.language_code === "ru"
                                    ? "Русский"
                                    : item.language_code === "kgz"
                                        ? "Кыргызча"
                                        : "English"}
                            </h4>
                            <label>
                                <h5>Название</h5>
                                <input
                                    type="text"
                                    placeholder="Название"
                                    value={item.name}
                                    onChange={(e) =>
                                        handleCollectionChange(index, "name", e.target.value)
                                    }
                                />
                            </label>
                            <label>
                                <h5>Описание</h5>
                                <textarea
                                    placeholder="Описание"
                                    value={item.description}
                                    onChange={(e) =>
                                        handleCollectionChange(index, "description", e.target.value)
                                    }
                                />
                            </label>
                        </section>
                    ))}

                    <div className={styles.filters}>
                        <label>
                            <input
                                type="checkbox"
                                checked={formState.isPopular}
                                onChange={() =>
                                    handleFormChange("isPopular", !formState.isPopular)
                                }
                            />
                            Популярный товар
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={formState.isNew}
                                onChange={() => handleFormChange("isNew", !formState.isNew)}
                            />
                            Новый товар (новинка)
                        </label>
                    </div>

                    <div className={styles.photos}>
                        <p>Фотографии</p>
                        <div className={styles.grid}>

                            {Array.isArray(photos) && photos.map((photo, index) => (
                                <div key={index} className={styles.cardWrapper}>
                                    <div className={styles.card} style={{ height: "300px", width: "300px" }}>
                                        {photo.file ? (
                                            // Отображение локального файла
                                            <img
                                                src={URL.createObjectURL(photo.file)}
                                                alt={`Фото ${index + 1}`}
                                            />
                                        ) : photo.url ? (
                                            <img
                                                src={`${API_URL}${photo.url}`}
                                                alt={`Фото ${index + 1}`}
                                            />
                                        ) : (
                                            <input
                                                style={{ height: "300px", width: "300px" }}
                                                type="file"
                                                onChange={(e) => handleFileChange(index, e.target.files[0])}
                                            />
                                        )}
                                    </div>
                                    <div className={styles.colors}>

                                        <div className={styles.buttons}>
                                            <button
                                                type="button"
                                                onClick={() => handleFileReplace(index)}
                                            >
                                                Изменить
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePhoto(index)}
                                            >
                                                Удалить
                                            </button>
                                        </div>

                                        <label>
                                            <input
                                                type="radio"
                                                name={`main-photo`}
                                                checked={photo.isMain}
                                                onChange={() => handlePhotoFieldChange(index, "isMain", true)}
                                            />
                                            Главная
                                        </label>
                                        <input
                                            type="color"
                                            value={photo.hashColor}
                                            onChange={(e) => handlePhotoFieldChange(index, "hashColor", e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}


                            <button type="button" onClick={handleAddPhoto} style={{height: "300px", width: "300px"}}>
                                Добавить фото
                            </button>
                        </div>
                    </div>


                    <button type="submit" className={styles.saveButton}>
                        Сохранить
                    </button>
                    {error && <p style={{color: "red"}}>{error}</p>}
                </form>
            </div>
            {modal.show && (
                <div className={styles.modal}>
                    <div
                        className={`${styles.modalContent} ${modal.type === "success" ? styles.success : styles.error}`}>
                        <h4>{modal.message}</h4>
                        <button onClick={closeModal} className={styles.closeButton}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateProducts;
