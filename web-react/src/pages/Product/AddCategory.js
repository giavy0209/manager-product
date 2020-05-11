import React, { useCallback} from 'react'

import { useSelector } from 'react-redux'
import calAPI from '../../axios'

import { Input , Button ,TreeSelect , Form , notification } from 'antd';

const { Item } = Form;
export default function App({getCategories}){
    const user = useSelector(state =>{
        return {phone: state.phone, password: state.password}
    })
    const listCategory = useSelector(state=>state.listCategory)
    

    const handdleAddCategory = useCallback(async value=>{
        await calAPI.post('/add-category', {...user, value, })
        notification.open({
            description:
            'Thêm danh mục thành công',
        });
        getCategories()
        
    },[getCategories, user])

    return(
        <>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: 'middle' }}
        onFinish={handdleAddCategory}
        size={'middle'}
        style={{textAlign:'left'}}>

            <Item label="Tên danh mục" name="addCategory">
                <Input style={{width: '75%'}} placeholder="Tên danh mục" />
            </Item>

            <Item label="danh mục cha" name="parent">
                <TreeSelect
                treeDataSimpleMode
                treeData={listCategory}
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                >
                </TreeSelect>
            </Item>

            <Button style={{width: '25%'}} htmlType="submit" type="primary">Tạo danh mục mới</Button>
        </Form>
        </>
    )
}