import { useState, useEffect } from 'react';
import styles from './CounterCard.module.scss';

// eslint-disable-next-line react/prop-types
const CounterCard = ({ counter }) => {
    const [animatedCount, setAnimatedCount] = useState(0);
    const isNumeric = /^\d+/.test(counter.count); // Проверка на наличие числа в начале строки

    useEffect(() => {
        if (!isNumeric) return;

        const target = parseInt(counter.count.replace(/\D/g, ''), 10); // Извлечение числа из строки
        const duration = 2000; // Общая длительность анимации
        const stepTime = 20; // Интервал обновления
        const totalSteps = duration / stepTime; // Общее количество шагов
        const increment = target / totalSteps; // Шаг для каждого обновления

        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setAnimatedCount(target);
                clearInterval(timer);
            } else {
                setAnimatedCount(Math.ceil(current));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [counter.count, isNumeric]);

    const nonNumericPart = counter.count.replace(/\d+/g, '').trim();

    return (
        <div className={styles.CounterCard}>
            <h3>
                {isNumeric
                    ? `${animatedCount.toLocaleString()}${nonNumericPart}`
                    : counter.count}
            </h3>
            <p>{counter.description}</p>
        </div>
    );
};

export default CounterCard;
