import React from 'react'

const Footer = () => {
  return <>
     

        <div className="before-footer-space">

        </div>
      
        <footer className="last-footer">
        {/* <div class="text-center p-3 bg-dark" style={{background: "rgba(0, 0, 0, 20)"}}> */}
        <div className="text-center p-3" style={{background: "#232F3E"}}> 
                <span>©{(new Date().getFullYear())}系統管理課</span>
        </div>

                
        </footer>

        
  </>
  
}

export default Footer