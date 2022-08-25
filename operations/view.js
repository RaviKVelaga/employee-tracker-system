const inquirer = require('inquirer');
const connection = require('../config/connection');
const first = require('../server');
const cTable =require('console.table');

function showAllEmployees() {
    connection.query(
        `SELECT  e.id AS Employee_ID, e.first_name AS First_Name, e.last_name AS Last_Name, r.salary AS Salary, r.title AS title, d.department_name AS department, CONCAT(m.first_name, ' ',m.last_name) as manager
        FROM employees e LEFT JOIN employees m ON e.manager_id = m.id 
        INNER JOIN roles r ON e.role_id = r.id 
        INNER JOIN departments d ON r.department_id = d.id 
        ORDER BY e.id`,
        function(err,results) {
            if(err) throw err;
            console.table(results);
            first.start();
        } 
    )
}

function showAllRoles() {
    connection.query(
        `SELECT r.id, r.title as title, d.department_name as department, r.salary as salary
        FROM roles r INNER JOIN departments d ON d.id =r.department_id
        ORDER BY r.id`,
        function(err,results) {
            if(err) throw err;
            console.table(results);
            first.start();
        } 
    )
}



function showAllDepartments() {
    connection.query(
        `SELECT d.id, d.department_name as name
        FROM departments d
        ORDER BY d.id`,
        function(err,results) {
            if(err) throw err;
            console.table(results);
            first.start();
        } 
    )
}

module.exports ={ showAllDepartments, showAllRoles, showAllEmployees}
