import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { actChangeCurrentUrl,actChangeListUser } from '../../store/action'
import calAPI from '../../axios'

import {
  Form,
  Button,
  Input,
  Select,
  notification,
} from 'antd';
export default function App() {
  const isAdmin = useSelector(state => state.isAdmin)

  const user = useSelector(state => {
    return { phone: state.phone, password: state.password }
  })

  const listUser = useSelector(state => state.listUser)

  const location = useLocation()

  const history = useHistory()

  const dispatch = useDispatch()

  const getUser = useCallback(async ()=>{
    var listUser = (await calAPI.post('/get-user',user)).data
    dispatch(actChangeListUser(listUser))
  },[dispatch])

  useEffect(() => {
    dispatch(actChangeCurrentUrl(location.pathname))
    if (!user.phone || !user.password || !isAdmin) {
      history.push('/login');
    } else {
      getUser()
    }
  }, [])


  const handdleSubmitForm = useCallback(async (value) => {
    var refID = value.refFor
    var userData = {
      phone:value.phone,
      password:value.password,
      name: value.name,
      address: value.address,
      ID:value.ID,
    }
    var isCreated = await calAPI.post('/add-user',{user,userData,refID})
    if(!isCreated.data.haveAccount){
      notification.open({
        description:'Tạo tài khoản thành công'
      })
      getUser()
    }else{
      notification.open({
        description:'Số điện thoại đã tồn tại trong hệ thống'
      })
    }
  },[getUser,user])


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

          <Form.Item label="Nguời giới thiệu" name="refFor">
            <Select
              showSearch
              placeholder="Chọn người giới thiệu"
              optionFilterProp="children"
              filterOption={true}
            >
              {
                listUser && listUser.map(user=>
                  <Select.Option key={user._id} value={user._id}> {user.name} - {user.phone} - {user.ID} </Select.Option>
                )
              }
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Tạo tài khoản
          </Button>
        </Form>

      </div>
    </>
  )
}