const check_holiday_cateByName = "select * from tbl_holiday_category where holiday_category_name = ? ";
const get_holiday_cateById = "SELECT * FROM tbl_holiday_category WHERE holiday_category_id = ?"
const get_holiday_cate = "select * from tbl_holiday_category";
const add_holiday_cateByname = "insert into tbl_holiday_category(holiday_category_name)values(?)";
const update_holiday_cate = "update tbl_holiday_category set holiday_category_name = ? where holiday_category_id = ?";
const check_holiday_cateInHoliday = "SELECT * FROM tbl_holiday JOIN tbl_holiday_category ON tbl_holiday.holiday_category_id = tbl_holiday_category.holiday_category_id"
// const delete_holiday_cate = "DELETE FROM tbl_holiday_category WHERE holiday_category_id = ?";


module.exports = {

    check_holiday_cateByName,
    add_holiday_cateByname,
    get_holiday_cate,
    get_holiday_cateById,
    update_holiday_cate,
    // delete_holiday_cate,
    check_holiday_cateInHoliday,

};