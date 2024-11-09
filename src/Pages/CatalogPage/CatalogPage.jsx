import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import styles from "./CatalogPage.module.scss";
import {fetchCategoriesWithMeals} from "../../store/slices/getCategories.js";
import CategorySlider from "../../components/CategorySlider/CategorySlider.jsx";
import Products from "../../components/Products/Products.jsx";

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
            <section className={styles.searchbar}>
                <div className={styles.top}>
                    <SearchBar/>
                    <button className={styles.filter}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path
                                d="M5.20825 12.5003V4.16699M19.7916 20.8337V17.7087M5.20825 20.8337V16.667M19.7916 13.542V4.16699M12.4999 7.29199V4.16699M12.4999 20.8337V11.4587"
                                stroke="white" strokeLinecap="round"/>
                            <path
                                d="M5.20833 16.6667C6.35893 16.6667 7.29167 15.7339 7.29167 14.5833C7.29167 13.4327 6.35893 12.5 5.20833 12.5C4.05774 12.5 3.125 13.4327 3.125 14.5833C3.125 15.7339 4.05774 16.6667 5.20833 16.6667Z"
                                stroke="white" strokeLinecap="round"/>
                            <path
                                d="M12.5001 11.4587C13.6507 11.4587 14.5834 10.5259 14.5834 9.37533C14.5834 8.22473 13.6507 7.29199 12.5001 7.29199C11.3495 7.29199 10.4167 8.22473 10.4167 9.37533C10.4167 10.5259 11.3495 11.4587 12.5001 11.4587Z"
                                stroke="white" strokeLinecap="round"/>
                            <path
                                d="M19.7916 17.7087C20.9422 17.7087 21.8749 16.7759 21.8749 15.6253C21.8749 14.4747 20.9422 13.542 19.7916 13.542C18.641 13.542 17.7083 14.4747 17.7083 15.6253C17.7083 16.7759 18.641 17.7087 19.7916 17.7087Z"
                                stroke="white" strokeLinecap="round"/>
                        </svg>
                        Фильтры
                    </button>
                </div>
                <div>
                    {!loading && !error && (
                        <CategorySlider
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategoryClick}
                        />
                    )}
                </div>
            </section>


            <section className={styles.results_container}>
                <p className={styles.show}>Показано 12 из 45</p>
                {selectedCategory && selectedCategory.meals.length > 0 && (
                    <Products products={selectedCategory.meals}/>
                )}
            </section>
        </div>
    )
}

export default CatalogPage;