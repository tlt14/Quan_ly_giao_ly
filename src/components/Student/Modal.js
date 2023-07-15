import {  useEffect, useState } from "react";
import {
  useAddStudentMutation,
  useUpdateStudentMutation,
} from "../../services/student.service";
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InfoForm from "./InfoForm";
import Sacraments from "./Sacraments";
import { useAddScaramentWithStudentIdMutation, useGetSacrementByStudentIdQuery, useUpdateSacramentMutation } from "../../services/sacrament.service";
import { renderInitialValues } from "./InitialValues";


export const StudentModal = ({ toggleModal, titleModal, student, classId }) => {

  const validationSchema = Yup.object({
    holyName: Yup.string().required("Không được để trống").matches(/^[\p{L}\s]+$/u, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
    name: Yup.string().required("Không được để trống").matches(/^[\p{L}\s]+$/u, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
    phone: Yup.string().matches(/^[0-9]{10,11}$/, 'Invalid phone number'),
    fatherName: Yup.string().matches(/^[\p{L}\s]+$/u, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
    motherName: Yup.string().matches(/^[\p{L}\s]+$/u, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
    address: Yup.string(),
    gender: Yup.string().required("Không được để trống"),
    birthDay: Yup.date().max(new Date(),"Ngày không được lớn hơn ngày hiện tại"),
    baptismDay: Yup.date().max(new Date(), "Ngày không được lớn hơn ngày hiện tại"),
  })
  const [addScaramentWithStudentIds] = useAddScaramentWithStudentIdMutation();
  const [updateSacrament] = useUpdateSacramentMutation();
  const {data:sacraments} =useGetSacrementByStudentIdQuery(student._id,{skip:!student._id})

  const initialValues = renderInitialValues(student, sacraments,classId);
 

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(values) => {
      const dataScarament = {
        familyId: values.familyId,
        sacrament: [
          {
            name: values.baptismName,
            number: values.baptismNumber,
            date: values.baptismDay,
            pastor: values.baptismMinister,
            sponsor: values.baptismSponsor,
            parish: values.baptismChurch,
            diocese: values.baptismDiocese,
          },
          {
            name: values.communionName,
            number: values.communionNumber,
            date: values.communionDate,
            pastor: values.communionMinister,
            sponsor: values.communionSponsor,
            parish: values.communionChurch,
            diocese: values.communionDiocese,
          },
          {
            name: values.confirmationName,
            number: values.confirmationNumber,
            date: values.confirmationDate,
            pastor: values.confirmationMinister,
            sponsor: values.confirmationSponsor,
            parish: values.confirmationChurch,
            diocese: values.confirmationDiocese,
          },
        ]
      }
      if(student && student._id) {
        await updateStudent({
          id: student._id,
          classId:values.idClass,
          ...values
        }).then(async()=>{
          await updateSacrament({
            id: student._id,
            ...dataScarament
          })
        }).then(()=>{
          toggleModal();
          toast.success("Cập nhật thành công!");
        }).catch(()=>{
          toast.error("Cập nhật thất bại!");
        })
      }else{
        await addStudent({
          id: student._id,
          classId,
          ...values,
        }).then(async(data)=>{
          await addScaramentWithStudentIds({
            student: data.data._id,
            ...dataScarament
          }).then(()=>{
            toggleModal();
            toast.success("Thêm thành công!");
          })
        }).catch(()=>{
          toast.error("Thêm thất bại!");
        })
      }
    }
    
  })
  useEffect(()=>{
    const initialValues = renderInitialValues(student, sacraments,classId);
    formik.setValues(initialValues)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[student, sacraments,classId])
  
 
  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (student && student._id) {
  //     updateStudent({
  //       id: student._id,
  //       name,
  //       phone,
  //       fatherName,
  //       motherName,
  //       address,
  //       gender,
  //       birthDay,
  //       classId: idClass,
  //       holyName,
  //     })
  //       .then((res) => {
  //         toggleModal();
  //         toast.success("Cập nhật thành công!");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     addStudent({
  //       name,
  //       phone,
  //       fatherName,
  //       motherName,
  //       address,
  //       gender,
  //       birthDay,
  //       classId,
  //       holyName,
  //     })
  //       .then((res) => {
  //         toggleModal();
  //         setName("");
  //         setPhone("");
  //         setFatherName("");
  //         setMotherName("");
  //         setAddress("");
  //         setGender("");
  //         setBirthDay("");
  //         setIdClass("");
  //         setHolyName("");
  //         setBaptismDay("");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };
  const TABS = [
    {
      title: "Thông tin",
      
    },
    {
      title: "Bí tích",
    }
  ]
  const [currentTab, setCurrentTab] = useState(TABS[0].title);

  function formatDate(dateString) {
    var dateObject = new Date(dateString);

    var year = dateObject.getUTCFullYear();
    var month = ("0" + (dateObject.getUTCMonth() + 1)).slice(-2);
    var day = ("0" + dateObject.getUTCDate()).slice(-2);

    var formattedDate = year + "-" + month + "-" + day;

    return formattedDate;
  }

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full max-[640px]:top-0 max-[640px]:left-0"
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto m-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center rounded-t ">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {titleModal}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              onClick={toggleModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="text-lg font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              {
                TABS.map((tab) => {
                  return (
                    <li
                      key={tab.title}
                      className={`mr-2 mb-px cursor-pointer ${
                        currentTab === tab.title ? "border-b-2 border-blue-600 text-blue-600  rounded-t-lg active transition-transform" : ""
                      }`}
                      onClick={() => setCurrentTab(tab.title)}
                    >
                      {tab.title}
                    </li>
                  )
                })
              }
            </ul>
          </div>

          {/* Modal body */}
          <form  onSubmit={formik.handleSubmit}>
            {
              currentTab === TABS[0].title && (
                <InfoForm formik={formik} student={student} formatDate={formatDate}/>
              )
            }
            {
              currentTab === TABS[1].title &&(
                <Sacraments formik={formik} formatDate={formatDate}/>
                
              )
              
            }
            

            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "

            >
              Lưu
            </button>
            <button
              type="reset"
              className="ml-3 text-gray-300 inline-flex items-center bg-gray-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
