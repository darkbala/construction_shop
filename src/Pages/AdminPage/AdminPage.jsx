import ModifySpecialOffer from "../../components/ModifySpecialOffer/ModifySpecialOffer.jsx";
import styles from "./AdminPage.module.scss";
import AllProducts from "../../components/AllProducts/AllProducts.jsx";

const AdminPage = () => {
    return (
        <div className={styles.admin}>
            {/*<ModifySpecialOffer/>*/}
            <AllProducts/>
        </div>
    )
}

export default AdminPage;