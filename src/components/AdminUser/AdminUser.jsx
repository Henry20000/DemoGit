import React from "react";
import { PlusOutlined } from '@ant-design/icons'
import { WrapperHeader } from "./style";
import { Button } from "antd";
import TableComponent from "../TableComponent/TableComponent";

const AdminUser = () => {
    return (
        <div>
            <WrapperHeader>User management</WrapperHeader>
            <div style={{ marginTop: '10px'}}>
                <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}}><PlusOutlined style={{ fontSize: '50px'}} /></Button>
            </div>
            <div style={{ marginTop: '20px'}}>
                <TableComponent/>
            </div>
            
            
        </div>
    )
}

export default AdminUser