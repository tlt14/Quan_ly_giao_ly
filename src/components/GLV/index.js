import { useEffect, useState } from "react";
import { GlvModal } from "./Modal";
import { useDeleteGLVMutation, useGetAllGLVQuery } from "../../services/api.service";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus, faTrash, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import AccountModal from "./AccountModal";

export default function GLV() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [selectGLV, setSelectGLV] = useState({});
  const [isShowModalAccount, setIsShowModalAccount] = useState(false);

  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };
  const toggleModalAccount = () => {
    setIsShowModalAccount(!isShowModalAccount);
  }
  const handleEdit = (glv) => {
    setTitleModal("Edit GLV");
    toggleModal();
    setSelectGLV(glv);
  };
  const handleCreate = () => {
    setTitleModal("Create GLV");
    toggleModal();
  };
  const [deleteGLV,{isError}] = useDeleteGLVMutation();
  const handleDelete = (id) => {
    if(window.confirm("Có muốn xóa GLV?")){
      deleteGLV({id})
      .then(() => {
        toast.success("Xóa GLV thành công!");
      })
    }
    if(isError){
      toast.error("Xóa GLV thất bại!");
    }
  }
  const {data:glvs} = useGetAllGLVQuery()
  useEffect(() => {
    if(!isShowModal){
      setSelectGLV({})
    }
  }, [isShowModal]);
  const handleAccount = (glv) => {
    setIsShowModalAccount(true);
    setSelectGLV(glv);
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleCreate}
        >
          <FontAwesomeIcon icon={faPlus} /> <span className="sm:hidden md:inline-block max-[640px]:hidden">Thêm GLV</span>
        </button>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3">
              Số điện thoại
            </th>
            <th scope="col" className="px-6 py-3">
              Địa chỉ
            </th>
            <th scope="col" className="px-6 py-3">Lớp phụ trách</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {
            glvs?.map((glv) => {
              return (
                <tr key={glv._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
            <th
              scope="row"
              className="flex items-center justify-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="https://i.pinimg.com/originals/7d/71/02/7d7102f68dfaf2dde1aca0d79ea34e66.jpg"
                alt="Jeseimage"
              />
              <div className="pl-3">
                <div className="text-base font-semibold">{glv.name}</div>
                <div className="font-normal text-gray-500">
                  {glv.holyName}
                </div>
              </div>
            </th>
            <td className="px-6 py-4">{glv.phone}</td>
            <td className="px-6 py-4">
              {glv.address}
            </td>
            <td className="px-6 py-4">
              {glv.classId?.name}
            </td>
            
            <td className="px-6 py-4 flex flex-wrap">
                  
                <button
                    className="font-medium text-blue-600 dark:text-blue-50 hover:underline px-2 py-1 bg-green-500 rounded-sm flex justify-center items-center"
                    onClick={()=>handleAccount(glv)}
                  >
                    <FontAwesomeIcon icon={faUserCircle} /> <span className="sm:hidden md:inline-block max-[640px]:hidden">{' '}T.Khoản</span>
                  </button>
                  <button
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-50 hover:underline px-2 py-1 bg-blue-500 rounded-sm md:ml-2 sm:mr-0 "
                    onClick={()=>handleEdit(glv)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> <span className="sm:hidden md:inline-block max-[640px]:hidden">Sửa</span>
                  </button>
                  <button
                    className="font-medium text-orange-500 dark:text-orange-50 hover:underline md:ml-2 sm:ml-0 px-2 py-1 bg-orange-500 rounded-sm"
                    onClick={()=>handleDelete(glv._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> <span className="sm:hidden md:inline-block max-[640px]:hidden">Xóa</span>
                  </button>
                </td>
          </tr>
              )
            })
          }
          
        </tbody>
      </table>
      </div>
      {isShowModal && <GlvModal toggleModal={toggleModal} titleModal={titleModal} glv={selectGLV}/>}
      {isShowModalAccount && <AccountModal toggleModal={toggleModalAccount} glv={selectGLV} />}
    </div>
  );
}
