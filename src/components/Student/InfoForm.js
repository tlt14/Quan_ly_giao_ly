import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useEffect, useState } from "react";

 function InfoForm({formik,student,formatDate,}) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/v1/classes")
    .then((res) => res.json())
    .then((data) => setClasses(data));
}, []);

  return (
    <div className="grid gap-4 mb-4 sm:grid-cols-2">
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tên thánh
        </label>
        <input
          type="text"
          name="holyName"
          id="holyName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder=""
          value={formik.values.holyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.holyName && formik.errors.holyName && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.holyName}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="brand"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Họ và tên
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder=""
          {...formik.getFieldProps("name")}
        />
        {formik.touched.name && formik.errors.name && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.name}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Giới tính
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          name="gender"
          id="gender"
          {...formik.getFieldProps("gender")}
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        {formik.errors.gender && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.gender}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="brand"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ngày sinh
        </label>
        <input
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder=""
          name="birthDay"
          id="birthDay"
          value={
            formik.values.birthDay ? formatDate(formik.values.birthDay) : ""
          }
          onChange={formik.handleChange}
        />
        {formik.errors.birthDay && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.birthDay}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Số điện thoại (cha / mẹ)
        </label>
        <input
          type="phone"
          name="phone"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder=""
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.phone}
          </span>
        )}
      </div>
      {student && student._id && (
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Lớp
          </label>
          <select
            id="idClass"
            name="idClass"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            {...formik.getFieldProps("idClass")}
          >
            {classes?.map((item) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {formik.errors.idClass && (
            <span className="text-red-500 text-xs font-semibold">
              <FontAwesomeIcon icon={faExclamation} /> {formik.errors.idClass}
            </span>
          )}
        </div>
      )}
      <div>
        <label
          htmlFor="baptismDay"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Ngày rửa tội
        </label>
        <input
          type="Date"
          name="baptismDay"
          id="baptismDay"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          value={
            formik.values.baptismDay ? formatDate(formik.values.baptismDay) : ""
          }
          onChange={formik.handleChange}
        />
        {formik.errors.baptismDay && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.baptismDay}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="fatherName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Họ tên cha
        </label>
        <input
          type="text"
          name="fatherName"
          id="fatherName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...formik.getFieldProps("fatherName")}
        />
        {formik.errors.fatherName && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.fatherName}
          </span>
        )}
      </div>
      <div>
        <label
          htmlFor="motherName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Họ tên mẹ
        </label>
        <input
          type="text"
          name="motherName"
          id="motherName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...formik.getFieldProps("motherName")}
        />
        {formik.errors.motherName && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.motherName}
          </span>
        )}
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="address"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Địa chỉ
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...formik.getFieldProps("address")}
        />
        {formik.errors.address && (
          <span className="text-red-500 text-xs font-semibold">
            <FontAwesomeIcon icon={faExclamation} /> {formik.errors.address}
          </span>
        )}
      </div>
    </div>
  );
}
export default memo(InfoForm)