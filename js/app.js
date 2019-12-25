$(document).ready(function () {
    $("#save").click(function () {
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var age = $("#age").val();
        var jsonData = localStorage.studentList;
        var studentList = null;
        var nowTick = new Date().getTime();

        if (jsonData == null)
            studentList = [];
        else
            studentList = JSON.parse(jsonData);
        var newStudent = {
            Id: nowTick,
            FirstName: firstName,
            LastName: lastName,
            Age: age
        };

        studentList.push(newStudent)
        jsonData = JSON.stringify(studentList);
        localStorage.studentList = jsonData;
        showStudent(newStudent)
    });
});
function showStudent(objStudent) {
    var inforStudent = objStudent.FirstName + ' ' + objStudent.LastName + '. ' + '-------------Tuổi: ' + objStudent.Age;
    var printEveryInfo = $("<li></li>").text(inforStudent)
    var buttonRemoveInfor = $('<button class="btn-Remove">Remove</button>');
    var $ctrl = $('<input/>').attr({ type: 'checkbox', name:'chk'}).addClass("chk");
    $("#check").append($ctrl);
    buttonRemoveInfor.className = "btn-Remove";
    printEveryInfo.append(buttonRemoveInfor)
    $("ul").append(printEveryInfo)

    buttonRemoveInfor.click(function () {
        var jsonData = localStorage.studentList;
        var studentList = null;

        if (jsonData == null)
            studentList = [];
        else
            studentList = JSON.parse(jsonData);

        for (var i = 0; i < studentList.length; i++) {
            if (studentList[i].Id == objStudent.Id) {
                studentList.splice(i, 1);
            }
        }
        jsonData = JSON.stringify(studentList);
        localStorage.studentList = jsonData;
        //showStudent(studentList)
        printEveryInfo.remove();
    });
};
const data1 = JSON.parse(localStorage.getItem('studentList'));
data1.forEach(function (e) {
    showStudent(e)
}); 
