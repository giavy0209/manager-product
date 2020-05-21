import React, {useCallback, useState, useEffect} from 'react'
import {Input} from 'antd'

export default function App({Search,setSearch}){

    const handleSearch = useCallback((e)=>{
        setSearch(e.target.value)
    },[])

    return (
        <Input value={Search} placeholder="Tìm sản phẩm" onChange={handleSearch}/>
    )
}