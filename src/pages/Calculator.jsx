import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Calculator = () => {
  /* State หลักของ Component */
  const [screen, setScreen] = useState("0");      /* ค่าที่แสดงบนหน้าจอ */
  const [operator, setOperator] = useState("?");  /* ตัวดำเนินการที่เลือก (+, -, *, /) */
  const [appState, setAppState] = useState("S0"); /* สถานะปัจจุบันของเครื่องคิดเลข (S0-S3) */
  const [number1, setNumber1] = useState(0);      /* ตัวเลขตัวแรกที่เก็บไว้ก่อนเลือก Operator */
  const [memory, setMemory] = useState(0);        /* ค่าในหน่วยความจำ (M) */

  /*
   * Logic การกดตัวเลข: จัดการการรับตัวเลขตามสถานะของเครื่องคิดเลข
   * S0: เริ่มต้น/ล้างค่า -> เริ่มป้อนตัวเลขใหม่ (S1)
   * S1: กำลังป้อน N1 หรือผลลัพธ์ล่าสุด -> ต่อท้ายตัวเลข (จำกัด 9 หลัก)
   * S2: ป้อน Operator แล้ว -> เริ่มป้อน N2 ใหม่ (S3)
   * S3: กำลังป้อน N2 -> ต่อท้ายตัวเลข (จำกัด 9 หลัก)
  */
  const numberClicked = useCallback(
    (number) => {
      if (appState === "S0") {
        setScreen(number.toString());
        setAppState("S1");
      } else if (appState === "S1") {
        setScreen((prevScreen) => {
          if (prevScreen.length < 9) {
            return prevScreen === "0"
              ? number.toString()
              : prevScreen + number.toString();
          }
          return prevScreen;
        });
      } else if (appState === "S2") {
        setScreen(number.toString());
        setAppState("S3");
      } else if (appState === "S3") {
        setScreen((prevScreen) => {
          if (prevScreen.length < 9) {
            return prevScreen + number.toString();
          }
          return prevScreen;
        });
      }
    },
    [appState]
  );

  /*
   * Logic การกด Operator (+, -, *, /)
   * S1/S3: เมื่อกด operator: เก็บค่าบนหน้าจอเป็น number1, ตั้ง operator, ย้ายไปสถานะรอป้อน N2 (S2)
  */
  const operatorClicked = useCallback(
    (_operator) => {
      if (appState === "S1" || appState === "S3") {
        setNumber1(Number(screen));
        setOperator(_operator);
        setAppState("S2");
      }
    },
    [appState, screen]
  );

  /*
   * Logic การกด Equal (=)
   * คำนวณผลลัพธ์: (number1 [operator] screen)
   * อัปเดต screen ด้วยผลลัพธ์
   * รีเซ็ต operator เป็น '?' และตั้งค่า number1 = result เพื่อให้สามารถคำนวณต่อเนื่องได้
  */
  const equalClicked = useCallback(() => {
    const number2 = Number(screen);
    let result = 0;

    if (operator === "+") {
      result = number1 + number2;
    } else if (operator === "-") {
      result = number1 - number2;
    } else if (operator === "*") {
      result = number1 * number2;
    } else if (operator === "/") {
      /* ป้องกันการหารด้วยศูนย์ */
      result = number2 !== 0 ? number1 / number2 : 0;
    } else {
      /* กรณีที่กด = โดยไม่มี operator ถูกเลือก */
      result = Number(screen);
    }

    setScreen(result.toString());
    setNumber1(result);
    setOperator("?");
    setAppState("S1"); /* ย้ายไปสถานะ S1 เพื่อรอรับ operator/number ต่อไป */
  }, [operator, number1, screen]);

  /* Logic การกด Clear Entry (CE): ล้างค่าทั้งหมดและกลับสู่สถานะเริ่มต้น (S0) */
  const ceClicked = useCallback(() => {
    setScreen("0");
    setOperator("?");
    setAppState("S0");
    setNumber1(0);
  }, []);

  /* Logic การกดจุดทศนิยม (.) */
  const decimalClicked = useCallback(() => {
    if (appState === "S0" || appState === "S2") {
      /* S0/S2: เริ่มต้นด้วย "0." แล้วเปลี่ยนสถานะไป S1/S3 ตามลำดับ */
      setScreen("0.");
      setAppState(appState === "S0" ? "S1" : "S3");
    } else if (
      /* S1/S3: อนุญาตให้เพิ่มจุดได้ถ้าหน้าจอยังไม่มีจุดทศนิยม */
      (appState === "S1" || appState === "S3") &&
      !screen.includes(".")
    ) {
      setScreen(screen + ".");
    }
  }, [appState, screen]);

  /* Logic การเปลี่ยนเครื่องหมาย (+/-) */
  const toggleSignClicked = useCallback(() => {
    if (appState === "S1" || appState === "S3") {
      const num = Number(screen);
      setScreen((num * -1).toString());
    }
  }, [appState, screen]);

  /* Logic การคำนวณเปอร์เซ็นต์ */
  const percentClicked = useCallback(() => {
    if (appState === "S1" || appState === "S3") {
      const num = Number(screen) / 100;
      setScreen(num.toString());
    }
  }, [appState, screen]);

  /* Logic การคำนวณรากที่สอง */
  const sqrtClicked = useCallback(() => {
    if (appState === "S1" || appState === "S3") {
      const num = Number(screen);
      if (num >= 0) {
        setScreen(Math.sqrt(num).toString());
      }
    }
  }, [appState, screen]);

  /* Logic การคำนวณส่วนกลับ (1/x) */
  const reciprocalClicked = useCallback(() => {
    if (appState === "S1" || appState === "S3") {
      const num = Number(screen);
      if (num !== 0) {
        setScreen((1 / num).toString());
      }
    }
  }, [appState, screen]);

  /* Memory: Clear (MC) */
  const memoryClear = useCallback(() => {
    setMemory(0);
  }, []);

  /* Memory: Recall (MR) */
  const memoryRecall = useCallback(() => {
    setScreen(memory.toString());
    setAppState("S1"); /* นำค่าจาก Memory มาที่หน้าจอ (เข้าสู่สถานะ S1) */
  }, [memory]);

  /* Memory: Add (M+) */
  const memoryAdd = useCallback(() => {
    setMemory(memory + Number(screen));
  }, [memory, screen]);

  /* Memory: Subtract (M-) */
  const memorySubtract = useCallback(() => {
    setMemory(memory - Number(screen));
  }, [memory, screen]);

  /*
   * Handler สำหรับการรับ Input จาก Keyboard
   * ตรวจสอบว่าปุ่มที่กดตรงกับตัวเลข/operator/control button หรือไม่
  */
  const checkkeyboard = useCallback(
    (event) => {
      if (event.key >= "0" && event.key <= "9") {
        numberClicked(Number(event.key));
      } else if (event.key === "+") {
        operatorClicked("+");
      } else if (event.key === "-") {
        operatorClicked("-");
      } else if (event.key === "*") {
        operatorClicked("*");
      } else if (event.key === "/") {
        operatorClicked("/");
      } else if (event.key === "Enter" || event.key === "=") {
        equalClicked();
      } else if (event.key === "Escape") {
        ceClicked();
      } else if (event.key === ".") {
        decimalClicked();
      }
    },
    [numberClicked, operatorClicked, equalClicked, ceClicked, decimalClicked]
  );

  /* useEffect: จัดการ Event Listener สำหรับ Keyboard Input */
  useEffect(() => {
    /* เพิ่ม Event Listener เมื่อ Component Mount */
    document.addEventListener("keydown", checkkeyboard);
    return () => {
      /* ลบ Event Listener เมื่อ Component Unmount (Cleanup) */
      document.removeEventListener("keydown", checkkeyboard);
    };
  }, [checkkeyboard]);

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <div className="border rounded-4 p-4 bg-white shadow-lg">
        {/* หน้าจอแสดงผล (Screen) */}
        <div
          id="screen"
          className="alert bg-light text-dark text-end fs-2 border-0 p-3 rounded-3 shadow-sm"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {screen}
        </div>

        {/* แถวปุ่ม Memory (MC, MR, M+, M-, CE) */}
        <div className="row g-2">
          <div className="col">
            <button className="btn btn-secondary w-100 fw-bold" onClick={memoryClear}>
              MC
            </button>
          </div>
          <div className="col">
            <button className="btn btn-secondary w-100 fw-bold" onClick={memoryRecall}>
              MR
            </button>
          </div>
          <div className="col">
            <button className="btn btn-secondary w-100 fw-bold" onClick={memoryAdd}>
              M+
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-secondary w-100 fw-bold"
              onClick={memorySubtract}
            >
              M-
            </button>
          </div>
          <div className="col">
            <button className="btn btn-outline-danger w-100 fw-bold" onClick={ceClicked}>
              CE
            </button>
          </div>
        </div>

        {/* แถวปุ่ม 7, 8, 9, /, sqrt */}
        <div className="row g-2 mt-2">
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(7)}
            >
              7
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(8)}
            >
              8
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(9)}
            >
              9
            </button>
          </div>
          <div className="col">
            <button
              className={`btn w-100 fw-bold ${
                operator === "/" ? "btn-info" : "btn-outline-info"
              }`}
              onClick={() => operatorClicked("/")}
            >
              &divide; {/* ปุ่มหาร */}
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light text-dark w-100 fw-bold border" disabled onClick={sqrtClicked}>
              &radic; {/* ปุ่มรากที่สอง */}
            </button>
          </div>
        </div>

        {/* แถวปุ่ม 4, 5, 6, *, % */}
        <div className="row g-2 mt-2">
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(4)}
            >
              4
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(5)}
            >
              5
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(6)}
            >
              6
            </button>
          </div>
          <div className="col">
            <button
              className={`btn w-100 fw-bold ${
                operator === "*" ? "btn-info" : "btn-outline-info"
              }`}
              onClick={() => operatorClicked("*")}
            >
              &times; {/* ปุ่มคูณ */}
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light text-dark w-100 fw-bold border" disabled onClick={percentClicked}>
              % {/* ปุ่มเปอร์เซ็นต์ */}
            </button>
          </div>
        </div>

        {/* แถวปุ่ม 1, 2, 3, -, 1/x */}
        <div className="row g-2 mt-2">
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(1)}
            >
              1
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(2)}
            >
              2
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(3)}
            >
              3
            </button>
          </div>
          <div className="col">
            <button
              id="minus"
              className={`btn w-100 fw-bold ${
                operator === "-" ? "btn-info" : "btn-outline-info"
              }`}
              onClick={() => operatorClicked("-")}
            >
              &minus; {/* ปุ่มลบ */}
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              disabled
              onClick={reciprocalClicked}
            >
              1/x {/* ปุ่มส่วนกลับ */}
            </button>
          </div>
        </div>

        {/* แถวปุ่ม 0, ., +/-, +, = */}
        <div className="row g-2 mt-2">
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={() => numberClicked(0)}
            >
              0
            </button>
          </div>
          <div className="col">
            <button className="btn btn-light text-dark w-100 fw-bold border" onClick={decimalClicked}>
              . {/* ปุ่มจุดทศนิยม */}
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-light text-dark w-100 fw-bold border"
              onClick={toggleSignClicked}
            >
              +/&minus; {/* ปุ่มเปลี่ยนเครื่องหมาย */}
            </button>
          </div>
          <div className="col">
            <button
              id="plus"
              className={`btn w-100 fw-bold ${
                operator === "+" ? "btn-info" : "btn-outline-info"
              }`}
              onClick={() => operatorClicked("+")}
            >
              + {/* ปุ่มบวก */}
            </button>
          </div>
          <div className="col">
            <button className="btn btn-success w-100 fw-bold" onClick={equalClicked}>
              = {/* ปุ่มเท่ากับ */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;