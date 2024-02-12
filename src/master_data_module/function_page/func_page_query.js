const check_funcPageByName = "select * from tbl_page_title where page_title_name = ? ";
const get_funcPageById = "select * from tbl_page_title where page_title_id = ?"
const get_funcPage = "select * from tbl_page_title";
const add_funcPageByname = "insert into tbl_page_title(page_title_name,page_title_file_name,sub_header_id)values(?,?,?)";
const update_funcPage = "update tbl_page_title set page_title_name = ? where page_title_id = ?";
const delete_funcPage = "DELETE FROM tbl_page_title WHERE page_title_id = ?";
const check_funcPage= "SELECT * FROM tbl_user where page_title_id = ? ";



module.exports = {

    check_funcPageByName,
    add_funcPageByname,
    get_funcPage,
    get_funcPageById,
    update_funcPage,
    delete_funcPage,
    check_funcPage,

};