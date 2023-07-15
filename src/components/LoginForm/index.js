import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useLoginMutation } from "../../services/api.service";
import { setAuthenticated, setUser } from "../../services/auth.slice";
import { useDispatch } from "react-redux";

export default function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const [login] =useLoginMutation()

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if(username && password){
            login({username, password})
                .then((data) => {
                    if(data?.error){
                        toast.error("Sai tài khoản hoặc mật khẩu")
                    }else{
                      toast.success("Đăng nhập thành công")            
                      Cookies.set('user', JSON.stringify(data.data.user));
                      Cookies.set('accessToken', data.data.accessToken);
                      dispatch(setAuthenticated(true));
                      dispatch(setUser(data.data.user));
                      window.location.href = "/dashboard"
                    }
                    
                })
        }
    }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="py-8 px-4 m-auto w-full">
        <div className="flex items-center justify-center">
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Đăng nhập
            </h2>
            <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}> 
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
