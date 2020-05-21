import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { actChangeCurrentUrl } from '../../store/action'
import calAPI from '../../axios'
import ListUser from './ListUser'
import {
  Form,
  Button,
  Input,
  notification,
} from 'antd';
export default function App() {
  const isAdmin = useSelector(state => state.isAdmin)

  const user = useSelector(state => {
    return { phone: state.phone, password: state.password }
  })

  const location = useLocation()

  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actChangeCurrentUrl(location.pathname))
    if (!user.phone || !user.password || !isAdmin) {
      history.push('/login');
    } 
  }, [])


  const handdleSubmitForm = useCallback(async (value) => {
    var userData = {
      phone:value.phone,
      password:value.password,
      name: value.name,
      address: value.address,
      ID:value.ID,
    }
    var isCreated = await calAPI.post('/add-user',{user,userData})
    if(!isCreated.data.haveAccount){
      notification.open({
        description:'Tạo tài khoản thành công'
      })
    }else{
      notification.open({
        description:'Số điện thoại đã tồn tại trong hệ thống'
      })
    }
  },[user])


  return (
    <>
      <div className="container">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: 'small' }}
          onFinish={handdleSubmitForm}
          size={'small'}
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
            Tạo tài khoản
          </Button>
        </Form>

        <ListUser/>
      </div>
    </>
  )
}