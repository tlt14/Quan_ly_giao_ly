import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetProfileQuery, useLogoutMutation } from "../services/api.service";
import Cookies from "js-cookie";
// import { useLoginMutation } from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAuthenticated } from "../services/auth.slice";
export default function Sidebar({children}) {
  const {isAuthenticated} = useSelector(state => state.authSlice);
  const location = useLocation();
  const MENU = [
    {
      name: "Dashboard",
      path: "/dashboard", 
      roles: [5150,1984]
    },
    {
      name: "Giáo Lý Viên",
      path: "/glv",
      roles: [5150]
    },
    {
      name: "Học viên",
      path: "/students",
      roles: [5150,1984]
    },
    {
      name: "Nhập điểm",
      path: "/score",
      roles: [5150,1984]
    },
    {
      name: "Lớp học",
      path: "/classes",
      roles: [5150]
    },
    {
      name:"Điểm danh",
      path:"/attendance",
      roles:[5150,1984]
    },
  ]
  const [isShowSidebar, setShowSidebar] = useState(false);
  const [isShowDropdown, setShowDropdown] = useState(false);
  const id =Cookies.get("user")!==undefined ? JSON.parse(Cookies.get("user"))?._id : ""
  
  const {data: auth} = useGetProfileQuery(id, {
    skip: !id && !isAuthenticated
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const handleLogout = async() => {
    await logout().then(()=>{
      Cookies.remove("user")
      Cookies.remove("accessToken")
      toast.success("Đăng xuất thành công")
      dispatch(setAuthenticated(false))
      navigate("/")
    }).catch(()=>{
      toast.error("Đăng xuất không thành công")
      dispatch(setAuthenticated(false))
      navigate("/")
    })
  }
  const userRoles = JSON.parse(Cookies.get("user"))?.roles;
  const filteredMenu = MENU.filter(item => {
    const requiredRoles = item.roles;
    const hasRequiredRoles = requiredRoles.some(role => {
      if (Object.keys(userRoles).length === 1 && Object.keys(userRoles)[0] === 'GLV') {
        // Nếu người dùng chỉ có vai trò GLV, kiểm tra xem vai trò được yêu cầu là GLV hay không
        return role === userRoles.GLV;
      } else {
        // Ngược lại, kiểm tra xem người dùng có vai trò được yêu cầu hay không
        return Object.values(userRoles).includes(role);
      }
    });
    return hasRequiredRoles;
  });
  return (
    <Fragment>
      <div>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  onClick={() => setShowSidebar(!isShowSidebar)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    />
                  </svg>
                </button>
                <a href="#_" className="flex ml-2 md:mr-24">

                  <img
                    src="https://giaophankontum.com/wp-content/uploads/2019/06/cropped-LOGO-GIAO-PHAN-FINAL.png"
                    className="h-8 mr-3"
                    alt="FlowBiteLogo"
                  />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    Gx TIÊN SƠN
                  </span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ml-3">
                  <div>
                    {
                      isAuthenticated && (
                        <button
                          type="button"
                          className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                          aria-expanded="false"
                          data-dropdown-toggle="dropdown-user"
                          onClick={() => setShowDropdown(!isShowDropdown)}
                        >
                          <span className="text-white font-bold ">{auth?.user?.username}</span>
                          <img
                            className="w-8 h-8 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            alt="Avatar"
                          />
                        </button>
                      )
                    }
                    
                  </div>
                  <div
                    className={`z-50 right-4 top-10 fixed   my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600
                    ${
                      isShowDropdown ? "block" : "hidden"
                    }
                    `}
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <button
                        onClick={handleLogout}
                      type="button" className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >
                        Logout
                      </button>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </nav>
        <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200  dark:bg-gray-800 dark:border-gray-700
              ${isShowSidebar ? 'translate-x-0' : '-translate-x-full'}`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              {
                filteredMenu.map((item, index) => {
                  
                  return  <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
                    ${item.path === location.pathname ? 'bg-blue-400 dark:bg-blue-700' : ''}`}
                    onClick={() => {
                      setShowSidebar(false);
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                      <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                    </svg>
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
                })
              }
            </ul>
          </div>
        </aside>
        <div className="p-4 max-[640px]:px-2 sm:ml-64 dark:bg-slate-900 min-h-screen">
          <div className="p-2 max-[640px]:px-0 rounded-lg dark:border-gray-700 mt-14 ">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
