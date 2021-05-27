const e = require('express');
var express = require('express');
var router = express.Router();
//const template = require('./template.js');
//const axios = require('axios');

var maria = require('../maria'); 
// connection 은 서버가 app.js 에서 수행

/* GET home page. */
// 데이터 출력 확인 부분 
router.get('/web_manage', function (req, res, next) {
  maria.query('select * from web_manage', function (err, rows, fields) {
      if (!err) {
          console.log(rows);
          var result = JSON.stringify(rows)
          res.send(result);
      } else {
          console.log('query error : ' + err);
          res.send(err);
      }
  });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'main' });
});

router.get('/evaluate', function(req, res, next) {
    res.render('evaluate', { title: 'evaluate' });
  });

router.get('/evaluate_e_insert', function(req, res, next) {
    res.render('evaluate_e_insert', { title: 'evaluate_e_insert' });
  });
router.get('/evaluate_e_update', function(req, res, next) {
    res.render('evaluate_e_update', { title: 'evaluate_e_update' });
  });

router.get('/evaluate_c_insert', function(req, res, next) {
    res.render('evaluate_c_insert', { title: 'evaluate_c_insert' });
  });
router.get('/evaluate_c_update', function(req, res, next) {
    res.render('evaluate_c_update', { title: 'evaluate_c_update' });
  });
router.get('/evaluate_p_insert', function(req, res, next) {
    res.render('evaluate_pm_insert', { title: 'evaluate_p_insert' });
  });
router.get('/evaluate_p_update', function(req, res, next) {
    res.render('evaluate_pm_update', { title: 'evaluate_p_update' });
  });
router.get('/personnel_information', function(req, res, next) {
  res.render('personnel_information', { title: 'personnel_information' });
  });

//인사정보 입력
  router.post('/personnel_information', function (req, res, next) {
    var employee_id = req.body['employee_id'];
    var employee_name = req.body['employee_name']; 
    var ihidnum = req.body['ihidnum']; 
    var join_day = req.body['join_day'];
    var final_graduate = req.body['final_graduate'];
    var web_manage_id = req.body['web_manage_id'];
    var pass_word = req.body['pass_word'];
    var master_check = req.body['master_check'];

    maria.query('INSERT INTO employee(employee_id, employee_name, ihidnum, final_graduate, join_day, web_manage_id, pass_word, master_check ) VALUES (?,?,?,?,?,?,?,?)', [employee_id, employee_name, ihidnum, final_graduate, join_day, web_manage_id, pass_word, master_check],function (err, result) {
      if (!err) {
          res.send('저장 완료');
    } 
    else {
        res.send('error : ' + err);
    }
  });
  });

router.get('/personnel_modify', function(req, res, next) {
  res.render('personnel_modify', { title: 'personnel_modify' });
  });

//인사정보 수정
router.post('/personnel_modify', function (req, res, next) {
    var employee_id = req.body['employee_id'];
    var new_employee_id = req.body['new_employee_id'];
    var employee_name = req.body['employee_name'];
    var ihidnum = req.body['ihidnum'];     
    var final_graduate = req.body['final_graduate'];
    var join_day = req.body['join_day'];
    var end_day = req.body['end_day'];
    var web_manage_id = req.body['web_manage_id'];
    var pass_word = req.body['pass_word'];
    var master_check = req.body['master_check']; 

    var new_employee_id=employee_id;
 
      maria.query('UPDATE employee SET employee_id = ?, employee_name = ?, ihidnum = ?, final_graduate=?, join_day=?, end_day =?, web_manage_id =?, pass_word=?, master_check=? where employee_id = ?', [employee_id, employee_name, ihidnum, final_graduate, join_day, end_day, web_manage_id, pass_word, master_check, new_employee_id], function (err, result) {
      if (!err) {
        res.send('수정 완료');
    } else {
    res.send('error : ' + err);
    }
  });
    
    
    
});

router.get('/personnel_search', function(req, res, next) {
    res.render('personnel_search', { title: 'personnel_search' });
  });


router.get('/project_view', function(req, res, next) {
  res.render('project_view', { title: 'project_view' });
});


//완료 프로젝트 평가정보 조회
router.post('/project_view', function (req,res,next) {
  if (req.body.searchhr=="프로젝트 번호"){
    var project_id = req.body.search
    var sql = "select p.project_id,p.project_name,p.project_start_date,p.project_terminate_date,c.customer_name from project p , customer c where p.customer_id=c.customer_id && p.project_id ='" + project_id+"' ;" ;
    var sql_c = "select c.customer_evl_id, e.employee_name, c.customer_duty_grade, c.customer_cmnct_grade, c.customer_duty_evl_content, c.customer_cmnct_evl_content from customer_evl c, employee e where e.employee_id = c.employee_id && project_id ='" + project_id+"' ;" ;
    var sql_p = "select pm_evl_id, employee_id, pm_duty_grade, pm_cmnct_grade, pm_duty_evl_content, pm_cmnct_evl_content from pm_evl where project_id ='" + project_id+"' ;" ;
    var sql_e = "select employee_evl_id, employee_id, employee_duty_grade, employee_cmnct_grade, employee_duty_evl_content, employee_cmnct_evl_content from employee_evl where project_id='" + project_id+"' ;" ;
    maria.query(sql+sql_c+sql_p+sql_e,function(err, rows,fields) { 
      var sql_result = rows[0]
      var sql_c_result = rows[1]
      var sql_p_result = rows[2]
      var sql_e_result = rows[3]
      if (!err) {
        if (sql_result!=undefined) {
          res.render('project_view',{
            views :[sql_result,sql_c_result,sql_p_result,sql_e_result]});
        } else {
            res.send('no data');
        }
      
      } else {
        res.send('error : ' + err);
      }
      });
  } });

router.get('/project_submit', function(req, res, next) {
    res.render('project_submit', { title: 'project_submit' });
  });
router.get('/project_modify', function(req, res, next) {
    res.render('project_modify', { title: 'project_modify' });
  });

// 요구사항 9번항목
router.get('/dept_info', function(req, res, next) {
    res.render('dept_info');
  });  

// 로그인 하는 부분
router.get('/', function (req, res, next) {
  res.render('login');
});
router.post('/', function (req, res, next) {
  var web_manage_id = req.body['web_manage_id'];
  var pass_word = req.body['pass_word'];
  maria.query('select * from employee where web_manage_id=? and pass_word=?',[web_manage_id,pass_word], function (err, rows) {
      if (!err) {
          if (rows[0]!=undefined) {
              res.render('index')
          } else {
              res.send('no data');
          }

      } else {
          res.send('error : ' + err);
      }
  });
});
// 회원가입 하는 부분
router.get('/sign_up', function (req, res, next) {
  res.render('sign_up');
});
router.post('/sign_up', function (req, res, next) {
  var employee_name = req.body['employee_name'];
  var ihidnum = req.body['ihidnum'];
  var department_id = req.body['department_id'];
  var web_manage_id = req.body['web_manage_id'];
  var pass_word = req.body['pass_word'];
  var master_check = req.body['master_check'];
  var final_graduate = req.body['final_graduate'];
      maria.query('insert into employee(employee_name,ihidnum,department_id,web_manage_id,pass_word,master_check,final_graduate) values(?,?,?,?,?,?,?)', [employee_name,ihidnum,department_id,web_manage_id,pass_word,master_check,final_graduate], function (err, rows) {
          if (!err) {
              res.send('success');
          } else {
              res.send('err : ' + err);
          }
      });
});
module.exports = router;