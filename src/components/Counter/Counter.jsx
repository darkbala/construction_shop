import styles from './Counter.module.scss';
import CounterCard from "./CounterCard/CounterCard.jsx";

const Counter = () => {
    const data = [
        {
            count: "10+ лет",
            description: "на рынке",
            id: 2
        },
        {
            count: "70.000+",
            description: "довольных клиентов",
            id: 1
        },
        {
            count: "70.000",
            description: "изделий в год",
            id: 3
        }
    ]
    return (
        <div className={styles.Counter}>
            {data.map((item, index) => (
                <CounterCard key={index} counter={item}/>
            ))}
        </div>
    )
}

export default Counter;