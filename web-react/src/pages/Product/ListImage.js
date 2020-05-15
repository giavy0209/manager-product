import React, {useCallback, useState} from 'react'
import API_DOMAIN from '../../constant'
import calAPI from '../../axios'
import { 
    Modal,
    Button,
    
} from 'antd';
import { useSelector } from 'react-redux'
export default function App({Thumb,setThumb}){
    const [Visible, setVisible] = useState(false)
    const [ListImages, setListImages] = useState([])
    const user = useSelector(state=>{
        return {phone: state.phone , password: state.password}
    })
    const showModal = useCallback(()=>{
        setVisible(true)
        async function getImage(){
            var listImage = (await calAPI.post('/list-image',user)).data
            
            setListImages([...listImage.listImage])
            
        }getImage()
    },[user])

    const handleDeleteImg = useCallback(async img=>{
        var res = (await calAPI.post('/delete-img', {user, img})).data
        console.log(res.listImg);
        
        setListImages([...res.listImg])
    },[])

    return (
        <>
        <Button type="primary" onClick={showModal}>
        Chọn hình ảnh
        </Button>
        <Modal
          title="Chọn hình ảnh"
          visible={Visible}
          onCancel={()=>{setVisible(false)}}
          footer={null}
        >
        <div className="row column-4">
          {
            ListImages.map(image=>{
                return (
                <div className="item" key={image.path}>
                    <div className="list-img img img-1-1">
                        <img 
                        onClick={()=>{setThumb(image.path)}}
                        className={`cur-p ${Thumb === image.path && 'selected-img'}`} 
                        alt="" 
                        src={`${API_DOMAIN}/${image.path}`} />
                        <Button onClick={()=>{handleDeleteImg(image.path)}} style={{position:'absolute', top: 0 , left:0, transform: 'translate(-50% , -50%'}} type="primary" shape="circle">x</Button>
                    </div>
                </div>
                )
            })
          }
        </div>
        </Modal>
        </>
    )
}