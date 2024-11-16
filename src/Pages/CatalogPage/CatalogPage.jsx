import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import styles from "./CatalogPage.module.scss";
import {fetchCategories} from "../../store/slices/getCategories.js";
import {fetchProducts} from "../../store/slices/getProducts.js";
import {fetchAllCollections} from "../../store/slices/getCollcetions.js";
import CategorySlider from "../../components/CategorySlider/CategorySlider.jsx";
import Products from "../../components/Products/Products.jsx";

const CatalogPage = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language.currentLanguage);
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.categories);
    const { products = [], loading: productsLoading, error: productsError } = useSelector((state) => state.products);
    const { collections, loading: collectionsLoading, error: collectionsError } = useSelector((state) => state.collections);
    const searchResults = useSelector((state) => state.search.results);
    const searchStatus = useSelector((state) => state.search.status);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchAllCollections());
    }, [dispatch, language]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        dispatch(fetchProducts(category.id));
    };



    return (
        <div className={styles.CatalogPage}>
            <section className={styles.searchbar}>
                <div className={styles.top}>
                    <SearchBar />
                    <button className={styles.filter}>Фильтры</button>
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
                {searchStatus === "loading" ? (
                    <p>Loading search results...</p>
                ) : searchResults.length > 0 ? (
                    <>
                        <p className={styles.show}>Показано {searchResults.length} результатов поиска</p>
                        <Products products={searchResults} />
                    </>
                ) : collectionsLoading ? (
                    <p>Loading collections...</p>
                ) : collectionsError ? (
                    <p>Error loading collections: {collectionsError}</p>
                ) : selectedCategory ? (
                    productsLoading.length > 0 ? (
                        <>
                            <p>Показаны товары для категории "{selectedCategory.name}"</p>
                            <Products products={products} />
                        </>
                    ) : (
                        <p>Товары для категории "{selectedCategory.name}" не найдены</p>
                    )
                ) : collections.length > 0 ? (
                    <>
                        <p>Показаны все коллекции</p>
                        <Products products={collections} />
                    </>
                ) : (
                    <p>Коллекции не найдены</p>
                )}
            </section>
        </div>
    );
};

export default CatalogPage;
