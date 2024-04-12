const search_cutomer_as_cif =
  "select full_name,phone_number,whats_app_number,village_namge, districts_name, province_name from tbl_customer left join tbl_districts on tbl_customer.district_id = tbl_districts.districts_id left join tbl_province on tbl_customer.province_id = tbl_province.province_id where full_name like ? or phone_number like ?";
const add_cif = "insert into tbl_cif_scn(customer_id, CIF_SCN_status, CIF_SCN_date)values(?,?,current_date);";
const get_customer_id =`select * from tbl_cif_scn where customer_id=? `;
const get_cif = `select * from tbl_cif_scn`;
const get_cif_id = `select CIF_SCN_number,full_name,phone_number from tbl_cif_scn 
left join tbl_customer on tbl_cif_scn.customer_id = tbl_customer.customer_id where CIF_SCN_id=?`;
const check_cif_id_in_account = `select * from tbl_account where CIF_id = ?`;
// const update_cif =`update tbl_cif_scn set customer_id=? where CIF_SCN_id=?`;
const get_customerById = "select * from tbl_customer where customer_id = ?";
  module.exports={
    search_cutomer_as_cif,
    add_cif,
    get_customer_id,
    get_cif,
    get_cif_id,
    check_cif_id_in_account,
    // update_cif,
    get_customerById

  };