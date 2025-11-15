import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

// **สำคัญ:** ต้องรับ props 'products' และ 'carts' เพื่อส่งต่อไปยัง AppNavbar
const AppLayout = ({ products, carts, setToken }) => {
  return (
    // ลบ px-4 เพื่อให้ Component ลูก (Header, Footer) ขยายพื้นหลังเต็มจอ
    <div className="d-flex flex-column bg-light">
      <AppHeader />
      <AppNavbar products={products} carts={carts} setToken={setToken}/>
      {/* เพิ่ม px-5 (Padding ด้านข้าง) ให้กับ Content Wrapper เพื่อจัดระยะห่าง */}
      <div className="flex-grow-1 py-5 px-5"> 
        <Outlet />
      </div>
      <AppFooter />
    </div>
  );
};

export default AppLayout;