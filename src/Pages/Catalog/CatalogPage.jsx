import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import styles from "./CatalogPage.module.scss";
import {fetchCategoriesWithMeals} from "../../store/slices/getCategories.js";
import CategorySlider from "../../components/CategorySlider/CategorySlider.jsx";

const CatalogPage = () => {

    const dispatch = useDispatch();
    const {categories, loading, error} = useSelector((state) => state.categories);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchCategoriesWithMeals());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0]); 
        }
    }, [categories]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    return (
        <div className={styles.CatalogPage}>
            <section>
                <SearchBar/>
            </section>
            <div>
                {!loading && !error && (
                    <CategorySlider
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryClick}
                    />
                )}
            </div>

            <p>Показано 12 из 45</p>
        </div>
    )
}

export default CatalogPage;