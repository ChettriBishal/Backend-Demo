// Sort the sheet based on CGPA
// Each subject will have only 50 seats
// Assign electives to each student
// Create an excel sheet of those elective
const { toPlainObject, includes } = require('lodash');
const parser = require('simple-excel-to-json')
const doc = parser.parseXls2Json('./Assignment.xlsx')[0]; 
const json2xls = require("json2xls");
const fs = require('fs');


doc.sort((a,b) => {return a.CGPA - b.CGPA});
doc.reverse();
// console.log(doc);

const electives = {
    'Fundamentals of Web Technologies': 50,
    'Internet, Technology and Society': 50,
    'Enterprise Resource Planning': 50,
    'User Interface/User Experience (UI/UX) Design': 50,
}

const upDoc = doc.map((student) =>{
    let arr = [];
    
    arr.push(student.OPTION_1);
    arr.push(student.OPTION_2);
    arr.push(student.OPTION_3);
    arr.push(student.OPTION_4);
    
    let given = [];
    for(let i = 0;i < 4;i++){
        if(given.length >=2) break;
        if(electives[arr[i]] > 0){
            given.push(arr[i]);
            --electives[arr[i]];
        }
    }
    // if(given.length <= 2){
    //     for(let i=0;i < 4;i++){
    //         if(given.length >= 2) break;
    //         for(let item in electives){
    //             if(item && (!includes(given))){
    //                 given.push(item);
    //                 electives[item]--;
    //             }
    //         }
    //     }
    // }
    student.elective1 = given[0];
    student.elective2 = given[1];

    return student;
})

const excelDocument = json2xls(upDoc);
fs.writeFileSync("Alloted_Electives.xlsx", excelDocument,"binary");

console.log(upDoc);





