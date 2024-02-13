const show_userByData =
  "select user_id, full_name, user_name, depart_name, role_name from tbl_user left join tbl_roles on tbl_user.role_id = tbl_roles.role_id left join tbl_depart ON tbl_user.depart_id = tbl_depart.depart_id where user_id=? or full_name=? or user_name=? or depart_name=? or role_name=?";

const active =
  "SELECT user_id, full_name, user_name, role_name, depart_name, CASE WHEN user_status = 1 THEN 'Active' ELSE 'Inactive' END AS user_status FROM tbl_user AS tbl_user LEFT JOIN tbl_roles AS tbl_roles ON tbl_user.role_id = tbl_roles.role_id LEFT JOIN tbl_depart AS tbl_depart ON tbl_user.depart_id = tbl_depart.depart_id";
module.exports = {
  active,
  show_userByData,
};
