import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return <>
 
    <nav>
        <Link to='/'>主頁 </Link>
        <Link to='/ec2'>新建雲端主機 </Link>
        <Link to='/edit_ec2'>修改申請內容 </Link>
        <Link to='/show_ec2'>檢視申請內容 </Link>
    </nav>
    </>
}

export default Navbar