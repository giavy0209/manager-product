import React, {useCallback, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button ,Modal, notification, Form, Input, TreeSelect, Switch} from 'antd';
import { waitFor } from '../../helpers'
import calAPI from '../../axios'
import API_DOMAIN from '../../constant'
import ListImage from './ListImage'
export default function App({getProduct}) {
  const [Visible, setVisible] = useState(false)
  const [SelectedProduct, setSelectedProduct] = useState('')
  const [VisibleEdit, setVisibleEdit] = useState(false)
  const [ProductEdit, setProductEdit] = useState({})
  const [Thumb, setThumb] = useState('')

  const listProduct = useSelector(state => state.listProduct)
  const listCategory = useSelector(state => state.listCategory)
  
  const user = useSelector(state =>{
    return {phone: state.phone , password: state.password}
  })
  const handleDeleteButton = useCallback(id=>{
    setSelectedProduct(id)
    setVisible(true)
  })

  const handdleEditButton = useCallback(id =>{
    var index = listProduct.findIndex(o => o._id === id)
    var selectProduct = listProduct[index]

    ProductEdit.category = []

    selectProduct.category.forEach(el=>{
      ProductEdit.category.push(el._id)
    })

    setThumb(selectProduct.thumb)

    setProductEdit({
      ...selectProduct,
      ...ProductEdit
    })
    setVisibleEdit(true)
  },[listProduct])

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
        getProduct()
      }
    }deleteProduct()
  
  },[SelectedProduct])

  const handdleSubmitForm = useCallback(async (value)=>{
    console.log(ProductEdit);
    
    var submitData ={
      ...value,
      thumb: Thumb,
    }
    await calAPI.post('/edit-product', {user, submitData, id: ProductEdit._id})
    notification.open({
      description:'Đăng sản phẩm thành công'
    })
    getProduct()
  },[Thumb,ProductEdit])

  return (
    <>
      <div className="row column-5">
        {
          listProduct && listProduct.map(product => {
            return (
              <div key={product._id} className="item">
                <div className="img img-1-1">
                  <img alt="" src={`${API_DOMAIN}/${product.thumb}`} />
                </div>
                <p>Danh mục : {
                  product.category && product.category.map(category=>{
                    return(
                      <>
                        {category.name}-
                      </>
                    )
                  })  
                } </p>
                <p>Giá : {product.exPrice} </p>
                <p> {product.name} </p>
                <Button type="primary" onClick={()=>handdleEditButton(product._id)} shape="circle">
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

      <Modal
      title="Sửa sản phẩm"
      visible={VisibleEdit}
      footer={false}
      onCancel={()=>{setVisibleEdit(false)}}
      >
        <ListImage
          Thumb={Thumb} 
          setThumb={setThumb}
        />
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={ProductEdit}
          onFinish={handdleSubmitForm}
          size={'middle'}
          style={{textAlign:'left'}}
        >
          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Danh mục" name="category">
            <TreeSelect
            treeDataSimpleMode
            treeData={listCategory}
            showSearch
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            treeDefaultExpandAll
            allowClear
            multiple
            >
            </TreeSelect>
          </Form.Item>

          <Form.Item label="Giá bán" name="exPrice">
            <Input />
          </Form.Item>

          <Form.Item label="% cho cộng tác viên" name="percentToCoop">
            <Input />
          </Form.Item>
          <Form.Item label="Hiển thị?" name="display">
            <Switch/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sửa sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>

  )
}