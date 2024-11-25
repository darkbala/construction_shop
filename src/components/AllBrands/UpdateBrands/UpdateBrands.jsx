import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {updateBrand} from "../../../store/slices/admin/brands/brands.js";

const UpdateBrand = () => {
    const { id } = useParams(); // Получаем ID бренда из URL
    const dispatch = useDispatch();
    const { brands, loading, error } = useSelector((state) => state.brands);

    // Получаем текущий бренд из состояния Redux
    const existingBrand = brands.find((brand) => brand.id === parseInt(id));
    const [name, setName] = useState(existingBrand?.name || ""); // Предзаполняем имя бренда
    const [photo, setPhoto] = useState(null); // Новое фото для обновления

    // Заполняем имя бренда при изменении существующего бренда
    useEffect(() => {
        if (existingBrand) {
            setName(existingBrand.name);
        }
    }, [existingBrand]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateBrand({ brandId: id, name, photo }));
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
                    Brand Photo (optional):
                    <input
                        type="file"
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </label>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Brand"}
            </button>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </form>
    );
};

export default UpdateBrand;
