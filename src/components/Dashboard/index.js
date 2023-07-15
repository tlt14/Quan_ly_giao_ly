import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllGLVQuery } from "../../services/api.service";
import { useGetAllQuery } from "../../services/student.service";
import { faUser, faUserGraduate } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const {data:students} = useGetAllQuery();
  const {data:glvs}=useGetAllGLVQuery();
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-3 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-200">Năm học: 2023-2024</p>
      </div>
      <div className="max-[640px]:col-span-3 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-200">
          <span className="p-2 bg-orange-500 text-white rounded-lg"><FontAwesomeIcon icon={faUserGraduate} /></span> {glvs?.length} Giáo lý viên
        </p>
      </div>
      <div className="max-[640px]:col-span-3 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-200">
          <FontAwesomeIcon icon={faUser} /> {students?.length} Thiếu nhi
        </p>
      </div>
      {/* <div className="max-[640px]:col-span-3 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-200">+</p>
      </div> */}
    </div>
  );
}
