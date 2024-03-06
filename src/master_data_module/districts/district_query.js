const get_districts_name = "select * from tbl_districts where districts_name=?";
const add_districts = "insert into tbl_districts(province_id,districts_name)values(?,?)"
const get_districts = "select * from tbl_districts"
const get_districts_id ="select * from tbl_districts where districts_id=?";
const update_districts ="update tbl_districts set province_id=?, districts_name=? where districts_id = ?"
const delete_districts = "delete from tbl_districts where districts_id = ?"
const check_districts ="SELECT * FROM tbl_customer where district_id = ? ";
const check_districts_district = "SELECT * FROM tbl_districts where districts_id = ?"
const check_province_id = "select * from tbl_province where province_id=?"

module.exports={
    get_districts_name,
    add_districts,
    get_districts,
    get_districts_id,
    update_districts,
    delete_districts,
    check_districts,
    check_districts_district,
    check_province_id

}