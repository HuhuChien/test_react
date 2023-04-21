//rafce
import React,{ useState, useEffect,useRef,useReducer } from 'react'

import EC2TableList from './EC2TableList'
import reducer from '../reducer.js';
import EC2Form from './EC2Form';
import { v4 as uuidv4 } from 'uuid';
import EmptyTableList from './EmptyTableList';
//import $ from 'jquery'; 
export const EC2Context = React.createContext()


const CreateEC2 = ({setQuery}) => {
  const [query2,setQuery2] = useState('')
  const [triggerNext, setTriggerNext] = useState(0);
  const [triggerPrevious, setTriggerPrevious] = useState(0);
  console.log(query2)
  
  const [os,setOS] = useState('ami-007855ac798b5175e')
  const [resource,setResource] = useState('t1.micro')
  const [ec2Name,setEc2Name] = useState('')
  const [subnet,setSubnet] = useState('A')
  const [ip,setIp] = useState(false)
  const subnet_default = useRef(null)
  const server_name_default = useRef(null)
  const os_default = useRef(null)
  const resource_default = useRef(null)
  const check_default = useRef(null)

  let defaultState = {
    allEC2: [],
    subnet:subnet,
    }


  const [state,dispatch] = useReducer(reducer,defaultState)


  useEffect(() => {
   
    setQuery(state)
  },[state.allEC2,setQuery,state])
 
 
  

  

  const ec2_Name_ChangeHandler = (e) => {
    setEc2Name(e.target.value)
  }

  const os_ChangeHandler = (e) => {
      setOS(e.target.value)
      console.log(e.target.value)
  }
  
  const instance_type_ChangeHandler = (e) => {
      setResource(e.target.value)
      console.log(e.target.value)
  }
  
 

  const subnet_ChangeHandler = (e) => {
   
    setSubnet(e.target.value)
    setIp(false)
    if(check_default.current){
      check_default.current.checked = false
    }


  

    dispatch({type:"SUBNET_UPDATE",payload:e.target.value})
}




  const ip_ChangeHandler = (e) => {
  setIp(!ip)
}


  const cancel = (e) => {
    server_name_default.current.value = ''
    os_default.current.value = 'ami-006e00d6ac75d2ebb'
    resource_default.current.value = 't1.micro'
    subnet_default.current.value = 'A'
}


  const deleteEC2 = (ID) => {
    const newEC2s = state.allEC2.filter((item) => 
      item.ID !== ID
    )
    console.log(newEC2s)
    dispatch({type:"DELETE_EC2",payload:newEC2s})

    console.log(query2.records.length)
    if(query2.records.length <= 1){
      setTriggerPrevious((triggerPrevious) => triggerPrevious - 1);
    }

  } 




  
  const handle_Submit = (e) => {
      e.preventDefault();
  
      const newEC2 = {
        ID:uuidv4(),
        EC2NAME:ec2Name,
        OS: os,
        APPLY_DATE: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
        RESOURCE: resource,
        SUBNET:subnet,
        IP:ip
      } 
     
      dispatch({type:"ADD_EC2",payload:newEC2})
      server_name_default.current.value = ''
      os_default.current.value = 'ami-006e00d6ac75d2ebb'
      resource_default.current.value = 't1.micro'
      subnet_default.current.value = 'A'
      window.$('#form_modal').modal('hide')
      

   
      if(query2.npage >= 1){
      
        setTriggerNext((triggerNext) => triggerNext + 1);

      }
    
    };







   
  

   
  

  return <>
       
      
       <EC2Context.Provider value={state}>
        <EC2Form server_name_default={server_name_default} os_default={os_default}  
        resource_default={resource_default} subnet_default={subnet_default} check_default={check_default}
        os_ChangeHandler={os_ChangeHandler} subnet_ChangeHandler={subnet_ChangeHandler}  
        instance_type_ChangeHandler={instance_type_ChangeHandler}  
         ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} ip_ChangeHandler={ip_ChangeHandler} 
         cancel={cancel} handle_Submit={handle_Submit}/>

        {state.allEC2.length > 0 ? 
          <EC2TableList deleteEC2={deleteEC2} setQuery2={setQuery2} triggerNext={triggerNext} triggerPrevious={triggerPrevious}/>
          :
          <EmptyTableList />
        }

      
      
      </EC2Context.Provider>


 
         

       
    </>
}

export default CreateEC2