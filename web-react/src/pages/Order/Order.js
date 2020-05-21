import React, { useEffect, useCallback,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import { actChangeCurrentUrl,actChangeListProduct, actChangeListCategory} from '../../store/action'
import Pagination from '../../components/Pagination'
import Filter from '../../components/Filter'
import Sort from '../../components/Sort'
import SearchProduct from '../../components/SearchProduct'
import API_DOMAIN from '../../constant'
import { Button , InputNumber, Form, notification ,Table} from 'antd'
import calAPI from '../../axios'
const {Item} = Form
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
});
export default function App(){
    const [TotalItem , setTotalItem] = useState(0)
    const [ItemPerPage , setItemPerPage] = useState(0)
    const [CurrentPage , setCurrentPage] = useState(1)
    const [CategoryForFilter , setCategoryForFilter] = useState([])
    const [SortType , setSortType] = useState(0)
    const [Search , setSearch] = useState('')
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
            pId: category.parent ? category.parent._id : category.parent,
            title: category.name,
            value: category._id
          }
        })  
        dispatch(actChangeListCategory(newcat))
    },[])

    const user = useSelector(state => {
        return { phone: state.phone, password: state.password }
    })

    const listProduct = useSelector(state => state.listProduct)

    const location = useLocation()

    const history = useHistory()

    const dispatch = useDispatch()

    const getProduct = useCallback(async ()=>{
        var products = (await calAPI.post(`/product/${CurrentPage}/${SortType}`,{user,CategoryForFilter,Search})).data
        
        dispatch(actChangeListProduct(products.product))
        
        setItemPerPage(products.ITEM_PER_PAGE)
        setTotalItem(products.totalItem)
    },[CurrentPage,CategoryForFilter,SortType,Search])

    useEffect(()=>{
        dispatch(actChangeCurrentUrl(location.pathname))
        if (!user.phone || !user.password) {
            history.push('/login');
        }else{
            getProduct()
            getCategories()
        }
    },[])

    useEffect(()=>{
        getProduct()
    },[CurrentPage,CategoryForFilter,SortType,Search])

    const handdleSubmitForm = useCallback(async (value, id)=>{
        try {
            var createDate = new Date()
            var addOrder = (await calAPI.post('add-order',{user, quantity: value.quantity, product: id, createDate})).data
            
            if(addOrder.status === 1){
                notification.open({
                    description: 'Đặt hàng thành công'
                })
            }else{
                notification.open({
                    description: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'
                })
                history.push('/login');
            }
        } catch (error) {
            notification.open({
                description: 'Có lỗi xảy ra, vui lòng báo với quản trị viên'
            })
        }
    },[])

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (name) => <p> {name} </p>,
        },{
            title: 'Thông tin',
            dataIndex: 'category',
            key: 'category',
            render: (category) => {
                return(
                    category && category.map(el=>{
                        if(el.type  === 0){
                            return (<p>Hãng : {el.name}</p>)
                        }else{
                            return (<p>Loại sản phẩm : {el.name}</p>)
                        }
                    })
                )
            },
        },
        {
          title: 'Hình ảnh',
          dataIndex: 'thumb',
          key: 'thumb',
          width: '20%',
          render: (thumb) => <img alt="" src={`${API_DOMAIN}/${thumb}`} />,
        },
        {
          title: 'Giá',
          dataIndex: 'exPrice',
          width: 100,
          key: 'exPrice',
          render: (price)=>formatter.format(price)
        },
        {
          title: 'Đặt hàng',
          dataIndex: '_id',
          key: '_id',
          fixed: 'right',
          width: 150,
          render : (_id)=> (
            <Form
            layout="inline"
            onFinish={(value)=>{handdleSubmitForm(value, _id)}}
            >
                <Item name="quantity">
                    <InputNumber required={true} min={1} max={1000} placeholder="Số lượng" defaultValue={1}  />
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit">Đặt hàng</Button>
                </Item>
            </Form>
          )
        },
    ]

    return(
        <div className="container">
        <SearchProduct
        Search={Search}
        setSearch={setSearch}
        />
        <Filter
        setCategoryForFilter={setCategoryForFilter}
        />
        <Sort
        setSortType={setSortType}
        />
        <Pagination
        ItemPerPage={ItemPerPage}
        TotalItem={TotalItem}
        setCurrentPage={setCurrentPage}
        />
        <Table columns={columns} dataSource={listProduct} pagination={false} scroll={{ x: 800}}/>
        </div>
    )
}