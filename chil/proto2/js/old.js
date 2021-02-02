axios.get('https://boiling-cliffs-12715.herokuapp.com/get_categories').then(response => {
  categories = response.data;
  // console.log(categories)
  refreshBlocks()
})
//////////////////////////////////////////////////
var categories;
var selectSkills; var personNumber = 0;
const feedbackMessage = document.getElementById("feedbackMessage")

function Send() {
  const company = document.getElementsByName("Comp")[0].value
  const fio = document.getElementsByName("Fio")[0].value
  const phone = document.getElementsByName("Tel")[0].value
  const email = document.getElementsByName("email")[0].value
  const comment = document.getElementsByName("Comm")[0].value

  let selectSkills = "";
  for(let j=0; j<countPersons; j++){
    selectSkills += j+1 + '(' + countSelPersons[j] + ')' + ': ';
    for (let i = 0; i<countPersons; i++) {
      selectSkills += selSkills[j][i] + "; ";
    }
    selectSkills += '\n'
  }
  if(selSkills[0].length == 0) selectSkills = ""

  const params = {
    form: {
      fio: fio,
      phone: phone,
      company: company,
      comment: comment,
      email: email,
      skills: selectSkills
    }
  }

  var emailRe = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
  var validEmail = emailRe.test(email);
  var phoneRe = /^[\+]{0,1}\d[\d\(\)\ -]{4,14}\d$/;
  var validPhone = phoneRe.test(phone);

  // Проверка заполнения контактных данных и скиллов
  if(selectSkills == "" || selectSkills == 0 || selectSkills == "1(1): undefined;")
  {
  feedbackMessage.innerHTML = '<div class="alert alert-danger w-100" role="alert">  Выберите навыки </div>';
  var k = 0;
  }
  if(validEmail == 0) {
  document.getElementsByName("email")[0].className = "fillAlert";
  feedbackMessage.innerHTML = '<div class="alert alert-danger w-100" role="alert">  Введите корректный E-mail </div>';
  }
  if(validPhone == 0) {
  document.getElementsByName("Tel")[0].className = "fillAlert";
  feedbackMessage.innerHTML = '<div class="alert alert-danger w-100" role="alert">  Введите корректный номер телефона </div>';
  }
  if(fio == 0) {
  document.getElementsByName("Fio")[0].className = "fillAlert";
  feedbackMessage.innerHTML = '<div class="alert alert-danger w-100" role="alert">  Заполните контактные данные </div>';
  }
  if(company == 0) {
  document.getElementsByName("Comp")[0].className = "fillAlert";
  feedbackMessage.innerHTML = '<div class="alert alert-danger w-100" role="alert">  Заполните контактные данные </div>';
  }
  if(phone == 0) {
  feedbackMessage.innerHTML = '<div class="alert alert-danger w-100" role="alert">  Заполните контактные данные </div>';
  document.getElementsByName("Tel")[0].className = "fillAlert";
  }
  if(email == 0) {
  document.getElementsByName("email")[0].className = "fillAlert";
  feedbackMessage.innerHTML = '<div class="alert alert-danger w-100" role="alert">  Заполните контактные данные </div>';
  }
  else if (fio != 0 && phone != 0 && company != 0 && email != 0 && validEmail != 0 && validPhone != 0 && k != 0){
    axios.post('https://boiling-cliffs-12715.herokuapp.com/forms', params)
      .then(response => {
        feedbackMessage.innerHTML = '<div class="alert alert-success w-100" role="alert">  Отправлено </div>'
      })
      .catch(error => {
        feedbackMessage.innerHTML = '<div class="alert alert-success w-100" role="alert">  Отправлено </div>'
      });
    }
  }

// Выше обмен данными JSON
////////////////////////////////////////////////////////////////////////////////////
var selCategory = 0, selCompetency = 0, selSkills = [[],[],[],[],[],[],[],[],[],[]], nameSelSpecs = [], headName = [], countSelPersons = [1,1,1,1,1,1,1,1,1,1]
var countPersons = 1, personNumber = 0, pr = 0, totalPr = 0
var stroka, priceString

var listCategories = document.getElementById('categories')
var listCompetencies = document.getElementById('competencies')
var listSkills = document.getElementById('skills')
var sectionSelectSkills = document.getElementById('selects')
var basementForm = document.getElementById('basementForm')
var btnMinus = document.getElementById('minus')
var btnPlus = document.getElementById('plus')
var btnAddCustomSkill = document.getElementById('addSkill')
var deletePerson = document.getElementById('deletePerson')
var mob = document.getElementById('mob')
var priceList = document.getElementById('priceList')
var personPrice = document.getElementById('personPrice')
var priceListClass = 'container mt-4 pb-3 bg-light border rounded shadow'

function ok(){ console.log("ok"); }
function tell(objct){ console.log(objct) }

function refreshBlocks(){

  function listGroup(num) { return '<li class="list-group-item"' + "id=" + num.id + '>' + num.title + '</li>'; }
  function listGroupActive(num) { return '<li class="list-group-itemActive"' + "id=" + num.id + '>' + num.title + '</li>'; }
  function sectionSelectSkill(obj) { return '<span class="box p-1 mr-3 mb-1" id="' + obj + '">' + obj + '<span class="ml-2 mb-1 mr-1 badge badge-pill badg pb-1" id="closed">✕</span></span>'; }

  function beginPerson(obj) { return '<div class="row unactive mb-2"><div class="col-12 ml-5 mt-2 font-weight-bold">'+ obj+'</div><div class="d-flex flex-column rounded ml-3"><div class="input-group-append mt-2" id="personList">'}
  function beginActivePerson(obj) { return '<div class="row mb-2"><div class="col-12 ml-5 mt-2 font-weight-bold">'+ obj + '</div><div class="d-flex flex-column rounded ml-3"><div class="input-group-append mt-2" id="personList" style="border: 1px solid rgb(14, 87, 165); border-radius: 5px;">'}
  function bodyPerson(countPersons, obj) {return '<button class="btn rounded-left" type="button" id="deletePerson">╳</button><button onclick="changePerson(this.childNodes[1].id)" class="btn specs rounded-0" type="button"><img src="icons/contact-book.svg" alt=""><span ' + 'id = "' + countPersons  + '">' + obj + '</span></button><button class="btn operation Minus" id="minus" type="button">－</button><input type="text" maxlength=2 class="counter" value="' + countSelPersons[countPersons-1] + '"id="numPersons"><button class="btn operation Plus rounded-right" id="plus" type="button">＋</button></div><div class="pt-1 pl-3 pr-3 d-flex font-weight-bold justify-content-between selPersonsCounters border-right border-left border-secondary"><span class="">Стоимость</span><span class="">5000 ₽</span></div><div class="pt-1 pl-3 pr-3 d-flex justify-content-between font-weight-bold selPersonsCounters border-secondary rounded-bottom border-bottom border-right border-left border-secondary"><span class="">Зарплата</span><span class="">10000 ₽</span></div></div><div class="col-lg-7 col-md-6 mt-2"> <div class="d-flex flex-wrap" id="selects" style="width:118%">'}
  function bodyActivePerson(countPersons, obj) {return '<button class="btn rounded-left" type="button" id="deletePerson">╳</button><button onclick="changePerson(this.childNodes[1].id)" class="btn active specs rounded-0" type="button"><img src="icons/contact-book.svg" alt=""><span ' + 'id = "' + countPersons + '">' + obj + '</span></button><button class="btn operation Minus" style="border-left:1px solid rgb(14, 87, 165);" id="minus" type="button">－</button><input type="text" maxlength=2 class="counter active" value="' + countSelPersons[countPersons-1] + '"id="numPersons"><button class="btn operation Plus rounded-right" id="plus" type="button">＋</button></div><div class="pt-1 pl-3 pr-3 d-flex font-weight-bold justify-content-between selPersonsCounters border-right border-left border-secondary"><span class="">Стоимость</span><span class="">' + countSelPersons[countPersons-1] + ' * 5000 ₽</span></div><div class="pt-1 pl-3 pr-3 d-flex justify-content-between font-weight-bold selPersonsCounters border-secondary rounded-bottom border-bottom border-right border-left border-secondary"><span class="">Зарплата</span><span class="">' + countSelPersons[countPersons-1] + ' * 10000 ₽</span></div></div><div class="col-lg-7 col-md-6 mt-2"> <div class="d-flex flex-wrap" id="selects" style="width:118%">'}
  function endBeginPerson() { return '</div> </div> </div>' }
  function totalPrice() { return '<div class="mt-5 pt-2 d-flex justify-content-between" style="border-top: 1px solid rgba(53, 150, 255, 0.5)"><span class="h6 font-weight-bold">ИТОГОВАЯ СУММА</span><span class="h5 blue">' + totalPr + ' ₽</span></div>'}
  function endPerson() { return '<div class="row"> <div class=""> <button class="specAdd mt-1 ml-3" style="font-size: 0.75em;" onclick="addPerson()"><img src="icons/person-add.svg"><span class="ml-2">Добавить</span></button> </div> </div>' }
  // function beginPriceList() { return '<div class="" id="priceList"><div class="d-flex mr-5 ml-3 mt-4"><span class="purple col-lg-3 col-md-3">Описание</span><span class="purple col-lg-3 col-md-3 texe-center">Количество</span><span class="purple col-lg-3 col-md-3 text-center">Стоимость обучения</span><span class="purple text-right col-lg-3 col-md-3">Зарплата</span></div>'}
  // function bodyPriceList(obj, countPersons) { return '<div class="d-flex ml-3 mt-4 mr-5 mb-1  "><span class="col-lg-3 col-md-4">' + obj + '</span><span class="col-lg-3 col-md-3 ml-lg-5 ">' + countSelPersons[countPersons-1] + '</span><span class="col-lg-2 col-md-2 ml-lg-5 ml-md-1">5000 ₽</span><span class="text-right col-lg-3 col-md-3" id="personPrice">10000 ₽</span></div>'}
  // function mobPriceList(obj, countPersons) { return '<div class="mt-2" id="priceList"><div class="mt-4"><span class="font-weight-bold d-flex justify-content-center">' + obj + '</span><span class="purple font-weight-bold col">Количество</span><span class="text-right col">'+ countSelPersons[countPersons-1] + '</span><br><span class="purple text-left font-weight-bold col">Стоимость обучения</span><span class=" text-right col">5000 ₽</span><br><span class="purple text-left font-weight-bold col">Зарплата</span><span class="text-right col">10000 ₽</span></div>'}
  // function totalPrice() { return '<div class="ml-3 mt-4 mr-5 mb-1 pt-2 d-flex justify-content-between font-weight-bold border-top border-secondary"><span class="col-lg-3 col-3"></span><span class="col-lg-3 col-1"></span><span class="h4 col-lg-3 text-center font-weight-bold">Итого: </span><span class="text-right h4 col-lg-3 col-5 font-weight-bold">' + totalPr + ' ₽</span></div>'}
  // function mobTotalPrice() { return '<div class="ml-3 mt-4 mr-3 mb-1 pt-2 border-top border-secondary"><span class="font-weight-bold col-12 d-flex justify-content-center">ИТОГОВАЯ СУММА</span><span class="font-weight-bold col-12 d-flex justify-content-center h4">' + totalPr + ' ₽</span></div'}
  // function endPriceList() { return '</div>'}

  // --------Категории
  listCategories.innerHTML = ""; // Чистит категории
  for(let i = 0; i < categories.length; i++) {
    if(i == selCategory) listCategories.innerHTML += listGroupActive(categories[i])
    else listCategories.innerHTML += listGroup(categories[i])
  }

  // -------Компетенции
  listCompetencies.innerHTML = "" // Чистит компетенции
  let competencies = categories[selCategory].competencies

  for(let i = 0; i < categories[selCategory].competencies.length; i++){
    // if(i == selCompetency) listCompetencies.innerHTML += listGroupActive(categories[selCategory].competencies[i])
    // else listCompetencies.innerHTML += listGroup(categories[selCategory].competencies[i])
    let selectSkill = false;
    for(let j = 0; j < selSkills[personNumber].length; j++)
      if(competencies[i].title == selSkills[personNumber][j]) { selectSkill = true; break; }
      else selectSkill = false;
    if(selectSkill || i == selCompetency) listCompetencies.innerHTML += listGroupActive(competencies[i])
    else listCompetencies.innerHTML += listGroup(competencies[i])
  }

  // --------Скиллы
  listSkills.innerHTML = "" // Чистит скиллы
  let skills = categories[selCategory].competencies[selCompetency].skills

  for(let i = 0; i < skills.length; i++){
    let selectSkill = false;
    for(let j = 0; j < selSkills[personNumber].length; j++) // Пробегает по выбраным скиллам
      if(skills[i].title == selSkills[personNumber][j]) { selectSkill = true; break; }
      else selectSkill = false;
    if(selectSkill) listSkills.innerHTML += listGroupActive(skills[i])
    else listSkills.innerHTML += listGroup(skills[i])
  }

  listSkills.innerHTML += '<div class="input-group mb-2 mx-2 mt-1 " style="width: 140%"> <input type="text" class="fillSkill mb-2" placeholder="Добавить новый навык" style="border: 1px solid rgba(45, 45, 45, 0.65); padding-left: 8px; border-radius: 10px 0 0 10px"> <div class="input-group-append"> <button class="btn operation mb-2" type="button" id="addSkill" style="color:rgba(45, 45, 45, 0.8) ; background-color:rgba(45, 45, 45, 0.1); border: 1px solid rgba(45, 45, 45, 0.65);  border-radius: 0 10px 10px 0;">＋</button> </div> </div>'

  // --------Секция выбранных скиллов

  sectionSelectSkills.innerHTML = ""
  basementForm.innerHTML = ""
  basementForm.innerHTML += endPerson()
  for(let j = 0; j < 10; j++){
    stroka = ""
    if(selSkills[j] != 0 || j == 0 || j == personNumber)
      if (selSkills[j].length != 0) {
        if(personNumber+1 == j+1) {
          if (!headName.includes(headName[j]) || headName[j] == undefined) stroka += beginActivePerson('')
          else stroka += beginActivePerson(headName[j])
          stroka += bodyActivePerson(j+1, nameSelSpecs[j])
        }
        else {
          if (!headName.includes(headName[j]) || headName[j] == undefined) stroka += beginPerson('')
          else stroka += beginPerson(headName[j])
          stroka += bodyPerson(j+1, nameSelSpecs[j])
        }
      }
    for(let i = 0; i < selSkills[j].length; i++){
      stroka +=  sectionSelectSkill(selSkills[j][i])
    }
    stroka += endBeginPerson()
    if (j+1 == nameSelSpecs.length) stroka += totalPrice()
    basementForm.innerHTML += stroka
  }

  // ---------- Цена

//   priceList.innerHTML = ""
//   if(countPersons > 1 || selSkills[personNumber] != 0) {
//     priceList.className = priceListClass
//     if(window.matchMedia('(min-width: 768px)').matches) {
//       priceList.innerHTML += beginPriceList()
//       for (let j = 0; j < nameSelSpecs.length; j++) {
//         priceString = ""
//         if((selSkills[j] != 0 || j == 0 || j == personNumber) && selSkills.length >= 1)
//         priceString += bodyPriceList(nameSelSpecs[j], j+1)
//         if (j+1 == nameSelSpecs.length) priceString += totalPrice()
//         priceString += endPriceList()
//         priceList.innerHTML += priceString
//       }
//     }
//     else {
//       for (let j = 0; j < nameSelSpecs.length; j++) {
//         priceString = ""
//         if((selSkills[j] != 0 || j == 0 || j == personNumber) && selSkills.length >= 1)
//         priceString += mobPriceList(nameSelSpecs[j], j+1)
//         if (j+1 == nameSelSpecs.length) priceString += mobTotalPrice()
//         priceList.innerHTML += priceString
//       }
//     }
//   }
//   else priceList.className = ""
}


// ---------Клик по категориям
listCategories.onclick = function(event){
  if(event.target.className == "list-group-item"){
    selCategory = event.target.textContent
    for(let i = 0; i < categories.length; i++) if(selCategory == categories[i].title){ selCategory = i; break; }
    //selCompetency = categories[i].competencies;
    refreshBlocks()
  }
}
// ---------Клик по компетенциям
listCompetencies.onclick = function(event){
  if(event.target.className == "list-group-item"){
    for(let i = 0; i < categories[selCategory].competencies.length; i++){
      if(event.target.textContent == categories[selCategory].competencies[i].title){
        if(categories[selCategory].competencies[i].skills == 0){
          selSkills[personNumber].push(event.target.textContent);
        }
        else{selCompetency = i}
        break
      }
    }
    refreshBlocks()
  }
  if(event.target.className == "list-group-itemActive"){
    for(let i = 0; i < selSkills[personNumber].length; i++)
      if(event.target.textContent == selSkills[personNumber][i]) { selSkills[personNumber].splice(i, 1); break; }
      refreshBlocks()
  }
}
//  -------Клик по скиллам
listSkills.onclick = function(event){
  if(event.target.className == "list-group-item"){
    selSkills[personNumber].push(event.target.textContent);
      if (selSkills[personNumber].length == 1) {
      nameSelSpecs.push(categories[selCategory].competencies[selCompetency].title)
      if (!headName.includes(categories[selCategory].title)) headName[personNumber] = categories[selCategory].title
      pr += 15000
      totalPr = pr.toLocaleString()
    }
    tell(headName)
    refreshBlocks()
  }
  if(event.target.className == "list-group-itemActive"){
    for(let i = 0; i < selSkills[personNumber].length; i++){
      if(event.target.textContent == selSkills[personNumber][i]) {
        selSkills[personNumber].splice(i, 1)
        if (selSkills[personNumber].length == 0) nameSelSpecs.pop()
        break
      }
    }
    refreshBlocks()
  }

  if(event.target.id == "addSkill"){
    skillLength = categories[selCategory].competencies[selCompetency].skills.length
    let text = event.target.parentNode.parentNode.firstElementChild.value
    if(text != ""){
      selSkills[personNumber].push(text);
      categories[selCategory].competencies[selCompetency].skills.push({title: text})
      refreshBlocks()
    }
  }
};
// ----------------------------- //

// Клик добавить специалиста
function addPerson(){
  if(selSkills[personNumber].length == 0) alert("Выберите навыки")
  else
    if(countPersons < 9){
      countPersons=1
      for(let i=0; i<10; i++) if(selSkills[i]!=0) countPersons++
      personNumber=countPersons-1;
      refreshBlocks()
      isFirst = 0
    }
}
// Сменить специалиста
function changePerson(id){
  personNumber = id - 1
  refreshCountSelPeson()
  refreshBlocks()
}

function refreshCountSelPeson(){
  countPersons=0
  for(let i=0; i<10; i++) if(selSkills[i]!=0 || i==0) countPersons++
  for(let i=countPersons; i<10; i++) countSelPersons[i]=1
}
// Удалить навык
basementForm.onclick = function(event){
  if(event.target.id == "closed"){
    for(let i = 0; i < selSkills[personNumber].length; i++)
      if(event.target.parentNode.id == selSkills[personNumber][i]) {
        selSkills[personNumber].splice(i, 1)
        if (selSkills[personNumber].length == 0) nameSelSpecs.pop()
        break
      }
    refreshBlocks()
  }

  if(event.target.id == "plus") {
    if(personNumber != event.target.parentNode.childNodes[1].childNodes[1].id-1) refreshCountSelPeson()
    personNumber = event.target.parentNode.childNodes[1].childNodes[1].id-1
    if(countSelPersons[personNumber] < 20) {
      countSelPersons[event.target.parentNode.childNodes[1].childNodes[1].id-1]++
      personNumber = event.target.parentNode.childNodes[1].childNodes[1].id-1
      refreshBlocks()
    }
  }
  if(event.target.id == "minus"){
    if(personNumber != event.target.parentNode.childNodes[1].childNodes[1].id-1) refreshCountSelPeson()
    personNumber = event.target.parentNode.childNodes[1].childNodes[1].id-1
    if(countSelPersons[personNumber] > 1){
      countSelPersons[event.target.parentNode.childNodes[1].childNodes[1].id-1]--
      refreshCountSelPeson()
      refreshBlocks()
    }
  }

  if(event.target.id == 'deletePerson'){
    personNumber = 0;
    for(let i=event.target.parentNode.id-1; i<countPersons; i++)   selSkills[i] =   selSkills[i+1]
    selSkills[countPersons-1] = []
    refreshCountSelPeson()
    refreshBlocks()
  }
};

// Запоминание заполненных строк
document.contact.onchange = function(event) {
    if (event.target.value != "" && event.target.className == "fill" || event.target.className== "fillAlert") event.target.className = "fillActive";
    if (event.target.value == "" && event.target.className == "fillActive") event.target.className = "fill";
}

// Адаптация шапки под мобилки

mob.innerHTML = ''
if(window.matchMedia('(min-width: 550px)').matches){
  mob.innerHTML = '<button class="btn mr-auto font-weight-bold">LOGO</button><button class="btn mx-md-4"><img src="icons/home.png" class="header-icon text-center"><br><span class="header-icon">Главная</span></button><button class="btn mx-md-4"><img src="icons/peoples.png" class="header-icon"><br><span class="header-icon">Заявка</span></button><button class="btn mx-md-4"><img src="icons/messages.png" class="header-icon"><br><span class="header-icon">Сообщения</span></button><button class="btn ml-md-3 mr-md-4"><img src="icons/bell.png" class="header-icon"><br><span class="header-icon">Уведомления</span></button><button class="btn"><span>Войти</span><img src="icons/user.png" class="header-icon ml-1"></button>'
}
else {
  mob.innerHTML = '<button class="btn mr-auto font-weight-bold">LOGO</button><button class="btn mx-md-4"><img src="icons/home.png" class="header-icon text-center"></button><button class="btn mx-md-4"><img src="icons/peoples.png" class="header-icon"></button><button class="btn mx-md-4"><img src="icons/messages.png" class="header-icon"></button><button class="btn ml-md-3 mr-md-4"><img src="icons/bell.png" class="header-icon"></button><button class="btn"><span>Войти</span><img src="icons/user.png" class="header-icon ml-1"></button>'
}

// Время
setInterval(function(){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  var time = date.getHours();
  var min
  if(date.getMinutes() < 10) min = "0" + date.getMinutes()
  else min = date.getMinutes()

  switch (month) {
    case 0:
        fMonth = "января";
        break;
    case 1:
        fMonth = "февраля";
        break;
    case 2:
        fMonth = "марта";
        break;
    case 3:
        fMonth = "апреля";
        break;
    case 4:
        fMonth = "мая";
        break;
    case 5:
        fMonth = "июня";
        break;
    case 6:
        fMonth = "июля";
        break;
    case 7:
        fMonth = "августа";
        break;
    case 8:
        fMonth = "сентября";
        break;
    case 9:
        fMonth = "октября";
        break;
    case 10:
        fMonth = "ноября";
        break;
    case 11:
        fMonth = "декабря";
        break;
    }
  document.getElementById("p").innerHTML = `на ${day} ${fMonth} ${year}, ${time}:${min}`;
}, 1000);
