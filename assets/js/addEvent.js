let schedule = document.querySelectorAll('.cd-schedule__group')
let matriculaInput = document.getElementById('matricula')
let loginButton = document.querySelector('.loginButton')
let classes = document.getElementById('name')
let studentData = undefined

schedule.forEach((day) => {
    day.querySelector(`ul`).innerHTML = ``
})

cancel()

let addButton = document.querySelector(`.add-button`)
addButton.addEventListener(`click`, start)
loginButton.addEventListener(`click`, getData)


function cancel() {
    document.getElementById("schedule-input").style.display = "none";
}

function showInput() {
    if (studentData != undefined) {
        document.getElementById("schedule-input").style.display = "block";
    }
}

function getData() {
    studentData = datas[matriculaInput.value]
    if (studentData != undefined) {
        document.querySelector(".modal").style.display = "none";
        setupClasses()
    }
}

function setupClasses() {
    classes.innerHTML = ''
    studentData.subjects.forEach((subject) => {
        classes.innerHTML += `<option value="${subject}">${subject}</option>`
    })
}

function onAdd() {
    start()
}

function add() {
    let day = document.getElementById("day").value
    let name = document.getElementById("name").value
    let start = document.getElementById("start").value
    let end = document.getElementById("end").value
    console.log(day, name, start, end)
    schedule[day].querySelector('ul').innerHTML += 
    `<li class="cd-schedule__event">
        <a data-start="${start}" data-end="${end}"  data-content="event-yoga-1" data-event="event-1" href="#0">
        <em class="cd-schedule__name">${name}</em>
        </a>
    </li>`
    cancel();
    onAdd();
}

function generatePDF() {
    convertToPDF(document.querySelector('#cronograma').innerHTML)
}

function convertToPDF(cronograma) {
    var doc = new jsPDF();
    var specialElementHandlers = {
      "#cronograma": function(element, renderer) {
        return true;
      }
    };
  
    doc.fromHTML(cronograma, 15, 15, {
      "width": 170,
      "elementHandlers": specialElementHandlers
    });
    doc.save("sample.pdf");
  }