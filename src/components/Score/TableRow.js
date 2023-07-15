import { useState } from "react";
import { useUpdateStudentMutation } from "../../services/student.service";

export default function TableRow({ student }) {
    const [rowData, setRowData] = useState({
        ...student,
        scores: {
            middle: student.scores?.middle||"",
            final: student.scores?.final||"",
        }
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      scores:{
        ...prevData.scores,
        [name]: value
      }
    }));
  };
  const [updateStudent] = useUpdateStudentMutation();

  const handleSave = () => {
    // console.log(rowData);
    updateStudent({
      id: rowData._id,
      ...rowData
    });
  }
  return (
    <tr
      key={student._id}
      className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        onBlur={handleSave}
    >
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="pl-3">
          <div className="font-normal text-gray-500">{student.holyName}</div>
          <div className="text-base font-semibold">{student.name}</div>
        </div>
      </th>
      <td className="px-6 py-4">{student.classId.name}</td>
      <td className="px-6 py-4">
        <input
          className="w-[50%] max-[640px]:w-[100%] bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          name="middle"
          value={rowData.scores?.middle}
          onChange={handleChange}
        ></input>
      </td>
      <td className="px-6 py-4">
        <input
          className="w-[50%] max-[640px]:w-[100%] bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={rowData.scores?.final}
          name="final"
          onChange={handleChange}

        ></input>
      </td>
      <td className="px-6 py-4">
        {(+student.scores?.middle + +student.scores?.final) / 2 || 0}
      </td>
      <td className="px-6 py-4">{((+student.scores?.middle + +student.scores?.final) / 2)>5 ? "Đạt" : "Chưa đạt"}</td>
    </tr>
  );
}
