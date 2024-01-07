import { Routes, Route } from 'react-router-dom';
import styles from './app.module.scss'
import { Nav } from '../components/nav/Nav'
import { Greeting } from '../pages/greeting/Greeting'
import { Login } from '../pages/login/Login';
import { Company } from '../pages/company/Company'
import { Profile } from '../pages/profile/Profile';
import { useEffect } from 'react';
import { currentUserQuery } from '../services/auth';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export const App = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.reducer.auth.isAuth);

    useEffect(() => {
        currentUserQuery(navigate, dispatch, isAuth)
    }, [dispatch ,isAuth]);
    return (
        <div className={styles.app}>
            <Nav/>
            <Routes>
                <Route path="/" element={<Greeting/>}></Route>
                <Route path="authorize" element={<Login/>}></Route>
                <Route path="*" element={<Login/>}></Route>
                <Route path="company" element={<Company/>}></Route>
                <Route path="profile" element={<Profile/>}></Route>
            </Routes>
        </div>
    )
}
