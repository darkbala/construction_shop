import  { useState } from "react";
import axios from "axios";
import {API_URI} from "../../store/api/api.js";

const CreateBrand = () => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Формируем данные для отправки
        const formData = new FormData();
        formData.append("name", name);
        formData.append("photo", photo);

        try {
            const response = await axios.post(`${API_URI}/brand`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Успешно:", response.data);
        } catch (error) {
            console.error("Ошибка:", error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Brand Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Brand Photo:
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        required
                    />
                </label>
            </div>
            <button type="submit">Create Brand</button>
        </form>
    );
};

export default CreateBrand;
