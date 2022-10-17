import React from 'react';
import '../resources/default-layout.css';
import { Dropdown, Menu, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UnorderedListOutlined, AreaChartOutlined , RadarChartOutlined , ReconciliationOutlined, WalletOutlined} from '@ant-design/icons';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('income-expense-manager-user'));
  const navigate = useNavigate();
  const menu = (
    <Menu
      items={[
        {
          label: (
            <div onClick={() => {
              localStorage.removeItem('income-expense-manager-user');
              // <Navigate to='/login'></Navigate>
              message.success("Logged out Succesfully");
              navigate('/login');
            }}>Logout</div>
          ),
        }
      ]}
    />
  );
  return (
    <div className='layout'>
        <div className='header d-flex justify-content-between align-items-center'>
            <div className='logo'>
              <p className='d-flex align-items-center'><WalletOutlined className='mx-2'/>  Income Expense Manager</p>
            </div>
            <div className='user'>
              <Dropdown overlay={menu} placement="bottomRight">
                <p style={{cursor: 'pointer'}}>Hi, {user.data.name}!</p>
              </Dropdown>
            </div>
        </div>
        <div className='content'>
            {props.children}
        </div>
    </div>
  )
}

export default DefaultLayout;