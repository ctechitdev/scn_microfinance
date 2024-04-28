const add_asset_credit = `insert into tbl_asset_credit_customer(asset_type_customer_name, asset_detail, asset_credit_values,limit_credit_values,currency,asset_status,customer_id,add_by,add_date,evaluate_by,evaluate_date,guarantee_picture)
  values(?,?,?,?,?,?,?,?,current_date,?,?,?)`;
const get_asset_credit =
  "select full_name,concat(phone_number,',',whats_app_number) as phone_number,concat(village_namge,',',districts_name,',',province_name) as address,concat(customer_job,',','ສະຖານທີ່:',' ',customer_job_location) as customer_job,guarantee_picture,asset_type_customer_name,asset_credit_values,limit_credit_values,currency,asset_detail from tbl_asset_credit_customer left join tbl_customer on tbl_asset_credit_customer.customer_id = tbl_customer.customer_id left join tbl_districts on tbl_asset_credit_customer.asset_credit_customer_id = tbl_districts.districts_id left join tbl_province on tbl_asset_credit_customer.asset_credit_customer_id = tbl_province.province_id order by full_name DESC";
// const search =
//  `select guarantee_picture, concat(gender,' ',first_name,' ',last_name) as full_name,
// age,
// phone_number,
// whats_app_number,
// village_namge,
// districts_name,
// province_name ,
// asset_credit_values,
// limit_credit_values,
// CASE WHEN asset_status = 1 THEN 'Active' ELSE 'Inactive' END AS asset_status FROM tbl_asset_credit_customer AS tbl_asset_credit_customer 
// left join tbl_customer ON tbl_asset_credit_customer.customer_id = tbl_customer.customer_id 
// left join tbl_districts on tbl_asset_credit_customer.customer_id=tbl_districts.districts_id 
// left join tbl_province on tbl_asset_credit_customer.customer_id=tbl_province.province_id
//  where first_name like ? or phone_number like ? or whats_app_number like ?`;
const update_asset_credit = `update tbl_asset_credit_customer set asset_type_customer_name=?,asset_detail=?, asset_credit_values=?, limit_credit_values=?, currency=?,guarantee_picture = ? where asset_credit_customer_id = ?`;
const get_asset_credit_ById =
  "select * from tbl_asset_credit_customer where asset_credit_customer_id=? ";
const update_check_asset_credit_customer =
  "update tbl_asset_credit_customer set limit_credit_values =?,currency=? where asset_credit_customer_id = ? ";
const delete_asset_credit =
  "delete from tbl_asset_credit_customer where asset_credit_customer_id =?";
const search_asset_credit = "select profile_picture,full_name,age,village_namge,districts_name,province_name ,asset_credit_values,limit_credit_values, currency from tbl_asset_credit_customer left join tbl_customer on tbl_asset_credit_customer.customer_id = tbl_customer.customer_id left join tbl_districts on tbl_asset_credit_customer.customer_id=tbl_districts.districts_id left join tbl_province on tbl_asset_credit_customer.customer_id=tbl_province.province_id where full_name like ? or phone_number like ?";

module.exports = {
  add_asset_credit,
  get_asset_credit,
  // search,
  update_asset_credit,
  get_asset_credit_ById,
  delete_asset_credit,
  update_check_asset_credit_customer,
  search_asset_credit
};
