import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useLoginMutation } from "../../services/api.service";
import { setAuthenticated, setUser } from "../../services/auth.slice";
import { useDispatch } from "react-redux";
import Loading from "../Loading";

export default function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const [login,{isLoading}] =useLoginMutation()

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
                className="w-full flex flex-nowrap px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Đăng nhập {
                  isLoading &&
                  <svg aria-hidden="true" className="inline w-8 h-8 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>

                }
              </button>
            </form>
          </div>
        </div>
      </div>
      {
        isLoading &&
        <div className="flex justify-center fixed w-full h-screen items-center top-0 ">
          <Loading/>
        </div>
      }
    </section>
  );
}
