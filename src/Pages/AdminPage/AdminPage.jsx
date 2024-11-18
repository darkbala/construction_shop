import ModifySpecialOffer from "../../components/ModifySpecialOffer/ModifySpecialOffer.jsx";
import styles from "./AdminPage.module.scss";
import AllProducts from "../../components/AllProducts/AllProducts.jsx";
import AllCollections from "../../components/AllCollections/AllCollections.jsx";
import ChangeCollection from "../../components/ChangeCollection/ChangeCollection.jsx";

const AdminPage = () => {
    return (
        <div className={styles.admin}>
            {/*<ModifySpecialOffer/>*/}
            {/*<AllProducts/>*/}
            {/*<AllCollections/>*/}

            <ChangeCollection/>
        </div>
    )
}

export default AdminPage;