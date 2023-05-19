import React from 'react'
import Logout from './Logout';
import {encryptStorage1} from '../App'
const EditEC2 = () => {
  return <>
    <div className='bar_ad_settings'>
      <div className="username">{
          encryptStorage1.getItem('query5').sAMAccountName + ' ' +
          encryptStorage1.getItem('query5').displayName
      }</div> 
      <Logout />
    </div>
    <div>1.如果aws管理者尚未從Jenkins建立完成EC2，可以讓USER去改申請內容</div>
    <div>2.如果aws管理者已經從Jenkins建立完成EC2，不會讓USER去改申請內容</div>

    </>
}

export default EditEC2