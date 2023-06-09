import React,{useContext,useRef} from 'react'
import { EC2Context } from './CreateEC2'
//import $ from 'jquery'; 


const EC2Form = ({server_name_default,os_default,resource_default,subnet_default,check_default,os_ChangeHandler,instance_type_ChangeHandler,handle_Submit,cancel,ec2_Name_ChangeHandler,ip_ChangeHandler,subnet_ChangeHandler}) => {
  

const receiveData = useContext(EC2Context)
console.log(receiveData)




  return <>
      
      <button type="button" className="main start" data-toggle="modal" data-target=".form_modal">開始建立主機</button>
      {receiveData.allEC2.length > 0 && 
      <button type="button" className="main">送出</button>
      }
      <div className="modal fade form_modal" id="form_modal" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
          <button data-dismiss="modal" className="close" type="button" onClick={() => cancel()}>
              <span aria-hidden="true">×</span>
          </button>
              <form className="form" method="POST" id="the_form" onSubmit={handle_Submit}>
    
    
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="EC2_name">雲端主機名稱</label>
                          <input type="text" name="EC2_name" className="form-control" id="EC2_name" onChange={ec2_Name_ChangeHandler} ref={server_name_default}/>
                        </div>
                      </div>
                      

                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="ami">雲端主機OS</label>
                          <select name="ami" id="instance_type" className="form-control" onChange={os_ChangeHandler} ref={os_default}>
                            <option value="ami-006e00d6ac75d2ebb">Ubuntu 20.04 LTS</option>
                            <option value="ami-007855ac798b5175e">Ubuntu 22.04 LTS</option>
                            
                            <option value="ami-00c39f71452c08778">Amazon Linux 2023 </option>
                          </select>
                        </div>
                      
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-4">
                          <label htmlFor="instance_type">雲端主機Resource</label>
                          <select name="subnet" id="instance_type" className="form-control" onChange={instance_type_ChangeHandler} ref={resource_default}>
                              <option value="t1.micro">1vCPU 0.612GB Mem</option>
                              <option value="t2.nano">1vCPU 0.5GB Mem</option>
                              <option value="t2.micro">1vCPU 1GB Mem</option>
                          </select>
                        </div>
                    
                      </div>

                      

                      <div className="form-row">
                        <div className="form-group col-md-4">
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
                     
                
                      {(receiveData.subnet === 'DMZ1' ||  receiveData.subnet === 'DMZ2') &&
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