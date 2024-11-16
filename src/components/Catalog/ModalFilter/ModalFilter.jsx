import React, { useState } from 'react';
import exiticon from "../../../assets/x.png";
import Slider from 'rc-slider';
import styles from './ModalFilter.module.scss';
import "rc-slider/assets/index.css";

export default function ModalFilter({ onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(12000000);
  const [productType, setProductType] = useState('iskender'); // Значение выбранной продукции

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 500); // Время на анимацию
    }
  };

  const handleSliderChange = (value) => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Логика отправки или фильтрации
    console.log('Filters submitted', { minValue, maxValue, productType });
  };

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.fadeOut : ''}`} onClick={handleOverlayClick}>
      <div className={`${styles.wrap} ${isClosing ? styles.fadeOutWrap : ''}`}>
        <img src={exiticon} alt="exit" onClick={() => setIsClosing(true)} className={styles.exitIcon} />
        <form onSubmit={handleFormSubmit}>
          <div className={styles.box}>
            <div className={styles.range}>
              <p>Цены</p>
              <Slider
                range
                min={0}
                max={12000000}
                step={1000}
                defaultValue={[minValue, maxValue]}
                onChange={handleSliderChange}
                tipFormatter={(value) => `${value}`} // Форматирование подсказки
              />
            </div>
            <div className={styles.vals}>
              <div>
                <p>Мин.</p>
                <input type="text" disabled value={minValue} />
              </div>
              <div>
                <p>Макс.</p>
                <input type="text" disabled value={maxValue} />
              </div>
            </div>
            <div className={styles.radios}>
              <span>
                <input
                  type="radio"
                  name="product"
                  id="iskender"
                  checked={productType === 'iskender'}
                  onChange={() => setProductType('iskender')}
                />
                <p>Продукция Искендер</p>
              </span>
              <span>
                <input
                  type="radio"
                  name="product"
                  id="partners"
                  checked={productType === 'partners'}
                  onChange={() => setProductType('partners')}
                />
                <p>Продукция партнеров</p>
              </span>
            </div>
            <div>
              <button type="button" onClick={() => { /* Очистка значений */ }}>
                Очистить
              </button>
              <button type="submit">Применить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
