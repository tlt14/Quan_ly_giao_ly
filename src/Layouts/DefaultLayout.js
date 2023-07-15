import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../services/auth.slice";

export default function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkAuth() {
      try {
        if (!Cookies.get("user")) {
          throw new Error("User not found");
        }
        dispatch(setAuthenticated(true));
        navigate("/dashboard");
      } catch (error) {
        dispatch(setAuthenticated(false));
      }
    }
    checkAuth();
  }, [navigate, dispatch]);
  // Nếu không có trạng thái đăng nhập hợp lệ, không hiển thị nội dung
  return !Cookies.get("user") ? (
    <div className="w-full">
      {/* Header */}
      <div className="z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="grid grid-cols-3 gap-4 items-center justify-items-center">
              <img
                src="https://giaophankontum.com/wp-content/uploads/2019/06/cropped-LOGO-GIAO-PHAN-FINAL.png"
                className="md:w-[30%] sm:w-[40%] object-cover"
                alt="FlowBiteLogo"
              />
              <p className="uppercase md:text-4xl sm:text-xl text-red-500 font-bold text-center">
                quản lý giáo lý
              </p>
              <img
                src="https://hdgmvietnam.com/admin/upload/image/hoi-dong-giam-muc-viet-nam-logo-nam-muc-vu-2023-1.jpg"
                className="md:w-[30%] sm:w-[40%] object-cover"
                alt="FlowBiteLogo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="w-full bg-blue-400 text-gray-800 dark:bg-slate-800 dark:text-blue-500">
        <ul className="w-10/12 m-auto py-4 flex gap-4">
          <li>
            <Link
              to="/"
              className="font-bold uppercase hover:text-blue-800 md:text-base sm:text-sm"
            >
              Tra cứu thiếu nhi
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="font-bold uppercase hover:text-blue-800 md:text-base sm:text-sm"
            >
              GIÁO LÝ VIÊN
            </Link>
          </li>
        </ul>
      </nav>

      {/* Nội dung */}
      <div className="p-4 max-[640px]:px-2 dark:bg-slate-900 min-h-screen">
        <div className="p-2 max-[640px]:px-0 rounded-lg dark:border-gray-700">
          {children}
        </div>
      </div>
    </div>
  ) : null;
}