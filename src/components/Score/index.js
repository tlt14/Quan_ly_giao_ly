import {   useState } from "react";

import {
  useGetAllClassByGradeIdQuery,
  useGetAllCourseQuery,
  useGetAllGradeByCourseIdQuery,
} from "../../services/api.service";
import { useGetAllStudentByClassIdQuery } from "../../services/student.service";
import TableRow from "./TableRow";

export default function Score() {
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
  const { data: students } = useGetAllStudentByClassIdQuery(selectClass, {
    skip: !selectClass,
  });
  // console.log(selectClass);
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
              return item.status !== "completed" &&(
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
            <select
              className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      </div>
      <div className="overflow-x-auto max-h-screen overflow-y-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 min-w-full divide-y divide-gray-200">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 max-[640px]:whitespace-nowrap">
              Họ và tên
            </th>
            <th scope="col" className="px-6 py-3 max-[640px]:whitespace-nowrap">
              Lớp
            </th>
            <th scope="col" className="px-6 py-3 max-[640px]:whitespace-nowrap">
              Điểm giữa kỳ
            </th>
            <th scope="col" className="px-6 py-3 max-[640px]:whitespace-nowrap">
              Điểm Cuối kỳ
            </th>
            <th scope="col" className="px-6 py-3 max-[640px]:whitespace-nowrap">
              Tổng
            </th>
            <th scope="col" className="px-6 py-3 max-[640px]:whitespace-nowrap">
              Trạng thái
            </th>
          </tr>
        </thead>
        <tbody>
          { students?.map((student) => (
            <TableRow key={student._id} student={student} />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
