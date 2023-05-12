import React,{useState,useEffect} from 'react'
import Login from './components/Login'
import NavbarHead from './components/NavbarHead';
import Footer from './components/Footer'
import CreateEC2 from './components/CreateEC2'
import ApplyEC2 from './components/ApplyEC2'
import EditEC2 from './components/EditEC2'
import BackendEC2 from './components/BackendEC2'
import ProtectedRoutes from './components/ProtectedRoutes';
import { Routes, Route } from 'react-router-dom'



const App = () => {
  const [query,setQuery] = useState('')
  const [log_in,setLog_in] = useState(false)
  
  useEffect(() => {
 
  },[query])

  return <>
     
            <NavbarHead query={query}/> 
      
            <div className="container">
       
              <Routes>
                  
                  <Route path="/login" element={ <Login setLog_in={setLog_in}/>}></Route> 
                  {/* <Route element={<ProtectedRoutes log_in={log_in}/>}> */}
                    <Route path="/create_ec2" element={ <CreateEC2 setQuery={setQuery}/>}></Route>
                    <Route path="/show_ec2" element={ <ApplyEC2 query={query}/>}></Route>
                    <Route path="/edit_ec2" element={ <EditEC2/>}></Route>
                    <Route path="/backend" element={ <BackendEC2/>}></Route>
                  {/* </Route> */}
              </Routes>
              </div>
             
            <Footer />
         
            
 
          

        
           

     
    
    </>
}

export default App