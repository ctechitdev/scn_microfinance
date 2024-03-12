const check_account_number = "select account_number from tbl_account where account_number=?"
const add_account = "insert into tbl_account(account_number,CIF_id,customer_id,account_balance,account_by_branch,account_type_id,account_status,currency_code,create_by,date_create,date_update)values(?,?,?,?,?,?,?,?,?,current_date,?)";
const get_account= "select * from tbl_account";
const get_account_id = "select * from tbl_account where account_id=?"
const get_account_number = "select * from tbl_account where account_number=?"
const get_customer="select account_id,account_number,CIF_id,first_name,last_name,account_by_branch,account_balance,account_type_id,account_status,currency_code,create_by,date_create,date_update from tbl_account left join tbl_customer on tbl_account.customer_id = tbl_customer.customer_id where first_name = ? "
const update = "update tbl_account set"

module.exports={
    check_account_number,
    get_account,
    add_account,
    get_account_id,
    get_account_number,
    get_customer

}