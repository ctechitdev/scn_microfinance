const get_data =
 "select first_name,last_name,age,phone_number,whats_app_number,village_namge, districts_name, province_name from tbl_customer  left join tbl_districts on tbl_customer.district_id = tbl_districts.districts_id left join tbl_province on tbl_customer.province_id = tbl_province.province_id where first_name =? or last_name=? or age=? or phone_number=? or whats_app_number=? or village_namge=? or districts_name=? or province_name =?";
const get_identified = "select first_name,last_name,age,phone_number,whats_app_number,village_namge, districts_name, province_name,picture_identified_name from tbl_picture_identified  left join tbl_customer on tbl_picture_identified.customer_id=tbl_customer.customer_id left join tbl_districts on tbl_customer.district_id = tbl_districts.districts_id left join tbl_province on tbl_customer.province_id = tbl_province.province_id where picture_identified_name=?";
module.exports={
    get_data,
    get_identified
}