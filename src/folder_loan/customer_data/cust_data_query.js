const get_data = "select * from tbl_customer where first_name =? or last_name=? or age=? or phone_number=? or whats_app_number=? or village_namge=? or district_id=? or province_id =? ";
const get_identified = "select * from tbl_picture_identified where picture_identified_name=?";
module.exports={
    get_data,
    get_identified
}