import { useState } from "react";
import Value from "./Value"; // นำเข้าคอมโพเนนต์ Value สำหรับควบคุมค่า A และ B

/**
 * คอมโพเนนต์ Adder: รับผิดชอบในการจัดการ State ของตัวเลขสองตัว (A และ B)
 * และแสดงผลรวมของตัวเลขเหล่านั้น
 *
 * @param {object} props - Properties ที่ส่งมาจาก Parent Component
 * @param {string} name - ชื่อที่จะแสดงบนส่วนหัว (เช่น "Calculator")
 */
const Adder = ({ name }) => {
  // ----------------------------------------------------
  // STATE HOOKS: จัดการสถานะตัวเลข A และ B
  // ----------------------------------------------------
  const [a, setA] = useState(0); // State สำหรับตัวเลข A, ค่าเริ่มต้นคือ 0
  const [b, setB] = useState(0); // State สำหรับตัวเลข B, ค่าเริ่มต้นคือ 0

  // ----------------------------------------------------
  // RENDER: ส่วนประกอบที่แสดงผล
  // ----------------------------------------------------
  return (
    <div
      className="border border-black border-2 mx-auto mt-3 rounded-3 p-2 bg-light"
      style={{ width: "" }} // ควรเติมค่าความกว้างที่เหมาะสม เช่น "fit-content"
    >
      {/* HEADER: แสดงชื่อของคอมโพเนนต์ */}
      <h1 className="text-center text-primary">{name || "ADD"}</h1>

      {/* DISPLAY SECTION: แสดงค่า A, B, และผลรวม A + B */}
      <div className="d-flex justify-content-around align-items-center">
        {/* แสดงค่า A ปัจจุบัน */}
        <div className="badge bg-secondary"> A = {a} </div>
        {/* แสดงผลรวมของ A + B (คำนวณแบบ Real-time) */}
        <div className="badge bg-primary"> A + B = {a + b} </div>
        {/* แสดงค่า B ปัจจุบัน */}
        <div className="badge bg-secondary"> B = {b} </div>
      </div>

      {/* CONTROL SECTION: คอมโพเนนต์ Value สำหรับการควบคุมค่า A และ B */}
      <div className="d-flex gap-2">
        {/* Value Component สำหรับควบคุมค่า A */}
        <Value name={"A"} value={a} setValue={setA} />
        {/* Value Component สำหรับควบคุมค่า B */}
        <Value name={"B"} value={b} setValue={setB} />
      </div>
    </div>
  );
};

export default Adder;