import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation , useHistory} from 'react-router-dom'
import { actChangeCurrentUrl } from '../../store/action'
import {actChangeListProduct} from '../../store/action'
import calAPI from '../../axios'
import ListProduct from './ListProduct'
import AddProduct from './AddProduct'
import ListImage from './ListImage'
export default function App(){
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()

    const isAdmin = useSelector(state=> state.isAdmin)
    
    const [TotalItem , setTotalItem] = useState(0)
    const [ItemPerPage , setItemPerPage] = useState(0)
    const [CurrentPage , setCurrentPage] = useState(1)

    const userInfo = useSelector(state => {
        return {phone: state.phone, password: state.password}
    })
    
    useEffect(()=>{
        dispatch(actChangeCurrentUrl(location.pathname))
        if(!userInfo.phone || !userInfo.password || !isAdmin){
          history.push('/login');
        }else{
          async function getImport(){
            var products = (await calAPI.post(`/product/${CurrentPage}`,userInfo)).data
            
            dispatch(actChangeListProduct(products.product))

            setItemPerPage(products.ITEM_PER_PAGE)
            setTotalItem(products.totalItem)
          }getImport()
        }
    },[])

    return(
      <>
        <AddProduct/>
        <ListImage/>
        <ListProduct/>
      </>
    )
}