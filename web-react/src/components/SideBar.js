import React , { useEffect, useState , useCallback} from 'react';
function App({IsShowSideBar}) {

  return (
    <>
        <div className={`sidebar ${IsShowSideBar && 'show'}`}>
            <aside>
                <ul>
                    <li><a href="#">Sản phẩm</a></li>
                    <li><a href="#">Nhập hàng</a></li>
                    <li><a href="#">Xuất hàng</a></li>
                </ul>
            </aside>
        </div>
    </>
  );
}

export default App;
