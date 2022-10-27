import { SmileOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import '../resources/default-layout.css'
import React from 'react'

function DemoBtn() {
    const openNotification = () => {
        notification.open({
          message: 'Demo Credentials',
          description:
            <div>
                <span>Email : test@gmail.com</span>
                <p>Password : 789456123</p>

            </div>,
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      };
  return (
    <div className='d-flex flex-row-reverse'>
        <Button type="primary" className="demo-btn" onClick={openNotification}>
            Get demo credentials here!
        </Button>
    </div>
  )
}

export default DemoBtn