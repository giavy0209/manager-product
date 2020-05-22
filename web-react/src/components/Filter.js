import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Select, Form } from 'antd';

const { Option } = Select
export default function App({ setCategoryForFilter }) {
	const listCategory = useSelector(state => state.listCategory)

	const handleChange = useCallback((field, allfield) => {
		var arr = []

		allfield.forEach(el=>{
			if(el.value !== '0'){
				arr.push(el.value)
			}
		})
		
		setCategoryForFilter([...arr])
		
	},[setCategoryForFilter])

	return (
		<Form
		onFinish={handleChange}
		layout="inline"
		initialValues={{category0: '0', category1: '0'}}
		onFieldsChange={handleChange}
		>
			<Form.Item name="category0" style={{width: '100%'}}>
				<Select
					showSearch={true}
					filterOption={true}
					optionFilterProp="children"
					placeholder="Lọc theo loại hãng"
				>
					<Option value="0">Tất cả hãng</Option>
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

			<Form.Item name="category1" style={{width: '100%'}}>
				<Select
					showSearch={true}
					filterOption={true}
					optionFilterProp="children"
					placeholder="Lọc theo sản phẩm"
				>
					<Option value="0">Tất cả sản phẩm</Option>
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
		</Form>

	)
}