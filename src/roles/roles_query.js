const check_roleByName = "select * from tbl_roles where role_name = ? ";
const get_roleById = "SELECT * FROM tbl_roles WHERE role_id = ?"
const get_role = "select * from tbl_roles";
const add_roleByname = "insert into tbl_roles(role_name)values(?)";
const update_role = "update tbl_roles set role_name = ? where role_id = ?";
const delete_role = "DELETE FROM tbl_roles WHERE role_id = ?";
const check_roleInUser = "SELECT * FROM tbl_user JOIN tbl_roles ON tbl_user.role_id = tbl_roles.role_id";



module.exports = {

    check_roleByName,
    add_roleByname,
    get_role,
    get_roleById,
    update_role,
    delete_role,
    check_roleInUser,

};