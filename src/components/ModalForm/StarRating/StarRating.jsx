import React, { useState } from 'react';
import styles from './StarRating.module.scss'; // Используйте module.css для CSS-модулей

const StarRating = () => {
  const [rating, setRating] = useState(0); // Текущее значение рейтинга
  const [hover, setHover] = useState(0);   // Значение для наведения

  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <span
            key={starValue}
            className={`${styles.star} ${starValue <= (hover || rating) ? styles.active : ''}`}
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
