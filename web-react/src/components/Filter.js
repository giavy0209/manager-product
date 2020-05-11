import React from 'react'
import { useSelector } from 'react-redux'
import { TreeSelect } from 'antd';

export default function App({setCategoryForFilter}){
    const listCategory = useSelector(state=>state.listCategory)
    return(
        
        <TreeSelect
        treeDataSimpleMode
        treeData={listCategory}
        showSearch
        style={{ width: '50%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeDefaultExpandAll
        allowClear
        multiple
        onChange={value=>{setCategoryForFilter(value)}}
        filterOption={true}
        placeholder="Lọc theo danh mục"
        optionFilterProp="children"
        >
        </TreeSelect>
    )
}