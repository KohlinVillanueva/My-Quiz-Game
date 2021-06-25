class Quiz {
  constructor(){
    this.reset = createButton("Reset")
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    console.log(state)
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide()
    //write code to change the background color here
    background("yellow")
    //write code to show a heading for showing the result of Quiz\
    textSize(40)
    text("Result of Quiz",315,50)

    this.reset.position(750,50)
    this.reset.mousePressed(()=>{
      contestant.updateCount(0)
      quiz.update(0)
      
    })
    //call getContestantInfo( ) here
    allContestant = Contestant.getPlayerInfo()
    
    //write condition to check if contestantInfor is not undefined
    if(allContestant !== undefined){
      fill("Blue")
      textSize(20)
      text("*NOTE: Contestant who answered corectly are highlighted in green color!",130,230)
    }
    //write code to add a note here
    
    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2"
      if(correctAns === allContestants[plr].answer){
      fill("green")
      }
      else{
      fill("red")
      }
      
    }
  }

}
