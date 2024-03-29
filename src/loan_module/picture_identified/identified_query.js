const get_picture_identified_name = `select picture_identified_name from tbl_picture_identified where picture_identified_name=?`;
const add_identified = `insert into tbl_picture_identified(customer_id, picture_identified_name, picture_name_file, identified_register_date, identified_expire_date, picture_identified_type, date_add)values(?,?,?,?,?,?,current_date)`;
const get_identified = `select customer_id,picture_identified_name, picture_name_file, identified_register_date, identified_expire_date, picture_identified_type_name from tbl_picture_identified 
left join tbl_picture_identified_type on tbl_picture_identified.picture_identified_type = tbl_picture_identified_type.picture_identified_type_id`;
const update_identified = `update tbl_picture_identified set picture_identified_name =?, picture_name_file =?, identified_register_date =?, identified_expire_date =?, picture_identified_type =? where picture_identified_id = ?`;
const get_identified_id =`select * from tbl_picture_identified where picture_identified_id=?`;

module.exports={
    get_picture_identified_name,
    add_identified,
    get_identified,
    get_identified_id,
    update_identified

};