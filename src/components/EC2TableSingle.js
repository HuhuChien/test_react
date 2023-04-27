import React from 'react'


import data from './adjust_format.json'
import { AiFillCheckSquare  } from "react-icons/ai";
import {MdOutlineDangerous} from "react-icons/md";
import {FiMoreVertical} from "react-icons/fi";

const EC2TableSingle = ({ID,DEMAND,EC2NAME,OS,RESOURCE,APPLY_DATE,SUBNET,IP,deleteEC2,editEC2}) => {
   


    let new_OS = data[0][OS]
    let new_RESOURCE= data[1][RESOURCE]
    




    return <>
          <tr>
              {/* <th scope="row">
                  {DEMAND}
             </th> */}

             <td>
                  {DEMAND}
             </td>
             
              <td>{EC2NAME}</td>
              <td>{new_OS}</td>
              <td>{new_RESOURCE}</td>
              <td>{SUBNET}</td>
              {IP === true ? 

              <td><AiFillCheckSquare /></td>
              :<td><MdOutlineDangerous /></td>
            }
      

     
             <td className="nav-item dropdown">
                    <a className="" href="#/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <FiMoreVertical />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#/" onClick={() => editEC2(ID)}>修改</a> 
                      <a className="dropdown-item" href="#/" onClick={() => deleteEC2(ID)}>刪除</a>
                    </div>
              </td>
              
        </tr>



         



  </>
}

export default EC2TableSingle