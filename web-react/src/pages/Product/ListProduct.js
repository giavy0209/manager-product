import React, {useCallback, useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button ,Modal, notification, Form, Input, Select, Switch} from 'antd';
import { waitFor } from '../../helpers'
import calAPI from '../../axios'
import API_DOMAIN from '../../constant'
import ListImage from './ListImage'

const {Option} = Select
export default function App({getProduct}) {
  const [VisibleEdit, setVisibleEdit] = useState(false)
  const [ProductEdit, setProductEdit] = useState({})
  const [Thumb, setThumb] = useState('')
  const [form] = Form.useForm();
  const listProduct = useSelector(state => state.listProduct)
  const listCategory = useSelector(state => state.listCategory)
  
  const user = useSelector(state =>{
    return {phone: state.phone , password: state.password}
  })

  const handdleEditButton = useCallback(id =>{
    var index = listProduct.findIndex(o => o._id === id)
    var selectProduct = listProduct[index]
    console.log(selectProduct.category)
    setThumb(selectProduct.thumb)

    var category0;
    var category1;

    selectProduct.category.forEach(product=>{
      listCategory.forEach(cat=>{
        if(product._id === cat._id){
          if(cat.type === 0){
            category0 = product._id
          }else{
            category1 = product._id
          }
        }
      })
    })

    setProductEdit({
      ...selectProduct,
      category0,
      category1,
    })
    setVisibleEdit(true)
  },[listProduct])

  const handdleSubmitForm = useCallback(async (value)=>{
    var submitData ={
      ...value,
      thumb: Thumb,
      category: [value.category0, value.category1]
    }
    await calAPI.post('/edit-product', {user, submitData, id: ProductEdit._id})
    notification.open({
      description:'Đăng sản phẩm thành công'
    })
    getProduct()
  },[Thumb,ProductEdit])

  useEffect(()=>{
    form.setFieldsValue(ProductEdit);
  },[ProductEdit])

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
                {
                  product.category && product.category.map(category=>{
                    return(
                      <p>
                        {category.type === 0 ? 'Loại sản phẩm:' : 'Hãng:'} {category.name}
                      </p>
                    )
                  })  
                }
                <p>Giá : {product.exPrice} </p>
                <p> {product.name} </p>
                <Button type="primary" onClick={()=>handdleEditButton(product._id)} shape="circle">
                  <FontAwesomeIcon icon={faPen} />
                </Button>
              </div>
            )
          })
        }
      </div>

      <Modal
      title="Sửa sản phẩm"
      visible={VisibleEdit}
      footer={false}
      onCancel={()=>{setVisibleEdit(false)}}
      forceRender
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
          form={form}
        >
          <Form.Item label="Tên" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Hãng" name="category0">
            <Select
            showSearch={true}
            filterOption={true}
            optionFilterProp="children"
            >
            {
              listCategory && listCategory.map(el=>{
                if(el.type === 0){
                  return (
                    <Option key={el._id} value={el._id}> {el.name} </Option>
                  )
                }
              })
            }
            </Select>
          </Form.Item>

          <Form.Item label="Sản phẩm" name="category1">
            <Select
            showSearch={true}
            filterOption={true}
            optionFilterProp="children"
            >
            {
              listCategory && listCategory.map(el=>{
                if(el.type === 1){
                  return (
                    <Option key={el._id} value={el._id}> {el.name} </Option>
                  )
                }
              })
            }
            </Select>
          </Form.Item>

          <Form.Item label="Giá bán" name="exPrice">
            <Input />
          </Form.Item>

          <Form.Item label="Hiển thị?" name="display" valuePropName="checked">
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