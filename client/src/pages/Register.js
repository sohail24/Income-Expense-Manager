import React, { useState, useEffect }from 'react'
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css'
import axios from 'axios';
import Spinner from '../components/Spinner';

function Register() {
    const [loading, setLoading] = useState(false); //react hook for state management
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            setLoading(true);
            const result = await axios.post('/api/users/register', values);
            // console.log(result);
            setLoading(false);
            message.success(result.data);
        } catch (error) {
            setLoading(false);
            message.error(error.response.data);
        }
    }
    useEffect(() => {
        if(localStorage.getItem('income-expense-manager-user')){
            // <Navigate to='/' />  this will not work as it is not a hook, useNavigate will be used as it acts as a hook     
            navigate('/');     
        }
    });
  return (
    <div className="register">
        {loading && <Spinner/>}    {/*if both are true the componenet will be launched here!!. */}
        <div className="d-flex justify-content-center pt-5 ">
        <h1>Income Expense Manager</h1>
        </div>
        <div className="row reg">
            <div className="col-md-3">            
                <Form layout='vertical' onFinish={onFinish}>
                    <h3>Register</h3>
                    <Form.Item label='Name' name="name" rules={[{required: true, message: 'Please enter your name!' },]}>
                        <Input />
                    </Form.Item>                    
                    <Form.Item label='Email' name="email" rules={[{required: true, message: 'Please enter your email!' },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Password'name="password" rules={[{required: true, message: 'Please enter your password!' },]}>
                        <Input.Password />
                    </Form.Item>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to='/login'>Already Register? Click Here to Login</Link>
                        <button className='primary' type='submit'>Register</button>
                    </div>
                </Form>
            </div>
            <div className="col-md-3"><br/><br/><lottie-player src="https://assets8.lottiefiles.com/packages/lf20_pghai0vg.json"  background="transparent"  speed="1" loop autoplay></lottie-player>
            </div>
        </div>
    </div>
  )
  
}
export default Register