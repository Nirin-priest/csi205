import { useEffect, useRef, useState } from "react";
import { fetchTodos } from "../data/todos";
import { Form, Button, Table, Badge, Modal } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.min.css";


const Todos = () => {
  /* useRef สำหรับอ้างอิง Input ใน Modal */
  const newIdRef = useRef();
  const newTitleRef = useRef();
  
  /* todosRaw: รายการ Todo ทั้งหมด (ไม่ถูก Filter) */
  const [todosRaw, setTodosRaw] = useState([]);
  /* todos: รายการ Todo ที่ถูก Filter แล้ว (แสดงในตาราง) */
  const [todos, setTodos] = useState([]);
  /* State สำหรับการ Filter */
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  /* State สำหรับการแบ่งหน้า (Pagination) */
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [numPages, setNumPages] = useState(3);
  const [curPage, setCurPage] = useState(1);
  /* State สำหรับ Modal (เปิด/ปิด) */
  const [show, setShow] = useState(false);

  /* useEffect 1: โหลดข้อมูลเริ่มต้นเมื่อ Component ถูก Mount */
  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []); 

  /* useEffect 2: Filter ข้อมูลตาม `onlyWaiting` */
  useEffect(() => {
    if (onlyWaiting)
      setTodos(
        todosRaw.filter((todo) => {
          return !todo.completed; /* แสดงเฉพาะรายการที่ยังไม่เสร็จ */
        })
      );
    else setTodos(todosRaw);
  }, [todosRaw, onlyWaiting]);

  /* useEffect 3: คำนวณจำนวนหน้าทั้งหมด */
  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  /* useEffect 4: ปรับ Current Page ให้อยู่ในขอบเขตที่ถูกต้อง */
  useEffect(() => {
    if (numPages <= 0) setCurPage(0);
    else if (curPage > numPages) setCurPage(numPages);
    else if (curPage <= 0) setCurPage(1);
  }, [numPages, curPage]);

  /* Handler: เปลี่ยนสถานะ Todo เป็น 'Completed' */
  const waitingClicked = (id) => {
    setTodosRaw(prevTodosRaw => 
      prevTodosRaw.map(todo => 
        /* ค้นหา ID ที่ตรงกันและอัปเดต `completed` เป็น true */
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  /* Handler: ลบรายการ Todo ออกจาก todosRaw */
  const deleteClicked = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  /* Handlers สำหรับเปิด/ปิด Modal */
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* Handler: บันทึกรายการ Todo ใหม่ */
  const saveClicked = (id, title) => {
    if (title.trim() !== "") {
      /* เพิ่มรายการใหม่เข้าไปใน `todosRaw` */
      setTodosRaw([
        ...todosRaw,
        {
          userId: 1,
          id,
          title,
          completed: false,
        },
      ]);
    }
    /* ล้างค่าใน Input และปิด Modal */
    newIdRef.current.value = "";
    newTitleRef.current.value = "";
    handleClose();
  };

  return (
    <div className="container p-5 my-5 rounded-4 bg-white shadow-lg">
      
      {/* ส่วนหัว Component */}
      <h2 className="text-center mb-5 text-dark text-uppercase pb-3 fw-bold">
          todo list
      </h2>

      {/* Modal สำหรับเพิ่มรายการ Todo ใหม่ */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Todo Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* ID Field (Auto-calculated) */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Id</Form.Label>
              <Form.Control
                /* คำนวณ ID ใหม่ = Max ID ใน todosRaw + 1 */
                value={
                  todosRaw.reduce(
                    (prev, todo) => (todo.id > prev ? todo.id : prev),
                    -1
                  ) + 1
                }
                disabled={true}
                ref={newIdRef}
              />
            </Form.Group>
            {/* Title Field */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
            ></Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="New todos here!!! "
              autoFocus
              ref={newTitleRef}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {/* Close Button */}
          <Button variant="secondary" onClick={handleClose}>
            <i className="bi bi-x-circle-fill"></i> Close
          </Button>
          {/* Save Button */}
          <Button
            variant="primary"
            onClick={() =>
              saveClicked(
                Number(newIdRef.current.value),
                newTitleRef.current.value
              )
            }
          >
            <i className="bi bi-check-circle-fill"></i> Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* แผงควบคุม (Filter และ Items Per Page) */}
      <div className="p-3 mb-4 rounded-3 bg-light border">
        <Form>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              {/* Switch สำหรับ Filter: แสดงเฉพาะ Waiting */}
              <Form.Check
                type="switch"
                id="custom-switch"
                onChange={(e) => {
                  setOnlyWaiting(e.target.checked);
                }}
                checked={onlyWaiting} 
              />
              <span className="ms-2 me-3 fw-bold text-dark">
                  Filter:
              </span>
              {/* Badge แสดงสถานะ Filter */}
              <Badge bg={onlyWaiting ? "warning" : "primary"} className="fs-6">
                  <i className={`bi ${onlyWaiting ? "bi-clock" : "bi-list-task"}`}></i> 
                  &nbsp;{onlyWaiting ? "Waiting Only" : "Show All"}
              </Badge>
            </div>
            
            {/* Selector สำหรับ Items Per Page */}
            <Form.Select
              aria-label="Items per page selection"
              className="w-25"
              onChange={(e) => setItemsPerPage(e.target.value)}
              style={{ minWidth: '150px' }}
            >
              <option value={5}>5 items per page</option>
              <option value={10}>10 items per page</option>
              <option value={50}>50 items per page</option>
              <option value={100}>100 items per page</option>
            </Form.Select>
          </div>
        </Form>
      </div>


      {/* ตารางแสดงรายการ Todo */}
      <div>
        <Table striped bordered hover className="mt-3">
          {/* ส่วนหัวตาราง */}
          <thead className="table-dark text-white">
            <tr>
              <th className="text-center align-middle" style={{ width: "3rem" }}>
                ID
              </th>
              <th className="text-start align-middle">Title</th>
              <th className="text-end align-middle" style={{ width: "18rem" }}>
                Completed&nbsp;
                {/* ปุ่มเปิด Modal เพิ่มรายการใหม่ */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  <i className="bi bi-plus-lg"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* แสดงรายการ Todo ที่ถูก Filter และแบ่งหน้าแล้ว */}
            {
              todos
                /* Filter เพื่อแสดงเฉพาะข้อมูลในหน้าปัจจุบัน */
                .filter((todo, index) => {
                  return (
                    index >= (curPage - 1) * itemsPerPage &&
                    index <= curPage * itemsPerPage - 1
                  );
                })
                .map((todo) => {
                  return (
                    <tr key={todo.id}>
                      <td className="text-center align-middle">
                        <h5>
                          <Badge bg="secondary">{todo.id}</Badge>
                        </h5>
                      </td>
                      <td className="align-middle fw-medium">{todo.title}</td>
                      <td className="text-end align-middle">
                        {/* แสดงสถานะ "Done" หรือปุ่ม "Waiting" */}
                        {todo.completed ? (
                          <Badge bg="success" className="fs-6 py-2 px-3 me-2">
                            <i className="bi bi-check-circle-fill"></i> Done
                          </Badge>
                        ) : (
                          /* ปุ่มเปลี่ยนสถานะเป็น Completed */
                          <Button
                            variant="warning"
                            onClick={() => waitingClicked(todo.id)}
                            className="me-2 text-dark fw-medium"
                          >
                            <i className="bi bi-clock"></i> Waiting
                          </Button>
                        )}
                        
                        {/* ปุ่ม Delete */}
                        <Button
                          variant="danger"
                          onClick={() => deleteClicked(todo.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </Table>
      </div>

      
      {/* แผงควบคุมการแบ่งหน้า (Pagination Controls) */}
      <div className="text-center mt-4 p-3 border-top border-secondary bg-light rounded-bottom-4">
        {/* ปุ่ม First Page */}
        <Button
          variant="outline-dark"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          <i className="bi bi-chevron-bar-left"></i> 
        </Button>
        &nbsp;
        {/* ปุ่ม Previous Page */}
        <Button
          variant="outline-primary"
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
          disabled={curPage === 1}
        >
          <i className="bi bi-chevron-left"></i>
        </Button>
        &nbsp;
        {/* แสดงหน้าปัจจุบัน / จำนวนหน้าทั้งหมด */}
        <Badge bg="dark" className="fs-6 py-2 px-3 align-middle mx-1">
            {curPage}&nbsp;/&nbsp;{numPages}
        </Badge>
        &nbsp;
        {/* ปุ่ม Next Page */}
        <Button
          variant="outline-primary"
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
          disabled={curPage === numPages}
        >
          <i className="bi bi-chevron-right"></i>
        </Button>
        &nbsp;
        {/* ปุ่ม Last Page */}
        <Button
          variant="outline-dark"
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          <i className="bi bi-chevron-bar-right"></i>
        </Button>
      </div>
    </div>
  );
};

export default Todos;