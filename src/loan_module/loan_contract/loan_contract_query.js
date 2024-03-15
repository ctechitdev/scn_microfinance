const get_loan_contract = "select * from tbl_loan_contract where loan_contract_number =?";
const add_loan_contract =
"insert into tbl_loan_contract(loan_contract_number,loan_request_id,customer_id,guarantor_id, loan_fee_values, evaluate_asset_fee_values,contract_status,contract_date,add_by,date_add)values(?,?,?,?,?,?,?,?,?,current_date)" ;

// const search_loan_contract =
//  "select loan_contract_number,loan_request_id,full_name,phone_number,guarantor_id,SUM((COALESCE(loan_fee_values,0))+(COALESCE(evaluate_asset_fee_values,0))) AS total_fee_values ,contract_status,contract_date,add_by,date_add" + 
//  " from tbl_customer_guarantor " +
//  "left join tbl_customer on tbl_customer.customer_id = tbl_customer.customer_id" +
//  "where full_name like ? or phone_number like ?";
module.exports={
    get_loan_contract,
    add_loan_contract,
    // search_loan_contract

};