
import { Link, useLocation } from 'react-router-dom';
import styles from './nav.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserAuth } from '../../api/selectors';
import { setAuth } from '../../reducers/authReducer';
import { out } from '../../services/auth';
import { resetStatus, setUser } from '../../reducers/userReducer';


export const Nav = () => {

  const auth = useSelector(selectUserAuth);
  const dispatch = useDispatch()
  const location = useLocation()

  const logout = () => {
    out()
    dispatch(resetStatus())
    dispatch(setAuth(false))
    dispatch(setUser(null))
  }

  return (
    <div className={styles.navbar}>
            {auth
            ?
            <div className={styles.menu__item}>
                <Link className={location.pathname === '/company' ? styles.nav__item_active : styles.nav__item} to="/company">Company</Link>
                <Link className={location.pathname === '/profile' ? styles.nav__item_active : styles.nav__item} to="/profile">Profile</Link>
                <button className={styles.nav__item} onClick={logout}>Log out</button>
            </div>
            :
            <div className={styles.menu__item}>
                <Link className={location.pathname === '/authorize' ? styles.nav__item_active : styles.nav__item} to="/authorize">Authorize</Link> 
                <Link className={location.pathname === '/' ? styles.nav__item_active : styles.nav__item} to="/">Home</Link>
            </div>
            }

    </div>
  )
}
