import { Badge, Button, Col, Popover } from 'antd'
import Search from 'antd/lib/transfer/search'
import React, { useEffect, useState } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from "../../redux/slides/userSlide"
import Loading from '../LoadingComponent/Loading';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')  
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])


  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>User information</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>System management</WrapperContentPopup>
      )} 
      <WrapperContentPopup onClick={handleLogout}>Log out</WrapperContentPopup> 
    </div>
  );


  return (
    <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center', padding: '10px', boxSizing: 'border-box'}}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset'}}>
        <Col span={5}>
          <WrapperTextHeader>GYMISEASY</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              variant={false}
              textButton="Search"
              placeholder="input search text" 
              //onSearch={onSearch}
              />
          </Col>
        )}
        <Col span={6} style = {{ display: 'flex', gap: '54px', alignItems: 'center'}}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover'
              }}/>
              ) : (
                <UserOutlined style={{ fontSize: '30px' }} />
              )}
              {user?.access_token ? (
                <>
                    <Popover content={content} trigger="click">
                    <div style={{ cursor: 'pointer'}}>{userName?.length ? userName : user?.email}</div>
                    </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer'}}>
                <WrapperTextHeaderSmall>Log in / Register</WrapperTextHeaderSmall>
                <div>
                <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall> <CaretDownOutlined/>
                </div>
              </div>
              )}
            </WrapperHeaderAccout>
          </Loading>
          {!isHiddenCart && (
            <div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                <Badge count={4} size="small">
                    <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                </Badge> 
                <WrapperTextHeaderSmall>Shopping cart</WrapperTextHeaderSmall>
            </div>
          )} 
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent