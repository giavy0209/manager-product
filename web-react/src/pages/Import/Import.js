import React, {useEffect, useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation , useHistory} from 'react-router-dom'
import { actChangeCurrentUrl } from '../../store/action'
import {Form, Select, Button, notification, InputNumber,Table , Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import calAPI from '../../axios'
import API_DOMAIN from '../../constant'
const {Item} = Form
const {Option} = Select
const { confirm } = Modal;
export default function App(){
    const [form] = Form.useForm();
    const [VisibleEdit, setVisibleEdit] = useState(false)
    const [Edit, setEdit] = useState({})
    const [options, setoptions] = useState([])
    const [AImport, setAImport] = useState([])
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    const getImport = useCallback(async ()=>{
      var res = (await calAPI.post('/get-import',user)).data
      setAImport([...res])
    },[])

    useEffect(()=>{
      form.setFieldsValue(Edit);
    },[Edit])

    const handleEdit = useCallback(id=>{
      var index = AImport.findIndex(o => o._id === id)
      setEdit(AImport[index])
      setVisibleEdit(true)
    },[AImport])

    const handleDelete = useCallback(async id=>{
      confirm({
        title: 'Xác nhận xóa?',
        icon: <ExclamationCircleOutlined />,
        onOk() {
          return new Promise(async resolve =>{
            await calAPI.post('/delete-import', {user, id})
            await getImport()
            resolve()
          })
          
        },
        onCancel() {},
      });
    },[])

    var columns = [
      { 
        title: 'Sản phẩm', 
        dataIndex: 'product', 
        key: 'product',
        render: product => (
          <>
            <div>
              <span style={{width: 100}} className="img img-1-1"><img alt="" src={API_DOMAIN + product.thumb}/></span>
              <span>{product.name}</span>
            </div>
          </>
        )
      },
      { 
        title: 'Số lượng', 
        dataIndex: 'quantity', 
        key: 'quantity' 
      },
      { 
        title: 'Giá', 
        dataIndex: 'price', 
        key: 'price'
      },
      { 
        title: 'Ngày tạo', 
        dataIndex: 'createDate', 
        key: 'createDate',
        render: date => {
          var d = new Date(date)
          return (
            <p> {d.getDate()} / {d.getMonth() + 1} / {d.getFullYear()} | {d.getHours()} : {d.getMinutes()} : {d.getSeconds()} </p>
          )
        }
      },
      { 
        title: 'Hành động', 
        dataIndex: '_id', 
        key: '_id',
        render: id =>(
          <>
          <Button onClick={()=>{handleEdit(id)}}>Sửa</Button>
          <Button onClick={()=>{handleDelete(id)}}>Xóa</Button>
          </>
        )
      },
    ]

    const user = useSelector(state => {
      return {phone: state.phone, password: state.password}
    })

    useEffect(()=>{
        dispatch(actChangeCurrentUrl(location.pathname))
        if(!user.phone || !user.password){
          history.push('/login');
        }else{
          getImport()
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

      notification.open({
        description: "Tạo nhập hàng thành công"
      })

      getImport()
    },[Edit])

    const handleSubmitFormEdit = useCallback(async (value)=>{
      var submitValue = {
        price: value.price,
        quantity: value.quantity
      }
      if(value.newproduct){
        submitValue.product = value.newproduct
      }

      await calAPI.post('/edit-import', { user, submitValue, id: Edit._id})

      notification.open({
        description: "Sửa nhập hàng thành công"
      })

      setVisibleEdit(false)

      getImport()
      
    },[Edit])

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
          <div>
          <Table columns={columns} dataSource={AImport} pagination={false} scroll={{ x: 800}}/>
          </div>
            <Modal 
            title="Sửa sản phẩm"
            visible={VisibleEdit}
            footer={false}
            onCancel={()=>{setVisibleEdit(false)}}
            forceRender
            >
            <Form
            onFinish={handleSubmitFormEdit}
            initialValues={Edit}
            form={form}
            >
              <Item label="Số lượng" name="quantity">
                <InputNumber />
              </Item>
              <Item label="giá nhập" name="price">
                <InputNumber />
              </Item>
              <Item label="sản phẩm" name="newproduct">
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
                <Button type="primary" htmlType="submit">Sửa nhập hàng</Button>
              </Item>
            </Form>
          </Modal>
        </div>
      </>
    )
}