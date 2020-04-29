import React , { useEffect, useState , useCallback} from 'react';
import useEventListener from '../../customhook/useEventListener'
function App() {

  const [PhoneNumber , setPhoneNumber] = useState('')
  const [Password , setPassword] = useState('')
  
  const handdleLogin = useCallback(e=>{
    e.preventDefault()
    
    if(PhoneNumber.length < 10 || Password.length < 6 ){
      
    }

    
  },[PhoneNumber,Password])

  const handdlePhoneNumber = useCallback(e=>{
    setPhoneNumber(e.target.value)
  },[PhoneNumber])

  const handdlePassword = useCallback(e=>{
    setPassword(e.target.value)
  },[Password])

  return (
    <>
    <div className="top">
      <h3>Login</h3>
    </div>
    <form onSubmit={handdleLogin} className="login-form">
      <input name="username" type="number" placeholder="Số điện thoại" value={PhoneNumber} onChange={handdlePhoneNumber}/>
      <input name="password" placeholder="Mật khẩu" value={Password} onChange={handdlePassword}/>
      <button type="submit">Đăng nhập</button>
    </form>
    </>
  );
}

export default App;
