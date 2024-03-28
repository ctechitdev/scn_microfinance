const add_loan_status = `insert into tbl_loan_request_status (loan_request_status_name)values(?)`;
const get_loan_status_id = `select * from tbl_loan_request_status where loan_request_status_id = ?`;
const get_loan_status_name = `select * from tbl_loan_request_status where loan_request_status_name = ?`;
const get_loan_request_status = `select * from tbl_loan_request_status`;
const search = `select loan_request_status_name from tbl_loan_request_status where loan_request_status_name like ? or loan_request_status_id = ?`;

module.exports = {
    add_loan_status,
    get_loan_status_id,
    get_loan_status_name,
    get_loan_request_status,
    search
};