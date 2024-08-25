import React from "react";
import { StyleNameProduct, WrapperDiscountText, WrapperPriceText, WrapperReporText, CardHead, WrapperCardStyle, WrapperStyleTextSell } from "./style";
import { StarFilled } from '@ant-design/icons'
import logo from '../../assets/images/logo.png'



const CardComponent = () => {
    return (
    <WrapperCardStyle
      hoverable
      styles={{ body: { padding: '10px' } }}
      style={{ width: 200 }}
      cover={
      <CardHead>
         <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
      </CardHead>
      }
    >
        <img 
           src={logo} 
           style={{ 
              width: '68px', height: '14px', position: 'absolute', top: -1, left: -1,
              borderTopLeftRadius: '3px'
           }}
        />
        <StyleNameProduct>Nutrabolics</StyleNameProduct>
        <WrapperReporText>
        <span style={{marginRight: '4px'}}>
            <span> Nutrabolics </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)'}} />
        </span>
        <WrapperStyleTextSell>| Sold 1000+ </WrapperStyleTextSell>
        </WrapperReporText>
        <WrapperPriceText>
           <span style={{ marginRight: '8px'}}>1.750.000đ</span>
           <WrapperDiscountText>
              -15%
           </WrapperDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
    )
}

export default CardComponent