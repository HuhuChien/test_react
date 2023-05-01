import React,{useContext,useEffect,useState} from 'react'
import { EC2Context } from './CreateEC2'

const Search = ({search_default,deleteEC2,editEC2,setQuery3,triggerNext,triggerPrevious}) => {


  const [search_server,setSearch_server] = useState('')
  const [Search,setSearch] = useState(false)
  const receiveData = useContext(EC2Context)


  
  useEffect(() => {
    if(search_server !== ''){
        setSearch(true)
     
        const match_servers = receiveData.allEC2.filter(item => item.EC2NAME.toLowerCase().includes(search_server.toLowerCase()))
        setQuery3(match_servers)
        console.log(match_servers) 
    } else {
      
        setQuery3([])

 
      }
  },[search_server,receiveData.allEC2,setQuery3])
  

  //const match_servers = receiveData.allEC2.filter(item => item.EC2NAME.toLowerCase().includes(search_server.toLowerCase()))
  //console.log(match_servers)
  return <>

    <form className="form-inline my-2 my-lg-0">
        <div className="search">
            <input className="form-control mr-sm-2" type="text" onChange={(e) => setSearch_server(e.target.value)} placeholder="搜尋-雲端主機名稱" aria-label="Search" ref={search_default}/>
            {/* <button className="btn btn-outline-success my-2 my-sm-0 button-search" type="submit">搜尋</button> */}
        </div>
     
    </form> 



  
  
  </>
}

export default Search