import styled from "styled-components";
import { Input } from "antd";

interface StyledInputSearchProps {
    col: string | undefined;
    nohover: boolean | undefined;
}

export const StyledInputSearch = styled(Input)<
    Partial<StyledInputSearchProps>
>`
    && {
        ${({ col }) =>
            col === "white" &&
            `
        color: #fff;
        border: 1.2px solid #fff;
        .ant-input {
            background: none;
            color: #fff;
            margin-left: 0.5rem;
        }
        .anticon {
            color: #fff;
            margin-right: 0.5rem;
        }
        `}
        ${({ col }) =>
            col === "black" &&
            `
        color: #bfbfbf;
        border: 1.5px solid #bfbfbf;
        .ant-input {
            background: none;
            color: #000;
            margin-left: 0.5rem;
        }
        .anticon {
            color: #000;
            margin-right: 0.5rem;
        }
        `}

        ${({ nohover }) =>
            !nohover &&
            `
            img {
            -webkit-filter: opacity(60%);
        }

          img:hover {
            transform: scale(1.01);
            -webkit-filter: opacity(100%);
          }
        
        `}
        background: none;
        border-radius: 60px;
        height: 36px;
        display: flex;
        flex-direction: row;
        padding: 0.9vw;
        margin: 0 0,5rem;
        font-family: Poppins-Medium, sans-serif;
        font-size: calc(10px + 0.4vw);
        width: 90%;

        &:hover {
            border: 2px solid #46c7c7;
        }
    }
`;