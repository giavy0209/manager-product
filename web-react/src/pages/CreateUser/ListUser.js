import React, { useEffect, useCallback, useState } from 'react'
import calAPI from '../../axios'
import { useSelector, useDispatch } from 'react-redux'
import { actChangeListUser } from '../../store/action'
import { Button , Input, Form, notification ,Table,Modal} from 'antd'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ComSearch from '../../components/Search'
export default function App(){
    const [Search , setSearch] = useState('')
    const [EditUser , setEditUser] = useState({})
    const [Visible , setVisible] = useState(false)
    const [form] = Form.useForm();
    const user = useSelector(state => {
        return { phone: state.phone, password: state.password }
    })

    const listUser = useSelector(state => state.listUser)

    const dispatch = useDispatch()

    const getUser = useCallback(async()=>{
        var listUser = (await calAPI.post('/get-user',{user, Search})).data
        
        dispatch(actChangeListUser(listUser))
    },[dispatch,user,Search])

    useEffect(()=>{
        getUser()
    },[Search])

    useEffect(()=>{
        form.setFieldsValue(EditUser);
    },[EditUser])

    const handdleEditButton = useCallback(id=>{
        var index = listUser.findIndex(o => o._id === id)
        setEditUser(listUser[index])
        setVisible(true)
    },[listUser])

    const handdleSubmitForm = useCallback(async (value)=>{
        await calAPI.post('/edit-user', {user, value, id: EditUser._id})
        notification.open({
            description:"Sửa tài khoản thành công"
        })
        getUser()
    },[EditUser])

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },{
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: 'Số chứng minh',
            dataIndex: 'ID',
            key: 'ID',
        },{
            title: 'Tổng tiền lấy hàng',
            dataIndex: 'consum',
            key: 'consum',
        },{
            title: 'Hành động',
            dataIndex: '_id',
            key: '_id',
            render: id =>(
                <Button type="primary" onClick={()=>handdleEditButton(id)} shape="circle">
                  <FontAwesomeIcon icon={faPen} />
                </Button>
            )
        },
    ]

    return(
        <>
        <ComSearch
        Search={Search}
        setSearch={setSearch}
        placeholder={'Tìm tài khoản'}
        />
        <Table columns={columns} dataSource={listUser} pagination={false} scroll={{ x: 800}}/>
        <Modal
        title="Sửa tài khoản"
        visible={Visible}
        footer={false}
        onCancel={()=>{setVisible(false)}}
        forceRender
        >
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={EditUser}
        onFinish={handdleSubmitForm}
        size={'small'}
        form={form}
        >
          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="password">
            <Input />
          </Form.Item>

          <Form.Item label="Số chứng minh" name="ID">
            <Input />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Sửa tài khoản
          </Button>
        </Form>
        </Modal>
        </>
    )
}