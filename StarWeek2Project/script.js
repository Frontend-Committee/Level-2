let students =[];

let studbutton= document.getElementById("studbutton"); 
studbutton.addEventListener("click" ,()=> {
    const studentname=document.getElementById("studname").value;
    let currentstudent= {
        id: students.length+1,
        name:studentname,
        grades:[],
        passed:false
    }
    students.push(currentstudent);
    alert(`Student ${currentstudent.id}: ${currentstudent.name} added`);
});

let gradebutton= document.getElementById("gradebutton");
gradebutton.addEventListener("click",()=>{
    const studentgrade=document.getElementById("grade").value;
    let studentgradenum= Number(studentgrade);
    if(studentgradenum<0 || studentgradenum>100){
        alert('Invalid input');
        return;
    }
    students[students.length-1].grades.push(studentgradenum);
    alert(`Student: ${students[students.length-1].name} grade added`);
});
function calculateAverage(grades){
    let total=grades.reduce((accumulator,currentvalue)=>accumulator+currentvalue);
    let avg= total/grades.length;
    return avg;
}
function checkgrade(func,thisstudent){
    let finalgrade;
    let avggrade=func(thisstudent.grades);
    if(avggrade>80){
        finalgrade='A';
    }
    else if(avggrade>65){
        finalgrade='B';
    }
    else if(avggrade>=50){
        finalgrade='C';
    }
    else {
        finalgrade='Fail';
    }
    if(finalgrade!=='Fail'){
        thisstudent.passed=true;
    }
}

function renderStudents(){
    document.querySelectorAll('li').forEach(li=>li.remove());
    students.forEach(cstudent=>{
    checkgrade(calculateAverage,cstudent);
    });
    let message=document.getElementById("listname");
    message.innerHTML="These are the students that passed their exams";
    const ul= document.getElementById("students");
    for(let i=0;i<students.length;i++){
        if(students[i].passed===true){
            const li=document.createElement("li");
            li.textContent=students[i].name;
            ul.appendChild(li);
        }
    }

}