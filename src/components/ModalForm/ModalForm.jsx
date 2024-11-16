import React, { useState, useEffect } from 'react';
import styles from "./ModalForm.module.scss";
import StarRating from './StarRating/StarRating';
import exiticon from '../../assets/x.png';

export default function ModalForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    email: '',
    review: ''
  });

  const [errors, setErrors] = useState({});
  const [isClosing, setIsClosing] = useState(false);  // Для анимации закрытия

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        onClose();
      }, 500); // Время на анимацию
    }
  }, [isClosing, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Имя обязательно';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Введите корректный Email';
    if (!formData.review) formErrors.review = 'Отзыв обязателен';
    return formErrors;
  };

  const handleClear = () => {
    setFormData({
      name: '',
      rating: 0,
      email: '',
      review: ''
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log('Form Data:', formData);
      alert('Отзыв отправлен!');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true); // Активируем анимацию при клике на оверлей
    }
  };

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.fadeOut : ''}`} onClick={handleOverlayClick}>
      <div className={`${styles.wrap} ${isClosing ? styles.fadeOutWrap : ''}`}>
        <img src={exiticon} alt="exit" onClick={() => setIsClosing(true)} className={styles.exitIcon} />

        <form onSubmit={handleSubmit}>
          <div className={styles.box}>
            <p className={styles.Maintitle}>Оставьте отзыв</p>
            <div>
              <p>Введите свое ФИО</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={errors.name || '...'}
                className={errors.name ? styles.error : ''}
              />
            </div>
            <div>
              <p>Оценка</p>
              <StarRating rating={formData.rating} onRatingChange={handleRatingChange} />
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={errors.email || '...'}
                className={errors.email ? styles.error : ''}
              />
            </div>
            <div>
              <p>Отзыв</p>
              <textarea
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                placeholder={errors.review || '...'}
                className={errors.review ? styles.error : ''}
              />
            </div>
            <div className={styles.buttons}>
              <button className={styles.btn1} type="button" onClick={handleClear}>Очистить</button>
              <button className={styles.btn2} type="submit">Отправить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
