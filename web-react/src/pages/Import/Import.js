import React, {useEffect, useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation , useHistory} from 'react-router-dom'
import { actChangeCurrentUrl } from '../../store/action'
import {Form, Select, Button, Input, InputNumber } from 'antd'
import calAPI from '../../axios'

const {Item} = Form
const {Option} = Select
export default function App(){
    const [options, setoptions] = useState([])
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => {
      return {phone: state.phone, password: state.password}
    })
    useEffect(()=>{
        dispatch(actChangeCurrentUrl(location.pathname))
        if(!user.phone || !user.password){
          history.push('/login');
        }else{
          
        }
    },[])

    const handleSearch = useCallback(async(value)=>{
      var res = await calAPI.post('/search-product', {user, search:value})
      var data = res.data.map(product =>{
        return (<Option key={product._id} value={  product._id}><img style={{width: '10%'}} alt ="" src={'https://apiquanlyhang.kechuyengame.com' +product.thumb}/> {product.name}</Option>)
      })
      setoptions([...data])
    },[])

    const handleSubmitForm = useCallback(async (value)=>{
      await calAPI.post('/add-import', {user, value})
      
    })

    return(
      <>
        <div className="container">
          <Form
          onFinish={handleSubmitForm}
          >
            <Item label="Số lượng" name="quantity">
              <InputNumber />
            </Item>
            <Item label="giá nhập" name="price">
              <InputNumber />
            </Item>
            <Item label="sản phẩm" name="product">
              <Select
              showSearch
              placeholder="Tìm sản phẩm"
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearch}
              notFoundContent={null}
              style={{width: 400}}
              >
                {options}
              </Select>
            </Item>
            <Item>
              <Button type="primary" htmlType="submit">Tạo nhập hàng</Button>
            </Item>
          </Form>
        </div>
      </>
    )
}