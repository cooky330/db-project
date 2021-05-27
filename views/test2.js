var emp_evl = [ {'employee_duty_grade' : '10','employee_duty_evl_content':'업무수행에 있어서 완성된 결과물 산출', 'employee_cmnct_grade' : '8', 'employee_cmnct_evl_content' : '의사소통에 있어서 완성된 결과물 산출'},  ] 


buildTable(emp_evl) 

function buildTable(data) { 
    var table = document.getElementById('test2') 
    
    for (var i=0; i < data.length; i++) { 
        var row = `<tr> 
                    <td>${data[i].employee_duty_grade}</td>
                    <td>${data[i].employee_duty_evl_content}</td>
                    <td>${data[i].employee_cmnct_grade}</td>  
                    <td>${data[i].employee_cmnct_evl_content}</td> 
                    </tr>` 
        table.innerHTML += row 
    } 
}

