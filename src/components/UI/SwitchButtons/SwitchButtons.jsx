import styles from './SwitchButtons.module.scss';
const SwitchButtons = ({ active, onClick }) => {
    return (
        <div className={styles.switch_btn}>
            <button
                className={active === 'pop' ? styles.active : ''}
                onClick={() => onClick('pop')}
            >
                Популярное
            </button>
            <button
                className={active === 'new' ? styles.active : ''}
                onClick={() => onClick('new')}
            >
                Новинки
            </button>
        </div>
    );
};

export default SwitchButtons;
