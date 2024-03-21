const add_sub_header = "insert into tbl_sub_header(sub_header_name, icon_code, header_title_id)values(?,?,?)";
const get_sub_header_name = "select * from tbl_sub_header where sub_header_name=?";

module.exports={
    add_sub_header,
    get_sub_header_name
};