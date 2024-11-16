import  {useState} from 'react';
import styles from './JobCard.module.scss';

// eslint-disable-next-line react/prop-types
const JobCard = ({job}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.jobCard}>
            <div className={styles.header} onClick={toggleDetails}>
                {/* eslint-disable-next-line react/prop-types */}
                <h3 className={styles.title}>{job.title}</h3>
                <div className={styles.divided}>
                    {/* eslint-disable-next-line react/prop-types */}
                    <span className={styles.salary}>{job.salary} som</span>
                    <button className={styles.toggleButton}>{isOpen ? '-' : '+'}</button>
                </div>
            </div>

            <div className={`${styles.details} ${isOpen ? styles.detailsOpen : ''}`}>
                <div className={styles.section}>
                    <h4>Требования</h4>
                    <ul className={styles.list}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>Обязанности</h4>
                    <ul className={styles.list}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {job.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>Условия</h4>
                    <ul className={styles.list}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {job.conditions.map((cond, index) => (
                            <li key={index}>{cond}</li>
                        ))}
                    </ul>
                </div>

                <div className={styles.section}>
                    <h4>Доп. информация</h4>
                    {/* eslint-disable-next-line react/prop-types */}
                    <p>{job.additionalInfo}</p>
                </div>

                <div className={styles.section}>

                    <button className={styles.applyButton}>Откликнуться</button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
