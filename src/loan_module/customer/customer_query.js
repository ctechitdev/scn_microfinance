const get_customerByName = "select * from tbl_customer where first_name = ? and last_name = ? ";
const get_customerById = "select * from tbl_customer where customer_id = ?"
const get_customerName = "select * from tbl_customer where first_name = ?";
const get_customerByPhone = "select * from tbl_customer where phone_number = ?"
const get_customer = "select * from tbl_customer";
const add_customer = "insert into tbl_customer(profile_picture,gender,first_name,last_name,full_name,age,date_birth,customer_nationality,customer_job,customer_job_location,province_id,district_id, village_namge,house_unit,house_number,phone_number,whats_app_number,house_owner_category,live_time_values,live_time_type,house_owner_status,customer_status,assigned_by,add_by,customer_user_id,add_date) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
const update_customer = "update tbl_customer set profile_picture=?, gender=?, first_name =?, last_name = ?, full_name=?,age=? ,date_birth=? ,customer_nationality=?, customer_job=?, customer_job_location=?, province_id=?, district_id=?, village_namge=?, house_unit=?, house_number=?, phone_number=?, whats_app_number=?,house_owner_category=?, live_time_values=?, live_time_type=?, house_owner_status=?, customer_status=?, assigned_by=?, add_by=?, customer_user_id=?, add_date=? where first_name =?";
const delete_customer = "DELETE FROM tbl_customer WHERE customer_id = ?";
// check in other table
const check_loan_request = "select * from tbl_loan_request where customer_id=?";
const checkName = "select * from tbl_customer where first_name = ?";

module.exports = {

    get_customerByName,
    add_customer,
    get_customer,
    get_customerById,
    update_customer,
    delete_customer,
    get_customerByName,
    get_customerByPhone,
    get_customerName,
    check_loan_request,
    checkName
};