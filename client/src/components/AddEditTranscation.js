import React, { useState } from 'react'
import { Form, Input, message, Modal, Select } from 'antd';
import axios from 'axios';
import Spinner from './Spinner';

function AddEditTranscation({showAddEditTransactionModal, setShowAddEditTransactionModal, selectedItemForEdit, setSelectedItemForEdit, getTransaction }) {
    const [loading, setLoading] = useState(false); //react hook for state management
    const onFinish = async (value) => {
        try {            
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('income-expense-manager-user'));
            if(selectedItemForEdit !== null){
                const result = await axios.post('/api/transactions/edit-transaction', {
                    payload: {
                    ...value, userid: user.data._id },
                    transactionId : selectedItemForEdit._id,
                } );
                message.success(result.data);
            }else{
                const result = await axios.post('/api/transactions/add-transaction', {...value, userid: user.data._id} );
                message.success(result.data);
            }
            // console.log(result);
            setShowAddEditTransactionModal(false);
            setSelectedItemForEdit(null);
            setLoading(false);
            getTransaction();
            // message.success(result.data);
        } catch (error) { 
            setLoading(false);
            // message.error(error.response.data);
            message.error("Something went wrong")
            console.log(error);
        }
    }
    return (
    <div>
    {loading && <Spinner/>}    {/*if both are true the componenet will be launched here!!. */}
    <Modal title={selectedItemForEdit !== null? "Edit Transaction" : "Add Transaction"} 
    open={showAddEditTransactionModal} onCancel={()=> setShowAddEditTransactionModal(false)} footer={false}>
        <Form layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit} >            
                    <Form.Item label='Add Amount' name="amount" rules={[{required: true, message: 'Please add amount' },]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='Type' name="type" rules={[{required: true, message: 'Please select type!' },]}>
                        <Select>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Category' name="category" rules={[{required: true, message: 'Please select category!' },]}>
                        <Select>
                        <Select.Option value="salary">Salary</Select.Option>
                        <Select.Option value="freelance">Freelance</Select.Option>
                        <Select.Option value="investment">Investment</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="travel">Travel</Select.Option>
                        <Select.Option value="entertainment">Entertainment</Select.Option>
                        <Select.Option value="education">Education</Select.Option>
                        <Select.Option value="medical">Medical</Select.Option>
                        <Select.Option value="tax">Tax</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Date' name="date" rules={[{required: true, message: 'Please select date' },]}>
                        <Input type='Date' style={{cursor: "pointer"}}/>
                    </Form.Item>
                    <Form.Item label='Reference' name="reference" rules={[{required: true, message: 'Please add reference' },]}>
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label='Description' name="description" rules={[{required: true, message: 'Please add description' },]}>
                        <Input type="text" />
                    </Form.Item>
                    <div className="d-flex justify-content-end align-items-center">
                        <button className='primary' type='submit'>{selectedItemForEdit !== null ? "Update" : "Submit"}</button>
                    </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AddEditTranscation