import { useEffect } from "react";

/**
 * คอมโพเนนต์สำหรับแสดงผลและควบคุมค่าตัวเลข (Counter/Value Display)
 * ค่าจะถูกจัดการโดย State ภายนอกคอมโพเนนต์นี้ (Parent Component)
 *
 * @param {object} props - Properties ที่ส่งมาจาก Parent Component
 * @param {string} name - ชื่อที่จะแสดงบนส่วนหัว (เช่น "WIND SPEED")
 * @param {number} initial - ค่าเริ่มต้นที่ต้องการให้กำหนดเมื่อคอมโพเนนต์โหลด
 * @param {string} type - ชนิดของค่า ("real" สำหรับทศนิยม 2 ตำแหน่ง หรืออื่น ๆ สำหรับจำนวนเต็ม)
 * @param {number} value - ค่าปัจจุบันที่รับมาจาก State ภายนอก
 * @param {function} setValue - ฟังก์ชันสำหรับอัปเดตค่า (State Setter)
 */
const Value = ({ name, initial, type, value, setValue }) => {
  // ----------------------------------------------------
  // EFFECT HOOK: ตั้งค่าเริ่มต้น
  // ----------------------------------------------------
  useEffect(() => {
    // กำหนดค่าเริ่มต้นให้กับ State (setValue) เมื่อ initial หรือ setValue เปลี่ยน
    // ใช้ initial || 0 เพื่อให้แน่ใจว่ามีค่าเริ่มต้น
    setValue(initial || 0);
  }, [initial, setValue]); // Dependency Array: รันเมื่อ initial หรือ setValue เปลี่ยน

  // ----------------------------------------------------
  // RENDER: ส่วนประกอบที่แสดงผล
  // ----------------------------------------------------
  return (
    <div
      className="border border-black border-2 mx-auto rounded-3 p-2 bg-secondary-subtle mt-3"
      style={{ width: "100%" }}
    >
      {/* HEADER: แสดงชื่อของค่าที่ควบคุม */}
      <h1 className="text-primary text-center">{name || "VALUE"}</h1>

      {/* CONTROL SECTION: ปุ่มและค่าที่แสดงผล */}
      <div className="d-flex justify-content-center align-items-center gap-2">
        {/* BUTTON: ลดค่าลง 1 */}
        <button
          className="btn btn-danger"
          onClick={() => {
            // ใช้ Functional Update เพื่อลดค่าปัจจุบันลง 1
            setValue((p) => p - 1);
          }}
        >
          &minus; {/* สัญลักษณ์ลบ */}
        </button>

        {/* VALUE DISPLAY: แสดงค่าปัจจุบัน */}
        <div className="fs-3 fw-bold">
          {/* เงื่อนไขการแสดงผล:
              - ถ้า type เป็น "real" ให้แสดงเป็นทศนิยม 2 ตำแหน่ง (toFixed(2))
              - ถ้าไม่ใช่ ให้แสดงเป็นจำนวนเต็มที่ปัดเศษ (Math.round) */}
          {type === "real" ? value.toFixed(2) : Math.round(value)}
        </div>

        {/* BUTTON: เพิ่มค่าขึ้น 1 */}
        <button
          className="btn btn-success"
          onClick={() => {
            // ใช้ Functional Update เพื่อเพิ่มค่าปัจจุบันขึ้น 1
            setValue((p) => p + 1);
          }}
        >
          + {/* สัญลักษณ์บวก */}
        </button>
      </div>
    </div>
  );
};
export default Value;