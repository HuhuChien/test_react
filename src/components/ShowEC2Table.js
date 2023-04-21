import React,{useEffect} from 'react'
import EC2TableList from './EC2TableList'
const ShowEC2Table = ({query}) => {
 


useEffect(() => {
  console.log(query)
},[query])



  return <>
      <div>banana</div>
      
      {/* <EC2TableList />  */}
  </>
   
  
}

export default ShowEC2Table