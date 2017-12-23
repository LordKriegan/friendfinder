var survey = {
    questions: [
        "Are you awesome?",
        "You like to go out and do random stuff.",
        "Staying at home is just as fun as going out.",
        "Booze?",
        "Music is love, music is life!",
        "Trump....?", //there is no way this was not going to make it into this survey
        "You like being the center of attention.",
        "Party like a rockstar!",
        "Most people are morons.",
        "Time to raise some hell?"
    ],
    currQuest: 0,
    answers: [],
    currQuestVal: 0,
    moveNextQuest: function() {
        if (survey.currQuestVal) { //dont do anything if nothing was selected
            this.currQuest++;
            if (this.currQuest < this.questions.length) {
                this.loadQuestion(survey.currQuest);
                var survAnswers = $("#survAnswers").children(); //reset answers
                for (var i = 0; i < survAnswers.length; i++) {
                    survAnswers[i].childNodes[1].checked = false;
                }
                this.answers.push(this.currQuestVal); //add answer to array
                if (this.currQuest === this.questions.length - 1) {
                    $("#btnSurvQuest").html("Submit!");
                    $("#questionsDiv").attr("display", "none");
                }
                this.currQuestVal = 0;
            } else {
                this.answers.push(this.currQuestVal); //push final question to array
                this.submitSurv();
            }
        }
    },
    submitSurv: function() {
        if (($("#username").val()) && ($("#userpic").val())) { //if name and pic fields are not empty submit otherwise alert user
            //insert axios call here later
            var data = {
                name: $("#username").val(),
                photo: $("#userpic").val(),
                scores: this.answers
            }
            console.log("sending", data);
            axios.post("/api/friends", data)
                 .then(function(res) {
                     console.log("recieved", res);
                     var newDiv = $("<div>");
                     newDiv.append("<h3>" + res.data.name + "</h3>");
                     newDiv.append("<img class='img-responsive' src='" + res.data.photo + "' />");
                     console.log(newDiv);
                     $("#newFriend").append(newDiv);
                     $("#ffModal").modal();                    
                 })
                 .catch(function(err) {
                     console.error(err);
                 });
        } else {
            alert("Don't forget to give us a name and photo!");
        }
    },
    loadQuestion: function() {
    	$("#survQuestion").html((this.currQuest + 1) + ". " + this.questions[this.currQuest]);
    },
    setCurrQuestVal: function(num) {
    	this.currQuestVal = num;
    }
}

window.onload = function() {
	survey.loadQuestion(survey.currQuest);
    $(".inlineRadio").on("click", function() {
        survey.setCurrQuestVal(parseInt($(this).attr("value")));
    });
    $("#btnSurvQuest").on("click", function(e) {
        e.preventDefault;
        survey.moveNextQuest();
    });
    $(".modal").on("hidden.bs.modal", function () {
        window.location = "/";
    });
}