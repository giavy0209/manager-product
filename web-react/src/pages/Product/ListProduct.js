import React, {useCallback, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button ,Modal, notification} from 'antd';
import { waitFor } from '../../helpers'
import calAPI from '../../axios'
import { actChangeListProduct } from '../../store/action'
export default function App() {
  const dispatch = useDispatch()
  const [Visible, setVisible] = useState(false)
  const [SelectedProduct, setSelectedProduct] = useState('')

  const listProduct = useSelector(state => state.listProduct)
  const user = useSelector(state =>{
    return {phone: state.phone , password: state.password}
  })
  const handleDeleteButton = useCallback(id=>{
    setSelectedProduct(id)
    setVisible(true)
  })

  const handdleOK = useCallback(()=>{
    async function deleteProduct(){
      var isDeleted = (await calAPI.post(`/product-delete/${SelectedProduct}`,user)).data
      await waitFor(500)
      if(isDeleted.deleteSuccess){
        notification.open({
          description:
          'Xóa sản phẩm thành công',
        });
        setVisible(false)
        dispatch(actChangeListProduct(isDeleted.listProduct))
      }
    }deleteProduct()
  
  },[SelectedProduct])

  return (
    <div className="container">
      <div className="row column-5">
        {
          listProduct && listProduct.map(product => {
            return (
              <div key={product._id} className="item">
                <div className="img img-1-1">
                  <img alt="" src={product.thumb} />
                </div>
                <p> {product.name} </p>
                <p> {product.note} </p>
                <Button type="primary" shape="circle">
                  <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button onClick={()=>handleDeleteButton(product._id)} id={product._id} type="primary" shape="circle">
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            )
          })
        }
      </div>
      <Modal
        title="Bạn có chắc muốn xóa?"
        visible={Visible}
        onOk={handdleOK}
        onCancel={()=>{setVisible(false)}}
      >

      </Modal>
    </div>

  )
}