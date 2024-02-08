const check_holidayByName = "select * from tbl_holiday where holiday_name = ? ";
const get_holidayById = "select * from tbl_holiday where holiday_id = ? "
const get_holiday = "select * from tbl_holiday";
const add_holidayByname = "insert into tbl_holiday(holiday_name, holiday_category_id, holiday_date)values(?,?,?)";
const update_holiday = "update tbl_holiday set holiday_name = ? where holiday_id = ?";
const delete_holiday = "DELETE FROM tbl_holiday WHERE holiday_id = ?";




module.exports = {

 check_holidayByName,
 add_holidayByname,
 get_holiday,
 get_holidayById,
 update_holiday,
 delete_holiday,
 
};