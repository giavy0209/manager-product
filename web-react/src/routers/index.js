import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'

const ROUTERS = [
    {
        path : '/',
        exact : true,
        render : ()=> <Home/>
    },
    {
        path : '/login',
        exact : false,
        render : ()=> <Login/>
    },
]

export default ROUTERS