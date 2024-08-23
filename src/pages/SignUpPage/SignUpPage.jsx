import React from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style"
import InputForm from "../../components/InputForm/InputForm"
import ButtonComponent from "../../components/ButtonCompnent/ButtonComponent"
import imageLogo from '../../assets/images/logo-login.png'
import { Image } from "antd"

const SignUpPage = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
                <WrapperContainerLeft>
                    <h1>Hello</h1>
                    <p style={{fontSize: '13px'}}>Log in or create an account</p>
                    <InputForm style={{ marginBottom: '10px'}} placeholder="abc@gmail.com" />
                    <InputForm placeholder="password" style={{ marginBottom: '10px'}}/>
                    <InputForm placeholder="comfirm password"/>
                        <ButtonComponent
                            bordered={false}
                            size={40}
                            styleButton={{ 
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px' 
                            }}  
                            textButton={'Log in'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                        <p style={{fontSize: '13px'}}>Do you already have an account? <WrapperTextLight> Register</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px"/>
                    <h4>Shop at GYMISEASY</h4>
                </WrapperContainerRight>
            </div>
        </div>
    )
}

export default SignUpPage