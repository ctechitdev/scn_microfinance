const check_currencyByCode = "select * from tbl_currency where currency_code = ? ";//
const get_currencyById = "select * from tbl_currency where currency_id = ?"
const get_currency = "select * from tbl_currency";
const add_currencyByCode = "insert into tbl_currency(currency_code)values(?)"; //
const update_currency = "update tbl_currency set currency_code = ? where currency_id = ?";
const delete_currency = "DELETE FROM tbl_currency WHERE currency_code = ?";
const check_currency ="SELECT * FROM tbl_asset_credit_customer where currency= ? ";



module.exports = {

    check_currencyByCode,
    add_currencyByCode,
    get_currency,
    get_currencyById,
    update_currency,
    delete_currency,
    check_currency,

};