import { useEffect, useState } from "react";
import ModelCourse from "./ModalCourse";
import ModelClass from "./ModalClass";
import ModelGrade from "./ModalGrade";
import {
  useDeleteCourseMutation,
  useGetAllClassByGradeIdQuery,
  useGetAllCourseQuery,
  useGetAllGradeByCourseIdQuery,
} from "../../services/api.service";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

export default function Class() {
  const [isShowModalCourse, setIsShowModalCourse] = useState(false);
  const [isShowModalGrade, setIsShowModalGrade] = useState(false);
  const [isShowModalClass, setIsShowModalClass] = useState(false);

  const handleAddCourse = () => {
    setIsShowModalCourse(true);
  };
  const handleAddGrade = () => {
    if(selectCourse && selectCourse._id){
      setIsShowModalGrade(true);
    }else{
        toast.error("Vui lòng chọn khóa học!");
    }
  };
  const handleAddClass = () => {
    if(selectGrade){
      setIsShowModalClass(true);
    }else{
        toast.error("Vui lòng chọn khối lớp!");
    }
    // setIsShowModalClass(true);
  };

  const [selectCourse, setSelectCourse] = useState({});
  const [selectCourseEdit, setSelectCourseEdit] = useState({});

  const [selectGrade, setSelectGrade] = useState(null);
  const [selectGradeEdit, setSelectGradeEdit] = useState({});


  const [selectClass, setSelectClass] = useState("");

  const { data: courses } = useGetAllCourseQuery();
  const { data: grades } = useGetAllGradeByCourseIdQuery(selectCourse?._id,{ skip: !selectCourse?._id });
  const { data: classes } = useGetAllClassByGradeIdQuery(selectGrade,{ skip: !selectGrade });
  const [deleteCourse] = useDeleteCourseMutation();

  useEffect(() => {
    if (!isShowModalCourse) {
      setSelectCourseEdit({});
    }
    if (!isShowModalGrade) {
      setSelectGradeEdit({});
    }
    if (!isShowModalClass) {
      setSelectClass({});
    }
  }, [isShowModalCourse, isShowModalGrade, isShowModalClass]);

  const handleEditCourse = (course) => {
    setIsShowModalCourse(true);
    setSelectCourseEdit(course);
  };
  const handleEditGrade = (grade) => {
    setIsShowModalGrade(true);
    setSelectGradeEdit(grade);
  };
  const handleEditClass = (classs) => {
    setIsShowModalClass(true);
    setSelectClass(classs);
  };
  const handleCompleteCourse = async(id) => {
    if(window.confirm("Bạn có muốn hoàn thành khóa học này không")){
      await deleteCourse(id).then((data) => {
        toast.success("OK!");
      }).catch((err) => {
        toast.error("Không thành công!");
      })
    }
  }
  return (
    <div className="grid grid-cols-2 gap-2  dark:text-white">
      <div className="col-span-1 max-[640px]:col-span-2">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-[640px]:whitespace-nowrap">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Khóa học
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #id
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên khóa học
                </th>
                <th scope="col" className="px-6 py-3">
                  Ghi chú
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Action</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((item, index) => {
                return (
                  <tr
                    className={`bg-white border-b  dark:border-gray-700 cursor-pointer ${
                      item._id === selectCourse._id
                        ? "dark:bg-gray-500 text-white"
                        : "dark:bg-gray-800"
                    }`}
                    key={item._id}
                    onClick={() => {
                      setSelectCourse(item);
                    }}
                  >
                    <td
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    <td className="px-6 py-4 text-sm text text-center">
                     {
                      item.status === "started" ? <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleCompleteCourse(item._id)}
                    >
                      Kết thúc khóa học
                    </button>:<FontAwesomeIcon icon={faCheckDouble}  className="text-green-600"/>
                     }
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEditCourse(item)}
                      >
                        Edit
                      </button>
                      {/* <button className="font-medium text-orange-600 dark:text-orange-500-500 hover:underline"
                        
                      >
                        Delete
                      </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleAddCourse}
          className="font-medium text-white dark:text-white mt-2 hover:underline px-4 py-2 bg-blue-600 dark:bg-blue-500 rounded"
        >
          Thêm khóa học
        </button>
      </div>
      <div className="col-span-1 max-[640px]:col-span-2">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-[640px]:whitespace-nowrap">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Khối lớp
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #id
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên Khối Lớp
                </th>
                <th scope="col" className="px-6 py-3">
                  Ghi chú
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {grades &&
                
                grades.map((item, index) => {
                  return (
                    <tr
                      className={`bg-white border-b  dark:border-gray-700 cursor-pointer ${
                        item._id === selectGrade
                          ? "dark:bg-gray-500 text-white"
                          : "dark:bg-gray-800"
                      }`}
                      key={item._id}
                      onClick={() => {
                        setSelectGrade(item._id);
                      }}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleEditGrade(item)}
                        >
                          Edit
                        </button>
                        <button className="font-medium text-orange-600 dark:text-orange-500-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleAddGrade}
          className="font-medium text-white dark:text-white mt-2 hover:underline px-4 py-2 bg-blue-600 dark:bg-blue-500 rounded"
        >
          Thêm Khối lớp
        </button>
      </div>
      <div className="col-span-2 mt-3">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-[640px]:whitespace-nowrap">
            <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Lớp học
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #id
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên lớp học
                </th>
                <th scope="col" className="px-6 py-3">
                  Ghi chú
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {classes &&
                classes?.map((item, index) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                      key={item._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.description}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleEditClass(item)}
                        >
                          Edit
                        </button>
                        <button className="font-medium text-orange-600 dark:text-orange-500-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleAddClass}
          className="font-medium text-white dark:text-white mt-2 hover:underline px-4 py-2 bg-blue-600 dark:bg-blue-500 rounded"
        >
          Thêm lớp học
        </button>
      </div>
      {isShowModalCourse && (
        <ModelCourse
          closeModelCourse={() => setIsShowModalCourse(false)}
          course={selectCourseEdit}
        />
      )}
      {isShowModalGrade && (
        <ModelGrade
          closeModelGrade={() => setIsShowModalGrade(false)}
          grade={selectGradeEdit}
          course={selectCourse}
        />
      )}
      {isShowModalClass && (
        <ModelClass
          closeModelClass={() => setIsShowModalClass(false)}
          classEdit={selectClass}
          gradeId={selectGrade}
        />
      )}
    </div>
  );
}
