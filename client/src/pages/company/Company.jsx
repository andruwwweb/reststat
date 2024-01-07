import { CompanyCard } from "../../components/companyCard/CompanyCard"
import { CommonButton } from "../../components/CommonButton"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react"
import { CommonInput } from "../../components/CommonInput"
import styles from "./company.module.scss"
import { createCompany, getCompany } from "../../reducers/companyReducer";
import { switchError } from "../../reducers/errorReducer";

export const Company = () => {

    const [ modal, setModal ] = useState(false)
    const [ caption, setCaption ] = useState('')
    const dispatch = useDispatch()

    const companyData = useSelector((state) => state.reducer.company.data)
    const createCompanyError = useSelector((state) => state.reducer.company.createCompanyError)
    const createCompanyStatus = useSelector((state) => state.reducer.company.createCompanyStatus)
    const isError = useSelector((state) => state.reducer.error.isError)

    useEffect(() => {
        if (createCompanyStatus === 'failed') {
            dispatch(switchError());
            setTimeout(() => {
                dispatch(switchError());
            }, 3000);
        } else if (createCompanyStatus === 'success') {
            dispatch(getCompany('company/get'));
        }
    }, [createCompanyStatus]);
    
    useEffect(() => {
        if (companyData?.length === 3) {
            setModal(false);
            setCaption('');
        }
    }, [companyData]);

    const addCompany = async () => {
        dispatch(createCompany({ caption }));
        setModal(false)
        setCaption('')
    }
    const disableButton = () => {
        return caption.length < 1 ? true : false
    }
    const hiddenButton = () => {
        if (companyData?.length === 3) {
            return true
        }
    }
    return (
        <div className={styles.company__container}>
            <CompanyCard/>
            <CommonButton onClick={() => setModal(true)} hidden={hiddenButton()}>
                Add company
            </CommonButton>
            {modal && 
                <div className={styles.modal__layout}>
                    <div className={styles.modal__body}>
                        <p>Fill the company caption</p>
                        <CommonInput
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <div className={styles.modal__actions}>
                            <CommonButton onClick={addCompany} disabled={disableButton()}>
                                Add 
                            </CommonButton>
                            <CommonButton onClick={() => setModal(false)}>
                                Cancel
                            </CommonButton>
                        </div>
                    </div>
                </div>
            }
            {isError && <h4 className={styles.error__message}>Ошибка: {createCompanyError}</h4>}
        </div>
    )
}
