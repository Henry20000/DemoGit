import { Badge, Col } from 'antd'
import Search from 'antd/lib/transfer/search'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const HeaderComponent = () => {
  return (
    <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center', padding: '10px'}}>
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>GYMISEASY</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <ButtonInputSearch
            size="large"
            bordered={false}
            textButton="Search"
            placeholder="input search text" 
            //onSearch={onSearch}
            />
        </Col>
        <Col span={6} style = {{ display: 'flex', gap: '54px', alignItems: 'center'}}>
          <WrapperHeaderAccout>
            <UserOutlined style={{ fontSize: '30px' }} />
            <div>
              <WrapperTextHeaderSmall>Log in / Register</WrapperTextHeaderSmall>
              <div>
              <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall> <CaretDownOutlined/>
              </div>
            </div>
          </WrapperHeaderAccout>
          <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
            <Badge count={4} size="small">
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
            </Badge> 
              <WrapperTextHeaderSmall>Shopping cart</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent