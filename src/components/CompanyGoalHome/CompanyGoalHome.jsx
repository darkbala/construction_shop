import { connect } from 'react-redux'
import cl from './CompanygoalHome.module.scss'

export const CompanyGoalHome = () => {
  return (
    <div className={cl.wrap}>
        <div className={cl.inbox}>
          <p className={cl.left}> <span>Iskender Company</span> является ведущим международным производителем дизайнерской мебели для ванных комнат</p>
          <div className={cl.line}></div>
          <p className={cl.right}>Наша постоянная цель — удовлетворять потребности клиентов. Мы достигли этого благодаря нашим ценностям, работающим в идеальном симбиозе, реагировать на рынок, предоставляя широкий ассортимент мебели для ванных комнат, которая является высококонкурентной с точки зрения дизайна,<br/> качества и цены. </p>
        </div>
    </div>
  )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyGoalHome)