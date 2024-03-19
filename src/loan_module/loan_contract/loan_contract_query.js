const search_cutomer_as_contract =
  "select full_name,phone_number,whats_app_number,village_namge, districts_name from tbl_customer left join tbl_districts on tbl_customer.district_id = tbl_districts.districts_id where full_name like ? or phone_number like ?";
// const add_loan_contract =
//   "insert into tbl_loan_contract(loan_contract_number,loan_request_id,customer_id,guarantor_id,loan_fee_values,evaluate_asset_fee_values,contract_status,contract_date,add_by,date_add)values(?,?,?,?,?,?,?,?,?,?,?,current_date)";
const get_loan_contract_id ="select * from tbl_loan_contract where loan_contract_id=?";
const update_loan_contract = "update tbl_loan_contract set customer_id=?, loan_request_id=? where loan_contract_id=?";
const search_loan_contract = "select loan_contract_number,full_name,tbl_customer.phone_number,loan_values_request,currency,guarantor_full_name,tbl_customer_guarantor.phone_number,loan_fee_values,evaluate_asset_fee_values,total_fee_values,contract_status,contract_date from tbl_loan_contract left join tbl_customer on tbl_loan_contract.customer_id = tbl_customer.customer_id left join tbl_loan_request on tbl_loan_contract.loan_request_id = tbl_loan_request.loan_request_id left join tbl_customer_guarantor on tbl_loan_contract.customer_id = tbl_customer_guarantor.customer_id where loan_contract_number like ? or full_name like ? or tbl_customer.phone_number like ?";
const delete_loan_contract = "delete from tbl_loan_contract where where loan_contract_id=?";

module.exports = {
search_cutomer_as_contract,
//add_loan_contract,
update_loan_contract,
get_loan_contract_id,
search_loan_contract,
delete_loan_contract
};
