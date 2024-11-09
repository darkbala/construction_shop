import styles from "./ArrowButton.module.scss"

const ArrowButton = ({prevRef, nextRef}) => {
    return (
        <span className={styles.btn_cont}>
            <button ref={prevRef} className={styles.arrow_left}>left</button>
            <button ref={nextRef} className={styles.arrow_right}>right</button>
        </span>
    );
};

export default ArrowButton;
