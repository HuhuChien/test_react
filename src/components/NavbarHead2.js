import React, { useEffect } from 'react'
import {NavLink} from 'react-router-dom'
import {encryptStorage1} from '../App'
const NavbarHead = () => {

  
  return<>
 

<nav className="navbar the_navbar navbar-icon-top navbar-expand-md navbar-dark" style={{background: "#232F3E"}}>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    


    <li className="nav-item nav-link">

          <i className="fa fa-envelope-o nav-link">
              <NavLink to="/create_ec2">
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


    <li className="nav-item nav-link">
    {/* 只有系統管理課的同仁可以看到navbar顯示 */}
{encryptStorage1.getItem('query5').dn.split(',')[1] === 'OU=MLH_系統管理' &&
      <i className="fa fa-envelope-o nav-link">
          <NavLink to="/backend">
              <div>後台管理</div>     
          </NavLink>
      </i>
  }   
 </li>


    </ul>


  </div>
</nav>

  
  
  
  
  </>
}

export default NavbarHead