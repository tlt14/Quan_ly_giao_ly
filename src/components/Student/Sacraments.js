export default function Sacraments({formik, formatDate}) {
    return (
        <div className="flex flex-col">
            <div className="gird gap-4 grid-cols-1 py-2">
                <input 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                    type="text"
                    placeholder="Mã gia đình Công Giáo"
                    name="familyId"
                    id="familyId"
                    value={formik.values.familyId}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-4 py-2">
                <div className="col-span-1">
                    <h4 className="text-blue-600 font-bold">Rửa tội ngày</h4>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="14/05/2001"
                        name="baptismDay"
                        id="baptismDay"
                        value={formik.values.baptismDay}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="Người ban bí tích"
                        value={formik.values.baptismMinister}
                        name="baptismMinister"
                        id="baptismMinister"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="Giáo xứ"
                        value={formik.values.baptismChurch}
                        name="baptismChurch"
                        id="baptismChurch"
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <h4 className="text-blue-600 font-bold">Số rửa tội</h4>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder=""
                        value={formik.values.baptismNumber}
                        name="baptismNumber"
                        id="baptismNumber"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder="Người đỡ đầu"
                        value={formik.values.baptismSponsor}
                        name="baptismSponsor"
                        id="baptismSponsor"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder="Giáo phận"
                        value={formik.values.baptismDiocese}
                        name="baptismDiocese"
                        id="baptismDiocese"
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2">
                <div className="col-span-1">
                    <h4 className="text-blue-600 font-bold">Rước lễ lần đầu ngày</h4>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="14/05/2001"
                        value={formik.values.communionDate}
                        name="communionDate"
                        id="communionDate"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="Người ban bí tích"
                        value={formik.values.communionMinister}
                        name="communionMinister"
                        id="communionMinister"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="Giáo xứ"
                        value={formik.values.communionChurch}
                        name="communionChurch"
                        id="communionChurch"
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <h4 className="text-blue-600 font-bold">Số xưng tội</h4>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder=""
                        value={formik.values.communionNumber}
                        name="communionNumber"
                        id="communionNumber"
                        onChange={formik.handleChange}

                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder="Người đỡ đầu"
                        value={formik.values.communionSponsor}
                        name="communionSponsor"
                        id="communionSponsor"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder="Giáo phận"
                        value={formik.values.communionDiocese}
                        name="communionDiocese"
                        id="communionDiocese"
                        onChange={formik.handleChange}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-2">
                <div className="col-span-1">
                    <h4 className="text-blue-600 font-bold">Thêm sức ngày</h4>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="14/05/2001"
                        value={formik.values.confirmationDate}
                        name="confirmationDate"
                        id="confirmationDate"
                        onChange={formik.handleChange}

                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="Người ban bí tích"
                        value={formik.values.confirmationMinister}
                        name="confirmationMinister"
                        id="confirmationMinister"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2"
                        type="text"
                        placeholder="Giáo xứ"
                        value={formik.values.confirmationChurch}
                        name="confirmationChurch"
                        id="confirmationChurch"
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="col-span-1">
                    <h4 className="text-blue-600 font-bold">Số Thêm sức</h4>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder=""
                        value={formik.values.confirmationNumber}
                        name="confirmationNumber"
                        id="confirmationNumber"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder="Người đỡ đầu"
                        value={formik.values.confirmationSponsor}
                        name="confirmationSponsor"
                        id="confirmationSponsor"
                        onChange={formik.handleChange}
                    />
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mt-2 "
                        type="text"
                        placeholder="Giáo phận"
                        value={formik.values.confirmationDiocese}
                        name="confirmationDiocese"
                        id="confirmationDiocese"
                        onChange={formik.handleChange}
                    />
                </div>
                
            </div>
            
        </div>
    )
}