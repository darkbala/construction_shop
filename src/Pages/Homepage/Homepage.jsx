import classes from './Homepage.module.scss'
import Header from "../../components/Header/Header.jsx";
import Counter from "../../components/Counter/Counter.jsx";
import CompanyGoalHome from "../../components/CompanyGoalHome/CompanyGoalHome.jsx";
import SpecialProductCard from "../../components/SpecialProductCard/SpecialProductCard.jsx";
import SwitchSection from "../../components/SwitchSection/SwitchSection.jsx";
import Catalog from "../../components/Catalog/Catalog.jsx";
import Reviews from "../../components/Reviews/Reviews.jsx";
import Brands from "../../components/Brands/Brands.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPopularProducts} from "../../store/slices/getProducts.js";
import Footer from '../../components/Footer/Footer.jsx';
import EndLine from '../../components/EndLine/EndLine.jsx';

const Homepage = () => {


    return (
        <main className={classes.HomePage}>
            <Header/>
            <Counter/>
            <CompanyGoalHome/>
            <SpecialProductCard/>
            <SwitchSection/>
            <Catalog/>

            <Reviews/>

            <Brands/>
            <Footer/>
            <EndLine/>
        </main>
    )
}

export default Homepage