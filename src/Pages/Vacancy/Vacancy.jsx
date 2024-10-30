import styles from "./Vacancy.module.scss";
import JobCard from "../../components/JobCard/JobCard.jsx";

const Vacancy = () => {
    const jobs = [
        {
            "id": 1,
            "title": "Менеджер по продажам",
            "salary": "от 35,000 сом",
            "requirements": ["Список требований 1", "Список требований 2"],
            "responsibilities": ["Обязанность 1",  "Обязанность 2", "Список требований отбираем мебель от лучших производителей",  "Обязанность 2", "Список требований отбираем мебель от лучших производителей", "Обязанность 2", "Список требований отбираем мебель от лучших производителей"],
            "conditions": ["Условие 1", "Условие 2", "Условие 3"],
            "additionalInfo": "График работы с Пн по Пт с 9:00 до 18:00"
        },
        {
            "id": 2,
            "title": "Другая вакансия",
            "salary": "от 40,000 сом",
            "requirements": ["Требование A", "Требование B"],
            "responsibilities": ["Обязанность A", "Обязанность B"],
            "conditions": ["Условие A", "Условие B"],
            "additionalInfo": "График работы с Пн по Сб с 10:00 до 19:00"
        }
    ]
    return (
        <div className={styles.jobList}>
            <div className={styles.title}>
                <h5>Вакансии</h5>
            </div>
            {jobs.map((job) => (
                <JobCard key={job.id} job={job}/>
            ))}
        </div>
    )
}

export default Vacancy;