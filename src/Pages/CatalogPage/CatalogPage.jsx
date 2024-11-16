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
    const {categories, loading: categoriesLoading, error: categoriesError} = useSelector((state) => state.categories);
    const products = useSelector((state) => state.products.data);
    const {
        collections = [],
        loading: collectionsLoading,
        error: collectionsError
    } = useSelector((state) => state.collections);
    const producers = useSelector((state) => state.search.activeFilters.producer);
    const {results: searchResults, status: searchStatus} = useSelector((state) => state.search);

    const [selectedCategory, setSelectedCategory] = useState(null);


    console.log(producers)
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchAllCollections());
    }, [dispatch, language]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        dispatch(fetchProducts(category.id));
    };

    const renderProductsSection = () => {
        if (searchStatus === "loading") return <p>Loading search results...</p>;

        if (searchResults.length > 0) {
            return (
                <>
                    <p className={styles.show}>Показано {searchResults.length} результатов поиска</p>
                    <Products products={searchResults}/>
                </>
            );
        }

        if (selectedCategory && products.length === 0) {
            return <p>Loading products for category &#34;{selectedCategory.name}&#34;...</p>;
        }

        if (selectedCategory) {
            return products.length > 0 ? (
                <>
                    <p>Показаны товары для категории &#34;{selectedCategory.name}&#34;</p>
                    <Products products={products}/>
                </>
            ) : (
                <p>Товары для категории &#34;{selectedCategory.name}&#34; не найдены</p>
            );
        }

        if (collectionsLoading) return <p>Loading collections...</p>;
        if (collectionsError) return <p>Error loading collections: {collectionsError}</p>;

        return collections.length > 0 ? (
            <>
                <Products products={collections}/>
            </>
        ) : (
            <p>Коллекции не найдены</p>
        );
    };


    return (
        <div className={styles.CatalogPage}>
            <section className={styles.searchbar}>
                <div className={styles.top}>
                    <SearchBar/>
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
                    {categoriesLoading && <p>Loading categories...</p>}
                    {categoriesError && <p>Error loading categories: {categoriesError}</p>}
                </div>
            </section>

            <section className={styles.results_container}>
                {renderProductsSection()}
            </section>
        </div>
    );
};

export default CatalogPage;
