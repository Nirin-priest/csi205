import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

const Animation = () => {
  /* ค่าคงที่สำหรับขนาดสนามและลูกบอล */
  const fieldWidth = 720; 
  const fieldHeight = 400; 
  const ballDiameter = 100; 
  /* คำนวณขอบเขตสูงสุดที่ลูกบอลจะไปได้ */
  const maxX = fieldWidth - ballDiameter - 2; 
  const maxY = fieldHeight - ballDiameter - 2;

  /* State สำหรับตำแหน่งลูกบอล (x, y) และทิศทางการเคลื่อนที่ */
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  /* State สำหรับสถานะการทำงาน (เริ่ม/หยุด) และรูปภาพที่เลือก */
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState("None");

  const intervalRef = useRef(null);

  /* useEffect สำหรับจัดการ Animation Loop */
  useEffect(() => {
    if (running) {
      /* ตั้งค่า Interval เพื่ออัปเดตตำแหน่งทุก 20ms */
      intervalRef.current = setInterval(() => {
        /* อัปเดตตำแหน่งแนวนอน (X) */
        setX((prevX) => {
          let newX = prevX + (goRight ? 5 : -5); 
          /* ตรวจสอบการชนขอบแนวนอนและสลับทิศทาง */
          if (newX >= maxX) {
            setGoRight(false);
            newX = maxX;
          } else if (newX <= 0) {
            setGoRight(true);
            newX = 0;
          }
          return newX;
        });

        /* อัปเดตตำแหน่งแนวตั้ง (Y) */
        setY((prevY) => {
          let newY = prevY + (goDown ? 5 : -5);
          /* ตรวจสอบการชนขอบแนวตั้งและสลับทิศทาง */
          if (newY >= maxY) {
            setGoDown(false);
            newY = maxY;
          } else if (newY <= 0) {
            setGoDown(true);
            newY = 0; 
          }
          return newY;
        });
      }, 20); 
    } else {
      clearInterval(intervalRef.current);
    }
    /* Cleanup: ล้าง Interval เมื่อ Component ถูกถอดออกหรือ `running` เปลี่ยน */
    return () => clearInterval(intervalRef.current);
  }, [running, goRight, goDown, maxX, maxY]);

  /* Handlers สำหรับปุ่มควบคุม */
  const toggleRun = () => setRunning((r) => !r);
  const selectBall = (name) => setSelected(name);

  /* Style แบบ Dynamic สำหรับลูกบอล (กำหนดตำแหน่งและรูปภาพ) */
  const ballStyle = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    width: `${ballDiameter}px`,
    height: `${ballDiameter}px`,
    borderRadius: "50%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    /* กำหนดสีพื้นหลัง/รูปภาพตาม state `selected` */
    backgroundColor: selected === "None" ? "#343a40bb" : "transparent",
    backgroundImage:
      selected === "Basketball"
        ? "url(./img/Basketball.png)"
        : selected === "Football"
        ? "url(./img/Football.png)"
        : selected === "Volleyball"
        ? "url(./img/Volleyball.png)"
        : selected === "Human"
        ? "url(./img/MyPhoto.jpg)"
        : selected === "Cartoon"
        ? "url(./img/Cartoon.png)"
        : selected === "Logo"
        ? "url(./img/Logo.png)"
        : "none",
  };

  const buttons = [
    "None",
    "Basketball",
    "Football",
    "Volleyball",
    "Human",
    "Cartoon",
    "Logo",
  ];

  return (
    <div className="container p-5 my-5 rounded-4 bg-white shadow-lg border border-light" style={{maxWidth: '960px'}}>
      
      {/* ส่วนหัว Component */}
      <h2 className="text-center mb-5 text-dark text-uppercase border-bottom border-secondary pb-3 fw-bold">
        A N I M A T I O N
      </h2>

      {/* สนาม Animation (Field) */}
      <div
        id="field"
        className="anim-field position-relative border border-2 border-secondary rounded-3 mx-auto mb-4 bg-white shadow-sm"
        style={{ width: fieldWidth, height: fieldHeight, overflow: "hidden" }}
      >
        {/* ลูกบอลที่กำลังเคลื่อนไหว */}
        <div id="ball" style={ballStyle}></div>
      </div>

      {/* แผงควบคุม (ปุ่ม Start/Pause และ ปุ่มเลือกรูปภาพ) */}
      <div className="anim-control p-3 rounded-3 bg-dark d-flex justify-content-between align-items-center gap-3">
        
        {/* ปุ่ม Start/Pause */}
        <button
          id="run"
          onClick={toggleRun}
          className={`btn btn-lg ${
            running ? "btn-warning text-dark" : "btn-primary"
          } text-uppercase fw-bold rounded-3 shadow-sm`}
          style={{ width: "160px", height: "50px" }} 
        >
          <i className={`bi ${running ? "bi-pause-circle-fill" : "bi-play-circle-fill"}`}></i>
          &nbsp;
          {running ? "P A U S E" : "S T A R T"}
        </button>

        {/* ปุ่มเลือกรูปภาพ */}
        <div className="d-flex justify-content-end gap-2">
          {buttons.map((name) => (
            <button
              key={name}
              className={`btn btn-sm text-capitalize fw-medium ${
                selected === name
                  ? "btn-light text-dark shadow-sm"
                  : "btn-outline-secondary"
              } rounded-pill`}
              onClick={() => selectBall(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Animation;