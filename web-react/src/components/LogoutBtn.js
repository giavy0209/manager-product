import React, { useCallback } from 'react';

import {Button} from 'antd'

import { storage } from '../helpers'

import { useHistory } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { actChangeUserData } from '../store/action'

export default function App(){
    const history = useHistory();
    const dispatch = useDispatch()
    const logout = useCallback(()=>{
        storage.clearToken()
        dispatch(actChangeUserData({phone: false, password: false}))
        history.push('/login')
    },[history, dispatch])
    return(
        <div style={{textAlign:'right'}}>
            <Button onClick={logout} type="primary">Đăng xuất</Button>
        </div>
    )
}