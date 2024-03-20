const search_cutomer_as_cif =
  "select full_name,phone_number,whats_app_number,village_namge, districts_name, province_name from tbl_customer left join tbl_districts on tbl_customer.district_id = tbl_districts.districts_id left join tbl_province on tbl_customer.province_id = tbl_province.province_id where full_name like ? or phone_number like ?";
const add_cif = "insert into tbl_";
  module.exports={
    search_cutomer_as_cif
  };