import { useEffect, useState } from "react";
import {  StudentModal } from "./Modal";
// import { useGetAllClassByGradeIdQuery, useGetAllCourseQuery, useGetAllGradeByCourseIdQuery } from "../../services/api.service";
import { toast } from "react-toastify";
// import { useDeleteStudentMutation, useGetAllStudentByClassIdQuery } from "../../services/student.service";
import { exportToExcel, formatDate } from "../../utils/Common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel, faPenToSquare, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGetAllClassByGradeIdQuery, useGetAllCourseQuery, useGetAllGradeByCourseIdQuery } from "../../services/api.service";
import { useDeleteStudentMutation, useGetAllStudentByClassIdQuery } from "../../services/student.service";
export default function Student() {
  
  const [selectedStudent, setSelectedStudent] = useState({})


  const [selectCourse, setSelectCourse] = useState("");
  const [selectGrade, setSelectGrade] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const { data: courses } = useGetAllCourseQuery();
  const { data: grades } = useGetAllGradeByCourseIdQuery(selectCourse, {
    skip: !selectCourse,
  });
  const { data: classes } = useGetAllClassByGradeIdQuery(selectGrade, {
    skip: !selectGrade,
  });
  const {data:students} =useGetAllStudentByClassIdQuery(selectClass,{ skip: !selectClass})
  const [isShowModal, setIsShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
  const toggleModal = () => {
    setIsShowModal(!isShowModal);
  };
  const handleEdit = (student) => {
    setTitleModal("Sửa");
    toggleModal();
    setSelectedStudent(student)
  };
  useEffect(() => {
    if(!isShowModal){
      setSelectedStudent({})
    }
  },[isShowModal])
  const handleCreate = () => {
    if(selectClass.trim()){
      setTitleModal("Thêm thiếu nhi");
      toggleModal();
    }else{
      toast.error("Vui lòng chọn lớp cần nhập thiếu nhi");
    }
  };
  const [deleteStudent] = useDeleteStudentMutation()
  const handelDelete = (student) => {
    if(window.confirm("Bạn có muốn xóa học sinh này?")){
      deleteStudent({id:student._id})
      .then(()=>{
        toast.success("Xóa học sinh thành công")
      })
    }
  }
  const handleExport = () => {
    const excelData = students?.map(item => {
      const { scores,classId,__v,birthDay, ...rest } = item; // Loại bỏ trường "scores" từ đối tượng
    
      return {
        ...rest,
        birthDay:formatDate(item?.birthDay),
        "MiddleScore": item?.scores?.middle||null,
        "FinalScore": item?.scores?.final||null,
        "Lop": item?.classId?.name
      };
    });
    
    exportToExcel(excelData[0].Lop, excelData);
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between bg-white dark:bg-gray-900">
        <div className="flex py-2">
          <select
            className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setSelectCourse(e.target.value);
            }}
          >
            <option value="">Choose a course</option>
            {courses?.map((item) => {
              return item.status !== "completed" && (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {selectCourse && (
            <select
              className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setSelectGrade(e.target.value);
              }}
            >
              <option>Choose a grade</option>
              {grades &&
                grades.map((item) => {
                  return (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          )}
          {selectGrade && (
            <select className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setSelectClass(e.target.value);
              }}

            >
              <option>Chọn lớp</option>
              {classes?.map((item) => {
                return (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="py-2 flex">
          {
            students && <button type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleExport}
          >
            <FontAwesomeIcon icon={faFileExcel} /> <span className="sm:hidden md:inline-block max-[640px]:hidden">Xuất excel</span>
          </button>
          }
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreate}
          >
           <FontAwesomeIcon icon={faPlus} /> <span className="sm:hidden md:inline-block max-[640px]:hidden">Thêm thiếu nhi</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 min-w-full divide-y divide-gray-200">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3">
              Số điện thoại (cha / mẹ)
            </th>
            <th scope="col" className="px-6 py-3">
              Địa chỉ
            </th>
            <th scope="col" className="px-6 py-3">Lớp</th>
            <th scope="col" className="px-6 py-3">Họ tên cha</th>
            <th scope="col" className="px-6 py-3">Họ tên mẹ</th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {
              students?.map((student) => (
                <tr key={student._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div className="">
                    <div className="font-normal text-gray-500">
                      {student.holyName}
                    </div>
                    <div className="text-base font-semibold">{student.name}</div>
                  </div>
                </th>
                <td className="px-6 py-4">{student.phone}</td>
                <td className="px-6 py-4">
                  {student.address}
                </td>
                <td className="px-6 py-4">
                  {student.classId?.name}
                </td>
                <td className="px-6 py-4">
                  {student.fatherName}
                </td><td className="px-6 py-4">
                  {student.motherName}
                </td>
                <td className="px-6 py-4 flex flex-wrap">
                  <button
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-50 hover:underline px-2 py-1 bg-blue-500 rounded-sm"
                    onClick={()=>handleEdit(student)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} /> <span className="sm:hidden md:inline-block max-[640px]:hidden">Sửa</span>
                  </button>
                  <button
                    className="font-medium text-orange-500 dark:text-orange-50 hover:underline md:ml-2 sm:ml-0 px-2 py-1 bg-orange-500 rounded-sm"
                    onClick={()=>handelDelete(student)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> <span className="sm:hidden md:inline-block max-[640px]:hidden">Xóa</span>
                  </button>
                </td>
              </tr>
              ))
            }
          
        </tbody>
      </table>
      </div>
      {isShowModal && <StudentModal toggleModal={toggleModal} classId={selectClass} titleModal={titleModal} student={selectedStudent}/>}
    </div>
  );
}
