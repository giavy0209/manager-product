import React , {useCallback,useState, useEffect} from 'react'
import calAPI from '../../axios'
import { actChangeListCategory,actChangeCurrentUrl } from '../../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation , useHistory} from 'react-router-dom'
import { Table, Button, Modal , Form, Input, Select, notification } from 'antd';
const { Option } = Select
export default function App() {
  const [Visible , setVisible] = useState(false)
  const [form] = Form.useForm();
  const [Selected , setSelected] = useState({})
  const user = useSelector(state =>{
    return {phone: state.phone, password: state.password}
  })
  const listCategory = useSelector(state=>state.listCategory)
  const location = useLocation()
  const history = useHistory()

  const isAdmin = useSelector(state=> state.isAdmin)
  const dispatch = useDispatch()

  const handdleUpdateOrder = useCallback((id)=>{
    
    var index = listCategory.findIndex(o => o._id === id)
    
    setSelected(listCategory[index])
    setVisible(true)
    
  },[listCategory])

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render : (type)=>{
        if(type === 0){
          return(
            <p>Hãng</p>
          )
        }else{
          return(
            <p>Loại sản phẩm</p>
          )
        }
        
      }
    },
    {
      title: 'Hành động',
      dataIndex: '_id',
      key: '_id',
      render : (id)=>(
        <>
        <Button onClick={()=>{handdleUpdateOrder(id)}}>Cập nhật</Button>
        </>
      )
    }
  ];


  const getCategories = useCallback(async ()=>{
    var categories = (await calAPI.post('/get-categories',user)).data
    var newcat = categories.map(category =>{
      return {
        ...category,
        id: category._id,
        pId: category.parent ? category.parent._id : category.parent,
        title: category.name,
        value: category._id,
        parent: category.parent ? category.parent._id : category.parent
      }
    })  
    dispatch(actChangeListCategory(newcat))
  },[])

  useEffect(()=>{
    dispatch(actChangeCurrentUrl(location.pathname))
    if(!user.phone || !user.password || !isAdmin){
      history.push('/login');
    }else{
      getCategories()
    }
  },[])

  useEffect(()=>{
    form.setFieldsValue(Selected);
  },[Selected])

  const handdleSubmitForm = useCallback(async(value)=>{
    
    var res = await calAPI.post('/edit-categories',{user,value, id: Selected._id})
    
    if(res.data){
      notification.open({
        description: 'Sửa danh mục thành công'
      })
      getCategories()
    }else{
      notification.open({
        description: 'Không được sửa danh mục như vậy'
      })
    }
    
  },[Selected])

  return (
    <>
      <div className="container">
      <p>Ở đây không có nút xóa đừng tìm, vì xóa sẽ xóa nát bấy mấy thằng danh mục và sản phẩm phụ thuộc nó, lỡ tạo dư cái nào liên hệ Vỹ để xóa</p>
      <Table
      className="components-table-demo-nested"
      columns={columns}
      dataSource={listCategory}
      pagination={false}
      />
      </div>
      <Modal
      visible={Visible}
      onCancel={()=>setVisible(false)}
      footer={false}
      forceRender
      >
        <Form
        wrapperCol={{ span: 24 }}
        layout="horizontal"
        initialValues={Selected}
        onFinish={handdleSubmitForm}
        size={'middle'}
        style={{textAlign:'left'}}
        form={form}
        >
          <Form.Item name="name">
            <Input placeholder="Tên"/>
          </Form.Item>
          <Form.Item label="Loại danh mục" name="type">
            <Select>
              <Option value={0}>Hãng</Option>
              <Option value={1}>Sản phẩm</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">Cập nhật</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}