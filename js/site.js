$(function () {
    prepareLocalStorage();
    showTaskList(getLocalStorage());

});

function startTable() {
    let title = document.getElementById("task").value;
    let dueDate = document.getElementById("dueDate").value;
    createTask(title, dueDate);
}


function prepareLocalStorage() {
    if (getLocalStorage() == null) {
        setLocalStorage(new Array());
    }
}

function createTask(title, dueDate) {

    var obj = {
        id: idGen(),
        created: new Date(),
        completed: false,
        task: title,
        dueDate: new Date(`${dueDate} 00:00`)
    }
    let tasks = getLocalStorage();

    tasks.push(obj);
    setLocalStorage(tasks);
    showTaskList(getLocalStorage());
}

function setLocalStorage(tableArray) {
    localStorage.setItem("taskList", JSON.stringify(tableArray));

}

function getLocalStorage() {

    return JSON.parse(localStorage.getItem("taskList"));
}

function showTaskList(tableArray) {

    const resultsBody = document.getElementById("resultsBody");
    const template = document.getElementById("resultsData-template");

    for (let index = 0; index < tableArray.length; index++) {
        const dataRow = template.content.cloneNode(true);

        dataRow.getElementById("taskOut").textContent = tableArray[index].task;
        dataRow.getElementById("createdOut").textContent = convertDate(tableArray[index].created);
        dataRow.getElementById("dueDateOut").textContent = convertDate(tableArray[index].dueDate);

        resultsBody.appendChild(dataRow);
    }
}

function idGen() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function convertDate(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var d = new Date(inputFormat)
    return [pad(d.getMonth() + 1, pad(d.getDate()), ), d.getFullYear()].join('/')
}