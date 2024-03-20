const get_user ="select * from tbl_user where user_id = ?";
const delete_user = "delete from tbl_user where user_id=? ";
const search_user =
  "SELECT user_id, full_name, user_name, role_name, depart_name, CASE WHEN user_status = 1 THEN 'Active' ELSE 'Inactive' END AS user_status FROM tbl_user AS tbl_user LEFT JOIN tbl_roles AS tbl_roles ON tbl_user.role_id = tbl_roles.role_id LEFT JOIN tbl_depart AS tbl_depart ON tbl_user.depart_id = tbl_depart.depart_id where full_name like ? or user_name like ?";
module.exports = {
  search_user,
  get_user,
  delete_user
};
