import React, {useCallback, useState, useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";
import { actChangeUserData , actChangeCurrentUrl} from '../../store/action'
import { notification } from 'antd';
import { Form, Input, Button } from 'antd';
import calAPI from '../../axios'
import { waitFor, storage } from '../../helpers'
function App() {
  const location = useLocation()
  const [phone,setphone] = useState('')
  const [password, setpassword] = useState('')
  const [IsLoading, setIsLoading] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

  const userInfo = useSelector(state => {
    return {phone: state.phone, password: state.password}
  })
  useEffect(()=>{
    dispatch(actChangeCurrentUrl(location.pathname))
    var user = JSON.parse(storage.getToken())
    
    if(userInfo.phone && userInfo.password ){
      history.push('/');
    }else if(user){
      dispatch(actChangeUserData(user))
      async function login(){
        var isLogin = (await calAPI.post('/login',user)).data
        setIsLoading(true)
        await waitFor(500)
        setIsLoading(false)
        if(isLogin.ok){
          history.push('/');
        }else{
          notification.open({
            description:
            'Sai tên đăng nhặp hoặc mật khẩu',
          });
        }
      }login()
    }
  },[])


  

  const login = useCallback(async ()=>{
    try {
      var isLogin = (await calAPI.post('/login',{phone, password})).data
      setIsLoading(true)
      await waitFor(500)
      setIsLoading(false)
      if(isLogin.ok){
        dispatch(actChangeUserData({phone, password, isAdmin: isLogin.isAdmin}))
        history.push('/');
        storage.setToken(JSON.stringify({phone, password, isAdmin: isLogin.isAdmin}))
      }else{
        notification.open({
          description:
          'Sai tên đăng nhặp hoặc mật khẩu',
        });
      }

    } catch (error) {
      notification.open({
        description:
        'Có lỗi xảy ra, vui lòng báo với quản trị viên',
      });
    }
  },[phone, password])



  return (
    <div className="form">
     <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={login}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: 'Nhập số điện thoại' },
          { max: 11, message : 'Số điện thoại nhiều nhất là 11 số'},
          { min: 6, message : 'Số điện thoại ít nhất là 6 số'},
      ]}
      >
        <Input value={phone} onChange={e=>setphone(e.target.value)} type="tel" placeholder="Số điện thoại"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Nhập mật khẩu' },
          { min: 6, message : 'Mật khẩu ít nhất 6 ký tự'},
        ]}
      >
        <Input.Password value={password} onChange={e=>setpassword(e.target.value)} placeholder="Mật khẩu"/>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={IsLoading}>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>

    </div>
  );
}

export default App;
