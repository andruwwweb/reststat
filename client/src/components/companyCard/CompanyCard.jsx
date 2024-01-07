import { Preloader } from '../preloader/Preloader';
import { Error } from '../error/Error';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompany, getCompany } from "../../reducers/companyReducer"
import { ShowConfirm } from "../showConfirm/ShowConfirm"
import styles from "./companyCard.module.scss"
import { switchError } from '../../reducers/errorReducer';

export const CompanyCard = () => {

    const dispatch = useDispatch()
    const companyData = useSelector(state => state.reducer.company.data)

    const [ isDeleteModalVisible, setDeleteModalVisible ] = useState(false)
    const [ currentCompanyId, setCurrentCompanyId ] = useState(null)

    const deleteCompanyStatus = useSelector(state => state.reducer.company.deleteCompanyStatus)
    const createCompanyStatus = useSelector(state => state.reducer.company.createCompanyStatus)
    const deleteCompanyError = useSelector(state => state.reducer.company.deleteCompanyError)
    const createCompanyError = useSelector(state => state.reducer.company.createCompanyError)
    const companyStatus = useSelector(state => state.reducer.company.status)

    useEffect(() => {
        dispatch(getCompany('company/get'));
    }, [dispatch])

    useEffect(() => {
        dispatch(getCompany('company/get'));
        if (deleteCompanyStatus === 'failed') {
            dispatch(switchError());
            setTimeout(() => {
                dispatch(switchError());
            }, 3000);
        } else if (deleteCompanyStatus === 'success') {
            dispatch(getCompany('company/get'));
        }
    }, [deleteCompanyError, deleteCompanyStatus]);

    const confirmDeleting = (companyId) => {
        setCurrentCompanyId(companyId)
        setDeleteModalVisible(true);
    }

    const submitDeletingCompany = () => {
        if (currentCompanyId) {
            dispatch(deleteCompany(currentCompanyId))
            setCurrentCompanyId(null)
            setDeleteModalVisible(false);
        }
    }
    return (
        <div className={styles.company__list}>

            {createCompanyStatus === "loading" && <Preloader />}
            {deleteCompanyStatus === "loading" && <Preloader />}
            {companyStatus === "loading" && <Preloader />}

            {deleteCompanyStatus === 'failed' &&
                <div className={styles.error__message}>Ошибка: {deleteCompanyError}</div>}
            {createCompanyStatus === 'failed' &&
                <div className={styles.error__message}>Ошибка: {createCompanyError}</div>}

            {companyData && companyData.length > 0
            ?
            (companyData.map(cmp => (
                    <div key={cmp.id} className={styles.company__card}>
                        <h4>{cmp.caption}</h4>
                        <div className={styles.actions__list}>
                            <button
                                className={styles.edit}
                            >
                            </button>
                            <button 
                                className={styles.delete}
                                onClick={() => confirmDeleting(cmp.id)}
                            >
                            </button>
                        </div>
                    </div>
                )))
            :
            <div className={styles.warning}>You have no registered companies.</div>
            }

            {isDeleteModalVisible && 
                <ShowConfirm
                    message="Вы уверены, что хотите удалить компанию?"
                    onCancel={() => setDeleteModalVisible(false)}
                    onConfirm={submitDeletingCompany} 
                />}

            {companyStatus === 'failed' && <Error/>}
        </div>
    );
}
