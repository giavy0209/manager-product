import React , { useEffect, useState , useCallback} from 'react';
import { Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import ROUTERS_LINK from '../routers'
function App() {
  const [currentUrl, setCurrentUrl] = useState('/');
  const location = useLocation();
  const history = useHistory();
  const isAdmin = useSelector(state => state.isAdmin)
  
  useEffect(() => {
    setCurrentUrl(location.pathname);
  }, [location])

  const handleClick = useCallback(selectedItem => {
    setCurrentUrl(selectedItem.key);
    history.push(selectedItem.key);
  },[history]);
  return (
    <>
       <Menu
        onClick={handleClick}
        mode="horizontal"
        selectedKeys={[currentUrl]}
      >
        {
          ROUTERS_LINK.map(router=>{
            if(router.name){
              if(isAdmin){
                return ( 
                  <Menu.Item key={router.path}>{router.name}</Menu.Item>
                )
              }else if(!router.needAdmin){
                return ( 
                  <Menu.Item key={router.path}>{router.name}</Menu.Item>
                )
              }
            }
          })
        }
      </Menu>
    </>
  );
}

export default App;
