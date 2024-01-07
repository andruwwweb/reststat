import styled from 'styled-components';

export const CommonInput = styled.input`
    width: 100%;
    display: block;
    border: 2px solid #7065ba;
    background: transparent;
    outline: none;
    height: 40px;
    color: #101010;
    border-radius: 8px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    -ms-border-radius: 8px;
    -o-border-radius: 8px;
    font-size: 18px;
    padding: 8px;

    &:focus {
        border: 2px solid #438470;
    }

    &::placeholder {
        color: #7065ba;
    }
`;
