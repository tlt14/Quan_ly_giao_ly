import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx/xlsx.mjs';
import moment from 'moment';


const exportToExcel = (name,data) => {

  
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
  
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, name+".xlsx");
  };
  

  function getSundaysInMonth(year, month) {
    const sundays = [];
    const firstDayOfMonth = moment({ year, month, day: 1 });
    const lastDayOfMonth = moment(firstDayOfMonth).endOf('month');
  
    let currentSunday = firstDayOfMonth.clone().day(0); // Ngày Chủ nhật đầu tiên trong tháng
  
    while (currentSunday.isSameOrBefore(lastDayOfMonth)) {
        if(currentSunday.month() === month){
            sundays.push(currentSunday.format('YYYY-MM-DD'));

        }
      currentSunday.add(7, 'days'); // Chuyển sang Chủ nhật tiếp theo
    }
  
    return sundays;
  }

  function formatDate(isoDateString) {
    const dateObj = new Date(isoDateString);
  
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const year = dateObj.getFullYear();
  
    return `${month}/${day}/${year}`;
  }
  function convertDateString(dateString) {
    const date = new Date(dateString);
  
    // Lấy thông tin về ngày, tháng và năm
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Tháng trong JS bắt đầu từ 0 (0 - 11)
    const day = date.getDate();
  
    // Tạo chuỗi theo định dạng yyy-mm-dd
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  
    return formattedDate;
  }
  
  export {exportToExcel,getSundaysInMonth,formatDate,convertDateString} 