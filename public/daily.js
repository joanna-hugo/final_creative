
var app = new Vue({
  el: '#app',
  data: {
    items:[],
    cart:[],
    logged_in: false,
    username: '',
    
    smallGoalPoints : 1,
    mediumGoalPoints : 5,
    largeGoalPoints : 10,
    todaysPoints : 0,
    clicked: [],
    grade: "F",
    date: "Dec 25 2019"
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        console.log("Response from back-end: " + response.data);
        this.items = response.data;
        this.alphabetize_items();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  
    drinkWater(){
      if(document.getElementById("drinkWater").checked == true){
        this.todaysPoints = this.todaysPoints + this.smallGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.smallGoalPoints;
      }
      this.updateGrade();
    },
    checkInWithTeammate(){
      if( document.getElementById("checkInWithTeammate").checked == true ){
        this.todaysPoints = this.todaysPoints + this.smallGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.smallGoalPoints;
      }
      this.updateGrade();
    },
    bedtimeGoal(){
      if(document.getElementById("bedtimeGoal").checked == true){
        this.todaysPoints = this.todaysPoints + this.smallGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.smallGoalPoints;
      }
      this.updateGrade();
    },
    foodJournal(){
      if(document.getElementById("foodJournal").checked == true){
        this.todaysPoints = this.todaysPoints + this.smallGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.smallGoalPoints;
      }
      this.updateGrade();
    },
    foodGoals(){
      if(document.getElementById("foodGoals").checked == true){
        this.todaysPoints = this.todaysPoints + this.largeGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.largeGoalPoints;
      }
      this.updateGrade();
    },
    excercise(){ 
      if(document.getElementById("excercise").checked == true){
        this.todaysPoints = this.todaysPoints + this.mediumGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.mediumGoalPoints;
      }
      this.updateGrade();
    },
    scriptures(){
      if(document.getElementById("scriptures").checked == true){
        this.todaysPoints = this.todaysPoints + this.smallGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.smallGoalPoints;
      }
      this.updateGrade();
    },
    alreadyClicked(func){
      for( i = 0; i < this.clicked.length; i++){
        if(this.clicked[i] == func){
          return true;
        }
      }
      return false;
    },
    async updateGrade(){
      console.log("post updateGrade func");
      let points = this.todaysPoints;
      
      var i;
      for (i = 0; i < this.cart.length; i++) {
        await axios.post("/api/points", {
          _id: this.cart[i]._id,
          title: this.cart[i].title,
          price: this.cart[i].price,
          amount: this.cart[i].amount + 1,
          
          username: "fake_username",
          date: this.date,
          points: this.todaysPoints
        });
      }
    },
    
    dateFunctionEvents (date) {
        const [,, day] = date.split('-')
        if ([12, 17, 28].includes(parseInt(day, 10))) return true
        if ([1, 19, 22].includes(parseInt(day, 10))) return ['red', '#00f']
        return false
      },
    monthFunctionEvents (date) {
        const month = parseInt(date.split('-')[1], 10)
        if ([1, 3, 7].includes(month)) return true
        if ([2, 5, 12].includes(month)) return ['error', 'purple', 'rgba(0, 128, 0, 0.5)']
        return false
      },
  },
  created() {
    this.getItems();
  },
});