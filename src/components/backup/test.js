import React from 'react'

const test = () => {
  return (
    <nav>
    <ul className='pagination'>
        <li className='page-item'>
          <a href="#/" className='page-link' onClick={prePage}>Prev</a>
        </li>

        {
          numbers.map((number,index) => {
            return <>
     
            <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={index}>
                <a href="#/" className='page-link' onClick={() => changePage(number)}>{number}</a>
            </li>

            </>
          })
        }
        <li className='page-item'>
          <a href="#/" className='page-link' onClick={nextPage}>Next</a>
        </li>
    </ul>
  </nav>
  )
}

export default test