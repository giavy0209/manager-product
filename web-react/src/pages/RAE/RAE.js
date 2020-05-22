import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { actChangeCurrentUrl } from '../../store/action'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import calAPI from '../../axios'

import { Form, Select, InputNumber, Modal, Input, Button, notification, Table } from 'antd'

const { Item , useForm} = Form;
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;
export default function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const [Visible, setVisible] = useState(false)
  const [RAE, setRAE] = useState([])
  const [Sum, setSum] = useState(0)
  const [Edit, setEdit] = useState({})

  const [form] = useForm()

  const user = useSelector(state => {
    return { phone: state.phone, password: state.password }
  })

  const getRAE = useCallback(async () => {
    var res = (await calAPI.post('/get-rae', user)).data
    setRAE([...res.rae])
    setSum(res.sum)
  },[])

  useEffect(() => {
    dispatch(actChangeCurrentUrl(location.pathname))
    if (!user.phone || !user.password) {
      history.push('/login');
    } else {
      getRAE()
    }
  }, [])


  const handleSubmitForm = useCallback(async value => {
    await calAPI.post('/add-rae', { user , value })
    notification.open({
      description: 'Thêm thu chi thành công'
    })
    getRAE()
  }, [])

  const handleSubmitFormEdit = useCallback(async value=>{
    await calAPI.post('/edit-rae', { user , value , id: Edit._id})
    notification.open({
      description: 'Sửa thu chi thành công'
    })
    getRAE()
  },[Edit])

  const handleEdit = useCallback((id)=>{
    var index = RAE.findIndex(o => o._id == id)
    setEdit(RAE[index])
    setVisible(true)
  },[RAE])

  const handleDelete = useCallback(async (id)=>{
    await confirm({
      title: 'Xác nhận xóa?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise(async resolve =>{
          await calAPI.post('/delete-rae', { user, id})
          await getRAE()
          resolve()
        })
      },
      onCancel() {},
    })
    getRAE()
  },[])

  var columns = [
    { 
      title: 'Loại', 
      dataIndex: 'type', 
      key: 'type',
      render: type =>{
        if(type === 0){
          return <span style={{backgroundColor : 'green', padding: 10, color: '#fff'}}>Thu</span>
        }else{
          return <span style={{backgroundColor : 'red',padding: 10, color: '#fff'}}>Chi</span>
        }
      }
    },
    { 
      title: 'số tiền', 
      dataIndex: 'value', 
      key: 'value' 
    },
    { 
      title: 'Ghi chú', 
      dataIndex: 'note', 
      key: 'note' 
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
      render: id => (
        <>
        <Button onClick={()=>{handleEdit(id)}}>Sửa</Button>
        <Button onClick={()=>{handleDelete(id)}}>Xóa</Button>
        </>
      )
    },
  ]

  useEffect(()=>{
    form.setFieldsValue(Edit);
  },[Edit])

  return (
    <div className="container">
      <Form
        onFinish={handleSubmitForm}
      >
        <Item required={true} label="Số tiền" name="value">
          <InputNumber />
        </Item>
        <Item required={true} label="Thu chi?" name="type">
          <Select>
            <Option value={0}>Thu</Option>
            <Option value={1}>Chi</Option>
          </Select>
        </Item>
        <Item label="Ghi chú" name="note">
          <TextArea rows={4} />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">Tạo</Button>
        </Item>
      </Form>

      <span>Tổng thu/lỗ : {Sum}</span>
      <Table columns={columns} dataSource={RAE} />

      <Modal
      forceRender
      footer={false}
      title="Sửa thu chi"
      onCancel={()=>{setVisible(false)}}
      visible={Visible}
      >
      <Form
      onFinish={handleSubmitFormEdit}
      form={form}
      >
        <Item label="Số tiền" name="value">
          <InputNumber />
        </Item>
        <Item label="Thu chi?" name="type">
          <Select>
            <Option value={0}>Thu</Option>
            <Option value={1}>Chi</Option>
          </Select>
        </Item>
        <Item label="Ghi chú" name="note">
          <TextArea rows={4} />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">Sửa</Button>
        </Item>
      </Form>
      </Modal>
    </div>
  )
}