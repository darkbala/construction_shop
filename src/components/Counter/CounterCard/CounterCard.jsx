import { useState, useEffect } from 'react';
import styles from './CounterCard.module.scss';

// eslint-disable-next-line react/prop-types
const CounterCard = ({ counter }) => {
    const [animatedCount, setAnimatedCount] = useState(0);
    const isNumeric = /^\d+/.test(counter.count);

    useEffect(() => {
        if (!isNumeric) return;

        const target = parseInt(counter.count.replace(/\D/g, ''), 10); 
        const duration = 4000; 
        const stepTime = duration / target; 

        let current = 0;
        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / 20)); 
            if (current >= target) {
                setAnimatedCount(target);
                clearInterval(timer);
            } else {
                setAnimatedCount(current);
            }
        }, 20); 

        return () => clearInterval(timer);
    }, [counter.count, isNumeric]);

    return (
        <div className={styles.CounterCard}>
            <h3>
                {isNumeric ? `${animatedCount.toLocaleString()}${counter.count.match(/[^\d]+/)?.[0] || ''}` : counter.count}
            </h3>
            <p>{counter.description}</p>
        </div>
    );
};

export default CounterCard;
