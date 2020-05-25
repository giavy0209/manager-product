import React, {useCallback} from 'react'
import {Input} from 'antd'

export default function App({Search,setSearch, placeholder }){

    const handleSearch = useCallback((e)=>{
        setSearch(e.target.value)
    },[setSearch])

    return (
        <Input value={Search} placeholder={placeholder} onChange={handleSearch}/>
    )
}