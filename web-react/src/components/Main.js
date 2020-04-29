import React, { useEffect, useState, useCallback } from 'react';
import SideBar from './SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import ROUTERS from '../routers'
function App() {

  const [IsShowSideBar, setIsShowSideBar] = useState(false)

  const showSideBar = useCallback(()=>{
    setIsShowSideBar(!IsShowSideBar)
  },[IsShowSideBar])

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <main>
            <SideBar IsShowSideBar={IsShowSideBar}/>
            <div onClick={showSideBar} className={`mask ${IsShowSideBar && 'show'}`}></div>
            <i onClick={showSideBar}><FontAwesomeIcon icon={faBars} /></i>
            <Switch>
              {
                ROUTERS.map(route =>{
                  return(
                    <Route key={route.path} exact={route.exact} path={route.path}>
                      {route.render()}
                    </Route>
                  )
                })
              }
            </Switch>
          </main>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
