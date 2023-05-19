import React from 'react'


import data from './adjust_format.json'
import { AiFillCheckSquare  } from "react-icons/ai";
import {MdOutlineDangerous} from "react-icons/md";
import {encryptStorage1} from '../App'


const ApplyEC2TableSingle = ({demand,server_name
  ,ami,instance_type,APPLY_DATE,subnet
  ,ip}) => {
   


    let new_OS = data[0][ami]
    let new_RESOURCE= data[1][instance_type]
    




    return <>
          <tr>

             <td>
                  {demand}
             </td>
             <td>{encryptStorage1.getItem('query5').cn}</td>
             <td>{encryptStorage1.getItem('query5').dn.split(",")[1].split('_')[1]}</td>
              <td>{server_name}</td>
              <td>{new_OS}</td>
              <td>{new_RESOURCE}</td>
              <td>{subnet}</td>
              {ip === true ? 

              <td><AiFillCheckSquare /></td>
              :<td><MdOutlineDangerous /></td>
            }
      

  
              
        </tr>



         



  </>
}

export default ApplyEC2TableSingle