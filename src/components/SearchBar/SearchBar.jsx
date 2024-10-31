import styles from './SearchBar.module.scss';

const SearchBar = () => {
    return (
        <div className={styles.searchContainer}>
            <input type="text" placeholder="Поиск" className={styles.searchInput} />
            <button className={styles.searchButton}>
                <i className="fas fa-search"></i> {/* FontAwesome icon, подключите если требуется */}
            </button>
        </div>
    );
};

export default SearchBar;
