import React,{useEffect,useState,useRef,useReducer} from 'react'
import axios from 'axios';
import BackendEC2TableList from './BackendEC2TableList';
import BackendEditEC2Form from './BackendEditEC2Form'
import reducer from '../reducer.js';
import ClipLoader from "react-spinners/ClipLoader";


export const BackendEC2Context = React.createContext()


const BackendEC2 = ({query}) => {
  const [response,setResponse] = useState([])
  const [demand_apply,setDemand_apply] = useState('')
  const [tem_demand,setTem_demand] = useState('')
  const [alert,setAlert] = useState(false)
  const [loading,setLoading] = useState(false)
  
 

  const [theId,setTheid] = useState('')
  const [demand,setDemand] = useState('')
  const [ec2Name,setEc2Name] = useState('')
  const [os,setOS] = useState('ami-007855ac798b5175e')
  const [resource,setResource] = useState('t1.micro')
  const [subnet,setSubnet] = useState('A')
  const [ip,setIp] = useState(false)
  const [edit,setEdit] = useState(false)


  const demand_request_default = useRef(null)
  const demand_default = useRef(null)
  const server_name_default = useRef(null)
  const subnet_default = useRef(null)
  const os_default = useRef(null)
  const resource_default = useRef(null)
  const check_default = useRef(null)
  const search_default = useRef(null)
  const spinner_default = useRef(null)

const fetchData = async() => {
  const url = "http://localhost:5020/demand"
  try{
    const data = await axios.post(url,{
      demand:demand_apply
    })
    console.log(data)
    setResponse(data.data)


    console.log(response)
    if(data.data.length < 1 && demand_apply !== ''){
      setTem_demand(data.config.data)  
      setAlert(true)
    
    } else {
      setAlert(false)
    }

  }catch(error){
    console.log(error)
  }
}


const demand_apply_ChangeHandler = (e) => {
  setDemand_apply(e.target.value)
}



const handle_Demand_Request = (e) => {
  e.preventDefault()
  fetchData()
}




const editEC2 = async(_id) => {
  const edit_EC2 = response.find((item) => 
  item._id === _id
)
  console.log(edit_EC2)
  setTheid(_id)
  setSubnet(edit_EC2.subnet)
  //await setIp(edit_EC2.ip)
  //setEdit(true)
  console.log('apple')
  await window.$('#form_modal_edit').modal('show')



  demand_default.current.value = edit_EC2.demand
  server_name_default.current.value = edit_EC2.server_name
  os_default.current.value = edit_EC2.ami
  resource_default.current.value = edit_EC2.instance_type
  subnet_default.current.value = edit_EC2.subnet

  if(subnet_default.current.value === 'DMZ1' || subnet_default.current.value === 'DMZ2'){
    console.log(ip)
    check_default.current.checked = ip
  } 

  //await setDemand(demand_default.current.value)
  //await setEc2Name(server_name_default.current.value)
  
} 




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

  //dispatch({type:"SUBNET_UPDATE",payload:e.target.value})
}



const ip_ChangeHandler = (e) => {
  //setIp(!ip)
  console.log('be')
}




const cancel = (e) => {

  server_name_default.current.classList.remove('alarm')
  demand_default.current.classList.remove('alarm') 
  demand_default.current.value = demand
  server_name_default.current.value = ''
  os_default.current.value = 'ami-006e00d6ac75d2ebb'
  resource_default.current.value = 't1.micro'
  subnet_default.current.value = 'A'

}





const deleteEC2 = async(_id) => {
  let isExecuted = window.confirm("確定刪除?");
  if (isExecuted) {
    const url = `http://localhost:5020/delete_ec2/${_id}`
  
    console.log('done0')


   await new Promise((resolve, reject) => {
        resolve(setLoading(true))
        resolve(axios.delete(url));

        console.log('done1');
      })
     

  await new Promise((resolve, reject) => {
      const newEC2s = response.filter((item) => 
        item._id !== _id
      )
      setTimeout(() => {
          resolve(setResponse(newEC2s));
          resolve(setLoading(false))
          console.log('done2');
        },2000)
      
     
      })
 
  
  } else {
    console.log('nooo')
  }

} 




  return <>
  <div className="apply_container">
    <form className="form" method="POST" id="the_form_demand" onSubmit={handle_Demand_Request}>
    
    <input type="text" placeholder='需求單單號' ref={demand_request_default} name="demand_request" className="form-control demand_input" id="demand" onChange={demand_apply_ChangeHandler} />
    <button type="submit" id="demand_save" className="main">確認</button>
    
    </form>

   
<BackendEC2Context.Provider value={response} >
  
     
     
      <BackendEC2TableList demand_apply={demand_apply} alert={alert} tem_demand={tem_demand} deleteEC2={deleteEC2} editEC2={editEC2}/>

      {loading && <div className="clip_loader2"><ClipLoader id="ClipLoader" color="#36d7b7" size="100px"/></div>}



     <BackendEditEC2Form demand_default={demand_default} server_name_default={server_name_default} os_default={os_default} resource_default={resource_default} subnet_default={subnet_default} check_default={check_default} demand_ChangeHandler={demand_ChangeHandler} ec2_Name_ChangeHandler={ec2_Name_ChangeHandler} os_ChangeHandler={os_ChangeHandler} instance_type_ChangeHandler={instance_type_ChangeHandler}  subnet_ChangeHandler={subnet_ChangeHandler}  
      ip_ChangeHandler={ip_ChangeHandler} cancel={cancel} subnet={subnet} /> 
    
    

    
     {/* 被我刪掉 handle_Update*/}
</BackendEC2Context.Provider>
</div> 
  </>
   
  
}

export default BackendEC2