import React  from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import ROUTERS_LINK from './routers';
import SideBar from './components/SideBar'
import LogoutBtn from './components/LogoutBtn'
function App() {
  const currentURL = useSelector(state => state.url)
  return(
    <>
    <BrowserRouter>
      {currentURL !== '/login' && <SideBar/>}
      {currentURL !== '/login' && <LogoutBtn/>}
      <Switch>
          {
            ROUTERS_LINK.map(route => {
              return (
                <Route key={route.path} exact={route.exact} path={route.path}>
                    {route.render()}
                </Route>
              )
            })
          }
      </Switch>
    </BrowserRouter>
    </>
  )
}

export default App;
