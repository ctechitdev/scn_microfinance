const add_asset_credit = 
"insert into tbl_asset_credit_customer(asset_type_customer_name, asset_detail, asset_credit_values,limit_credit_values,currency,asset_status,customer_id,add_by,add_date,evaluate_by,evaluate_date,guarantee_picture)values(?,?,?,?,?,?,?,?,current_date,?,?,?)"
const get_asset_credit = "select full_name,concat(phone_number,',',whats_app_number) as phone_number,concat(village_namge,',',districts_name,',',province_name) as address,concat(customer_job,',','ສະຖານທີ່:',' ',customer_job_location) as customer_job,guarantee_picture,asset_type_customer_name,asset_credit_values,limit_credit_values,currency,asset_detail from tbl_asset_credit_customer left join tbl_customer on tbl_asset_credit_customer.customer_id = tbl_customer.customer_id left join tbl_districts on tbl_asset_credit_customer.asset_credit_customer_id = tbl_districts.districts_id left join tbl_province on tbl_asset_credit_customer.asset_credit_customer_id = tbl_province.province_id";




module.exports={
    add_asset_credit,
    get_asset_credit,
}