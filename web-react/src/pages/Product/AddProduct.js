import React, { useCallback , useState, useEffect} from 'react'
import {
  Upload, 
  message, 
  Button,
  Form,
  Input, 
  Select,
  Switch,
  notification,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { actChangeListCategory } from '../../store/action'
import ListImage from './ListImage'
import AddCategory from './AddCategory'
import calAPI from '../../axios'
import API_DOMAIN from '../../constant'
const {Option} = Select
export default function App({getProduct}) {
  const user = useSelector(state =>{
    return {phone: state.phone, password: state.password}
  })

  const dispatch = useDispatch()

  const listCategory = useSelector(state=>state.listCategory)

  const [Thumb, setThumb] = useState('')

  const getCategories = useCallback(async ()=>{
    var categories = (await calAPI.post('/get-categories',user)).data
    console.log(categories)
    dispatch(actChangeListCategory(categories))
  },[])

  useEffect(()=>{
    getCategories()
  },[])


  const props = {
    name: 'file',
    action: `${API_DOMAIN}/upload`,
    multiple: true,
    headers: {
      authorization: 'authorization-text',
      phone: user.phone,
      password: user.password
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handdleSubmitForm = useCallback(async (value)=>{
    var submitData ={
      name:value.name,
      category: [value.category0, value.category1],
      exPrice: value.exPrice,
      display: value.display,
      thumb: Thumb,
      createDate: new Date()
    }
    await calAPI.post('/add-product', {user, submitData})
    notification.open({
      description:'Đăng sản phẩm thành công'
    })
    getProduct()
  },[Thumb])

  return (
    <>
      <div className="row">
        <div className="col-6">
          <AddCategory getCategories={getCategories}/>
        </div>
        <div className="col-6">
          <Upload {...props}>
            <Button>
              <UploadOutlined /> Tải ảnh mới
            </Button>
          </Upload>
          <ListImage
          Thumb={Thumb} 
          setThumb={setThumb}
          />
        </div>
        <div className="col-12" style={{marginTop: 20}}>
          <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: 'middle' }}
          onFinish={handdleSubmitForm}
          size={'middle'}
          style={{textAlign:'left'}}
          >
            <Form.Item label="Tên" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Hãng" name="category0">
              <Select
              showSearch={true}
              filterOption={true}
              optionFilterProp="children"
              >
              {
                listCategory && listCategory.map(el=>{
                  if(el.type === 0){
                    return (
                      <Option key={el._id} value={el._id}> {el.name} </Option>
                    )
                  }
                })
              }
              </Select>
            </Form.Item>

            <Form.Item label="Sản phẩm" name="category1">
              <Select
              showSearch={true}
              filterOption={true}
              optionFilterProp="children"
              >
              {
                listCategory && listCategory.map(el=>{
                  if(el.type === 1){
                    return (
                      <Option key={el._id} value={el._id}> {el.name} </Option>
                    )
                  }
                })
              }
              </Select>
            </Form.Item>

            <Form.Item label="Giá bán" name="exPrice">
              <Input />
            </Form.Item>

            <Form.Item label="Hiển thị?" name="display">
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng sản phẩm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}