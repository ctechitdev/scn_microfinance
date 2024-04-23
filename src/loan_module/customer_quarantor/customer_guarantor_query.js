const get_guarantor_customer = "select * from tbl_customer_guarantor where guarantor_full_name = ?";
const add_guarantor_customer =
`insert into tbl_customer_guarantor
(    
  guarantor_profile_picture,
  guarantor_full_name,
  gender,
  age,
  date_birth,
  guarantor_nationality,
  guarantor_job,
  guarantor_job_location,
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
  customer_id,add_date)
values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,current_date)`;
const add_2= `INSERT INTO tbl_guarantor_picture_identified
(guarantor_id,picture_identified_picture_name,picture_name_file,identified_register_date,identified_expire_date,picture_identified_type,date_add)values (?,?,?,?,?,?,current_date)`;

const search_customer_guarantor =
 "select customer_guarantor_id,full_name, tbl_customer.phone_number, guarantor_full_name,tbl_customer_guarantor.phone_number,tbl_customer_guarantor.village_namge, districts_name, province_name " + 
 " from tbl_customer_guarantor " + 
 "left join tbl_customer on tbl_customer_guarantor.customer_id = tbl_customer.customer_id " +
 "left join tbl_districts on tbl_customer_guarantor.district_id = tbl_districts.districts_id " +
 " left join tbl_province on tbl_customer_guarantor.province_id = tbl_province.province_id " +
 " where full_name like ? or tbl_customer.phone_number like ? ";

 const update_customer_guarantor = 
 "update tbl_customer_guarantor set guarantor_profile_picture = ? , guarantor_full_name= ?, gender= ?, age= ?, date_birth= ?, guarantor_nationality= ?,guarantor_job= ?, guarantor_job_location= ?, province_id= ?, district_id= ?, village_namge= ?, house_unit= ?, house_number= ?,phone_number= ?, whats_app_number= ?, house_owner_category= ?, live_time_values =?, live_time_type=?, house_owner_status=?,customer_id=?" +
  "where customer_guarantor_id= ?";

  const get_id ="select * from tbl_customer_guarantor where customer_guarantor_id=?"
  const get_name ="select * from tbl_customer_guarantor where guarantor_full_name=?"
  const delete_customer_guarantor="DELETE FROM tbl_customer_guarantor WHERE customer_guarantor_id = ?";
  const get_customer_guarantor_id = 
  `SELECT 
  tbl_customer_guarantor.customer_guarantor_id,
  tbl_customer_guarantor.guarantor_profile_picture,
  tbl_customer_guarantor.guarantor_full_name,
  tbl_customer_guarantor.gender,
  tbl_customer_guarantor.age,
  tbl_customer_guarantor.date_birth,
  tbl_customer_guarantor.guarantor_nationality,
  tbl_customer_guarantor.guarantor_job,
  tbl_customer_guarantor.guarantor_job_location,
  tbl_customer_guarantor.province_id,
  tbl_customer_guarantor.district_id,
  tbl_customer_guarantor.village_namge,
  tbl_customer_guarantor.house_unit,
  tbl_customer_guarantor.house_number,
  tbl_customer_guarantor.phone_number,
  tbl_customer_guarantor.whats_app_number,
  tbl_customer_guarantor.house_owner_category,
  tbl_customer_guarantor.live_time_values,
  tbl_customer_guarantor.live_time_type,
  tbl_customer_guarantor.house_owner_status,
  tbl_customer.full_name,
  tbl_customer.age AS customer_age, 
  tbl_customer.phone_number AS customer_phone_number, 
  tbl_customer.village_namge AS customer_village_name, 
  tbl_districts.districts_name, 
  tbl_province.province_name,
  tbl_guarantor_picture_identified.picture_identified_picture_name,
  tbl_guarantor_picture_identified.picture_name_file,
  tbl_guarantor_picture_identified.identified_register_date,
  tbl_guarantor_picture_identified.identified_expire_date,
  tbl_picture_identified_type.picture_identified_type_name
FROM 
  tbl_customer_guarantor
LEFT JOIN 
  tbl_guarantor_picture_identified ON tbl_customer_guarantor.customer_guarantor_id = tbl_guarantor_picture_identified.guarantor_id 
LEFT JOIN 
  tbl_picture_identified_type ON tbl_guarantor_picture_identified.picture_identified_type = tbl_picture_identified_type.picture_identified_type_id 
LEFT JOIN 
  tbl_districts ON tbl_customer_guarantor.district_id = tbl_districts.districts_id 
LEFT JOIN 
  tbl_customer ON tbl_customer_guarantor.customer_id = tbl_customer.customer_id 
LEFT JOIN 
  tbl_province ON tbl_customer_guarantor.province_id = tbl_province.province_id 
WHERE 
  tbl_customer_guarantor.customer_guarantor_id = ?`;


module.exports={
    get_guarantor_customer,
    add_guarantor_customer,
    search_customer_guarantor,
    update_customer_guarantor,
    get_id,
    get_name,
    delete_customer_guarantor,
    add_2,
    get_customer_guarantor_id
};