import React,{useEffect} from 'react'
import EC2TableList2 from './EC2TableList2'
const ShowEC2Table = ({query}) => {
 


useEffect(() => {
  console.log(query)
},[query])



  return <>
      <div>banana</div>
      
      {/* <EC2TableList2 />   */}
  </>
   
  
}

export default ShowEC2Table