import React,{useContext,useState} from 'react'
import { EC2Context } from './CreateEC2'
import {encryptStorage1} from '../App'
//import $ from 'jquery'; 


const EC2Form = ({demand,demand_default,server_name_default,os_default,resource_default,subnet_default,check_default,
  demand_ChangeHandler,ec2_Name_ChangeHandler,os_ChangeHandler,instance_type_ChangeHandler,handle_Submit,
  cancel,ip_ChangeHandler,subnet_ChangeHandler,subnet}) => {

const receiveData = useContext(EC2Context)
console.log(receiveData)




  return <>
      
 


      
      <div className="modal fade form_modal" id="form_modal" tabIndex="-1" data-backdrop="static" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        
        <div className="modal-dialog modal-lg">
          <div className="modal-content the_modal-content">
          <button data-dismiss="modal" className="close" type="button" onClick={() => cancel()}>
              <span aria-hidden="true">&times;</span>
          </button>
              <form className="form" method="POST" id="the_form" onSubmit={handle_Submit}>
    
                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="user_displayName">申請人</label>
                          <input type="text" value={encryptStorage1.getItem('query5').cn} disabled={true} name="user_displayName" className="form-control" id="user_displayName"/>
                        </div>
                      </div> 

                      <div className="form-row the_form-row">
                        <div className="form-group  the_form-group">
                          <label htmlFor="employee_numnber">申請人員編</label>
                          <input type="text" value={encryptStorage1.getItem('query5').sAMAccountName} disabled={true} name="employee_numnber" className="form-control" id="employee_numnber"/>
                        </div>
                      </div> 

                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="employee_department">申請人部門</label>
                          <input type="text" value={encryptStorage1.getItem('query5').dn.split(",")[1].split('_')[1]} disabled={true} name="employee_numnber" className="form-control" id="employee_department"/>
                        </div>
                      </div> 
                   
                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="demand">需求單單號</label>
                          {
                            demand ? <input type="text" value={demand} name="demand" className="form-control" id="demand" onChange={demand_ChangeHandler} ref={demand_default}/>
                            :   <input type="text" name="demand" value="" className="form-control" id="demand" onChange={demand_ChangeHandler} ref={demand_default}/>
                          }
                        
                        </div>
                      </div> 


                      <div className="form-row the_form-row">
                        <div className="form-group  the_form-group">
                          <label htmlFor="EC2_name">雲端主機名稱</label>
                          <input type="text" name="EC2_name" className="form-control" id="EC2_name" onChange={ec2_Name_ChangeHandler} ref={server_name_default}/>
                        </div>
                      </div>                 

                      <div className="form-row the_form-row">
                        <div className="form-group  the_form-group">
                          <label htmlFor="ami">雲端主機作業系統</label>
                          <select name="ami" id="ami" className="form-control" onChange={os_ChangeHandler} ref={os_default}>
                            <option value="ami-006e00d6ac75d2ebb">Ubuntu 20.04 LTS</option>
                            <option value="ami-007855ac798b5175e">Ubuntu 22.04 LTS</option>
                            <option value="ami-00c39f71452c08778">Amazon Linux 2023 </option>
                          </select>
                        </div>
                      
                      </div>
                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="instance_type">雲端主機規格</label>
                          <select name="subnet" id="instance_type" className="form-control" onChange={instance_type_ChangeHandler} ref={resource_default}>
                              <option value="t1.micro">1vCPU 0.612GB Mem</option>
                              <option value="t2.nano">1vCPU 0.5GB Mem</option>
                              <option value="t2.micro">1vCPU 1GB Mem</option>
                          </select>
                        </div>
                    
                      </div>


                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="instance_type">雲端主機磁碟</label>
                          <select name="subnet" id="instance_type" className="form-control" onChange={instance_type_ChangeHandler} ref={resource_default}>
                              <option value="t1.micro">1vCPU 0.612GB Mem</option>
                              <option value="t2.nano">1vCPU 0.5GB Mem</option>
                              <option value="t2.micro">1vCPU 1GB Mem</option>
                          </select>
                        </div>
                    
                      </div>

                      <div className="form-row the_form-row">
                        <div className="form-group the_form-group">
                          <label htmlFor="subnet">網段</label>
                          <select name="subnet" id="subnet" className="form-control" onChange={subnet_ChangeHandler} ref={subnet_default}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="DMZ1">DMZ1</option>
                            <option value="DMZ2">DMZ2</option>
                          </select>
                        </div>
                   
          
                      </div>
                     
                      
                      {(subnet === 'DMZ1' || subnet === 'DMZ2') &&
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <div className="form-check">
                              
                                <label className="form-check-label" htmlFor="exampleCheck1">對外IP</label>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={ip_ChangeHandler} ref={check_default} />
                          </div>

                        </div>
                       
                    

                      </div>
                    }
            
                      <div className="button-group">
                        <button type="submit" id="save" className="btn btn-primary">儲存</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => cancel()}>取消</button>

                      </div>
                      
              </form>
          </div>
        </div>
      </div>


    


</>
}

export default EC2Form