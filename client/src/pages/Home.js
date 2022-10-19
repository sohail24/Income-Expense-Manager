import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import AddEditTranscation from '../components/AddEditTranscation';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { DatePicker, message, Select, Table, Popconfirm, Tag} from 'antd';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined , RadarChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analytics from '../components/Analytics';


function Home (){
  const { RangePicker } = DatePicker;
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false);
  const [loading, setLoading] = useState(false); //react hook for state management, hooks need to be in functional component and placed at top
  const [transactionData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState("all");
  const [viewType, setViewType] = useState("table")
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const getTransaction = async () => {
          try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('income-expense-manager-user'));
            const response = await axios.post('api/transactions/get-all-transactions', {
                userid: user.data._id, 
                frequency, 
                ...(frequency === "custom" &&  {selectedRange}),
                type,
              } 
            );
            // console.log(response.data);
            setTransactionData(response.data);
            setLoading(false);
            } catch (error) {
            setLoading(false)
            // console.error(error);
            message.error('Something Went Wrong')
          }
  }

  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      // console.log(record);
      const response = await axios.post('api/transactions/delete-transaction', {
          transactionId: record._id, 
        } 
      );
      // console.log(response.data);
      message.success(response.data);
      setLoading(false);
      getTransaction();
      } catch (error) {
      setLoading(false)
      console.error(error);
      message.error('Something Went Wrong')
    }
  }

  useEffect(() => {
    getTransaction();
  }, [frequency,selectedRange,type])
  
  const column = [{
      title: "Date",
      dataIndex: "date",
      render: (date)=>  moment(date).format("Do MMMM YYYY"),
    },{
      title: "Amount",
      dataIndex: "amount",
      render: (_, { amount, type }) => {
        let color =  type === "expense" ? 'volcano' : 'green';
            return (
              <Tag color={color}>
                <b>{color === 'volcano'? '- '+amount : '+ '+amount}</b>
              </Tag>
            );
      },
    },{
      title: "Category",
      dataIndex: "category"
    },{
      title: "Type",
      dataIndex: "type",
    },{
      title: "Reference",
      dataIndex: "reference"
    },{
      title: "Description",
      dataIndex: "description"
    },{
      title: "Actions",
      // dataIndex: "actions",
      render: (text,record) => {
        return <div className='d-flex justify-content-center align-items-center'>
          <EditOutlined onClick={() => {
            setSelectedItemForEdit(record);
            setShowAddEditTransactionModal(true);
          }}/>
          <Popconfirm placement="leftBottom" title={"Are you sure you want to delete this transaction?"} onConfirm={() => deleteTransaction(record) } okText="Yes" cancelText="No" >  
            <DeleteOutlined className='mx-3' 
            // onClick={() => {
                // {/* deleteTransaction(record); */} 
            // }}
            />
          </Popconfirm>
        </div>
      }
    }]

  return (
    <>
    <DefaultLayout>
        {loading && <Spinner/>}    {/*if both are true the componenet will be launched here!!. */}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className='d-flex'>
          <div className='d-flex flex-column'>
              <h6>Select Frequency</h6>
              <Select value={frequency} onChange={(value) => setFrequency(value)}>
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365">Last 1 Year</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
              <div className='mt-2'>
              {frequency === "custom" && <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />}
              </div>
          </div>
          <div className='d-flex flex-column mx-3'>
              <h6>Select Type</h6>
              <Select value={type} onChange={(value) => setType(value)}>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
          </div>
        </div>
        <div className='d-flex'>
          <div className='analytics-tab d-flex align-items-center'>
            {/* {icons} */}
            <UnorderedListOutlined className= {` customsvg ${viewType === "table" ? "anticon-active" : "anticon-inactive"} `} 
            onClick = {() => setViewType("table")}/>
            <RadarChartOutlined className={` customsvg ${viewType === "analytics" ? "anticon-active" : "anticon-inactive"} `}
            onClick = {() => setViewType("analytics")}/>
          </div>
          <button className='primary mx-3' onClick={()=>{setSelectedItemForEdit(null); setShowAddEditTransactionModal(true)}}>Add Now</button>
        </div>
      </div>

      <div className='data'>
      {
        viewType === "table" ? 
          <div className="table-analytics">
          <Table dataSource={transactionData} columns={column} pagination= { {defaultPageSize: 5, pageSizeOptions: ['5','10','20','50'], showSizeChanger: true}}/>
          </div> 
        : 
          <Analytics transactions = {transactionData}/>
      }
      </div>
      
      {showAddEditTransactionModal && 
      <AddEditTranscation 
      showAddEditTransactionModal={showAddEditTransactionModal} 
      setShowAddEditTransactionModal={setShowAddEditTransactionModal}
      getTransaction={getTransaction}     
      selectedItemForEdit={selectedItemForEdit}
      setSelectedItemForEdit={setSelectedItemForEdit}   
      />}
    </DefaultLayout>
    </>
  )
}

export default Home;