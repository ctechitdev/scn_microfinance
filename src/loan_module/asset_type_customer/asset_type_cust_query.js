const check_assetByName = "select * from tbl_asset_type_customer where asset_type_customer_name=? ";
const add_assetByName = "insert into tbl_asset_type_customer(asset_type_customer_name)values(?)";
const get_all_assetType = "select * from tbl_asset_type_customer";
const get_asset_TypeById = "select * from tbl_asset_type_customer where asset_type_customer_id=? ";
const update_asset_type = "update tbl_asset_type_customer set asset_type_customer_name = ? where asset_type_customer_id = ?";
const check_asset_type = "select * from tbl_asset_credit_customer where asset_type_customer_name = ? "
const delete_asset_type = "delete from tbl_asset_type_customer where asset_type_customer_name=?"

module.exports={
    check_assetByName,
    add_assetByName,
    get_all_assetType,
    get_asset_TypeById,
    update_asset_type,
    check_asset_type,
    delete_asset_type
}