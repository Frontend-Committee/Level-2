let students = []


function addStudents(){

    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    

    if(name === "" ){
        alert("please enter a student name and id!")
        return;
    }

    
    let student ={
        name: name,
        id: id ,
    };

    students.push(student)

}


function addTask(){
    let taskName = document.getElementById("task").value;
    let taskId = document.getElementById("taskId").value;

    if((taskName ==="")||(taskId==="")){
        alert ("please enter the task name and student ID")
        return
    }

    let studentFound = students.find(s => s.id === taskId)
    if(!studentFound){
        alert ("student is not found!")
        return
    }

    let taskObj ={
        taskName: taskName,
        grade: null
    }

    if(!studentFound.tasks){
        studentFound.tasks = []
    }

    studentFound.tasks.push(taskObj)
}

function assignGrades(){
    let gradedTask = document.getElementById("taskName").value
    let gradeID = document.getElementById("gradeId").value
    let grade = document.getElementById("grade").value

    if(gradedTask===""|| gradeID===""||grade===""){
        alert("please enter student Id or task grade")
        return
    }

    let numericGrade = parseFloat(grade)
    
    
    let studentFound = students.find(s => s.id === gradeID)
    if(!studentFound){
        alert ("student is not found!")
        return
    }
    let taskFound = studentFound.tasks.find(t => t.taskName === gradedTask)

    if(!taskFound){
        alert ("task is not found!")
        return
    }

    taskFound.grade=numericGrade
    console.log(students)
}

function passedOrFailed(id){
    let pId = document.getElementById("passedOrNotId").value

    let studentFound = students.find(s => s.id === pId)
    if(!studentFound){
        alert ("student is not found!")
        return
    }
     

    if(!studentFound.tasks){
        alert("no tasks assigned yet!")
        return
    }

    let totalGrades = 0
    let numberOfTasks = studentFound.tasks.length

    studentFound.tasks.forEach(t => {
        totalGrades += t.grade 
    });

    let avg = totalGrades / numberOfTasks

    let Statu=avg>=50?alert("passed"):alert("failed")

}




