import React from 'react'

const EmptyTableList = () => {
  return <>
          <table className="table create">
          <thead className="">
            <tr>
              <th scope="col">項次</th>
              <th scope="col">雲端主機名稱</th>
              <th scope="col">雲端主機OS</th>
              <th scope="col">雲端主機Resource</th>
              <th scope="col">網段</th>
              <th scope="col">對外IP</th>
              <th scope="col">進階</th>
            </tr>
          </thead>
          <tbody className='s'>
                <td className='no-data'>無資料</td>
    
          </tbody>
        </table>
  
  </>

}

export default EmptyTableList