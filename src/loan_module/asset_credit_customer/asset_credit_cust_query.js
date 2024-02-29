const add_asset_credit = 
"insert into tbl_asset_credit_customer(asset_type_customer_name, asset_detail, asset_credit_values,limit_credit_values,currency,asset_status,customer_id,add_by,add_date,evaluate_by,evaluate_date,guarantee_picture,location_point)values(?,?,?,?,?,?,?,?,current_date,?,?,?,?)"


module.exports={
    add_asset_credit
}