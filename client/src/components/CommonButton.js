import styled from 'styled-components';

export const CommonButton = styled.button`
    background-color: #F4F4F4;
    display: block;
    padding: 8px;
    border: none;
    border-radius: 8px;
    border: 2px solid #438470;
    font-size: 18px;
    font-weight: 400;
    color: #438470;
    min-width: 120px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    width: ${(props) => props.width || 'fit-content'};
    &:hover {
        background-color: #438470;
        color: #fff;
        transition: all 0.3s ease-in-out;
    }
    &:disabled {
        opacity: 0.5;
    }
    &[hidden] {
        display: none !important;
    }
`;

