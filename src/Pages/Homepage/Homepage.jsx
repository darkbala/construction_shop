import classes from './Homepage.module.scss'
import Header from "../../components/Header/Header.jsx";
import Counter from "../../components/Counter/Counter.jsx";
import CompanyGoalHome from "../../components/CompanyGoalHome/CompanyGoalHome.jsx";
import SpecialProductCard from "../../components/SpecialProductCard/SpecialProductCard.jsx";
import {Swiper, SwiperSlide} from "swiper/react";
import SwitchSection from "../../components/SwitchSection/SwitchSection.jsx";
const Homepage = () => {
    return (
        <main className={classes.HomePage}>
            <Header/>
            <Counter/>
            <CompanyGoalHome/>
            <SpecialProductCard/>

           <SwitchSection/>
        </main>
    )
}

export default Homepage