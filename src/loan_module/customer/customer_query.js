const get_customerByName =
  "select * from tbl_customer where first_name = ? and last_name = ? ";
const get_customerById = "select * from tbl_customer where customer_id = ?";
const get_customerName = "select * from tbl_customer where first_name = ?";
const get_customerByPhone = "select * from tbl_customer where phone_number = ?";

const search_customer =
  "select customer_id,concat(gender,' ',first_name,' ',last_name) as full_name,age,phone_number,whats_app_number,village_namge, districts_name, province_name " +
  " from tbl_customer " +
  "left join tbl_districts on tbl_customer.district_id = tbl_districts.districts_id " +
  " left join tbl_province on tbl_customer.province_id = tbl_province.province_id  " +
  " where first_name like ? or phone_number like ? ";

const search_identified =
  "select first_name,last_name,age,phone_number,whats_app_number,village_namge, districts_name, province_name,picture_identified_name from tbl_picture_identified  left join tbl_customer on tbl_picture_identified.customer_id=tbl_customer.customer_id left join tbl_districts on tbl_customer.district_id = tbl_districts.districts_id left join tbl_province on tbl_customer.province_id = tbl_province.province_id where picture_identified_name=?";

const get_customer =
  `select customer_id, profile_picture, concat(gender,' ',first_name,' ',last_name) as full_name,age,phone_number,whats_app_number,customer_job, customer_job_location ,house_unit,house_number, village_namge,districts_name,province_name from tbl_customer 
  left join tbl_districts on tbl_customer.district_id = tbl_districts.districts_id 
  left join tbl_province on tbl_customer.province_id = tbl_province.province_id order by customer_id DESC`;
const update_customer =
  "update tbl_customer set profile_picture=?, gender=?, first_name =?, last_name = ?,age=? ,date_birth=? ,customer_nationality=?, customer_job=?, customer_job_location=?, province_id=?, district_id=?, village_namge=?, house_unit=?, house_number=?, phone_number=?, whats_app_number=?,house_owner_category=?, live_time_values=?, live_time_type=?, house_owner_status=?, add_by=?, customer_user_id=? where customer_id =?;";
const delete_customer = "DELETE FROM tbl_customer WHERE customer_id = ?";
// check in other table
const check_loan_request = "select * from tbl_loan_request where customer_id=?";
const checkName = "select * from tbl_customer where first_name = ?";
const update_assigned = `update tbl_customer set assigned_by=? where customer_id =?`;
const get_customer_id =
  `SELECT 
  tbl_customer.customer_id, 
  tbl_customer.profile_picture, 
  CONCAT(tbl_customer.gender, ' ', tbl_customer.first_name, ' ', tbl_customer.last_name) AS full_name, 
  tbl_customer.age, 
  tbl_customer.phone_number, 
  tbl_customer.whats_app_number, 
  tbl_customer.customer_job, 
  tbl_customer.customer_job_location, 
  tbl_customer.house_unit, 
  tbl_customer.house_number, 
  tbl_customer.village_namge, 
  tbl_districts.districts_name, 
  tbl_province.province_name,
  tbl_picture_identified.picture_identified_name,
  tbl_picture_identified.picture_name_file,
  tbl_picture_identified.identified_register_date,
  tbl_picture_identified.identified_expire_date,
  tbl_picture_identified_type.picture_identified_type_name
FROM 
  tbl_customer 
LEFT JOIN 
  tbl_picture_identified ON tbl_customer.customer_id = tbl_picture_identified.customer_id 
  LEFT JOIN 
  tbl_picture_identified_type ON tbl_picture_identified.picture_identified_type = tbl_picture_identified_type.picture_identified_type_id 
LEFT JOIN 
  tbl_districts ON tbl_customer.district_id = tbl_districts.districts_id 
LEFT JOIN 
  tbl_province ON tbl_customer.province_id = tbl_province.province_id 
WHERE 
  tbl_customer.customer_id = ?`;
    const add = `insert into tbl_customer (                  
      profile_picture,
      gender,
      first_name,
      last_name,
      age,
      date_birth,
      customer_nationality,
      customer_job,
      customer_job_location,
      province_id,
      district_id,
      village_namge,
      house_unit,
      house_number,
      phone_number,
      whats_app_number,
      house_owner_category,
      live_time_values,
      live_time_type,
      house_owner_status,
      customer_status,add_date)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,current_date)`;
    const add_2= `INSERT INTO tbl_picture_identified(customer_id,picture_identified_name,picture_name_file,identified_register_date,identified_expire_date,picture_identified_type,date_add)values (?,?,?,?,?,?,current_date)`;

module.exports = {
  get_customerByName,
  get_customer,
  get_customerById,
  update_customer,
  delete_customer,
  get_customerByName,
  check_loan_request,
  checkName,
  search_customer,
  search_identified,
  get_customerName,
  get_customerByPhone,
  update_assigned,
  get_customer_id,
  add,
  add_2
};
