const check_departByName = "select * from tbl_depart where depart_name = ? ";
const get_departById = "select * from tbl_depart where depart_id = ?"
const get_depart = "select * from tbl_depart";
const add_departByname = "insert into tbl_depart(depart_name)values(?)";
const update_depart = "update tbl_depart set depart_name = ? where depart_id = ?";
const delete_depart = "delete from tbl_depart where depart_id = ?";
const check_departInUser = "SELECT * FROM tbl_user JOIN tbl_depart ON tbl_user.depart_id = tbl_depart.depart_id";



module.exports = {

 check_departByName,
 add_departByname,
 get_depart,
 get_departById,
 update_depart,
 delete_depart,
 check_departInUser,
 
};