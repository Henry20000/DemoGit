import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import { UserOutlined , AppstoreOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import OrderAdmin from "../../components/OrderAdmin/OrderAdmin";

const AdminPage = () => {
    const items = [
      getItem("User", "user", <UserOutlined />),
      getItem("Product", "product", <AppstoreOutlined />),
      getItem("Order", "order", <ShoppingCartOutlined />),
    ];

    const [keySelected, setKeySelected] = useState('')

    const renderPage = (key) => {
      console.log('key :>> ', key);
        switch (key) {
          case "user":
            return <AdminUser />;
          case "product":
            return <AdminProduct />;
          case "order":
            return <OrderAdmin />;
          default:
            return <></>;
        }
    }


    const onOpenChange = (keys) => {
      const latesOpenKey = keys.find((key) => OpenKeys.indexOf(key) === -1);
      if (rootSubmenuKeys.indexOf(latesOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latesOpenKey ? [latesOpenKey] : []);
      }
    };

    const handleOnclick = ({ key }) => {
        setKeySelected(key)
    }

    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart/>
            <div style={{ display: 'flex'}}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnclick}
                />
                <div style={{ flex: 1, padding: '15px'}}>
                     {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage