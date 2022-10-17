import React from 'react';
import '../resources/analytics.css';
import { Progress } from 'antd';

function Analytics({transactions}) {
    const totalTransaction = transactions.length;
    const totalIncomeTransaction = transactions.filter(transaction => transaction.type === 'income');
    const totalExpenseTransaction = transactions.filter(transaction => transaction.type === 'expense');
    const totalIncomeTransactionPercentage = (totalIncomeTransaction.length/totalTransaction)*100;
    const totalExpenseTransactionPercentage = (totalExpenseTransaction.length/totalTransaction)*100;

    const totalTurnover = transactions.reduce( (acc,transaction) => acc + transaction.amount, 0 );
    const totalIncomeTurnover = transactions.filter(transaction => transaction.type ==="income" ).reduce( (acc,transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnover = transactions.filter(transaction => transaction.type ==="expense" ).reduce( (acc,transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnoverPercentage = (totalIncomeTurnover/totalTurnover)*100;
    const totalExpenseTurnoverPercentage = (totalExpenseTurnover/totalTurnover)*100;

    const categories = ['salary', 'entertainment', 'freelance', 'food', 'travel', 'tax', 'investment', 'education', 'medical',];
    
  return (
    <div>
        <div className="d-flex justify-content-around row">
            <div className="col-md-5">
                <div className="transactions-count">
                    <h4>Total Transactions : {totalTransaction}</h4>
                    <hr />
                    <h5>Income Transactions : {totalIncomeTransaction.length}</h5>
                    <h5>Expense Transactions: {totalExpenseTransaction.length}</h5>
                    <div className="progress-bars">
                        <Progress type="circle" strokeColor={'#87d068'}  status="active" percent={totalIncomeTransactionPercentage.toFixed(1)} />
                        <Progress type="circle" strokeColor={'#F07470'} status="active" percent={totalExpenseTransactionPercentage.toFixed(1)} />
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <div className="turnover-count">
                    <h4>Total Turnover : {totalTurnover}</h4>
                    <hr />
                    <h5>Income Turnover : {totalIncomeTurnover}</h5>
                    <h5>Expense Turnover: {totalExpenseTurnover}</h5>
                    <div className="progress-bars">
                        <Progress type="circle" strokeColor={'#04aa6b'}  status="active" percent={totalIncomeTurnoverPercentage.toFixed(1)} />
                        <Progress type="circle" strokeColor={'#ff6e37'} status="active" percent={totalExpenseTurnoverPercentage.toFixed(1)} />
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='d-flex justify-content-center'>
        <hr className=' mt-5' style={{width: "75vw"}}/>
        </div> */}
        <div className='d-flex justify-content-around row mt-5'>
            {/* <div className=""> */}
                <div className="col-md-5">
                    <div className="income-category-analysis">
                        <h4 className='mb-4'>Income Category Wise</h4>
                        {
                            categories.map((category) => {
                                const amount = transactions.filter(t=>t.type==='income' && t.category === category).reduce((acc,t) => acc + t.amount, 0);
                                return (
                                amount > 0 && <div className='category-card'>
                                    <h5>{category}</h5>
                                    <Progress strokeColor="#764abc" percent={((amount / totalIncomeTurnover)*100).toFixed(2)} status="active"/>
                                </div>
                                );
                            })
                        }
                    </div>
                </div>
            {/* </div> */}

            {/* <div className=""> */}
                <div className="col-md-5">
                    <div className="expense-category-analysis">
                        <h4 className='mb-4'>Expense Category Wise</h4>
                        {
                            categories.map((category) => {
                                const amount = transactions.filter(t=>t.type==='expense' && t.category === category).reduce((acc,t) => acc + t.amount, 0);
                                return (
                                amount > 0 && <div className='category-card'>
                                    <h5>{category}</h5>
                                    <Progress strokeColor="#764abc" percent={((amount / totalExpenseTurnover)*100).toFixed(2)} status="active"  />
                                </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        {/* </div> */}

    </div>
  )
}

export default Analytics