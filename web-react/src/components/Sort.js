import React from 'react'


import { Select } from 'antd';
const { Option } = Select;

export default function App({setSortType}){
    return(
        <Select
            showSearch
            style={{ width: '49%' }}
            placeholder="Sắp xếp"
            optionFilterProp="children"
            onChange={value=>{setSortType(value)}}
            filterOption={true}
        >
            <Option value={0}> Mặc định(mới nhất trước)</Option>
            <Option value={1}> Gía tăng dần</Option>
            <Option value={2}> Gía giảm dần</Option>
        </Select>
    )
}