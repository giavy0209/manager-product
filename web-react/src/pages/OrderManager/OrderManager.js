import React, { useEffect, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { actChangeCurrentUrl, actChangeListProduct, actChangeListCategory } from '../../store/action'
import API_DOMAIN from '../../constant'
import calAPI from '../../axios'
import { filterStatus } from '../../helpers'
import Pagination from '../../components/Pagination'
import { Table, Select , Button,Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Filter from './Filter'
const { confirm } = Modal;
const { Option } = Select;
export default function App() {
  const [dataSource, setdataSource] = useState([])
  const [CurrentPage, setCurrentPage] = useState(1)
  const [StatusFilter, setStatusFilter] = useState('')
  const [TotalItem , setTotalItem] = useState(0)
  const [ItemPerPage , setItemPerPage] = useState(0)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const user = useSelector(state => {
    return { phone: state.phone, password: state.password }
  })

  const isAdmin = useSelector(state => state.isAdmin)


  const getListOrder = useCallback(async () => {
    setdataSource([...[]])
    var res = (await calAPI.post(`/get-order/${CurrentPage}`, {user, StatusFilter})).data
    var listOrder = res.order
    setTotalItem(res.totalItem)
    setItemPerPage(res.ITEM_PER_PAGE)
    
    listOrder = listOrder.map(order => {
      return {
        address: order.owner.address,
        owner: `${order.owner.name} ${order.owner.phone} ${order.owner.ID} `,
        status: {status: order.status, id: order._id},
        product: order.product ? order.product.name : 'sản phẩm đã bị xóa',
        thumb: order.product ? order.product.thumb : 'sản phẩm đã bị xóa',
        price : order.product ? order.product.exPrice : 'sản phẩm đã bị xóa',
        quantity : order.quantity,
        sum: order.product ? order.quantity * order.product.exPrice : '0',
        _id : order._id
      }
    })

    setdataSource([...listOrder])
  }, [CurrentPage,StatusFilter])

  useEffect(()=>{
    getListOrder()
  },[CurrentPage,StatusFilter])


  useEffect(() => {
    dispatch(actChangeCurrentUrl(location.pathname))
    if (!user.phone || !user.password) {
      history.push('/login');
    } else {
      getListOrder()
    }
  }, [])

  const handdleChangeSelect = useCallback((value, id)=>{
    var index = dataSource.findIndex(el=> el._id === id)
    dataSource[index].status.status = value
    setdataSource([...dataSource])
  },[dataSource])

  const handdleUpdateOrder = useCallback(async id=>{
    var index = dataSource.findIndex(el=> el._id === id)
    
    var status = dataSource[index].status.status

    await calAPI.post('/update-order', {user , status, id})

    notification.open({
      description: "Cập nhật thành công"
    })
    
  },[dataSource])

  const handdleDeleteOrder = useCallback(async id=>{

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
    
    
  },[dataSource])

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

  !isAdmin && columns.splice(columns.length - 1, 1)

  return (
    <>
    <Filter
    setStatusFilter={setStatusFilter}
    />
    <Table
      className="components-table-demo-nested"
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 1920 , y: 600}}
      pagination={false}
    />
    <Pagination
    ItemPerPage={ItemPerPage}
    TotalItem={TotalItem}
    setCurrentPage={setCurrentPage}
    />
    </>
  )
}