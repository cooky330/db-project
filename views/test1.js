var project = [ {'project_id' : 'project_1','project_name':'스마트얄약도우미', 'project_start_date' : '2008-12-25', 'project_terminate_date' : '2019-05-16'},  ] 


buildTable(project) 

function buildTable(data) { 
    var table = document.getElementById('test1') 
    
    for (var i=0; i < data.length; i++) { 
        var row = `<tr> 
                    <td>${data[i].project_id}</td>
                    <td>${data[i].project_name}</td>
                    <td>${data[i].project_start_date}</td>  
                    <td>${data[i].project_terminate_date}</td> 
                    </tr>` 
        table.innerHTML += row 
    } 
}

