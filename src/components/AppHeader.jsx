/* ไฟล์: AppHeader.jsx */
const AppHeader = () => {
  return (
    /* Container ส่วนหัว (แสดงชื่อวิชาและรหัสวิชา) */
    <div className="d-flex justify-content-center align-items-center gap-3 border-bottom py-4">
      {/* รหัสวิชา */}
      <h3 className="fw-light text-muted p-1 px-3 border border-secondary rounded-2">
        CSI205
      </h3>
      {/* ชื่อวิชา */}
      <h2 className="text-dark text-uppercase fw-bold">
        Front-End Software Development
      </h2>
    </div>
  );
};

export default AppHeader;