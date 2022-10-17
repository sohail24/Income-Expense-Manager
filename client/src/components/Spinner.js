import React from 'react';
import { Spin } from 'antd';
import '../resources/default-layout.css';

function Spinner() {
  return (
    <div><Spin className='custom-spin' size='large'/></div>
  )
}

export default Spinner;