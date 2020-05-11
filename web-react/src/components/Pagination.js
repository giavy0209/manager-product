import React, { useCallback} from 'react'
import { Pagination } from 'antd';

export default function App({ItemPerPage,TotalItem, setCurrentPage}){
    const changePage = useCallback((page)=>{
        setCurrentPage(page)
    },[setCurrentPage])


    return(
        <div className="container">
            <Pagination onChange={changePage} pageSize={ItemPerPage} total={TotalItem} defaultCurrent={1} />
        </div>
    )
}