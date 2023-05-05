import React from 'react'


import data from './adjust_format.json'
import { AiFillCheckSquare  } from "react-icons/ai";
import {MdOutlineDangerous} from "react-icons/md";
import {FiMoreVertical} from "react-icons/fi";

const ApplyEC2TableSingle = ({_id,demand,server_name
  ,ami,instance_type,APPLY_DATE,subnet
  ,ip,deleteEC2}) => {
   


    let new_OS = data[0][ami]
    let new_RESOURCE= data[1][instance_type]
    




    return <>
          <tr>

             <td>
                  {demand}
             </td>
             
              <td>{server_name}</td>
              <td>{new_OS}</td>
              <td>{new_RESOURCE}</td>
              <td>{subnet}</td>
              {ip === true ? 

              <td><AiFillCheckSquare /></td>
              :<td><MdOutlineDangerous /></td>
            }
      
              <td className="nav-item dropdown">
                    <a className="" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <FiMoreVertical />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#/" >修改</a> 
                      <a className="dropdown-item" href="#/" onClick={() => deleteEC2(_id)}>刪除</a>
                    </div>
              </td>
  
              
        </tr>



         



  </>
}

export default ApplyEC2TableSingle