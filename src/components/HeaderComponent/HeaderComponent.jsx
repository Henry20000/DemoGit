import { Badge, Col, Popover } from 'antd'
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
import { searchProduct } from '../../redux/slides/productSlide';
import { initialOrder } from '../../redux/slides/orderSlide';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [search, setSearch] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')  
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    dispatch(initialOrder());
    setLoading(false)
    localStorage.clear();
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])


  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        User information
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          System management
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate("my-order")}>
        My order
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Log out</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type => {
    if(type === 'profile') {
      navigate('/profile-user')
    }else if(type === 'admin') {
      navigate('/system/admin')
    }else if(type === 'my-order') {
      navigate('/my-order', { state: {
        id: user?.id,
        token: user?.access_token
      }})
    }else {
      handleLogout()
    }
    setIsOpenPopup(false)
  })

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value));
  }


  return (
    <div style={{ width: '100%', background: '#CC66FF', display: 'flex', justifyContent: 'center', padding: '10px', boxSizing: 'border-box'}}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset', margin: 'auto', width: '70%'}}>
        <Col span={5}>
          <WrapperTextHeader to='/'>GYMISEASY</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              variant={false}
              textbutton="Search"
              placeholder="input search text" 
              onChange={onSearch}
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
                    <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ cursor: 'pointer'}} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
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
            <div onClick={() => navigate('/order')} style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                <Badge count={order?.orderItems?.length} size="small">
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