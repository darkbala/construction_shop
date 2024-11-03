import classes from './Homepage.module.scss'
import Header from "../../components/Header/Header.jsx";
import Counter from "../../components/Counter/Counter.jsx";

const Homepage = () => {
    return (
        <div className={classes.HomePage}>
            <Header/>
            <Counter/>
            <p className='commit'>Комит как Амит ахахах</p>
        </div>
    )
}

export default Homepage