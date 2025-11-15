import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

const AppFooter = () => {
  /* สีประจำมหาวิทยาลัยศรีปทุม (SPU) */
  const spuColor = "#E91E63"; 

  return (
    /* Container หลักของ Footer */
    <div className="border-top py-4 text-center bg-light mt-auto">
      
      {/* โลโก้/Badge SPU / SIT / CSI */}
      <div className="d-flex justify-content-center gap-3 mb-3">
        {/* Badge SPU (ใช้สีชมพู SPU) */}
        <span 
          className="badge text-white fs-6 py-2 px-3 fw-bold rounded-pill shadow-sm"
          style={{ backgroundColor: spuColor }} 
        >
          SPU
        </span>
        
        {/* Badge SIT */}
        <span className="badge bg-dark text-white fs-6 py-2 px-3 fw-bold rounded-pill shadow-sm">
          SIT
        </span>
        
        {/* Badge CSI */}
        <span className="badge bg-dark text-white fs-6 py-2 px-3 fw-bold rounded-pill shadow-sm">
          CSI
        </span>
      </div>
      
      {/* ลิงก์ Instagram */}
      <a
        href="https://www.instagram.com/_nicetomeetyou.u"
        target="_blank"
        className="text-decoration-none text-dark fw-medium"
      >
        <i 
            className="bi bi-instagram me-1"
        ></i> 
        <span className="text-dark fw-bold">_nicetomeetyou.u</span>
      </a>

    </div>
  );
};

export default AppFooter;