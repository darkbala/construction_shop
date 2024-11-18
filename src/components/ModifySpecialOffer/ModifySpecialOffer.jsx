import styles from './ModifySpecialOffer.module.scss';
import {useState} from "react";
import Select from "react-select";

const ModifySpecialOffer = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [discount, setDiscount] = useState(15);
    const items = new Array(20).fill('Тумба “Омега” 100 * 50');

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: "1px solid black",
            borderRadius: "5px",
            outline: "none",

        }),
    };

    const options = [
        {value: "Ala-Archa", label: "Ala-Archa"},
        {value: "Alamedin", label: "Alamedin"},
        {value: "Kol-Tor", label: "Kol-Tor"},
    ];



    const handleSave = () => {
        alert('Сохранено');
    };

    return (
        <div className={styles.promotionForm}>
            <h2>Акции / Изменить спецпредложение</h2>

            <div className={styles.line}>

            </div>

            <div className={styles.select_section}>
                <h3>Выберите тип продукта</h3>
                <Select
                    options={options}
                    styles={customStyles}
                    name="tourName"
                    placeholder={"выберите товары"}
                />
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.customTable}>
                    <tbody>
                    {Array.from({length: 5}).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {items.slice(rowIndex * 4, (rowIndex + 1) * 4).map((item, colIndex) => (
                                <td key={colIndex} className={styles.tableCell}>
                                    <div className={styles.checkboxContainer}>
                                        <label className={styles.label}>
                                            <input type="checkbox"/>
                                            {item}
                                        </label>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.dateInputContainer}>
                <h3>
                    Выберите период действия и размер акции
                </h3>

                <div className={styles.inner_container}>
                    <label>
                        Дата начала:
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Дата окончания:
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Скидка (%):
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                            min="0"
                            max="100"
                        />
                    </label>

                </div>
            </div>

            <button onClick={handleSave} className={styles.saveButton}>
                Сохранить
            </button>
        </div>
    );
};

export default ModifySpecialOffer;
