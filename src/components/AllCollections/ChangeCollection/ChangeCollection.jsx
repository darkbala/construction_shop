import FormFoAdd from "../../UI/FormFoAdd/FormFoAdd.jsx";
import styles from "./ChangeCollection.module.scss";
const ChangeCollection = () => {


    return (
        <div>
            <section className={styles.title}>
                <h2>Коллекции / Изменить коллекцию id 1</h2>
                <div className={styles.line}></div>
            </section>
            <FormFoAdd/>
        </div>)
}

export default ChangeCollection;