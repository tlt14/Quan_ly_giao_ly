import { useEffect, useState } from "react";
import { useAddGradeMutation, useUpdateGradeMutation } from "../../services/api.service";
import { toast } from "react-toastify";

export default function ModelGrade({ closeModelGrade ,grade,course}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if(grade ){
      setName(grade.name || "")
      setDescription(grade.description || "")
    }
    return()=>{
      setName("")
      setDescription("")
    }
  },[grade])
  // console.log(course);
  const [updateGrade, ] = useUpdateGradeMutation();
  const [addGrade] = useAddGradeMutation();
  console.log("grade",grade);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (grade && grade._id) {
      updateGrade({
        id: grade._id,
        name,
        description,
      })
        .then((data) => {
          // Xử lý kết quả thành công (nếu cần)
          closeModelGrade();
          setName("");
          setDescription("");
          toast.success("Đã cập nhật khối lớp thành công!");
        })
        .catch((error) => {
          // Xử lý lỗi (nếu cần)
          console.log(error);
        });
    }else{
      addGrade({
        name,
        description,
        course: course._id
      }).then((data) => {
        // Xử lý kết quả thành công (nếu cần)
        closeModelGrade();
        setName("");
        setDescription("");
        toast.success("Thêm khối lớp thành công!");
      }).catch(function (error) {
        // Xử lý lỗi (nếu cần)
        console.log(error);
      });
    }
  }

  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative m-auto w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={closeModelGrade}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Thêm Khối lớp
            </h3>
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="Course"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên Khối lớp
                </label>
                <input
                  type="text"
                  name="Course"
                  id="Course"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Khai tâm"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Ghi chú
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Lưu
              </button>
              <button
                type="reset"
                className="w-full text-gray-900 bg-gray-600 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Hủy bỏ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
