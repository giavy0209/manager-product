import React , { useEffect, useState, useCallback} from 'react';
import { useHistory, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { actChangeCurrentUrl } from '../../store/action'
import { Button,Modal , Form , Input, notification} from 'antd'
import calAPI from '../../axios'
function App() {
  const history = useHistory();
  const location = useLocation()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => {
    return {phone: state.phone, password: state.password}
  })

  const [UserData, setUserData] = useState(false)
  const [Visible, setVisible] = useState(false)

  useEffect(()=>{
    dispatch(actChangeCurrentUrl(location.pathname))
    
    if(!userInfo.phone || !userInfo.password){
      history.push('/login');
    }else{
      async function getUser(){
        var user = (await calAPI.post('/user-info',userInfo)).data
        setUserData(user)
      }getUser()
    }
  },[])

  const handdleChangePass = useCallback(async (value)=>{
    console.log(value);
    if(value.newpass === value.renewpass && userInfo.password === value.oldpass){
      
      await calAPI.post('/change-pass', {userInfo , value})
      notification.open({
        description : "Đổi mật khẩu thành công"
      })
    }else if(value.newpass !== value.renewpass){
      notification.open({
        description : "Nhập lại mật khẩu không khớp"
      })
    }else{
      notification.open({
        description : "Mật khẩu hiện tại không chính xác"
      })
    }
    
  },[])

  return (
    <div className="container">
    <p>Xin chào : {UserData && UserData.name} </p>
    <p>Số điện thoại của bạn : {UserData && UserData.phone} </p>
    <p>Địa chỉ của bạn : {UserData && UserData.address} </p>
    <p>Tổng số tiền hàng đã lấy: {UserData && UserData.consum} </p>
    <p>Tổng số người được bạn giới thiệu: {UserData && UserData.refFor.length} </p>
    <Button onClick={()=>setVisible(true)}>Đổi mật khẩu</Button>
    <Modal
      title="Đổi mật khẩu"
      visible={Visible}
      onCancel={()=>{setVisible(false)}}
      footer={null}
    >
      <Form
      onFinish={handdleChangePass}
      >
        <Form.Item name="oldpass">
          <Input type="password" placeholder="Mật khẩu hiện tại"/>
        </Form.Item>
        <Form.Item name="newpass">
          <Input type="password" placeholder="Mật khẩu mới"/>
        </Form.Item>
        <Form.Item name="renewpass">
          <Input type="password" placeholder="Nhập lại mật khẩu mới"/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Đổi mật khẩu</Button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  );
}

export default App;
