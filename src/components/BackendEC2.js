import React,{useEffect,useState,useRef,useReducer} from 'react'
import axios from 'axios';
import BackendEC2TableList from './BackendEC2TableList';
import reducer from '../reducer.js';
import ClipLoader from "react-spinners/ClipLoader";

export const BackendEC2Context = React.createContext()


const BackendEC2 = ({query}) => {
  const [response,setResponse] = useState([])
  const [demand_apply,setDemand_apply] = useState('')
  const [tem_demand,setTem_demand] = useState('')
  const [alert,setAlert] = useState(false)
  const [loading,setLoading] = useState(false)
  const demand_request_default = useRef(null)


//const [state,dispatch] = useReducer(reducer,response)

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
  
     <BackendEC2TableList demand_apply={demand_apply} alert={alert} tem_demand={tem_demand} deleteEC2={deleteEC2}/>
     {loading && <div className="clip_loader2"><ClipLoader id="ClipLoader" color="#36d7b7" size="100px"/></div>}
     
</BackendEC2Context.Provider>
</div> 
  </>
   
  
}

export default BackendEC2