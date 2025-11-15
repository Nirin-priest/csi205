import { useState } from 'react';

/**
 * คอมโพเนนต์ Temperature: แสดงและควบคุมอุณหภูมิในสามหน่วย (Celsius, Fahrenheit, Kelvin)
 * การเปลี่ยนแปลงค่าใด ๆ จะถูกคำนวณกลับไปอัปเดตค่า State หลักคือ Celsius
 *
 * @param {object} props - Properties ที่ส่งมาจาก Parent Component
 * @param {string} name - ชื่อที่จะแสดงบนส่วนหัว (เช่น "Temperature")
 */
const Temperature = ({ name }) => {
  // ----------------------------------------------------
  // STATE HOOK: State หลักที่ใช้เก็บและควบคุมอุณหภูมิ (หน่วย Celsius)
  // ----------------------------------------------------
  const [celsius, setCelsius] = useState(25); // เก็บค่า Celsius ไว้, ค่าเริ่มต้นคือ 25°C

  // ----------------------------------------------------
  // DERIVED VALUES: คำนวณค่าหน่วยอื่น ๆ จาก Celsius โดยตรง
  // ----------------------------------------------------
  // สูตร Celsius -> Fahrenheit: F = (C * 9/5) + 32
  const fahrenheit = (celsius * 9/5) + 32;
  // สูตร Celsius -> Kelvin: K = C + 273.15
  const kelvin = celsius + 273.15;

  // ----------------------------------------------------
  // RENDER: ส่วนประกอบที่แสดงผล
  // ----------------------------------------------------
  return (
    <div
      className="border border-black border-2 mx-auto rounded-3 p-3 mt-3 bg-light"
      style={{ width: "fit-content" }}
    >
      {/* HEADER: หัวข้อหลัก */}
      <h1 className="text-primary text-center mb-3">{name || "TEMPERATURES"}</h1>

      {/* DISPLAY BADGES: แสดงค่าทั้ง 3 หน่วยที่คำนวณได้ */}
      <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
        {/* Badge: แสดง Celsius */}
        <div className="badge bg-primary fs-6 p-2">
          {celsius.toFixed(2)} °C
        </div>
        {/* Badge: แสดง Fahrenheit */}
        <div className="badge bg-primary fs-6 p-2">
          {fahrenheit.toFixed(2)} °F
        </div>
        {/* Badge: แสดง Kelvin */}
        <div className="badge bg-primary fs-6 p-2">
          {kelvin.toFixed(2)} °K
        </div>
      </div>

      {/* CONTROL SECTION: ส่วนปรับค่าสำหรับแต่ละหน่วย */}
      <div className="d-flex gap-3">
        {/* 1. CELSIUS CONTROL */}
        <div className="border border-secondary border-2 rounded-3 p-3 bg-secondary-subtle">
          <h2 className="text-center fw-bold fs-5 mb-3">CELSIUS</h2>
          <div className="d-flex justify-content-between align-items-center gap-2">
            {/* ปุ่มลด Celsius (C - 1) */}
            <button
              className="btn btn-danger"
              onClick={() => setCelsius(celsius - 1)}
            >
              &minus;
            </button>
            {/* ค่า Celsius ที่แสดงผล */}
            <div className="fs-3 fw-bold" style={{ minWidth: "100px", textAlign: "center" }}>
              {celsius.toFixed(2)}
            </div>
            {/* ปุ่มเพิ่ม Celsius (C + 1) */}
            <button
              className="btn btn-success"
              onClick={() => setCelsius(celsius + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* 2. FAHRENHEIT CONTROL */}
        <div className="border border-secondary border-2 rounded-3 p-3 bg-secondary-subtle">
          <h2 className="text-center fw-bold fs-5 mb-3">FAHRENHEIT</h2>
          <div className="d-flex justify-content-between align-items-center gap-2">
            {/* ปุ่มลด Fahrenheit (F - 1)
                - แปลง (Fahrenheit - 1) กลับเป็น Celsius: C = ((F - 1) - 32) * 5/9 */}
            <button
              className="btn btn-danger"
              onClick={() => setCelsius((fahrenheit - 1 - 32) * 5/9)}
            >
              &minus;
            </button>
            {/* ค่า Fahrenheit ที่แสดงผล */}
            <div className="fs-3 fw-bold" style={{ minWidth: "100px", textAlign: "center" }}>
              {fahrenheit.toFixed(2)}
            </div>
            {/* ปุ่มเพิ่ม Fahrenheit (F + 1)
                - แปลง (Fahrenheit + 1) กลับเป็น Celsius: C = ((F + 1) - 32) * 5/9 */}
            <button
              className="btn btn-success"
              onClick={() => setCelsius((fahrenheit + 1 - 32) * 5/9)}
            >
              +
            </button>
          </div>
        </div>

        {/* 3. KELVIN CONTROL */}
        <div className="border border-secondary border-2 rounded-3 p-3 bg-secondary-subtle">
          <h2 className="text-center fw-bold fs-5 mb-3">KELVIN</h2>
          <div className="d-flex justify-content-between align-items-center gap-2">
            {/* ปุ่มลด Kelvin (K - 1)
                - แปลง (Kelvin - 1) กลับเป็น Celsius: C = (K - 1) - 273.15 */}
            <button
              className="btn btn-danger"
              onClick={() => setCelsius(kelvin - 1 - 273.15)}
            >
              &minus;
            </button>
            {/* ค่า Kelvin ที่แสดงผล */}
            <div className="fs-3 fw-bold" style={{ minWidth: "100px", textAlign: "center" }}>
              {kelvin.toFixed(2)}
            </div>
            {/* ปุ่มเพิ่ม Kelvin (K + 1)
                - แปลง (Kelvin + 1) กลับเป็น Celsius: C = (K + 1) - 273.15 */}
            <button
              className="btn btn-success"
              onClick={() => setCelsius(kelvin + 1 - 273.15)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temperature;