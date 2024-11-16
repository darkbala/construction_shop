import styles from "./Vacancy.module.scss";
import JobCard from "../../components/JobCard/JobCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchVacancies} from "../../store/slices/getVacancy.js";

const Vacancy = () => {
    const dispatch = useDispatch();
    const {vacancies} = useSelector((state) => state.vacancies);

    useEffect(() => {
        dispatch(fetchVacancies())
    }, [])

    console.log(vacancies)
    return (
        <div className={styles.jobList}>
            <div className={styles.title}>
                <h5>Вакансии</h5>
            </div>
            {vacancies?.map((job) => (
                <JobCard key={job.id} job={job}/>
            ))}
        </div>
    )
}

export default Vacancy;