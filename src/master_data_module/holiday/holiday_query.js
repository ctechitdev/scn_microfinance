const check_holidayByName = "select * from tbl_holiday where holiday_name = ? ";
const get_holidayById = 
"select holiday_id, holiday_category_name, holiday_name, holiday_date from tbl_holiday left join tbl_holiday_category on tbl_holiday.holiday_category_id=tbl_holiday_category.holiday_category_id where holiday_id=?";
const get_holiday =
 "select holiday_id, holiday_category_name, holiday_name, holiday_date from tbl_holiday left join tbl_holiday_category on tbl_holiday.holiday_category_id=tbl_holiday_category.holiday_category_id";
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