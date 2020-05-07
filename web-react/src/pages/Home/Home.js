import React , { useEffect, useState , useCallback} from 'react';
import { useHistory, useLocation} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { actChangeCurrentUrl } from '../../store/action'
import { storage } from '../../helpers'
import calAPI from '../../axios'
function App() {
  const history = useHistory();
  const location = useLocation()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => {
    return {phone: state.phone, password: state.password}
  })

  const [UserData, setUserData] = useState(false)

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

  return (
    <>
    <p>Xin chào : {UserData && UserData.name} </p>
    <p>Số mặt hàng đã lấy : {UserData && UserData.import.length} </p>
    <p></p>
    <p></p>
    <p></p>
    </>
  );
}

export default App;
