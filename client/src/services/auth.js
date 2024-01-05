import { setAuth } from "../reducers/authReducer"
import { setUser } from "../reducers/userReducer"
import { base } from "../api/base"

const { API_BASE } = base

const checkAuth = () => {
    const auth = localStorage.getItem('auth')
    return auth
}
const authenticate = (token) => {
    localStorage.setItem('auth', token)
}
const out = () => {
    localStorage.removeItem('auth')
}
const currentUserQuery = async (navigate, dispatch, isAuth, getData) => {
    const token = checkAuth();

    if (!isAuth && !token) {
        navigate('/authorize');
    }
    else if (!isAuth && token) {
        getData(`${API_BASE}authorize/current`, token)
            .then((data) => {
                dispatch(setUser(data));
                dispatch(setAuth(true));
                navigate('/profile');
            })
            .catch(() => {
                navigate('/authorize')
            });
    }
}

export { checkAuth, authenticate, out, currentUserQuery }