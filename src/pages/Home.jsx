import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
/* ต้องมั่นใจว่ามีการ import CSS ของ Bootstrap Icons ใน Component หลัก/index.html 
   เนื่องจาก Link Tag ถูกวางไว้ในส่วน return ซึ่งไม่ใช่วิธีที่เหมาะสมสำหรับ React */

const Home = () => {
  /* ข้อมูลทางวิชาการที่ใช้แสดงใน Card */
  const academicInfo = [
    {
      label: "ชื่อ-นามสกุล",
      value: "นิรินทร์ เทพวิสุทธิพันธุ์",
      icon: "bi-person-fill",
      color: "text-dark"
    },
    {
      label: "รหัสนักศึกษา",
      value: "67132694",
      icon: "bi-credit-card-fill",
      color: "text-secondary"
    },
    {
      label: "สาขา",
      value: "วิทยาการคอมพิวเตอร์และนวัตกรรมการพัฒนาซอฟต์แวร์",
      icon: "bi-code-square",
      color: "text-primary"
    },
    {
      label: "คณะ",
      value: "เทคโนโลยีสารสนเทศ",
      icon: "bi-building-fill",
      color: "text-success"
    },
    {
      label: "มหาวิทยาลัย",
      value: "มหาวิทยาลัยศรีปทุม",
      icon: "bi-mortarboard-fill",
      color: "text-danger"
    },
  ];

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="container p-0 my-5" style={{ maxWidth: "800px" }}>
        {/* Card หลักสำหรับแสดง Profile */}
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          {/* ส่วนหัว Card (Header) */}
          <div className="bg-dark text-white text-center py-3">
            <h2 className="mb-0 fw-bold text-uppercase">
              <i className="bi bi-file-person me-2"></i>
              Profile Details
            </h2>
          </div>

          <div className="row g-0">
            {/* คอลัมน์ด้านซ้าย: รูปภาพและชื่อย่อ */}
            <div className="col-md-4 p-4 bg-light border-end d-flex flex-column align-items-center">
              {/* รูป Profile */}
              <img
                src="./img/MyPhoto.jpg"
                alt="Profile"
                className="shadow-sm mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center",
                  border: '3px solid #dee2e6'
                }}
              />
              {/* ชื่อ */}
              <h5 className="fw-bold text-dark text-center">
                นิรินทร์
              </h5>
              {/* ตำแหน่งย่อ */}
              <p className="text-muted text-center mb-0" style={{ fontSize: '0.9rem' }}>
                นักศึกษา CSI205
              </p>
            </div>
            {/* คอลัมน์ด้านขวา: รายละเอียดทางวิชาการ */}
            <div className="col-md-8 p-5 bg-white">
              {/* หัวข้อ Academic Information */}
              <h4 className="mb-4 text-dark border-bottom pb-2 fw-bold">
                <i className="bi bi-card-list me-2 text-primary"></i>
                Academic Information
              </h4>

              {/* Loop แสดงข้อมูลจาก academicInfo array */}
              <div className="row g-3">
                {academicInfo.map((item, index) => (
                    <div key={index} className="col-12">
                        <div className="d-flex align-items-center border-bottom pb-3">
                            <i className={`bi ${item.icon} fs-4 me-3 ${item.color}`} style={{ width: '30px' }}></i>
                            <div>
                                {/* Label (ชื่อหัวข้อ) */}
                                <small className="text-muted d-block fw-light text-uppercase" style={{ fontSize: '0.75rem' }}>
                                    {item.label}
                                </small>
                                {/* Value (ค่าของข้อมูล) */}
                                <span className="fw-semibold text-dark">
                                    {item.value}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;