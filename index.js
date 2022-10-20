// console.log('Bishal');
// let number = 1;
// console.log(number)

// const myFunction= ()=>{
//     console.log("YES");
// }

// myfun();

// objects
// const studentObj = {
//     NAME: "Bishal",
//     ROLLNO: 22,
//     address: {
//         city: 'Gangtok',
//         state: 'Sikkim',
//         region: 'North'
//     },
//     "Favourite Hobby": "Reading",
// }
// console.log(studentObj.NAME)
// console.log(studentObj.address.city);
// console.log(studentObj["Favourite Hobby"])


// // destructing
// const {NAME} = studentObj
// console.log(NAME)



// Using simple -excel-to-json

const parser = require('simple-excel-to-json')
const doc = parser.parseXls2Json('./Example.xlsx')[0]; 
const json2xls = require("json2xls")
const fs = require('fs')

console.log(doc)

const totalCgpa = doc.reduce((previousValue, currentValue) =>{
    console.log(previousValue)
    previousValue +=currentValue.CGPA;
    return previousValue;
}, 0)

const averageCgpa = totalCgpa/ doc.length;
console.log(averageCgpa)

const gradeDocument = doc.map((student) => {
    if(student.CGPA > 9.5){
        student.GRADE = "A+";
    }
    else if(student.CGPA < 9.5 && student.CGPA > 9){
        student.GRADE = "A";
    }
    else if(student.CGPA < 9 && student.CGPA > 4){
        student.GRADE = "B";
    }
    return student;
})
// const filteredDocument = gradeDocument 
const excelDocument = json2xls(gradeDocument);
gradeDocument.push({CGPA: averageCgpa});
fs.writeFileSync("Grades.xlsx", excelDocument, "binary");
console.log(gradeDocument); 