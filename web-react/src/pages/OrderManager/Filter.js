import React from 'react'
import { useSelector } from 'react-redux'
import { Select } from 'antd';
import { filterStatus } from '../../helpers'
const { Option } = Select
export default function App({setStatusFilter}){
    return(
        <Select
        onChange={(value)=>[setStatusFilter(value)]}
        style={{width: 500}}
        defaultValue={0}
        >
            <Option value={''}> Mặc định </Option>
            <Option value={0}> {filterStatus(0)} </Option>
            <Option value={1}> {filterStatus(1)} </Option>
            <Option value={2}> {filterStatus(2)} </Option>
            <Option value={3}> {filterStatus(3)} </Option>
            <Option value={4}> {filterStatus(4)} </Option>
        </Select>
    )
}