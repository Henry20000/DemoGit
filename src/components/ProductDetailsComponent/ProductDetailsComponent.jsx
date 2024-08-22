import { Col, Image, InputNumber, Row } from "antd"
import React from "react"
import imageProduct from '../../assets/images/test.webp'
import imageProductSmall from '../../assets/images/imagesmall.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style"
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from "../ButtonCompnent/ButtonComponent"


const ProductDetailsComponent = () => {
    const onChange = () => { }
    return (
        <Row style={{padding: '16px', backgroundColor: '#fff', borderRadius: '4px' }}>
          <Col span={10} style={{ borderRight: '1px soild #e5e5e5', paddingRight: '8px' }}>
              <Image src={imageProduct} alt="image product" preview={false} />
              <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>  
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>  
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>  
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>  
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>  
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false}/>  
                    </WrapperStyleColImage>
              </Row>
          </Col>
          <Col span={14} style={{ paddingLeft: '10px'}}>
              <WrapperStyleNameProduct>Nutrabolics Hydropure 100% Hydrolyzed Whey Protein 4.5lbs</WrapperStyleNameProduct>
              <div>
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)'}} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)'}} />
                    <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)'}} />
                    <WrapperStyleTextSell>| Sold 1000+ </WrapperStyleTextSell>
              </div>
              <WrapperPriceProduct>
                 <WrapperPriceTextProduct>
                      200.000
                 </WrapperPriceTextProduct>
              </WrapperPriceProduct>
              <WrapperAddressProduct>
                  <span>Delivere </span>
                  <span className="address"> 51 Tran Quoc Hoan, Tan Binh, HCM</span> - 
                  <span className="change-address"> Change address</span>
              </WrapperAddressProduct>
              <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px soild #e5e5e5', borderBottom: '1px soild #e5e5e5'}}>
                <div style={{ marginBottom: '10px' }}>Amount</div>
                <WrapperQualityProduct>
                   <button style={{ border: 'none', background:'transparent' }}>
                      <PlusOutlined style={{color: '#000', fontSize: '15px'}} />
                   </button>
                   <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" />
                   <button style={{ border: 'none', background:'transparent' }}>
                      <MinusOutlined style={{color: '#000', fontSize: '15px'}}/>
                   </button>
                </WrapperQualityProduct>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap:'12px' }}>
                <ButtonComponent
                   bordered={false}
                   size={40}
                   styleButton={{ 
                       background: 'rgb(255, 57, 69)',
                       height: '48px',
                       width: '220px',
                       border: 'none',
                       borderRadius: '4px' 
                   }}  
                   textButton={'Choose buy'}
                   styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                ></ButtonComponent>
                <ButtonComponent
                   size={40}
                   styleButton={{ 
                       background: '#fff',
                       height: '48px',
                       width: '220px',
                       border: '1px solid rgb(13, 92, 182)',
                       borderRadius: '4px' 
                   }}  
                   textButton={'Buy and pay later'}
                   styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px'}}
                ></ButtonComponent>
              </div>
          </Col>
        </Row>
    )
}

export default ProductDetailsComponent