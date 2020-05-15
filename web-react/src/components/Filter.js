import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Select, Form, Button } from 'antd';

const { Item } = Form
const { Option } = Select
export default function App({ setCategoryForFilter }) {
	const listCategory = useSelector(state => state.listCategory)

	const handleChange = useCallback(({category0,category1}) => {
		var arr = []
		console.log(arr);
		
		category0 !== '0' && arr.push(category0) 
		category1 !== '0' && arr.push(category1) 

		

		setCategoryForFilter([...arr])
		
	},[])

	return (
		<Form
		onFinish={handleChange}
		layout="inline"
		initialValues={{category0: '0', category1: '0'}}
		>
			<Form.Item name="category0" style={{width: '40%'}}>
				<Select
					showSearch={true}
					filterOption={true}
					optionFilterProp="children"
					placeholder="Lọc theo loại sản phẩm"
				>
					<Option value="0">Không lọc</Option>
					{
						listCategory && listCategory.map(el => {
							if (el.type === 0) {
								return (
									<Option key={el._id} value={el._id}> {el.name} </Option>
								)
							}
						})
					}
				</Select>
			</Form.Item>

			<Form.Item name="category1" style={{width: '40%'}}>
				<Select
					showSearch={true}
					filterOption={true}
					optionFilterProp="children"
					placeholder="Lọc theo hãng"
				>
					<Option value="0">Không lọc</Option>
					{
						listCategory && listCategory.map(el => {
							if (el.type === 1) {
								return (
									<Option key={el._id} value={el._id}> {el.name} </Option>
								)
							}
						})
					}
				</Select>
			</Form.Item>
			
			<Form.Item>
				<Button htmlType="submit" type="primary">Lọc</Button>
			</Form.Item>
		</Form>

	)
}