import React, { useCallback , useState, useEffect} from 'react'
import {
  Upload, 
  message, 
  Button,
  Form,
  Input, 
  TreeSelect,
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
export default function App({getProduct}) {
  const user = useSelector(state =>{
    return {phone: state.phone, password: state.password}
  })

  const dispatch = useDispatch()

  const listCategory = useSelector(state=>state.listCategory)

  const [Thumb, setThumb] = useState('')

  const getCategories = useCallback(async ()=>{
    var categories = (await calAPI.post('/get-categories',user)).data
    categories.unshift({
      _id:0,
      parent: null,
      name: 'Không có',
    })
    
    var newcat = categories.map(category =>{
      return {
        ...category,
        id: category._id,
        pId: category.parent,
        title: category.name,
        value: category._id
      }
    })

    console.log(newcat);
    
    
    dispatch(actChangeListCategory(newcat))
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
      ...value,
      thumb: Thumb,
      createDate: new Date()
    }
    await calAPI.post('/add-product', {user, submitData})
    notification.open({
      description:'Đăng sản phẩm thành công'
    })
    getProduct()
  },[Thumb])

  // const haddleDeleteCategory = useCallback((e,id,idx)=>{
  //   e.preventDefault()
  //   e.stopPropagation();

//     await calAPI.post('/delete-categories', {user, id})
//     notification.open({
//       description:'Xóa danh mục thành công'
//     })
//     listCategory.splice(idx, 1)
//     dispatch(actChangeListCategory(listCategory))
  // },[])

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

          <Form.Item label="Danh mục" name="category">
            <TreeSelect
            treeDataSimpleMode
            treeData={listCategory}
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            treeDefaultExpandAll
            allowClear
            multiple
            >
            </TreeSelect>
          </Form.Item>

            <Form.Item label="Giá bán" name="exPrice">
              <Input />
            </Form.Item>

            <Form.Item label="% cho cộng tác viên" name="percentToCoop">
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