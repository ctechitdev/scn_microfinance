const add_loan_request = `insert into tbl_loan_request(
    customer_id,
    loan_values_request,
    currency,
    loan_request_status_name,
    reason_request,
    payment_loan_type,
    payment_loan_type_value,
    add_by,
    request_date,
    

    )
    values(?,?,?,?,?,?,?,?,current_date,)`;


module.exports={

};