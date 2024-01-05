import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserData, selectUserStatus, selectUserError, selectError } from '../../api/selectors';
import { getUser } from '../../reducers/userReducer'
import { setAuth } from '../../reducers/authReducer';
import { switchError } from '../../reducers/errorReducer';
import { authenticate } from '../../services/auth';
import styles from './login.module.scss'

export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(selectUserData);
    const userStatus = useSelector(selectUserStatus);
    const userError = useSelector(selectUserError);
    const isError = useSelector(selectError)
    const [ isRegister, setIsRegister ] = useState(true)
    const [ password, setPassword ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ repeatedPassword, setRepeatedPassword ] = useState('')
    const [ passwordError, setPasswordError ] = useState(false)
    const [ role, setRole ] = useState('owner')

    const credentialHandler = (e, setter) => {
        setter(e.target.value)
    }
    const disableButton = () => {
        if (isRegister && (!name || !email || !password || !repeatedPassword)) {
            return true
        }
        if (!isRegister && (!email || !password )) {
            return true
        }
        return false
    }

    const registerHandler = (e) => {
        e.preventDefault();
        if (isRegister) {
            if (password !== repeatedPassword) {
                setPasswordError(true)
                return
            } else setPasswordError(false)
            dispatch(getUser({ endpoint: 'authorize/registration', data: { name, email, password } }));
        } else {
            dispatch(getUser({ endpoint: 'authorize/login', data: { email, password, role } }));
        }
    };

    useEffect(() => {
        if (userStatus === 'succeeded') {
            dispatch(setAuth(true))
            authenticate(userData.token)
            navigate('/profile')
        }
        else if (userStatus === 'failed') {
            dispatch(switchError())
            setTimeout(() => {
                dispatch(switchError())
            }, 3000);
        }
      }, [userStatus, userData, userError]);


    return (
        <div className={styles.auth__container}>
            <div className={styles.auth__type}>
                <button
                    className={isRegister ? styles.type__button_active : styles.type__button}
                    onClick={() => setIsRegister(false)}
                >Login
                </button>
                <button
                    className={isRegister ? styles.type__button : styles.type__button_active}
                    onClick={() => setIsRegister(true)}
                >Register
                </button>
            </div>
            <form className={styles.inputs_container} onSubmit={registerHandler}>
                {
                    userStatus == 'loading' && 
                    <div className={styles.preloader}>
                        <div className={styles.preloader__image}></div>
                    </div>
                }
                {
                    !isRegister &&
                    <div className={styles.role__switcher}>
                        <p>Login as:</p>
                        <div
                            className={role == 'owner' ? styles.role__button_active : styles.role__button}
                            onClick={() => setRole('owner')}
                        >
                            Owner
                        </div>
                        <div
                            className={role == 'owner' ? styles.role__button : styles.role__button_active}
                            onClick={() => setRole('employee')}
                        >
                            Employee
                        </div>
                    </div>
                }

                <div className={styles.input_layout}>
                    <p>Your email</p>
                    <input
                        type="text"
                        value={email}
                        onInput={(e) => credentialHandler(e, setEmail)}
                    />
                </div>
                {
                    isRegister && 
                    <div className={styles.input_layout}>
                        <p>Your name</p>
                        <input
                            type="text"
                            value={name}
                            onInput={(e) => credentialHandler(e, setName)}
                        />
                    </div>
                }
                <div className={styles.input_layout}>
                    <p>Your password</p>
                    <input
                        className={passwordError ? styles.password__error : null}
                        type="password"
                        value={password}
                        onInput={(e) => credentialHandler(e, setPassword)}
                    />
                </div>
                {
                    isRegister && 
                    <div className={styles.input_layout}>
                        <p>Repeat your password</p>
                        <input
                            className={passwordError ? styles.password__error : null}
                            type="password"
                            value={repeatedPassword}
                            onInput={(e) => credentialHandler(e, setRepeatedPassword)}
                        />
                    </div>
                }
                <div className={styles.submit__wrapper}>
                    <button
                        className={styles.type__button}
                        type="submit"
                        disabled={disableButton()}
                    >
                        {isRegister ? 'Register' : 'Login'}
                    </button>

                    {isError && <h4 className={styles.error__message}>Ошибка: {userError}</h4>}
                </div>
            </form>
        </div>
    )
}
