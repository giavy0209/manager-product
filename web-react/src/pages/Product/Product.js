import React, {useEffect, useState, useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation , useHistory} from 'react-router-dom'
import { actChangeCurrentUrl } from '../../store/action'
import {actChangeListProduct} from '../../store/action'
import calAPI from '../../axios'
import ListProduct from './ListProduct'
import AddProduct from './AddProduct'
import Filter from '../../components/Filter'
import Sort from '../../components/Sort'
import Pagination from '../../components/Pagination'
export default function App(){
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    const isAdmin = useSelector(state=> state.isAdmin)
    
    const [TotalItem , setTotalItem] = useState(0)
    const [ItemPerPage , setItemPerPage] = useState(0)
    const [CurrentPage , setCurrentPage] = useState(1)
    const [CategoryForFilter , setCategoryForFilter] = useState([])
    const [SortType , setSortType] = useState(0)

    const user = useSelector(state => {
      return {phone: state.phone, password: state.password}
    })

    const getProduct = useCallback(async ()=>{
      var res = (await calAPI.post(`/product/${CurrentPage}/${SortType}`,{user,CategoryForFilter})).data

      var products = res.product

      dispatch(actChangeListProduct(products))
      
      setItemPerPage(res.ITEM_PER_PAGE)
      setTotalItem(res.totalItem)
    },[CurrentPage,CategoryForFilter,SortType, dispatch, user])
    
    useEffect(()=>{
      dispatch(actChangeCurrentUrl(location.pathname))
      if(!user.phone || !user.password || !isAdmin){
        history.push('/login');
      }else{
        getProduct()
      }
    },[])

    useEffect(()=>{
      console.log(CategoryForFilter);
      
      getProduct()
    },[CurrentPage,CategoryForFilter,SortType])

    

    return(
      <>
        <div className="container">
        <p>Đã bỏ nút xóa, chỉ cho sửa, thay vì xóa hãy sửa nó không hiển thị vì xóa sẽ ảnh hưởng mất dữ liệu đặt hàng. Cần xóa gì liên hệ Vỹ</p>
        <AddProduct getProduct={getProduct}/>
        <Filter
        setCategoryForFilter={setCategoryForFilter}
        />
        <Sort
        setSortType={setSortType}
        />
        <ListProduct
        getProduct={getProduct}/>
        <Pagination
        ItemPerPage={ItemPerPage}
        TotalItem={TotalItem}
        setCurrentPage={setCurrentPage}
        />
        </div>
      </>
    )
}