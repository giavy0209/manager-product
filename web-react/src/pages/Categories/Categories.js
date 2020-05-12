import React , {useCallback,useState, useEffect} from 'react'
import calAPI from '../../axios'
import { actChangeListCategory,actChangeCurrentUrl } from '../../store/action'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation , useHistory} from 'react-router-dom'
import { Table, Button, Modal , Form, Input,TreeSelect, Select } from 'antd';
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

  const handdleDeleteOrder = useCallback((id)=>{
    
  },[])

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
      title: 'Hành động',
      dataIndex: '_id',
      key: '_id',
      render : (id)=>(
        <>
        <Button onClick={()=>{handdleDeleteOrder(id)}}>Xóa</Button>
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
    console.log(res.data);
    
  },[Selected])

  return (
    <>
      <div className="container">
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
          <Form.Item label="danh mục cha" name="parent">
            <TreeSelect
            treeDataSimpleMode
            treeData={listCategory}
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            >
            </TreeSelect>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">Cập nhật</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}