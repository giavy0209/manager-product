import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Product from '../pages/Product'
import Categories from '../pages/Categories'
import Import from '../pages/Import'
import Export from '../pages/Export'
import CreateUser from '../pages/CreateUser'
import Order from '../pages/Order'
import OrderManager from '../pages/OrderManager'

const ROUTERS = [
    {
        path : '/',
        exact : true,
        name:'Tổng quan',
        needAdmin: false,
        render : ()=> <Home/>
    },
    {
        path : '/login',
        exact : false,
        needAdmin: false,
        render : ()=> <Login/>
    },
    {
        path : '/categories',
        exact : false,
        name: 'Danh mục',
        needAdmin: true,
        render : ()=> <Categories/>
    },
    {
        path : '/product',
        exact : false,
        name: 'Sản phẩm',
        needAdmin: true,
        render : ()=> <Product/>
    },
    {
        path : '/import',
        exact : false,
        name: 'Quản lý nhập hàng',
        needAdmin: true,
        render : ()=> <Import/>
    },
    {
        path : '/export',
        exact : false,
        name: 'Quản lý xuất hàng',
        needAdmin: true,
        render : ()=> <Export/>
    },
    {
        path : '/create-user',
        exact : false,
        name: 'Tạo tài khoản',
        needAdmin: true,
        render : ()=> <CreateUser/>
    },{
        path : '/order',
        exact : false,
        name: 'Đặt hàng',
        needAdmin: false,
        render : ()=> <Order/>
    },{
        path : '/order-manager',
        exact : false,
        name: 'Quản lý đơn hàng',
        needAdmin: false,
        render : ()=> <OrderManager/>
    },
]

export default ROUTERS