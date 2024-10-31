import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu.jsx";

const CatalogPage = () => {
    return(
        <div>
            <SearchBar />
            <CategoryMenu />
            <p>Показано 12 из 45</p>
        </div>
    )
}

export default CatalogPage;