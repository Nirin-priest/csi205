import { Card, Button, Container, Row, Col } from "react-bootstrap";

// คอมโพเนนต์ Carts รับอาร์เรย์ของสินค้าในตะกร้า (carts) และฟังก์ชันสำหรับอัพเดต (setCarts)
const Carts = ({ carts, setCarts }) => {
  // SVG ฐานสิบหกสำหรับรูปภาพสำรอง (placeholder) เมื่อไม่มีรูปภาพสินค้า
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";

  // คำนวณราคารวมทั้งหมดของสินค้าในตะกร้า
  // ใช้ .reduce เพื่อรวมราคา และ .toFixed(2) เพื่อแสดงทศนิยม 2 ตำแหน่ง
  const totalPrice = carts
    .reduce((prev, cart) => prev + cart.price, 0)
    .toFixed(2);

  return (
    <Container className="py-4">
      {/* ส่วนแสดงรายการสินค้าในรูปแบบ Grid (1 ถึง 4 คอลัมน์ตามขนาดหน้าจอ) */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {/* วนลูป (Map) แสดง Card สำหรับสินค้าแต่ละชิ้นในตะกร้า */}
        {carts.map((cart) => (
          <Col key={cart.id}>
            <Card
              className="h-100 shadow-sm border-0 rounded-4"
              // กำหนด transition สำหรับเอฟเฟกต์ hover
              style={{
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              // เมื่อเมาส์ชี้ (hover) ให้ Card ยกขึ้นและเงาเข้มขึ้น
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 0.7rem 1rem rgba(0,0,0,.12)";
              }}
              // เมื่อเมาส์ออกจาก Card ให้กลับสู่สถานะเดิม
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 .125rem .25rem rgba(0,0,0,.075)";
              }}
            >
              {/* รูปภาพสินค้า */}
              <Card.Img
                variant="top"
                // ใช้ URL รูปภาพของสินค้า หรือใช้รูปภาพสำรอง
                src={cart.thumbnailUrl || placeholderImage}
                style={{
                  height: "180px",
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
                // เมื่อโหลดรูปภาพล้มเหลว (onError) ให้ใช้รูปภาพสำรอง
                onError={(e) => (e.target.src = placeholderImage)}
              />

              {/* ส่วนเนื้อหาของ Card */}
              <Card.Body className="d-flex flex-column text-center">
                {/* ชื่อสินค้า */}
                <Card.Title
                  className="fw-semibold mb-1"
                  // Style สำหรับจำกัดชื่อสินค้าให้แสดงแค่ 2 บรรทัด (Truncate to 2 lines)
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontSize: "1rem",
                    minHeight: "2.5em", // กำหนดความสูงต่ำสุดเพื่อให้ Card เท่ากัน
                  }}
                >
                  {cart.title}
                </Card.Title>

                {/* ราคาสินค้า */}
                <span className="fw-bold text-success fs-4 my-3">
                  ${Number(cart.price).toFixed(2)}
                </span>

                {/* ปุ่ม Remove (mt-auto ดันปุ่มไปอยู่ด้านล่างสุด) */}
                <div className="mt-auto">
                  <Button
                    variant="outline-danger"
                    className="w-100 rounded-pill"
                    // เมื่อคลิก: อัพเดต state ตะกร้าโดยกรองเอาสินค้าที่มี id ตรงกันออกไป
                    onClick={() =>
                      setCarts((prev) => prev.filter((c) => c.id !== cart.id))
                    }
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ส่วนสรุปราคารวมและปุ่ม Checkout (แสดงเฉพาะเมื่อมีสินค้าในตะกร้า) */}
      {carts.length > 0 && (
        <div className="mt-5 p-4 border-0 rounded-4 shadow-sm bg-white d-flex flex-column flex-md-row justify-content-between align-items-center">
          {/* ข้อมูลสรุป */}
          <div className="mb-3 mb-md-0 text-center text-md-start">
            <h5 className="mb-1 text-muted">
              จำนวนสินค้า: <b className="text-dark">{carts.length}</b>
            </h5>
            <h4 className="mb-0">
              ราคารวม: <span className="text-success fw-bold">${totalPrice}</span>
            </h4>
          </div>

          {/* ปุ่ม Checkout */}
          <Button
            variant="primary"
            size="lg"
            className="rounded-pill px-5 fw-bold"
            onClick={() => {
              // แจ้งเตือนว่าชำระเงินสำเร็จ
              alert(`ชำระเงินสำเร็จ รวมทั้งหมด $${totalPrice}`);
              // ล้างตะกร้าสินค้าทั้งหมด
              setCarts([]);
            }}
          >
            Checkout Now
          </Button>
        </div>
      )}

      {/* ข้อความแสดงเมื่อตะกร้าว่างเปล่า (Empty Cart) */}
      {carts.length === 0 && (
        <div className="text-center py-5 text-muted">
          <h4>Your cart is empty.</h4>
          <p>Go add some awesome products!</p>
        </div>
      )}
    </Container>
  );
};

export default Carts;