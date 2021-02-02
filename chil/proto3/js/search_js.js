new Vue ({
  el: '#app',
  data: {
    categories: null,
    competencies: null,
    skills: null,
    selCategoryItem: 0,
    selCompetencyItem: 0,
    selectSpecialist: 0,
    specialists: [], // -- //
    message: 'Примерная зарплата вашего будущего специалиста',
  },
  beforeCreate(){
    axios.get('https://boiling-cliffs-12715.herokuapp.com/get_categories').then(response => {
      this.categories   = response.data
      this.competencies = this.categories[0].competencies
      this.skills       = this.competencies[0].skills

      this.specialists.push( {selectSkills: [], nameSpecialist: `${this.categories[0].competencies[0].title}`, count: 1} )
    })
  },
  methods: {
    selCategory(index){
      this.competencies = this.categories[index].competencies
      this.selCategoryItem = index
      this.selCompetencyItem = 0
      this.selCompetency(0)
    },
    selCompetency(index){
      this.skills = this.competencies[index].skills
      this.selCompetencyItem = index
    },
    selSkill(index){
      let skillTitle   = this.skills[index].title
      let selectSkills = this.specialists[this.selectSpecialist].selectSkills

      if(selectSkills.includes(skillTitle)){
        let indexSkill = selectSkills.indexOf(skillTitle)
        selectSkills.splice(indexSkill, 1);
      }
      else{
        selectSkills.push(skillTitle)
      }
    },
    addPerson(){
      let lastSpecialist = this.specialists[this.specialists.length-1]

      if(lastSpecialist.selectSkills.length != 0){
        this.specialists.push( {selectSkills: [], nameSpecialist: 'Специалист', count: 1} )
        this.selectSpecialist++
      }
    },
    selectPerson(index, target){
      if(target.id != 'deletePerson') this.selectSpecialist = index
    },
    operationMinus(index){
      let value = this.specialists[index].count
      if(value > 1)  this.specialists[index].count--
    },
    operationPlus(index){
      this.specialists[index].count++
      console.log(this.specialists)
    },
    deleteSkill(indexSpecialist, indexSkill){
      this.specialists[indexSpecialist].selectSkills.splice(indexSkill, 1)

      // if (Удалить последний скилл специалиста)
      let lengthSelectSkills = this.specialists[indexSpecialist].selectSkills
      let lengthSpecialists  = this.specialists.length
      if(lengthSelectSkills == 0 &&  lengthSpecialists != 1){
        this.deletePerson(indexSpecialist)  // Удаляет специалиста без скиллов
      }
    },
    deletePerson(indexSpecialist){
      let lengthSpecialists  = this.specialists.length
      if(lengthSpecialists == 1){
        this.specialists[0].selectSkills.splice(0)
      }
      else{
        this.specialists.splice(indexSpecialist, 1)
        this.selectSpecialist = this.specialists.length-1
      }
    },
    renameSpecialist(index){
      let titleCompetency = this.competencies[index].title
      this.specialists[this.selectSpecialist].nameSpecialist = titleCompetency
    }
  },
})

// Запоминание заполненных строк
document.contact.onchange = function(event) {
    if (event.target.value != "" && event.target.className == "fill" || event.target.className== "fillAlert") event.target.className = "fillActive";
    if (event.target.value == "" && event.target.className == "fillActive") event.target.className = "fill";
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
