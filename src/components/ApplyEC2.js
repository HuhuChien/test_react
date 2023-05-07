import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios';
import ApplyEC2TableList from './ApplyEC2TableList';



export const ApplyEC2Context = React.createContext()


const ApplyEC2 = ({query}) => {
  const [response,setResponse] = useState([])
  const [demand_apply,setDemand_apply] = useState('')
  const [tem_demand,setTem_demand] = useState('')
  const [alert,setAlert] = useState(false)
  const demand_request_default = useRef(null)

// useEffect(() => {
//   console.log(query)
// },[query])

useEffect(() => {
  
})

const fetchData = async() => {
  const url = "http://localhost:5020/demand"
  try{
    const data = await axios.post(url,{
      demand:demand_apply
    })
    console.log(data)
    setResponse(data.data)
    console.log(response)
    if(data.data.length < 1){
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

  return <>
  <div className="apply_container">
    <form className="form" method="POST" id="the_form_demand" onSubmit={handle_Demand_Request}>
    
    <input type="text" placeholder='需求單單號' ref={demand_request_default} name="demand_request" className="form-control demand_input" id="demand" onChange={demand_apply_ChangeHandler} />
    <button type="submit" id="demand_save" className="main">確認</button>
 
</form>


<ApplyEC2Context.Provider value={response} >
      <ApplyEC2TableList demand_apply={demand_apply} alert={alert} tem_demand={tem_demand}/>
</ApplyEC2Context.Provider>
</div> 
  </>
   
  
}

export default ApplyEC2