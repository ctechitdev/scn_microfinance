const add_loan_request = `insert into tbl_loan_request(customer_id, loan_values_request, currency, loan_request_status_name, reason_request, payment_loan_type_name,payment_loan_type_value,add_by,request_date)values(?,?,?,?,?,?,?,?,current_date)`;
const get_loan_request = `select full_name,phone_number,whats_app_number,village_namge, districts_name, loan_values_request, currency, loan_request_status_name, reason_request, payment_loan_type_name,payment_loan_type_value
from tbl_loan_request 
left join tbl_customer on tbl_loan_request.customer_id = tbl_customer.customer_id
left join tbl_districts on tbl_loan_request.customer_id = tbl_districts.districts_id
left join tbl_province on tbl_loan_request.customer_id = tbl_province.province_id`;

const delete_loan_request = `delete from tbl_loan_request where loan_request_id =?`;
const get_loan_request_id = `select * from tbl_loan_request where loan_request_id = ?`;
const update_loan_request = `update tbl_loan_request set loan_values_request =?, currency =?, loan_request_status_name =?, reason_request =?, payment_loan_type_name =?,payment_loan_type_value =? where loan_request_id = ?`;
const update_evaluate_status = `update tbl_loan_request set evaluate_status =? where  loan_request_id =?`;
const update_approve_comment = `update tbl_loan_request set  approve_comment=? where  loan_request_id =?`;
module.exports={
    add_loan_request,
    get_loan_request,
    get_loan_request_id,
    update_loan_request,
    delete_loan_request,
    update_evaluate_status,
    update_approve_comment
};