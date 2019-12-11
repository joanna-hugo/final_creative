var app = new Vue({
  el: '#app',
  data: {
    showForm: false,
    user: null,
    username: '',
    password: '',
    error: '',
    
    smallGoalPoints : 1,
    mediumGoalPoints : 5,
    largeGoalPoints : 10,
    
    todaysPoints : 0,
    mon_points: 0,
    tues_points: 0,
    wed_points: 0,
    thurs_points:0,
    fri_points:0,
    sat_points:0,
    sun_points:0,
    
    day: '',
    lifetime_points: 0,
    total_points:0,
    clicked: [],
    grade: "F",
    date: "Dec 25 2019"
  },
  created() {
    this.getUser();
  },
  computed: {
    weekly_points: function() {
      let temp = this.mon_points + this.tues_points + this.wed_points + 
        this.thurs_points + this.fri_points + this.sat_points + this.sun_points;
      console.log("weekly total = " + temp);
      return temp;
    }
  },
  methods: {
    toggleForm() {
      this.error = "";
      this.username = "";
      this.password = "";
      this.showForm = !this.showForm;
    },
    async register() {
      this.error = "";
      try {
        let response = await axios.post("/api/users", {
          username: this.user.username,
          password: this.password
        });
        await axios.post("/api/points", {
          username: this.user.username,
          points: this.todaysPoints,
        })
        this.user = response.data;
        // close the dialog
        this.toggleForm();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async login() {
      this.error = "";
      try {
        let response = await axios.post("/api/users/login", {
          username: this.username,
          password: this.password
        });
        this.user = response.data;
        // close the dialog
        this.toggleForm();
        this.getLifeTimePoints();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async logout() {
      try {
        let response = await axios.delete("/api/users");
        this.user = null;
      } catch (error) {
        // don't worry about it
      }
    },
    async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.user = response.data;
        this.getLifeTimePoints();
      } catch (error) {
        // Not logged in. That's OK!
      }
    },
    async updateGrade(){
      console.log("post updateGrade func");
      this.updatePoints();
      try{
        if(this.user){
          let points = this.todaysPoints;
            let response = await axios.post("/api/points", {
              username: this.user.username,
              points: this.todaysPoints,
              day: this.day
            });
            this.getLifeTimePoints();
        }
      }catch (error){
        console.log("ERROR UPDATING POINTS" + error)
        if(!this.user){
          this.toggleForm();
        }
      }
    },
    async getLifeTimePoints(){
        let response = await axios.get("/api/points");
        // this.lifetime_points = response.points;
        
        let i;
        for(i=0; i<response.data.length; i++){
          let temp = response.data[i].points;
          if(!isNaN(temp) && response.data[i].username === this.user.username){
            this.lifetime_points += parseInt(temp, 10); 
          }
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
    journal(){
      if(document.getElementById("journal").checked == true){
        this.todaysPoints = this.todaysPoints + this.largeGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.largeGoalPoints;
      }
      this.updateGrade();
    },
    foodGoals(){
      if(document.getElementById("foodGoals").checked == true){
        this.todaysPoints = this.todaysPoints + this.smallGoalPoints;
      }else{
        this.todaysPoints = this.todaysPoints - this.smallGoalPoints;
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
    meds(){
      if(document.getElementById("meds").checked == true){
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
    updatePoints(){
      if(this.day == "m"){
        this.mon_points = this.todaysPoints;
      }else if(this.day == "t"){
        this.tues_points = this.todaysPoints;
      }else if(this.day == "w"){
        this.wed_points = this.todaysPoints;
      }else if(this.day == "th"){
        this.thurs_points = this.todaysPoints;
      }else if(this.day == "f"){
        this.fri_points = this.todaysPoints;
      }else if(this.day == "sat"){
        this.sat_points = this.todaysPoints;
      }else if(this.day == "sun"){
        this.sun_points = this.todaysPoints;
      }
    },
    clearClicked(){
      console.log("clear clicked");
      this.todaysPoints = 0;
      document.getElementById("drinkWater").checked = false;
      document.getElementById("checkInWithTeammate").checked = false;
      document.getElementById("bedtimeGoal").checked = false;
      document.getElementById("journal").checked = false;
      document.getElementById("foodGoals").checked = false;
      document.getElementById("excercise").checked = false;
      document.getElementById("scriptures").checked = false;
      document.getElementById("meds").checked = false;
    },
  }
});