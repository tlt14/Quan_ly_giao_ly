import React, { useEffect, useState } from 'react';
import { convertDateString, getSundaysInMonth } from '../../utils/Common';
import axiosClient from '../../config/axiosClient';

const AttendanceTable = ({students, classId}) => {
    const date = new Date()
    const sundays = getSundaysInMonth(date.getFullYear(),date.getMonth());
    const handleChange =async(e,day,student)=>{
      await axiosClient.post(`attendance/${classId}/${day}`,{
          studentId:student._id,
          date:day
      })
    }
    const [attendance, setAttendance] = useState([]);
    useEffect(() => {
      async function fetchData() {
        const res = await axiosClient.get(`attendance/${classId}`);
        setAttendance(res.data);
      }
      classId && fetchData();
    },[classId]);
    return(
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Họ và tên
            </th>
            {
              sundays.map((day) => (
                <th key={day} scope="col" className="px-6 py-3">
                  {day}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
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
                {
                  sundays.map((day) => (
                    <td key={day} className="px-6 py-4">
                      
                        {
                          attendance?.filter(attendanceItem => convertDateString(attendanceItem.date) === day && attendanceItem.students.includes(student._id)).length > 0
                          ? (
                            <input type="checkbox" checked onChange={(e)=>handleChange(e,day,student)}/>
                          ):<input type="checkbox" onChange={(e)=>handleChange(e,day,student)}/>
                        }
                        
                    </td>
                  ))
                }
              </tr>
              ))
            }
          
        </tbody>
      </table>
    )
};

export default AttendanceTable;
