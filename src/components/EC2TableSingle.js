import React,{useContext} from 'react'

import {EC2Context} from './CreateEC2.js'
import data from './adjust_format.json'
import { AiFillCheckSquare  } from "react-icons/ai";
import {MdOutlineDangerous} from "react-icons/md";
import {FiMoreVertical} from "react-icons/fi";

const EC2TableSingle = ({ID,number,EC2NAME,OS,RESOURCE,APPLY_DATE,SUBNET,IP,deleteEC2}) => {
   //const [state,dispatch] = useReducer(reducer,defaultState)
  
    const receiveData = useContext(EC2Context)

   //console.log(receiveData.allEC2)


    let new_OS = data[0][OS]
    let new_RESOURCE= data[1][RESOURCE]
    




    return <>
          <tr>
              <th scope="row">
                  {number + 1}
             </th>
             
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
                      <a className="dropdown-item" href="#/" onClick={() => deleteEC2(ID)}>刪除</a>
                      <a className="dropdown-item" href="#/">修改</a>
                    </div>
              </td>
              
     



          </tr>



  </>
}

export default EC2TableSingle