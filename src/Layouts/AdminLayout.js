import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setAuthenticated } from "../services/auth.slice";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get("user")) {
      dispatch(setAuthenticated(true));
    } else {
      dispatch(setAuthenticated(false));
      navigate("/");
    }
  }, [navigate, dispatch]);
  const { isAuthenticated } = useSelector((state) => state.authSlice);
  return isAuthenticated ? <Sidebar>{children}</Sidebar> : null;
}
