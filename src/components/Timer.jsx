import { useState, useEffect } from "react";

/**
 * คอมโพเนนต์ Timer: แสดงเวลาที่นับขึ้นและมีปุ่มควบคุม (Run/Pause, Reset)
 *
 * @param {object} props - Properties ที่ส่งมาจาก Parent Component
 * @param {string} name - ชื่อที่จะแสดงบนส่วนหัว (เช่น "Stopwatch")
 */
const Timer = ({ name }) => {
  // ----------------------------------------------------
  // STATE HOOKS: จัดการสถานะของ Timer
  // ----------------------------------------------------
  const [seconds, setSeconds] = useState(0); // ค่าจำนวนวินาทีปัจจุบัน
  const [running, setRunning] = useState(false); // สถานะการทำงาน (true: กำลังนับ, false: หยุด)

  // ----------------------------------------------------
  // EFFECT HOOK: จัดการการนับเวลา (Interval)
  // ----------------------------------------------------
  useEffect(() => {
    let interval = null;
    if (running) {
      // เริ่มนับเวลาเมื่อ running เป็น true
      interval = setInterval(() => {
        // ใช้ Functional Update: อัปเดต seconds โดยขึ้นอยู่กับค่าก่อนหน้า (s + 1)
        setSeconds((s) => s + 1);
      }, 1000); // นับทุก 1000 มิลลิวินาที (1 วินาที)
    }
    // Cleanup Function: เคลียร์ Interval เมื่อคอมโพเนนต์ถูกถอดออกหรือ running เปลี่ยน
    return () => clearInterval(interval);
  }, [running]); // Dependency Array: รัน Effect เมื่อ 'running' เปลี่ยนเท่านั้น

  // ----------------------------------------------------
  // FUNCTION: แปลงวินาทีเป็นรูปแบบเวลาที่อ่านง่าย
  // ----------------------------------------------------
  const convertToString = (seconds) => {
    const MINUTE_SECONDS = 60;
    const HOUR_SECONDS = 60 * MINUTE_SECONDS;
    const DAY_SECONDS = 24 * HOUR_SECONDS;

    // คำนวณ Days, Hours, Minutes, Seconds ที่เหลือ
    const days = Math.floor(seconds / DAY_SECONDS);
    const hours = Math.floor((seconds % DAY_SECONDS) / HOUR_SECONDS);
    const minutes = Math.floor((seconds % HOUR_SECONDS) / MINUTE_SECONDS);
    const secs = seconds % MINUTE_SECONDS;

    // คืนค่ารูปแบบ String ตามระยะเวลาที่นานที่สุดที่มีค่า (แสดง Days, Hours, Minutes, หรือ Seconds อย่างใดอย่างหนึ่ง)
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${secs}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // ----------------------------------------------------
  // DYNAMIC VARIABLES: กำหนด Class และ Label สำหรับปุ่ม Run/Pause
  // ----------------------------------------------------
  // กำหนด Class ของปุ่ม: btn-warning (เหลือง) เมื่อวิ่งอยู่, btn-success (เขียว) เมื่อหยุดอยู่
  const buttonClass = `btn ${running ? "btn-warning" : "btn-success"}`;
  // กำหนด Icon ของปุ่ม (bi-pause หรือ bi-play)
  const iconClass = running ? "bi bi-pause" : "bi bi-play";
  // กำหนด Label ของปุ่ม (Pause หรือ Run)
  const label = running ? "Pause" : "Run";

  // ----------------------------------------------------
  // EVENT HANDLERS: จัดการการคลิกปุ่ม
  // ----------------------------------------------------
  const runClick = () => {
    // สลับสถานะการทำงาน (toggle running state)
    setRunning(!running);
  };

  const resetClick = () => {
    // หยุดการทำงานและรีเซ็ตวินาทีเป็น 0
    setRunning(false);
    setSeconds(0);
  };

  // ----------------------------------------------------
  // RENDER: ส่วนประกอบที่แสดงผล
  // ----------------------------------------------------
  return (
    <div
      className="border border-black border-2 rounded-3 mx-auto p-2 bg-secondary-subtle mt-3"
      style={{ width: "fit-content" }}
    >
      {/* HEADER: แสดงชื่อ Timer */}
      <h1 className="text-primary text-center">{name || "TIMER"}</h1>

      {/* DISPLAY INPUT: ช่องแสดงผลเวลา */}
      <input
        className="form-control text-end fs-4 fw-bold px-2 mb-2"
        style={{ width: "11.5rem" }}
        readOnly={true}
        // แปลงค่า seconds เป็น String เพื่อแสดงผล
        value={convertToString(seconds)}
      />

      {/* CONTROL BUTTONS: ปุ่ม Reset และ Run/Pause */}
      <div className="d-flex justify-content-between">
        {/* RESET BUTTON */}
        <button className="btn btn-danger" onClick={resetClick}>
          <i class="bi bi-arrow-clockwise"></i>&nbsp;Reset
        </button>

        {/* RUN/PAUSE BUTTON */}
        <button
          className={buttonClass} // Class แบบ Dynamic (เขียว/เหลือง)
          onClick={runClick}
          style={{ width: "5.5rem" }} // กำหนดความกว้างคงที่เพื่อป้องกันปุ่มขยับ
        >
          <i className={iconClass}></i>&nbsp;{label} {/* Icon & Label แบบ Dynamic */}
        </button>
      </div>
    </div>
  );
};

export default Timer;