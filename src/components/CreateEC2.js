//rafce
import React,{ useState, useEffect,useRef,useReducer } from 'react'
import axios from 'axios';
import EC2TableList from './EC2TableList'
import reducer from '../reducer.js';
import EC2Form from './EC2Form';
import { v4 as uuidv4 } from 'uuid';
import EmptyTableList from './EmptyTableList';
import EditEC2Form from './EditEC2Form'
import SearchEC2TableList from './SearchEC2TableList';
import Search from './Search';
//import $ from 'jquery'; 
import ClipLoader from "react-spinners/ClipLoader";

export const EC2Context = React.createContext()


const CreateEC2 = ({setQuery}) => {
  const [query2,setQuery2] = useState('')
  const [query3,setQuery3] = useState([])
  const [triggerNext, setTriggerNext] = useState(0);
  const [triggerPrevious, setTriggerPrevious] = useState(0);
  const [demand,setDemand] = useState('')
  const [ec2Name,setEc2Name] = useState('')
  const [os,setOS] = useState('ami-007855ac798b5175e')
  const [resource,setResource] = useState('t1.micro')
  const [subnet,setSubnet] = useState('A')
  const [ip,setIp] = useState(false)
  const [edit,setEdit] = useState(false)
  const [loading,setLoading] = useState(false)

  const [theId,setTheid] = useState('')
  const demand_default = useRef(null)
  const server_name_default = useRef(null)
  const subnet_default = useRef(null)
  const os_default = useRef(null)
  const resource_default = useRef(null)
  const check_default = useRef(null)
  const search_default = useRef(null)
  const spinner_default = useRef(null)



  let defaultState = {
    allEC2: [],
    subnet:subnet,
    }


  const [state,dispatch] = useReducer(reducer,defaultState)

  useEffect(() => {
    //window.localStorage.clear();
    const data = JSON.parse(localStorage.getItem('all'))
    
    if(!data){

      return 
    } else {
    
      state.allEC2 = data.allEC2
    }
   
  }, []);

  useEffect(() => {
   
    window.localStorage.setItem('all', JSON.stringify(state));
    setDemand(demand_default.current.value)
    setEc2Name(server_name_default.current.value)
  }, [state,state.allEC2,demand,ec2Name,os,resource,subnet,ip]);



  useEffect(() => {
   
    setQuery(state)
  },[state.allEC2,setQuery,state])
 
 


  const demand_ChangeHandler = (e) => {
    setDemand(e.target.value)
  }
  

  

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



//好像沒用到 20230507
  const ip_ChangeHandler = (e) => {
  setIp(!ip)
}


  const cancel = (e) => {

    server_name_default.current.classList.remove('alarm')
    demand_default.current.classList.remove('alarm') 
    demand_default.current.value = demand
    server_name_default.current.value = ''
    os_default.current.value = 'ami-006e00d6ac75d2ebb'
    resource_default.current.value = 't1.micro'
    subnet_default.current.value = 'A'
    setEdit(false)
}


  const deleteEC2 = async (ID) => {
    const newEC2s = state.allEC2.filter((item) => 
      item.ID !== ID
    )
    console.log(newEC2s)
    dispatch({type:"DELETE_EC2",payload:newEC2s})

    console.log(query2.records.length)
    if(query2.records.length <= 1){
      setTriggerPrevious((triggerPrevious) => triggerPrevious - 1);
    }

    if(state.allEC2.length <= 1){
      setDemand('')
    }

  } 

 

  const editEC2 = async(ID) => {
    const edit_EC2 = state.allEC2.find((item) => 
      item.ID === ID
    )
    console.log(edit_EC2)
    setTheid(ID)
    console.log(typeof(ID))
    await setEdit(true)
    await window.$('#form_modal_edit').modal('show')
   

    demand_default.current.value = edit_EC2.DEMAND
    server_name_default.current.value = edit_EC2.EC2NAME
    os_default.current.value = edit_EC2.OS
    resource_default.current.value = edit_EC2.RESOURCE
    subnet_default.current.value = edit_EC2.SUBNET
    if(subnet_default.current.value === 'DMZ1' || subnet_default.current.value === 'DMZ2'){
      check_default.current.checked = ip
    } 
  
    await setDemand(demand_default.current.value)
    await setEc2Name(server_name_default.current.value)
   
  
  

  } 


  const handle_Update = async(e) => {
    e.preventDefault()
    if(server_name_default.current.value === '' && demand_default.current.value === ''){
      server_name_default.current.classList.add('alarm')
      demand_default.current.classList.add('alarm') 
      return
    } else if(server_name_default.current.value === ''){
      return  server_name_default.current.classList.add('alarm')
      
  
    } else if(demand_default.current.value  === ''){
      return demand_default.current.classList.add('alarm') 
     
    } 


    const update = {ID:theId,DEMAND:demand,EC2NAME:ec2Name,OS:os,RESOURCE:resource,SUBNET:subnet,IP:ip,
      APPLY_DATE: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}

    await dispatch({type:"UPDATE_EC2",payload:update})
    await window.$('#form_modal_edit').modal('hide')
    await setEdit(false)
    if(query3.length > 0){
      window.location.reload(true)
    }
    
   
  }



  
  const handle_Submit = (e) => {
      e.preventDefault();
      server_name_default.current.classList.remove('alarm')
      demand_default.current.classList.remove('alarm') 
      const newEC2 = {
        ID:uuidv4(),
        DEMAND:demand,
        EC2NAME:ec2Name,
        OS: os,
        RESOURCE: resource,
        SUBNET:subnet,
        IP:ip,
        APPLY_DATE: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      } 

  

      if(server_name_default.current.value === '' && demand_default.current.value === ''){
        server_name_default.current.classList.add('alarm')
        demand_default.current.classList.add('alarm') 
        return
      } else if(server_name_default.current.value === ''){
        return  server_name_default.current.classList.add('alarm')
        
    
      } else if(demand_default.current.value  === ''){
        return demand_default.current.classList.add('alarm') 
       
      } else {
        dispatch({type:"ADD_EC2",payload:newEC2})
        server_name_default.current.classList.remove('alarm')
        demand_default.current.classList.remove('alarm') 

      }

      
      
      demand_default.current.value = ''
      server_name_default.current.value = ''
      os_default.current.value = 'ami-006e00d6ac75d2ebb'
      resource_default.current.value = 't1.micro'
      subnet_default.current.value = 'A'
      
      window.$('#form_modal').modal('hide')
     
  
   
      if(query2.npage >= 1){
      
        setTriggerNext((triggerNext) => triggerNext + 1);

      }
    
    };





  
  const handle_Submit_DB =async(e) => {
    try{
       for (const[i,value] of state.allEC2.entries()){
        let payload = state.allEC2
        console.log(payload)
        const url = 'http://localhost:5020/task'
        console.log('loop')
      await axios.post(url,{
          demand:payload[i].DEMAND,
          server_name:payload[i].EC2NAME,
          ami:payload[i].OS,
          instance_type:payload[i].RESOURCE,
          subnet:payload[i].SUBNET,
          ip:payload[i].IP
        })

      }
    

  await new Promise((resolve, reject) => {
  
    resolve(setLoading(true));
        console.log('done1')
    });


     
    
      
  await new Promise((resolve, reject) => {
        setTimeout(() => {
             resolve(dispatch({type:"DELETE_ALL_EC2"}));
             console.log('done2')
        }, 3000);
        
    });
     
  

  await new Promise((resolve, reject) => {
    resolve(setLoading(false));
    console.log('done3')
      })
    

  await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(window.alert('資料已完成上傳'));
        console.log('done4')
      },1000)
      setDemand('')
  })

    
    }catch(error){
      console.log(error.name)
 
      window.alert('無法成功上傳資料，請稍後再試，或請通知系統管理課')
  }
  
  }


  

  return <>
    <EC2Context.Provider value={state}>
    
          <button type="button" className="main" data-toggle="modal" data-target=".form_modal" id="click-modal">開始建立主機</button>
          {state.allEC2.length > 0 && 
          <button type="button" className="main" onClick={handle_Submit_DB}>送出</button>
          }
          
          
          {/* 要再確認EditEC2Form的props那些要留 20230423*/}
          {edit ? <EditEC2Form demand_default={demand_default} server_name_default={server_name_default} 
          os_default={os_default} resource_default={resource_default} subnet_default={subnet_default} check_default={check_default} demand_ChangeHandler={demand_ChangeHandler}
          ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} os_ChangeHandler={os_ChangeHandler} instance_type_ChangeHandler={instance_type_ChangeHandler}  subnet_ChangeHandler={subnet_ChangeHandler}  
            ip_ChangeHandler={ip_ChangeHandler} cancel={cancel} handle_Update={handle_Update} /> 
            
            : <EC2Form demand={demand} demand_default={demand_default} server_name_default={server_name_default} os_default={os_default}  
            resource_default={resource_default} subnet_default={subnet_default} check_default={check_default}
            demand_ChangeHandler={demand_ChangeHandler} ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} os_ChangeHandler={os_ChangeHandler} instance_type_ChangeHandler={instance_type_ChangeHandler}  
            subnet_ChangeHandler={subnet_ChangeHandler} ip_ChangeHandler={ip_ChangeHandler} 
            cancel={cancel} handle_Submit={handle_Submit}/>}
            
            <Search deleteEC2={deleteEC2} editEC2={editEC2} setQuery3={setQuery3} triggerNext={triggerNext} triggerPrevious={triggerPrevious} search_default={search_default}/>
            
          
            {query3.length > 0 ? <SearchEC2TableList query3={query3} deleteEC2={deleteEC2} editEC2={editEC2}/> : 
            
            
            state.allEC2.length > 0 ? 
              <EC2TableList deleteEC2={deleteEC2} editEC2={editEC2} setQuery2={setQuery2} triggerNext={triggerNext} triggerPrevious={triggerPrevious}/>
              :
              <EmptyTableList />}
           {loading && <div className="clip_loader"  ref={spinner_default}><ClipLoader id="ClipLoader" color="#36d7b7" size="100px"/></div>}
     
     
      </EC2Context.Provider>
  
    </>
}

export default CreateEC2