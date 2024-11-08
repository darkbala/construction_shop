import classes from './Homepage.module.scss'
import Header from "../../components/Header/Header.jsx";
import Counter from "../../components/Counter/Counter.jsx";
import CompanyGoalHome from "../../components/CompanyGoalHome/CompanyGoalHome.jsx";
import SpecialProductCard from "../../components/SpecialProductCard/SpecialProductCard.jsx";
const Homepage = () => {
    return (
        <main className={classes.HomePage}>
            <Header/>
            <Counter/>
            <CompanyGoalHome/>
            <SpecialProductCard/>
        </main>
    )
}

export default Homepage