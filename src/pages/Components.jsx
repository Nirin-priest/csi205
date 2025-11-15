import { useState } from "react";
// นำเข้าคอมโพเนนต์ย่อยที่ถูกใช้ในหน้านี้
import Value from "../components/Value.jsx";
import Adder from "../components/Adder.jsx";
import Timer from "../components/Timer.jsx";
import Temperatures from "../components/Temperatures.jsx";

/**
 * คอมโพเนนต์ Components: เป็นคอนเทนเนอร์หลักสำหรับรวมคอมโพเนนต์ย่อยหลายตัว
 * และแสดงผลในรูปแบบ Layout ที่กำหนด
 *
 * (สมมติว่า Temperatures คือชื่อที่ถูกต้องสำหรับคอมโพเนนต์ Temperature ที่เคยส่งมา)
 */
const Components = () => {
  // ----------------------------------------------------
  // STATE HOOK: จัดการสถานะของตัวนับ (Counter) หลัก
  // ----------------------------------------------------
  const [counter, setCounter] = useState(0); // State สำหรับ Counter หลัก

  // ----------------------------------------------------
  // RENDER: ส่วนประกอบที่แสดงผล
  // ----------------------------------------------------
  return (
    <div className="text-center my-3">
      {/* OUTER CONTAINER: กรอบหลักพร้อมพื้นหลัง */}
      <div
        className="border mx-auto p-5 rounded-4"
        style={{
          width: "1000px",
          // กำหนดภาพพื้นหลัง
          backgroundImage: "url('./img/bgPageComponents.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* HEADER: ชื่อหัวข้อของหน้า */}
        <h2 className="bg-dark text-light d-inline-block p-1 rounded-2">
          REACT COMPONENTS
        </h2>

        {/* COMPONENT LAYOUT: จัดเรียงคอมโพเนนต์ย่อย */}
        <div className="mx-auto" style={{ width: "fit-content" }}>
          {/* แถวบน: จัดกลุ่ม Value, Timer, และ Adder ให้อยู่ในแถวเดียวกัน */}
          <div className="d-flex gap-3">
            {/* คอลัมน์ซ้าย: Value และ Timer */}
            <div>
              {/* Value Component: ส่ง State หลัก (counter) ไปจัดการ */}
              <Value name={"COUNTER"} value={counter} setValue={setCounter} />
              {/* Timer Component: แสดง Timer */}
              <Timer />
            </div>
            {/* คอลัมน์ขวา: Adder */}
            <div className="flex-fill">
              {/* Adder Component: แสดงตัวบวกเลข (A + B) */}
              <Adder />
            </div>
          </div>

          {/* แถวล่าง: Temperatures */}
          <div>
            {/* Temperatures Component: แสดงตัวแปลงอุณหภูมิ */}
            <Temperatures />
          </div>
        </div>

        {/* FOOTER: ข้อมูลผู้สร้าง */}
        <p className="bg-dark text-light d-inline-block fw-bold fs-5 p-1 mt-3 rounded-2">
          67132694 นิรินทร์ เทพวิสุทธิพันธุ์
        </p>
      </div>
    </div>
  );
};

export default Components;