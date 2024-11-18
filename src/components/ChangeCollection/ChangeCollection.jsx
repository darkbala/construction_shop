import styles from "./ChangeCollection.module.scss";
import {useState} from "react";

const ChangeCollection = () => {

    const [photos, setPhotos] = useState([null, null, null, null, null]);

    const handleAddPhoto = (index) => {
        alert(`Добавить фото в ячейку ${index}`);
    };

    return (
        <main className={styles.ChangeCollection}>
            <section className={styles.title}>
                <h2>Коллекции / Изменить коллекцию id 1</h2>
                <div className={styles.line}></div>
            </section>
            <section className={styles.info_container}>
                <h4>Русский</h4>
                <span>
                    <label>
                       <h5> Название коллекции</h5>
                        <input type="text" placeholder={"Название"}/>
                    </label>
                         <label>
                       <h5> Цена</h5>
                        <input type="number" placeholder="xxx"/>
                    </label>
                </span>

                <label htmlFor="" className={styles.textarea}>
                    <h5>Описание</h5>
                    <textarea name="" id="" cols="180" rows="10" placeholder={"Описание коллекции"}/>
                </label>
            </section>
            <section className={styles.info_container}>
                <h4>English</h4>
                <span>
                    <label>
                       <h5>Collection Name</h5>
                        <input type="text" placeholder={"Collection name"}/>
                    </label>
                         <label>
                       <h5>Price</h5>
                        <input type="number" placeholder="xxx"/>
                    </label>
                </span>

                <label htmlFor="" className={styles.textarea}>
                    <h5>Description</h5>
                    <textarea name="" id="" cols="180" rows="10" placeholder={"Collection description"}/>
                </label>
            </section>
            <section className={styles.info_container}>
                <h4>Кыргызча</h4>
                <span>
                    <label>
                       <h5> Коллекциянын аты</h5>
                        <input type="text" placeholder={"Коллекциянын аты"}/>
                    </label>
                         <label>
                       <h5> Баасы</h5>
                        <input type="number" placeholder="xxx"/>
                    </label>
                </span>

                <label htmlFor="" className={styles.textarea}>
                    <h5>Суроттомо</h5>
                    <textarea name="" id="" cols="180" rows="10" placeholder={"Коллекциянын суроттолушу"}/>
                </label>
            </section>

            <div className={styles.line}></div>

            <div className={styles.container}>

                <div className={styles.filters}>
                    <div className={styles.group}>
                        <p>Производство</p>
                        <label>
                            <input type="radio" name="production" value="licence"/>
                            <span>Лицензия</span>
                        </label>
                        <label>
                            <input type="radio" name="production" value="distributor"/>
                            <span>Дистрибьютер</span>
                        </label>
                    </div>

                    <div className={styles.group}>
                        <p>Отделка</p>
                        <label>
                            <input type="radio" name="finishing" value="painted"/>
                            <span>Крашеная</span>
                        </label>
                        <label>
                            <input type="radio" name="finishing" value="unpainted"/>
                            <span>Не крашеная</span>
                        </label>
                    </div>

                    <div className={styles.group}>
                        <label>
                            <input type="checkbox"/>
                            <span>Популярный товар</span>
                        </label>
                        <label>
                            <input type="checkbox"/>
                            <span>Новый товар (новинка)</span>
                        </label>
                    </div>
                </div>

                <div className={styles.photos}>
                    <p>Фотографии</p>
                    <div className={styles.grid}>
                        {photos.map((photo, index) => (
                            <div key={index} className={styles.cardWrapper}>
                                <div className={styles.card}>
                                    {photo ? (
                                        <img src={photo} alt={`Фото ${index + 1}`}/>
                                    ) : (
                                        <button onClick={() => handleAddPhoto(index)}>+</button>
                                    )}
                                </div>
                                <div className={styles.colors}>
                                    <label className={styles.colorCheckbox}>
                                        <input type="radio" name={`color-${index}`}/>
                                        <span className={styles.black}>Black</span>
                                    </label>
                                    <label className={styles.colorCheckbox}>
                                        <input type="radio" name={`color-${index}`}/>
                                        <span className={styles.green}>Green</span>
                                    </label>
                                    <label className={styles.colorCheckbox}>
                                        <input type="radio" name={`color-${index}`}/>
                                        <span className={styles.blue}>Blue</span>
                                    </label>
                                    <label className={styles.colorCheckbox}>
                                        <input type="radio" name={`color-${index}`}/>
                                        <span className={styles.red}>Red</span>
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                <button className={styles.saveButton}>Сохранить</button>
            </div>
        </main>
    )
}

export default ChangeCollection;