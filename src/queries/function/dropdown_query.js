const show_depart = "SELECT * from tbl_depart";
const show_provice = "SELECT * from tbl_province";
const show_disctic = "SELECT districts_id,districts_name from tbl_districts where province_id = ?";

module.exports = {
    show_depart,
    show_provice,
    show_disctic
};