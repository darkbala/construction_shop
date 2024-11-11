import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./CatalogPage.module.scss";
import { fetchCategories } from "../../store/slices/getCategories.js";
import { fetchProducts } from "../../store/slices/getProducts.js";
import CategorySlider from "../../components/CategorySlider/CategorySlider.jsx";
import Products from "../../components/Products/Products.jsx";

const CatalogPage = () => {
    const dispatch = useDispatch();
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);
    const { data: products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedCategory(categories[0]);
            dispatch(fetchProducts(categories[0].id));
        }
    }, [categories, dispatch]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        dispatch(fetchProducts(category.id));
    };

    return (
        <div className={styles.CatalogPage}>
            <section className={styles.searchbar}>
                <div className={styles.top}>
                    <SearchBar />
                    <button className={styles.filter}>
                        {/* SVG код для кнопки фильтров */}
                        Фильтры
                    </button>
                </div>
                <div>
                    {!categoriesLoading && !categoriesError && (
                        <CategorySlider
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={handleCategoryClick}
                        />
                    )}
                </div>
            </section>

            <section className={styles.results_container}>
                <p className={styles.show}>Показано {products.length} из 45</p>
                {productsLoading ? (
                    <p>Loading products...</p>
                ) : productsError ? (
                    <p>Error loading products: {productsError}</p>
                ) : (
                    <Products products={products} />
                )}
            </section>
        </div>
    );
}

export default CatalogPage;
