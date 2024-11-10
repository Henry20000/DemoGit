import { Button } from "antd";
import React from "react";
import {SearchOutlined} from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonCompnent/ButtonComponent";

const ButtonInputSearch = (props) => {
    const { 
        size, placeholder, textbutton, 
        variant = 'default', backgroundColorInput = '#fff',
        backgroundColorButton= '#8E44AD', 
        colorButton = '#fff'
    } = props;

    
    return (
        <div style={{display: 'flex',}}>
            <InputComponent 
              size={size}
              placeholder={placeholder}
              variant={variant} 
              style={{backgroundColor: backgroundColorInput}}
              {...props}
            />
            <ButtonComponent
              size={size}
              styleButton={{ background: backgroundColorButton, border: variant === 'default' ? 'none' : undefined }} 
              icon={<SearchOutlined color={colorButton} style={{color: '#fff'}} />}
              textbutton={textbutton}
              styleTextButton={{ color: colorButton}}
            />
        </div>
    )
}

export default ButtonInputSearch


