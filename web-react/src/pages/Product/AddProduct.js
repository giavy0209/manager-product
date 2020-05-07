import React from 'react'
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux'
export default function App() {
  const user = useSelector(state =>{
    return {phone: state.phone, password: state.password}
  })
  const props = {
    name: 'file',
    action: 'http://localhost:3001/upload',
    multiple: true,
    headers: {
      authorization: 'authorization-text',
      phone: user.phone,
      password: user.password
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <>
      <Upload {...props}>
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>,
    </>
  )
}