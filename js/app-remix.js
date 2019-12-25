function saveStudenList(studentList) {
    var jsonData = JSON.stringify(studentList);
    localStorage.studentList = jsonData;
}

function loadStudentList() {
    var jsonData = localStorage.studentList;
    if (jsonData == null)
        return [];
    else
        return JSON.parse(jsonData);
}

function addStudent(student) {
    var studentList = loadStudentList();
    studentList.push(student);
    saveStudenList(studentList);
}

function deleteStudent(student) {
    var studentList = loadStudentList();

    for (var i = 0; i < studentList.length; i++) {
        if (studentList[i].Id == student.Id) {
            studentList.splice(i, 1);
            saveStudenList(studentList);
        }
    }

}

function showStudentList(studentList) {

    var $ul = $('ul');
    $ul.empty();
    studentList.forEach(function (student) {

        var studentInfo = student.FirstName + '. ' + student.LastName + '. Tuổi: ' + student.Age;
        var liHtml = '<li>' + studentInfo + ' <button>Delete</button></li>';
        var $li = $(liHtml);
        $ul.append($li);

        $li.find('button').on('click', function () {
            deleteStudent(student);
            showStudentList(loadStudentList());
        });
    });
}



$("#save").click(function () {

    var nowTick = new Date().getTime();
    var newStudent = {
        Id: nowTick,
        FirstName: $("#firstName").val(),
        LastName: $("#lastName").val(),
        Age: $("#age").val()
    };

    addStudent(newStudent);
    showStudentList(loadStudentList());
});


showStudentList(loadStudentList());