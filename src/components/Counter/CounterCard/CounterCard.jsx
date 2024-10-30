import styles from './CounterCard.module.scss';

// eslint-disable-next-line react/prop-types
const CounterCard = ({counter}) => {
    return (
        <div className={styles.CounterCard}>
            <h3>{counter.count}{counter.id}</h3>
            <p>{counter.description}</p>
        </div>
    )
}

export default CounterCard