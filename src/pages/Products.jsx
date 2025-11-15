import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";

const Products = ({ products, carts, setCarts }) => {
  /* SVG Placeholder สำหรับรูปภาพที่หายไป */
  const placeholderImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";

  return (
    <Container className="py-4">
      {/* โครงสร้าง Grid สำหรับการ์ดสินค้า (Responsive columns) */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {/* วนซ้ำแสดงรายการสินค้า (ตรวจสอบว่า products มีค่าก่อน map) */}
        {products && products.map((product) => (
          <Col key={product.id}>
            {/* การ์ดสินค้าแต่ละชิ้น */}
            <Card
              className="h-100 border-0 shadow-sm rounded-4 position-relative"
              style={{
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              /* Add hover effects for visual feedback */
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 0.7rem 1rem rgba(0,0,0,.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow =
                  "0 .125rem .25rem rgba(0,0,0,.075)";
              }}
            >
              {/* Badge สำหรับ Tag สินค้า */}
              {product.tag && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-0 m-3"
                  style={{ zIndex: 1 }}
                >
                  {product.tag}
                </Badge>
              )}

              {/* รูปภาพสินค้า */}
              <Card.Img
                variant="top"
                src={product.thumbnailUrl || placeholderImage}
                style={{
                  height: "180px",
                  objectFit: "cover",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                }}
                onError={(e) => (e.target.src = placeholderImage)}
              />

              {/* เนื้อหาการ์ด */}
              <Card.Body className="d-flex flex-column text-center">
                <div>
                  {/* ชื่อสินค้า (จำกัดให้แสดงเพียง 1 บรรทัด) */}
                  <Card.Title
                    className="fw-semibold mb-1"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "1rem",
                      minHeight: "1.5em",
                    }}
                  >
                    {product.title}
                  </Card.Title>

                  {/* คำอธิบายสินค้า (จำกัดให้แสดงเพียง 2 บรรทัด) */}
                  <Card.Text
                    className="text-muted small"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "2.4em",
                    }}
                  >
                    {product.description || "\u00A0"}
                  </Card.Text>
                </div>

                {/* ราคาสินค้า */}
                <span className="fw-bold text-success fs-4 my-2">
                  ${Number(product.price).toFixed(2)}
                </span>

                {/* ปุ่ม Add to Cart (อยู่ล่างสุดของ Card) */}
                <div className="mt-auto">
                  {/* ตรวจสอบว่าสินค้าอยู่ในตะกร้าแล้วหรือไม่ */}
                  {carts.some((c) => c.id === product.id) ? (
                    /* แสดงปุ่ม "Added" หากอยู่ในตะกร้าแล้ว */
                    <Button
                      variant="success"
                      className="w-100 rounded-pill"
                      disabled
                    >
                      ✓ Added
                    </Button>
                  ) : (
                    /* แสดงปุ่ม "Add to Cart" */
                    <Button
                      variant="outline-primary"
                      className="w-100 rounded-pill"
                      /* Handler: เพิ่มสินค้าเข้าไปใน State `carts` */
                      onClick={() => setCarts((prev) => [...prev, product])}
                    >
                      + Add to Cart
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;