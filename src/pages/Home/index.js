import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetInfoStudentQuery } from "../../services/student.service";
import Loading from "../../components/Loading";

export default function Home() {
  const [studentId, setStudentId] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: info,
    isSuccess,
    isFetching,
    isLoading
  } = useGetInfoStudentQuery(searchParams.get("studentId"), {
    refetchOnMountOrArgChange: true,
    skip: searchParams.get("studentId") ? false : true,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ studentId });
  };
  const student = info?.student || {};
  const sacrament = info?.sacrament || {};
  return (
    <div className="md:w-10/12 max-[640]:w-12/12 m-auto ">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faIdCard} className="dark:text-gray-900" />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:bg-slate-400 focus:text-white"
            placeholder="Tìm kiếm thiếu nhi..."
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="whitespace-nowrap font-semibold sm:hidden md:inline-block max-[640px]:hidden">
            Tìm kiếm
          </span>
        </button>
      </form>
      {
        (isFetching || isLoading) &&
        <Loading />
      }
      {isSuccess && (
        <div className="overflow-x-auto mt-4">
          <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 min-w-full divide-y divide-gray-200">
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
                <th scope="col" className="px-6 py-3">
                  Lớp
                </th>
                <th scope="col" className="px-6 py-3">
                  Họ tên cha
                </th>
                <th scope="col" className="px-6 py-3">
                  Họ tên mẹ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                <tr
                  key={student._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="">
                      <div className="font-normal text-gray-500">
                        {student.holyName}
                      </div>
                      <div className="text-base font-semibold">
                        {student.name}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{student.phone}</td>
                  <td className="px-6 py-4">{student.address}</td>
                  <td className="px-6 py-4">{student.classId?.name}</td>
                  <td className="px-6 py-4">{student.fatherName}</td>
                  <td className="px-6 py-4">{student.motherName}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      )}
      {isSuccess && (
        <div className="overflow-x-auto mt-4">
          <table className=" w-full text-sm text-center text-gray-500 dark:text-gray-400 min-w-full divide-y divide-gray-200 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  Tên bí tích
                </th>
                <th scope="col" className="px-6 py-3">
                  Số
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày lãnh nhận
                </th>
                <th scope="col" className="px-6 py-3">
                  Cha
                </th>
                <th scope="col" className="px-6 py-3">
                  Người đỡ đầu
                </th>
                <th scope="col" className="px-6 py-3">
                  Giáo xứ
                </th>
                <th scope="col" className="px-6 py-3">
                  Giáo phận
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sacrament &&
                sacrament?.sacrament?.length > 0 &&
                sacrament?.sacrament.map((sacrament) => {
                  return (
                    <tr
                      key={sacrament.name}
                      className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 border-l-2">{sacrament.name}</td>
                      <td className="px-6 py-4 border-l-2">
                        {sacrament.number}
                      </td>
                      <td className="px-6 py-4 border-l-2">{sacrament.date}</td>
                      <td className="px-6 py-4 border-l-2">
                        {sacrament.pastor}
                      </td>
                      <td className="px-6 py-4 border-l-2">
                        {sacrament.sponsor}
                      </td>
                      <td className="px-6 py-4 border-l-2">
                        {sacrament.parish}
                      </td>
                      <td className="px-6 py-4 border-l-2">
                        {sacrament.diocese}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
