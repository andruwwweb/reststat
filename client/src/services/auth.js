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
const getAuthorizedData = async (url, token) => {
    const res = await fetch(url, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error(res.message);
    }
    else {
        return res.json();
    }
};
const currentUserQuery = async (navigate, dispatch, isAuth) => {
    const token = checkAuth();

    if (!isAuth && !token) {
        navigate('/authorize');
    }
    else if (!isAuth && token) {
        getAuthorizedData(`${API_BASE}authorize/current`, token)
            .then((data) => {
                dispatch(setUser(data));
                dispatch(setAuth(true));
            })
            .catch(() => {
                navigate('/authorize')
            });
    }
}

export { checkAuth, authenticate, out, currentUserQuery }