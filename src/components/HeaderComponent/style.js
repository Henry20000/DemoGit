import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  background-color: #cc66ff;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`;

export const WrapperTextHeader = styled(Link)`
    font-size: 18px;
    color: #fff;
    padding: 0 300px;
    padding-left: inherit;
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
    
`

export const WrapperContentPopup = styled.p`
     cursor: pointer;
     &:hover {
        color: rgb(26, 148, 255);
     }


`
