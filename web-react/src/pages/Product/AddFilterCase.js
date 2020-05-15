import React, { useCallback} from 'react'

import { useSelector } from 'react-redux'
import calAPI from '../../axios'

import { Input , Button ,TreeSelect , Form , notification } from 'antd';

const { Item } = Form;
export default function App({getCategories}){
    const user = useSelector(state =>{
        return {phone: state.phone, password: state.password}
    })

    const handdleAddFilterCase = useCallback(async value=>{
        await calAPI.post('/add-filtercase', {user, })
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
        onFinish={handdleAddFilterCase}
        size={'middle'}
        style={{textAlign:'left'}}>

            <Item label="Tên danh mục" name="addCategory">
                <Input style={{width: '75%'}} placeholder="Tên danh mục" />
            </Item>

            <Button style={{width: '25%'}} htmlType="submit" type="primary">Tạo danh mục tổng mới</Button>
        </Form>
        </>
    )
}