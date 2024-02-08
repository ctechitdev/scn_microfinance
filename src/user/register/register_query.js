const check_user = "select * from tbl_user where user_name = ? ";
const add_user = "insert into tbl_user(full_name,user_name,user_password,role_id,depart_id,user_status,add_by,date_add)values(?,?,?,?,?,1,?,current_date)";


module.exports = {
    check_user,
    add_user
};