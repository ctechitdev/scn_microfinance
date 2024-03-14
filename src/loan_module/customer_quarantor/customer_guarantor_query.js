const get_guarantor_customer = "select * from tbl_customer_guarantor where guarantor_full_name = ?"
const add_guarantor_customer =
"insert into tbl_customer_guarantor(guarantor_profile_picture,guarantor_full_name,gender,age,date_birth,guarantor_nationality,guarantor_job,guarantor_job_location,province_id,district_id,village_namge,house_unit,house_number,phone_number,whats_app_number,house_owner_category,live_time_values,live_time_type,house_owner_status,customer_id,add_by,add_date)" +
"values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,current_date)";

const search_customer_guarantor =
 "select customer_guarantor_id,full_name, tbl_customer.phone_number, guarantor_full_name,tbl_customer_guarantor.phone_number,tbl_customer_guarantor.village_namge, districts_name, province_name " + 
 " from tbl_customer_guarantor " + 
 "left join tbl_customer on tbl_customer_guarantor.customer_id = tbl_customer.customer_id " +
 "left join tbl_districts on tbl_customer_guarantor.district_id = tbl_districts.districts_id " +
 " left join tbl_province on tbl_customer_guarantor.province_id = tbl_province.province_id " +
 " where full_name like ? or tbl_customer.phone_number like ? ";

 const update_customer_guarantor = 
 "update tbl_customer_guarantor set guarantor_profile_picture = 'okder.jpg' ,  guarantor_full_name= 'ຫາ ວ່າງ', gender= 'ທ້າວ', age= '19', date_birth= '2004-02-17', guarantor_nationality= 'ລາວ',  guarantor_job= 'ນັກບິນທະບາດ', guarantor_job_location= 'ວັດ', province_name= 'ນະຄອນຫຼວງວຽງຈັນ', district_name= 'ສີໂຄດຕະບອງ', village_namge= 'ທົ່ງປົ່ງ', house_unit= '40', house_number= '666',  phone_number= '2078066015', whats_app_number= '2078066015', house_owner_category= 'ເຮືອນເຊົ່າ',  picture_identified_name= '1234567890', picture_name_file= 'haha.jpg', identified_register_date= '2026-01-01', identified_expire_date= '2033-01-01'  where customer_guarantor_id = '88'" +
 "left join tbl_province on tbl_customer_guarantor.province_id = tbl_province.province_id" +
 "left join tbl_districts on tbl_customer_guarantor.district_id = tbl_districts.districts_id" +
 "left join tbl_picture_identified on tbl_picture_identified.customer_id = tbl_customer.customer_id"


module.exports={
    get_guarantor_customer,
    add_guarantor_customer,
    search_customer_guarantor,
    update_customer_guarantor
}