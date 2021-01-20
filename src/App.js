import './App.css';
import React from 'react';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

function App() {
  

  const [account, setAccount ] = React.useState('')
  const [todoList, setToDoList ] = React.useState([])

  React.useEffect(() =>{
    const loadBlockChainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const network = await web3.eth.net.getNetworkType()
      const accounts = await web3.eth.getAccounts()
      const toDoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
      return { accounts, toDoList }
    }
    const { accounts = [], toDoList } = loadBlockChainData()
    setAccount(accounts[0] || 'fakeAddress')
    setToDoList(toDoList)
  }, [])

  console.log(account, todoList)

  return (
    <div className="container">
      <h1> Hello world</h1>
      <h2> your account: {account} </h2>
        <ul>
          {todoList && todoList.map(todo => <li>{todo}</li>)}
        </ul>
    </div>
  );
}

export default App;
