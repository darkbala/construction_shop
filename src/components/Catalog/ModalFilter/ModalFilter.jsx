import React, { useState } from 'react';
import exiticon from "../../../assets/x.png";
import Slider from 'rc-slider';
import styles from './ModalFilter.module.scss';
import "rc-slider/assets/index.css";
import {useDispatch, useSelector} from "react-redux";

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

  const handleMinInputChange = (e) => {
    const value = Math.max(0, Number(e.target.value.replace(/\D/g, ''))); // Убираем все нецифровые символы
    setMinValue(value);
  };

  const handleMaxInputChange = (e) => {
    const value = Math.max(0, Number(e.target.value.replace(/\D/g, ''))); // Убираем все нецифровые символы
    setMaxValue(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Закрываем модалку при применении
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500); // Время на анимацию

    // Логика отправки или фильтрации
    console.log('Filters submitted', { minValue, maxValue, productType });
  };

  const handleClear = () => {
    setMinValue(0);
    setMaxValue(12000000);
    setProductType('iskender'); // Или любое значение по умолчанию для радио
  };

  // Функция для форматирования чисел
  const formatNumber = (number) => {
    return number.toLocaleString('ru-RU'); // Для пробела между тысячами
    // return number.toLocaleString('de-DE'); // Для точки между тысячами
  };


  const dispatch = useDispatch();
  const { min, max } = useSelector((state) => state.search.filters.priceRange);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newPriceRange = { ...{ min, max }, [name]: value };
    dispatch(setPriceRange(newPriceRange));
    dispatch(searchByPriceRange(newPriceRange)); // Инициируем поиск по ценовому диапазону
  };
  return (
    <div className={`${styles.overlay} ${isClosing ? styles.fadeOut : ''}`} onClick={handleOverlayClick}>
      <div className={`${styles.wrap} ${isClosing ? styles.fadeOutWrap : ''}`}>
        {/* <img src={exiticon} alt="exit" onClick={handleOverlayClick} className={styles.exitIcon} /> */}
        <form onSubmit={handleFormSubmit}>
          <div className={styles.box}>
            <div className={styles.range}>
              <p>Цены</p>
              <Slider
                range
                min={0}
                max={12000000}
                step={2000}
                value={[minValue, maxValue]}
                onChange={handlePriceChange}
                tipFormatter={(value) => formatNumber(value)} // Форматирование подсказки
              />
            </div>
            <div className={styles.vals}>
              <div>
                <p>Мин.</p>
                <input 
                  type="text" 
                  value={formatNumber(minValue)} 
                  onChange={handleMinInputChange} 
                />
              </div>
              <div>
                <p>Макс.</p>
                <input 
                  type="text" 
                  value={formatNumber(maxValue)}
                  onChange={handlePriceChange}
                />
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
            <div className={styles.buttons}>
              <button className={styles.btn1} type="button" onClick={handleClear}>
                Очистить
              </button>
              <button className={styles.btn2} type="submit">Применить</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
