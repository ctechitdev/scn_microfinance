const request = require("express/lib/request");
const connected = require("../../setting/connect");
const queries = require("./roles_query");

// Create depart
const create_role = (request, respond) => {

    const { role_name } = request.body;

    connected.query(queries.check_roleByName, [role_name], (error, results) => {

        if (error) throw error;
        if (results.length) {
            respond.json({ resultCode: "ສິດນີ້ມີໃນລະບົົບແລ້ວ !" });
        } else {
            connected.query(queries.add_roleByname, [role_name], (error, results) => {
                if (error) throw error;
                respond.json({ resultCode: "ເພີ່ມສິດສຳເລັດ" });
            }
            );
        }
    });
};

// get role or read role
const get_role = (request, response) => {
    connected.query(queries.get_role, (error, results) => {
        if (error) throw error;
        response.json(results);
    })
}
//---get role by id
const get_roleById = (request, response) => {
    const { role_id } = request.body;
    connected.query(queries.get_roleById, [role_id], (error, results) => {
        if (error) throw error;
        // if there are data inside 
        if (results.length) {

            //Return the json message
            response.json(results);
            //if undefind show the json message
        } else {
            if (error) throw error;
            response.json({ resultCode: "ບໍ່ພົບສິດນີ້ !" });
        }
    })

}

// update role
const update_role = (request, response) => {
    const { role_id, role_name } = request.body;
    connected.query(queries.get_roleById, [role_id], (error, results) => {
        const noRoleFound = !results.length;
        if (noRoleFound) {
            if (error) throw error;
            response.json({ resultCode: "ບໍ່ພົບສິດ ບໍ່ສາມາດແກ້ໄຂໄດ້" });
        }
        connected.query(queries.update_role, [role_name, role_id], (error, results) => {
            if (error) throw error;
            response.json({ resultCode: "ແກ້ໄຂສິດສຳເລັດ" });
        })
    })

}

// delete role 
const delete_role = (request, response) => {
    const { role_id } = request.body;
    connected.query(queries.get_roleById, [role_id], (error, results) => {
        const checkUserInrole = queries.check_roleInUser;
        if (checkUserInrole) {
            if (error) throw error;
            response.json({ resultCode: "ບໍ່ສາມາດລົບສິດໄດ້" });
        }
        else {
            connected.query(queries.delete_role, [role_id], (error, results) => {
                if (error) throw error;
                response.json({ resultCode: "ລົບສິດສຳເລັດ" });
            });
        }

    })
}

module.exports = {
    create_role,
    get_role,
    get_roleById,
    update_role,
    delete_role,
};