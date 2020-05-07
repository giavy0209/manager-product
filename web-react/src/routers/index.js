import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Product from '../pages/Product'
import Import from '../pages/Import'

const ROUTERS = [
    {
        path : '/',
        exact : true,
        name:'Tổng quang',
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
        path : '/product',
        exact : false,
        name: 'Sản phẩm',
        needAdmin: true,
        render : ()=> <Product/>
    },{
        path : '/import',
        exact : false,
        name: 'Đã nhập',
        needAdmin: false,
        render : ()=> <Import/>
    },
]

export default ROUTERS