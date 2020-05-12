import React, { useEffect , useCallback} from 'react'
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { actChangeListUser } from '../../store/action'
import calAPI from '../../axios'
export default function App({setUserFilter}){
    const dispatch = useDispatch()

    const user = useSelector(state => {
        return { phone: state.phone, password: state.password }
    })

    const getUser = useCallback(async ()=>{
        var listUser = (await calAPI.post('/get-user',user)).data
        dispatch(actChangeListUser(listUser))
    },[dispatch])

    useEffect(()=>{
        getUser()
    },[])

    const listUser = useSelector(state => state.listUser)

    return(
        <Select
            style={{width: 500}}
            showSearch
            placeholder="Lọc đơn hàng theo tài khoản"
            optionFilterProp="children"
            filterOption={true}
            onChange={setUserFilter}
        >
            <Select.Option value=''>Không lọc</Select.Option>
            {
            listUser && listUser.map(user=>
                <Select.Option key={user._id} value={user._id}> {user.name} - {user.phone} - {user.ID} </Select.Option>
            )
            }
        </Select>
    )
}