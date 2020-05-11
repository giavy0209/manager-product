import { Select , Button,Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import React from 'react'
import calAPI from '../../axios'
const { confirm } = Modal;
const { Option } = Select;

  const handdleChangeSelect = (value, id)=>{
    var index = dataSource.findIndex(el=> el._id === id)
    dataSource[index].status.status = value
    setdataSource([...dataSource])
  }

  const handdleUpdateOrder = async id=>{
    var index = dataSource.findIndex(el=> el._id === id)
    
    var status = dataSource[index].status.status

    await calAPI.post('/update-order', {user , status, id})

    notification.open({
      description: "Cập nhật thành công"
    })
    
  }

  const handdleDeleteOrder = async id=>{

    console.log(dataSource);
    

    async function calAPIDelete(){
      var index = dataSource.findIndex(el=> el._id === id)
      
      await calAPI.post('/delete-order', {user , id})

      dataSource.splice(index, 1)

      setdataSource([...dataSource])

      notification.open({
        description: "Xoá thành công"
      })
    }

    confirm({
      title: 'Xác nhận xóa?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        calAPIDelete()
      },
      onCancel() {},
    });
    
    
  }

var columns = [
    { 
      title: 'Người đặt hàng', 
      dataIndex: 'owner', 
      key: 'owner' 
    },{ 
      title: 'Địa chỉ', 
      dataIndex: 'address', 
      key: 'address' 
    },{ 
      title: 'Tên hàng', 
      dataIndex: 'product', 
      key: 'product' 
    },{ 
      title: 'Hình ảnh', 
      dataIndex: 'thumb', 
      key: 'thumb',
      render : thumb =>(<div className="img img-1-1"><img alt="" src={`${API_DOMAIN}/${thumb}`} /></div>)
    },{ 
      title: 'Giá', 
      dataIndex: 'price', 
      key: 'price' 
    },{ 
      title: 'Số lượng', 
      dataIndex: 'quantity', 
      key: 'quantity' 
    },{ 
      title: 'Tổng tiền', 
      dataIndex: 'sum', 
      key: 'sum' 
    },{ 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status',
      width: 300,
      render : (status)=>{
        console.log(status);
        
        return(
          isAdmin ? (<Select defaultValue={status.status} style={{ width: 280 }} onChange={(value)=>{handdleChangeSelect(value, status.id)}}>
            <Option value={0}> {filterStatus(0)} </Option>
            <Option value={1}> {filterStatus(1)} </Option>
            <Option value={2}> {filterStatus(2)} </Option>
            <Option value={3}> {filterStatus(3)} </Option>
            <Option value={4}> {filterStatus(4)} </Option>
          </Select>) : (
            filterStatus(status.status)
          )
        )
      }
    },{ 
      title: 'Hành động', 
      dataIndex: '_id', 
      key: '_id',
      fixed: 'right',
      render: (id)=>(
        <>
        <Button onClick={()=>{handdleDeleteOrder(id)}}>Xóa</Button>
        {isAdmin && <Button onClick={()=>{handdleUpdateOrder(id)}}>Cập nhật</Button>}
        </>
      )
    },
];

export default columns