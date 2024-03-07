const check_account_number = "select account_number from tbl_account where account_number=?"
//const add_account = "insert into tbl_account(account_number,CIF_id,customer_id,account_balance,account_by_branch,account_type_id,account_status,currency_code,create_by,date_create,date_update)values(?,?,?,?,?,?,?,?,?,current_date,?)";
const get_account= "select * from tbl_account"

module.exports={
    check_account_number,
    get_account,
    add_account
}