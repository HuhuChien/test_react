import React from 'react'
import {NavLink} from 'react-router-dom'
const NavbarHead = ({query}) => {
  
  // const handle_Search = (e) => {
  //   e.preventDefault()
  //   console.log('searching......')
  //   console.log(query)
  // }
  
  
  return<>
 

<nav className="navbar the_navbar navbar-icon-top navbar-expand-md navbar-dark" style={{background: "#232F3E"}}>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    


    <li className="nav-item nav-link">

          <i className="fa fa-envelope-o nav-link">
              <NavLink to="/">
                  <div>新建雲端主機</div> 
              </NavLink>
          </i>
      
    </li>


    <li className="nav-item nav-link">
     
          <i className="fa fa-envelope-o nav-link">
              <NavLink to="/show_ec2">
                  <div>檢視申請內容</div>      
              </NavLink>
          </i>
     
    </li>

    <li className="nav-item nav-link">
      
   
        <i className="fa fa-envelope-o nav-link">
            <NavLink to="/edit_ec2">
                <div>修改申請內容</div>     
            </NavLink>
        </i>
    
    </li>

    </ul>

    {/* <form className="form-inline my-2 my-lg-0" onSubmit={handle_Search}>
      <input className="form-control mr-sm-2" type="text" placeholder="雲端主機名稱" aria-label="Search" />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">搜尋</button>
    </form>  */}
  </div>
</nav>

  
  
  
  
  </>
}

export default NavbarHead