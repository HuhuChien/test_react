import React,{useState,useEffect} from 'react'
import CreateEC2 from './components/CreateEC2'
import ShowEC2Table from './components/ShowEC2Table'
import EditEC2 from './components/EditEC2'
// import Main from './components/Main'
import { Routes, Route } from 'react-router-dom'
//import Navbar from './components/Navbar';
import NavbarHead from './components/NavbarHead';
import Footer from './components/Footer'
const App = () => {
  const [query,setQuery] = useState('')

  
  useEffect(() => {
 
  },[query])

  return <>
     
    
            <NavbarHead query={query}/>
            <div className="container">
       
              <Routes>
              
        
                  <Route path="/" element={ <CreateEC2 setQuery={setQuery}/>}></Route>
                  <Route path="/show_ec2" element={ <ShowEC2Table query={query}/>}></Route>
                  <Route path="/edit_ec2" element={ <EditEC2/>}></Route>
              
              </Routes>
              </div>
             
            <Footer />
         
            
 
          

        
           

     
    
    </>
}

export default App