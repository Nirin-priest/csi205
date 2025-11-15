import React, { useState } from "react";

// ค่าสูงสุดที่ตัวนับนี้จะเข้าถึงได้ (4095)
// ในเลขฐานต่างๆ: HEX = FFF, BIN = 111111111111 (12 bits)
const MAX_VALUE = 4095;

// คอมโพเนนต์ RadixCounter: แสดงตัวนับในรูปของเลขฐานต่างๆ (16, 10, 8, 2)
const RadixCounter = () => {
  // State สำหรับเก็บค่าตัวเลขทศนิยมปัจจุบัน
  const [value, setValue] = useState(MAX_VALUE); // ตั้งค่าเริ่มต้นเป็น 4095

  // ฟังก์ชันจัดการเมื่อปุ่มลบถูกคลิก
  const minusClicked = () => {
    // ถ้าค่าปัจจุบันน้อยกว่าหรือเท่ากับ 0 ให้วนกลับไปที่ค่าสูงสุด (4095)
    if (value <= 0) {
      setValue(MAX_VALUE);
    } else {
      // ลดค่าลง 1
      setValue((prev) => prev - 1);
    }
  };

  // ฟังก์ชันจัดการเมื่อปุ่ม RESET ถูกคลิก
  const resetClicked = () => {
    setValue(0); // ตั้งค่ากลับไปเป็น 0
  };

  // ฟังก์ชันจัดการเมื่อปุ่มบวกถูกคลิก
  const plusClicked = () => {
    // ถ้าค่าปัจจุบันถึงค่าสูงสุด (4095) ให้วนกลับไปที่ 0
    if (value >= MAX_VALUE) {
      setValue(0);
    } else {
      // เพิ่มค่าขึ้น 1
      setValue((prev) => prev + 1);
    }
  };

  return (
    // container หลักของคอมโพเนนต์
    <div
      className="border border-2 border-black rounded-3 p-3 m-auto"
      style={{ width: "400px" }}
    >
      {/* title ของตัวนับ */}
      <div className="text-center fw-bold fs-4">RADIX COUNTER</div>

      {/* ส่วนแสดงค่าในเลขฐานต่างๆ */}
      <div className="d-flex justify-content-between my-3">

        {/* 1. เลขฐานสิบหก (HEX / Radix 16) */}
        <div className="text-center">
          <div className="fw-bold">[HEX]</div>
          <div className="font-monospace">
            {/* แปลงเป็นฐาน 16, แปลงเป็นตัวพิมพ์ใหญ่, เติม 0 นำหน้าให้ครบ 3 หลัก (FFF) */}
            {value.toString(16).toUpperCase().padStart(3, "0")}
          </div>
        </div>

        {/* 2. เลขฐานสิบ (DEX / Radix 10) */}
        <div className="text-center">
          <div className="fw-bold">[DEX]</div>
          <div className="font-monospace text-primary fw-bold">
            {/* แปลงเป็นฐาน 10, เติม 0 นำหน้าให้ครบ 4 หลัก (4095) */}
            {value.toString().padStart(4, "0")}
          </div>
        </div>

        {/* 3. เลขฐานแปด (OCT / Radix 8) */}
        <div className="text-center">
          <div className="fw-bold">[OCT]</div>
          <div className="font-monospace">
            {/* แปลงเป็นฐาน 8, เติม 0 นำหน้าให้ครบ 4 หลัก (7777) */}
            {value.toString(8).padStart(4, "0")}
          </div>
        </div>

        {/* 4. เลขฐานสอง (BIN / Radix 2) */}
        <div className="text-center">
          <div className="fw-bold">[BIN]</div>
          <div className="font-monospace">
            {/* แปลงเป็นฐาน 2, เติม 0 นำหน้าให้ครบ 12 หลัก (12 bits) */}
            {value.toString(2).padStart(12, "0")}
          </div>
        </div>
      </div>

      {/* ส่วนปุ่มควบคุม */}
      <div className="d-flex justify-content-around">
        {/* ปุ่มลบ */}
        <button className="btn btn-danger px-4" onClick={minusClicked}>
          &minus;
        </button>
        {/* ปุ่ม RESET */}
        <button className="btn btn-secondary px-4" onClick={resetClicked}>
          RESET
        </button>
        {/* ปุ่มบวก */}
        <button className="btn btn-success px-4" onClick={plusClicked}>
          +
        </button>
      </div>
    </div>
  );
};

export default RadixCounter;