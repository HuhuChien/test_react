import React from 'react'
import data from './adjust_format.json'
import SearchEC2TableSingle from './SearchEC2TableSingle'


const SearchEC2TableList = ({query3,deleteEC2,editEC2}) => {
  
  

  return <>
          <table className="table create">
          <thead className="">
            <tr>
              <th scope="col">需求單單號</th>
              <th scope="col">雲端主機名稱</th>
              <th scope="col">雲端主機OS</th>
              <th scope="col">雲端主機Resource</th>
              <th scope="col">網段</th>
              <th scope="col">對外IP</th>
              <th scope="col">進階</th>
            </tr>
          </thead>
          <tbody>
                {query3.map((ec2,index) => {
                    console.log(ec2)
          
                      return <SearchEC2TableSingle key={ec2.ID} {...ec2} number={index} deleteEC2={deleteEC2} editEC2={editEC2} />
                    
                    
                })


                }

          </tbody>
        </table>
  
  </>
    
  
}

export default SearchEC2TableList