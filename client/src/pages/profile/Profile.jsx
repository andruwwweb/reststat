import { useSelector } from 'react-redux'
import { Preloader } from '../../components/preloader/Preloader'
import styles from './profile.module.scss'

export const Profile = () => {

    const userData = useSelector(state => state.reducer.user.data);

    return (
        <div className={styles.profile__wrapper}>
            {!userData ? <Preloader/> :
            <div className={styles.profile__card}>
                <h2>Name: {userData.name}</h2>
                <p>Email: {userData.email}</p>
                <p>ID: {userData.id}</p>
            </div>}
        </div>
    )
}
