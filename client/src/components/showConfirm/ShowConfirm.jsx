import { useState } from 'react';
import { CommonButton } from '../CommonButton';
import styles from './showConfirm.module.scss'

export const ShowConfirm = ({ onConfirm, onCancel, message }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleConfirm = () => {
        setIsVisible(false);
        onConfirm();
    };

    const handleCancel = () => {
        setIsVisible(false);
        onCancel();
    };

    return (
        <>
            {isVisible && (
                <div className={styles.modal__overlay}>
                    <div className={styles.modal__content}>
                        <p>{message}</p>
                        <div className={styles.buttons__row}>
                            <CommonButton onClick={handleConfirm}>OK</CommonButton>
                            <CommonButton onClick={handleCancel}>Cancel</CommonButton>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
