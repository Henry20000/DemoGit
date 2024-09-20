import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { WrapperHeader } from "./style";
import { Button, Form, Modal } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import { WrapperUploadFile } from "./style";
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from "../../hooks/useMutationHook"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/Message'

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: ''
    })
    const [form] = Form.useForm();

    const mutation = useMutation({
        mutationFn: (data) => {
          const { name, price, description, rating, image, type, countInStock } = data;
        const res = ProductService.createProduct({
            name, price, description, rating, image, type, countInStock,
          })
          return res
        }
})
    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res;
    }
    

    const { data, isPending, isSuccess, isError } = mutation;

    const { isLoading : isLoadingProducts, data : products} = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        retry: 3, retryDelay: 1000
    })
    const renderAction = () => {
        return (
           <div>
              <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
              <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} />
           </div> 
        )
    }
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
        },
        {
          title: 'Type',
          dataIndex: 'type',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction,
        },
      ];
       const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {...product, key: product._id}
       })

    useEffect(() => {
        if(isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({   
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: ''
        })
        form.resetFields()
    };

    const onFinish = () => {
        mutation.mutate(stateProduct)
        console.log('finish', stateProduct);
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })   
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview 
        })
      };
    return (
        <div>
            <WrapperHeader>Product management</WrapperHeader>
            <div style={{ marginTop: '10px'}}>
                <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '50px'}} /></Button>
            </div>
            <div style={{ marginTop: '20px'}}>
                <TableComponent columns={columns} isLoading={isLoadingProducts} data={dataTable} />
            </div>
            <Modal title="Create products" 
                open={isModalOpen} 
                onCancel={handleCancel}  
                footer={null} >
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                        form={form}
                    >
                    <Form.Item
                        label="Name"
                        name="Name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                    <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="Type"
                        rules={[{ required: true, message: 'Please input your type!' }]}
                        >
                    <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type"/>
                    </Form.Item>

                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input your count inStock!' }]}
                        >
                    <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="countInStock" />
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                    <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price"/>
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                    <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
                    </Form.Item>

                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input your rating!' }]}
                        >
                    <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating"/>
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input your image!' }]}
                        >
                        <WrapperUploadFile
                                onChange={handleOnchangeAvatar}
                                maxCount={1}
                                beforeUpload={() => false}
                                showUploadList={false}
                        >
                            <Button style={{ display: 'flex',alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>Select File</Button>
                            {stateProduct?.image && (
                                <img
                                    src={stateProduct?.image}
                                    style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "50%",
                                    marginLeft: "10px",
                                    objectFit: "cover",
                                    }}
                                    alt="avatar"
                                />
                                )}
                        </WrapperUploadFile>
                    </Form.Item>

                    <Form.Item 
                        wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                    </Form.Item>
                    </Form>
                </Loading>
            </Modal>        
        </div>
    )
}

export default AdminProduct