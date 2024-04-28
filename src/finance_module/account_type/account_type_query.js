const get_account_type = `select * from tbl_account_type`;
const get_id =` select * from tbl_account_type where account_type_id = ?`;

module.exports = {
    get_account_type,
    get_id
}