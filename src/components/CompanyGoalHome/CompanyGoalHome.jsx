import styles from './CompanyGoalHome.module.scss'

const CompanyGoalHome = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.inbox}>
                <p className={styles.left}><span>Iskender Company</span> является ведущим международным производителем
                    дизайнерской мебели для ванных комнат</p>
                <div className={styles.line}/>
                <p className={styles.right}>Наша постоянная цель — удовлетворять потребности клиентов. Мы достигли этого
                    благодаря нашим ценностям, работающим в идеальном симбиозе, реагировать на рынок, предоставляя
                    широкий ассортимент мебели для ванных комнат, которая является высококонкурентной с точки зрения
                    дизайна,<br/> качества и цены. </p>
            </div>
        </div>
    )
}

export default CompanyGoalHome;