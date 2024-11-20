import styles from "./FormFoAdd.module.scss";
import {  useState } from "react";
import axios from "axios";
import {API_URI} from "../../../store/api/api.js";

const FormFoAdd = () => {
    const [formState, setFormState] = useState({
        price: 1500.75,
        isProducer: true,
        isPainted: false,
        isPopular: true,
        isNew: true,
        collections: [
            { name: "Новая Коллекция", description: "Описание коллекции на русском", language_code: "ru" },
            { name: "Жаңы Коллекция", description: "Көргөзмө жөнүндө кыргыз тилинде маалымат", language_code: "kgz" },
            { name: "New Collection", description: "Collection description in English", language_code: "en" },
        ],
    });

    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [extraPhotoData, setExtraPhotoData] = useState({});

    // Обработка выбора файлов
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setUploadedPhotos(files);

        const newPhotoData = {};
        files.forEach((file) => {
            newPhotoData[`isMain_${file.name}`] = false; // По умолчанию не основная
            newPhotoData[`hashColor_${file.name}`] = "#FFFFFF"; // Цвет по умолчанию
        });
        setExtraPhotoData(newPhotoData);
    };

    // Отправка данных
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Добавляем JSON для collection
        formData.append(
            "collection",
            JSON.stringify({
                price: formState.price,
                isProducer: formState.isProducer,
                isPainted: formState.isPainted,
                isPopular: formState.isPopular,
                isNew: formState.isNew,
                collections: formState.collections,
            })
        );

        // Добавляем файлы
        uploadedPhotos.forEach((file) => {
            formData.append("photos", file);
            formData.append(`isMain_${file.name}`, extraPhotoData[`isMain_${file.name}`]);
            formData.append(`hashColor_${file.name}`, extraPhotoData[`hashColor_${file.name}`]);
        });

        try {
            const response = await axios.post(`${API_URI}collection`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Success:", response.data);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: parseFloat(e.target.value) })}
                />
            </div>

            <div>
                <label>Upload Photos:</label>
                <input type="file" multiple onChange={handleFileChange} />
            </div>

            {uploadedPhotos.map((file, index) => (
                <div key={index}>
                    <p>{file.name}</p>
                    <label>
                        Is Main:
                        <input
                            type="checkbox"
                            checked={extraPhotoData[`isMain_${file.name}`]}
                            onChange={(e) =>
                                setExtraPhotoData({
                                    ...extraPhotoData,
                                    [`isMain_${file.name}`]: e.target.checked,
                                })
                            }
                        />
                    </label>
                    <label>
                        Hash Color:
                        <input
                            type="color"
                            value={extraPhotoData[`hashColor_${file.name}`]}
                            onChange={(e) =>
                                setExtraPhotoData({
                                    ...extraPhotoData,
                                    [`hashColor_${file.name}`]: e.target.value,
                                })
                            }
                        />
                    </label>
                </div>
            ))}

            <button type="submit">Submit</button>
        </form>
    );
};


export default FormFoAdd;
