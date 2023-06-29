import logo from './logo.svg';
import { createClient } from 'urql';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [tokens, setTokens] = useState([])
  // https://api.studio.thegraph.com/query/49102/tokenbank/v0.1
//   const queryUrl = 'https://gateway.thegraph.com/api/   m        /subgraphs/id/ELUcwgpm14LKPLrBRuVvPvNKHQ9HvwmtKgKSH6123cr7'
//   const query = `{    ff      g
//   tokens(first: 5) {
//     id
//     name
//     symbol
//     decimals
//   }

// }`
const queryUrl = " https://api.studio.thegraph.com/query/49102/tokenbank/v0.1"
const query = `{
  amountDepositeds(
    first: 2
    where: {money_lt: "2000000000000000000", depositer: "0xe6a9d13d93cba162a0fb46d338add071247910f3"}
  ) {
    id
    depositer
    contractaddress
    money
    blockNumber
    blockTimestamp
  }
  amountWithdrawns(first: 2
   where: {money_lt: "3000000000000000000", depositer: "0xe6a9d13d93cba162a0fb46d338add071247910f3"}) {
    id
    depositer
    contractaddress
    money
    blockNumber
    blockTimestamp
  }
}`

  const client = createClient({
    url: queryUrl
  })


  useEffect(() => {
    async function getTokensInfo() {
      const { data } = await client.query(query).toPromise()
      console.log("data",data)
      const arr = {...data.amountDepositeds,...data.amountWithdrawns}
      console.log(arr)
      setTokens([...data.amountDepositeds,...data.amountWithdrawns])
    }
    getTokensInfo()
  },[])

  
  return (
    <div className="App">
      {tokens!=null && tokens.length>0 && tokens.map((tokeninfo,i)=>{
        return <>
        <div key={i}>{tokeninfo.blockNumber}</div>
        <div key={i}>{tokeninfo.id}</div>
        <div key={i}>{tokeninfo.depositer}</div>
        <div key={i}>{tokeninfo.contractaddress}</div>
        <div key={i}>{tokeninfo.money}</div>
        <div key={i}>{tokeninfo.blockTimestamp}</div>
        <br></br>
        </>
      })}
    </div>
  );
}

export default App;
