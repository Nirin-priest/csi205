import { useRef } from "react";
import { verifyUser } from "../data/users";
import { Form, Card, Button } from "react-bootstrap";

const Login = ({ setToken, setRole }) => {
  const userRef = useRef();
  const passRef = useRef();

  const handleLogin = () => {
    const user = userRef.current.value.trim();
    const pass = passRef.current.value.trim();

    const userInfo = verifyUser(user, pass);

    userRef.current.value = "";
    passRef.current.value = "";

    if (userInfo === null) {
      alert("Wrong username or password");
      userRef.current.focus();
    } else {
      setToken(userInfo.token);
      setRole(userInfo.role);
    }
  };

  return (
    <>
      {/* bg animation แก้เบื่อ */}
      <style>{`
        .bg-animated {
          background: linear-gradient(-45deg, #f0f0f0, #d6e4f0, #f0f0f0, #e0f7fa);
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <div
        className="d-flex justify-content-center align-items-center vh-100 bg-animated"
        style={{ fontFamily: "Prompt, sans-serif" }}
      >
        <Card className="shadow-sm border rounded-3" style={{ width: "320px" }}>
          <Card.Header className="text-white text-center py-2 bg-dark rounded-top-3">
            <h5 className="mb-0 fw-normal">เข้าสู่ระบบ</h5>
          </Card.Header>

          <Card.Body className="p-4 text-center">
            <h4 className="text-dark mb-4 mt-2 fw-bold">Welcome</h4>

            <Form>
              <Form.Group className="mb-3 text-start">
                <Form.Label htmlFor="useranme" className="text-secondary small fw-medium">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  id="useranme"
                  placeholder="user"
                  className="rounded-2 p-2 bg-white border-secondary-subtle"
                  ref={userRef}
                />
              </Form.Group>

              <Form.Group className="mb-4 text-start">
                <Form.Label htmlFor="password" className="text-secondary small fw-medium">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="pass"
                  className="rounded-2 p-2 bg-white border-secondary-subtle"
                  ref={passRef}
                />
              </Form.Group>

              <Button
                variant="secondary"
                className="w-100 py-2 mt-3 rounded-2 fw-bold"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a href="#" className="text-secondary small text-decoration-none">
                ติดต่อผู้ดูแลระบบ?
              </a>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Login;
