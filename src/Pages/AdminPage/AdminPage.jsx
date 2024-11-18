import ModifySpecialOffer from "../../components/ModifySpecialOffer/ModifySpecialOffer.jsx";
import styles from "./AdminPage.module.scss";
import AddVacancy from "../../components/AddVacancy/AddVacancy.jsx";

const AdminPage = () => {
    return (
        <div className={styles.admin}>
            {/*<ModifySpecialOffer/>*/}
            <AddVacancy/>
        </div>
    )
}

export default AdminPage;