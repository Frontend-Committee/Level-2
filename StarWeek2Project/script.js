let students =[];

let studbutton= document.getElementById("studbutton"); 
studbutton.addEventListener("click" ,()=> {
    const studentname=document.getElementById("studname").value;
    if(studentname.length<=2){
        alert('Invalid input');
        return;
    }
    let currentstudent= {
        id: students.length+1,
        name:studentname,
        grades:[],
        passed:false
    }
    students.push(currentstudent);
    const datalist=document.getElementById('inputstudents');
    const option=document.createElement("option");
    option.textContent=currentstudent.name;
    datalist.appendChild(option);
    alert(`Student ${currentstudent.id}: ${currentstudent.name} added`);
});

let gradebutton= document.getElementById("gradebutton");
gradebutton.addEventListener("click",()=>{
    const studentgrade=document.getElementById("grade").value;
    if(studentgrade.length===0){
        alert('Invalid input');
        return;
    }
    if(students.length===0){
        alert('No students added');
        return;
    }
    const chosenstudent=document.getElementById("stud").value;
    if(chosenstudent.length===0){
        alert('No student chosen');
        return;
    }
    let index;
    const options=document.querySelectorAll('option');
    let correctchoice=false;
    for(let i=0;i<options.length;i++){
        if(options[i].value===chosenstudent){
            correctchoice=true;
            index=i;
        }
    }
    if(!correctchoice){
        alert('Student name was not added');
        return;
    }
    let studentgradenum= Number(studentgrade);
    if(studentgradenum<0 || studentgradenum>100){
        alert('Invalid input');
        return;
    }
    students[index].grades.push(studentgradenum);
    alert(`Student: ${students[index].name} grade added`);
});
function calculateAverage(grades){
    if(grades.length===0){
        
    }
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
    else{
        thisstudent.passed=false;
    }
}

function renderStudents(){
    let gradesadded=true;
    let indexna;
    for(let i=0;i<students.length;i++){
        if(students[i].grades.length===0){
            indexna=i;
            gradesadded=false;
            break;
        }
    }
    if(!gradesadded){
        alert(`Student ${students[indexna].name} hasn't been assigned any grades`);
        return;
    }
    document.querySelectorAll('li').forEach(li=>li.remove());
    students.forEach(cstudent=>{
    checkgrade(calculateAverage,cstudent);
    });
    let message=document.getElementById("listname");
    message.innerHTML="These are the students that passed their exams";
    document.getElementById('passed').style.backgroundColor= 'green';
    const ul= document.getElementById("students");
    let check=false;
    for(let i=0;i<students.length;i++){
        if(students[i].passed===true){
            check=true;
            const li=document.createElement("li");
            li.textContent=students[i].name;
            ul.appendChild(li);
        }
    }
    if(!check){
        message.innerHTML="Unfortunately, none of the students have passed their exams";
    }

}