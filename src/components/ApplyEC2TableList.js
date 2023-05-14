
import React,{ useEffect,useContext,useState } from 'react'
import EC2TableSingle from './EC2TableSingle'
import { ApplyEC2Context } from './ApplyEC2'
import {VscChevronLeft,VscChevronRight} from "react-icons/vsc";
import {AiOutlineFileSearch} from 'react-icons/ai'
import ApplyEC2TableSingle from './ApplyEC2TableSingle';

const ApplyEC2TableList = ({demand_apply,alert,tem_demand}) => {


  const receiveData = useContext(ApplyEC2Context)
  let demand_obj
  console.log(receiveData)



  try{
  demand_obj = JSON.parse(tem_demand);

  }catch(error){
    console.log(error)
  }
  


  return <>

   

            {receiveData.length > 0 &&
                <table className="table create">
                  <thead className="">
                    <tr>
                      <th scope="col">需求單單號</th>
                      <th scope="col">雲端主機名稱</th>
                      <th scope="col">雲端主機作業系統</th>
                      <th scope="col">雲端主機規格</th>
                      <th scope="col">網段</th>
                      <th scope="col">對外IP</th>
                    </tr>
                  </thead>
                  <tbody>

                        {receiveData.map((ec2,index) => {
                        
                              return <ApplyEC2TableSingle key={ec2._id} {...ec2}/>
                            
                            
                        })


                        }

                  </tbody>
                </table>
            }

            { alert &&
           <div className="modal fade" id="apply_demand_ModalCenter" tabIndex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
           <div className="modal-dialog modal-dialog-centered" role="document">
             <div className="modal-content">
               <div className="modal-header">
                 <h5 className="modal-title" id="apply_demand_title">提示</h5>
                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
               <div className="modal-body">
                 無需求單號{demand_obj.demand}
               </div>
               <div className="modal-footer">
                 <button type="button" className="btn btn-secondary" data-dismiss="modal">關閉</button>
           
               </div>
             </div>
           </div>
         </div>

            }
   
 




  

  
  
  </>
    
  
}

export default ApplyEC2TableList