import styles from './SwitchSection.module.scss';
import {useState} from "react";
import SwitchButtons from "../UI/SwitchButtons/SwitchButtons.jsx";
import CardSlider from "../UI/CardSlider/CardSlider.jsx";
import img from "../../assets/img.png"
const SwitchSection = () => {
    const [active, setActive] = useState('pop');

    const handleClick = (button) => {
        setActive(button);
    };

    const cards = [
        {id: 1, name: 'Product 1', price: '$10', description: 'Description 1', image: img},
        {id: 2, name: 'Product 2', price: '$20', description: 'Description 2', image: img},
        {id: 3, name: 'Product 1', price: '$10', description: 'Description 1', image: img},
        {id: 4, name: 'Product 2', price: '$20', description: 'Description 2', image: img},
        {id: 5, name: 'Product 1', price: '$10', description: 'Description 1', image: img},
        {id: 6, name: 'Product 2', price: '$20', description: 'Description 2', image: img},
        {id: 7, name: 'Product 1', price: '$10', description: 'Description 1', image: img},
        {id: 8, name: 'Product 2', price: '$20', description: 'Description 2', image: img},
    ];

    return (
        <section className={styles.SwitchSection}>
            <SwitchButtons active={active} onClick={handleClick}/>

            <CardSlider cards={cards}/>
        </section>
    );
};

export default SwitchSection;
