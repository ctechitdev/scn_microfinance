const get_province_name = "select * from tbl_province where province_name=?";
const add_province = "insert into tbl_province(province_name)values(?)"
const get_province = "select * from tbl_province"
const get_province_id ="select * from tbl_province where province_id=?";
const update_province ="update tbl_province set province_name=? where province_id = ?"
const delete_province = "delete from tbl_province where province_id = ?"
const check_province ="SELECT * FROM tbl_customer where province_id = ? ";
const check_province_district = "SELECT * FROM tbl_districts where province_id = ?"

module.exports={
    get_province_name,
    add_province,
    get_province,
    get_province_id,
    update_province,
    delete_province,
    check_province,
    check_province_district

}