import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation , useHistory} from 'react-router-dom'
import { actChangeCurrentUrl } from '../../store/action'
import calAPI from '../../axios'
export default function App(){
    const location = useLocation()
    const dispatch = useDispatch()
    const history = useHistory()
    const [ListImport , setListImport] = useState([])
    const userInfo = useSelector(state => {
        return {phone: state.phone, password: state.password}
    })
    useEffect(()=>{
        dispatch(actChangeCurrentUrl(location.pathname))
        if(!userInfo.phone || !userInfo.password){
          history.push('/login');
        }else{
          async function getImport(){
            var imports = (await calAPI.post('/import',userInfo)).data
            setListImport([...imports.import])
          }getImport()
        }
    },[])

    return(
      <>
        
      </>
    )
}