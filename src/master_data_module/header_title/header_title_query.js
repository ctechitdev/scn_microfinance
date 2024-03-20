const add_header_title = "insert into tbl_header_title (header_title_name)values(?)";
const get_header_title_name ="select * from tbl_header_title where header_title_name=?";
const get_header_title_id="select * from tbl_header_title where header_title_id = ?";
const get_header_title = "select * from tbl_header_title";
const update_header_title = "update tbl_header_title set header_title_name=? where header_title_id = ?";

module.exports={
    add_header_title,
    get_header_title_name,
    get_header_title,
    get_header_title_id,
    update_header_title
};