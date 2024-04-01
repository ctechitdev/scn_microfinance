const request = require("express/lib/request");
const connected = require("../../../setting/connect");
const queries = require("./func_page_query");

const jwt = require("jsonwebtoken");
const { result } = require("@hapi/joi/lib/base");
const { response } = require("express");

const secretkey = "CtecMicrofinance";


// Create page_title
const create_funcPage = (request, response) => {
  //ຮັບພາລາມິດເຕີໃນ postman ເຂົ້າມາ
  const { page_title_name,page_title_file_name,sub_header_id } = request.body;
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.check_funcPageByName, [page_title_name], (error, results) => {
        if (error) throw error;
        if (results.length) {
          response.json({ resultCode: "ມີໜ້າຟັງຊັ່ນນີ້ແລ້ວ !" })
        } else {
           connected.query(queries.add_funcPageByname,[page_title_name,page_title_file_name,sub_header_id],(error,results)=>{
            if(error)throw error;
          response.json({ resultCode: "ເພີ່ມໜ້າຟັງຊັ່ນສຳເລັດ" })
           })
        }
      })
    }
  })
}
// get page_title or read page_title
const get_funcPage = (request, response) => {
  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_funcPage, (error, results) => {
        if (error) throw error;
        response.json(results);
      })
    }
  })
}
//---get page_title by id
const get_funcPageById = (request, response) => {
  const { page_title_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error " });
    } else {
      connected.query(queries.get_funcPageById, [page_title_id], (error, results) => {
        if (error) throw error;
        if (results.length) {
          response.json(results);
        } else {
          response.json({ resultCode: "ບໍ່ພົບໜ້າຟັງຊັ່ນນີ້ !" });
        }
      });
    }
  });
};

// update page_title
const update_funcPage = (request, response) => {
  const { page_title_id,page_title_name,page_title_file_name,sub_header_id } = request.body;

  jwt.verify(request.token, secretkey, (token_error, rstoken) => {
    if (token_error) {
      response.json({ resultCode: "token error" })
    } else {
      connected.query(queries.get_funcPageById, [page_title_id], (error, results) => {
        const NotFound = !results.length;
        if (NotFound) {
          if (error) throw error;
          response.json({ resultsCode: "ບໍ່ສາມາດແກ້ໄຂໜ້າຟັງຊັ່ນໄດ້" });
        } else {
          connected.query(queries.update_funcPage, [ page_title_id,page_title_name,page_title_file_name,sub_header_id], (error, results) => {
          if (error) throw error;
          response.json({ resultsCode: "ແກ້ໄຂໜ້າຟັງຊັ່ນສຳເລັດ" });
          })
        }
      });
    }
  });
};

// delete page_title
const delete_funcPage = (request, response) => {
    const { page_title_id } = request.body;
  
    jwt.verify(request.token, secretkey, (token_error, rstoken) => {
      if (token_error) {
        response.json({ resultCode: "token error" });
      } else {
        connected.query(queries.get_funcPageById, [page_title_id], (error, results) => {
          const NotFound = !results.length;
          if (NotFound) {
            if (error) throw error;
            response.json({ resultsCode: "ລົບໜ້າຟັງຊັ່ນບໍ່ໄດ້" });
          } else {
            connected.query(queries.delete_funcPage, [page_title_id], (error, results) => {
              if (error) throw error;
              response.json({ resultsCode: "ລົບໜ້າຟັງຊັ່ນສຳເລັດ" });
            });
          }
        });
      }
    });
  };




module.exports = {
  create_funcPage,
  get_funcPage,
  get_funcPageById,
  update_funcPage,
  delete_funcPage,
};
