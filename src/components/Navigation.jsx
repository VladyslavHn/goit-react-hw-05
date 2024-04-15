import css from './Navigation.module.css'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <header className={css.container}>
        <NavLink className={css.link} to="/">Home</NavLink>
        <NavLink className={css.link} to="/movies">Movie</NavLink>
        
      </header>
  )
}

export default Navigation
