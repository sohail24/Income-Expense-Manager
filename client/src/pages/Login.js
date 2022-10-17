import React, { useEffect, useState } from 'react'
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner';

function Login() {
    const [loading, setLoading] = useState(false); //react hook for state management, hooks need to be in functional component and placed at top
    const navigate = useNavigate(); 
    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post('api/users/login', values);
            //console.log(response);
            localStorage.setItem('income-expense-manager-user', JSON.stringify(response, response.data.password = ''));
            setLoading(false);
            message.success("Login Succesful");
            navigate('/');
        } catch (error) {
            setLoading(false)
            console.error(error);
            message.error('Login Failed')
        }
    }

    useEffect(() => {
        if(localStorage.getItem('income-expense-manager-user')){
            // <Navigate to='/' />  this will not work as it is not a hook, useNavigate will be used as it acts as a hook     
            navigate('/');     
        }
    });

  return (
    <div className="login">
        {loading && <Spinner/>}    {/*if both are true the componenet will be launched here!!. */}
        <div className="d-flex justify-content-center pt-5 ">
        <h1>Income Expense Manager</h1>
        </div>
        <div className="row log">
            <div className="col-md-3"><br/><br/><lottie-player src="https://assets8.lottiefiles.com/packages/lf20_pghai0vg.json"  background="transparent"  speed="1" loop autoplay></lottie-player>
            </div>
            <div className="col-md-3">            
                <Form layout='vertical' onFinish={onFinish}>
                    <h3>LOGIN</h3>                
                    <Form.Item label='Email' name="email" rules={[{required: true, message: 'Please enter your email!' },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Password'name="password" rules={[{required: true, message: 'Please enter your password!' },]}>
                        <Input.Password />
                    </Form.Item>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to='/register'>No account? Click Here to Register</Link>
                        <button className='primary' type='submit'>Login</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
  )
  
}
export default Login