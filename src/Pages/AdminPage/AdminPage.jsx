import ModifySpecialOffer from "../../components/ModifySpecialOffer/ModifySpecialOffer.jsx";
import styles from "./AdminPage.module.scss";
import AllProducts from "../../components/AllProducts/AllProducts.jsx";
import AllCollections from "../../components/AllCollections/AllCollections.jsx";
import ChangeCollection from "../../components/ChangeCollection/ChangeCollection.jsx";
import AddCategory from "../../components/AddCategory/AddCategory.jsx";
import AllVacancy from "../../components/AllVacancy/AllVacancy.jsx";

const AdminPage = () => {
    return (
        <div className={styles.admin}>
            <ModifySpecialOffer/>
            <AllProducts/>
            <AllCollections/>

            <ChangeCollection/>

            <AddCategory/>

            <AllVacancy/>
        </div>
    )
}

export default AdminPage;