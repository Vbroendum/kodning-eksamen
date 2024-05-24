//Spørgsmål, de er en constant fordi de ikke vil ændre sig særligt ofte, der kan tilføjes eller trække fra
const questions = [
    {
        question: "Hvem afholdte en workshop på Darthmouth University i 1955 omkring Kunstig intelligens, som blev den første anvendelse af ordet?", 
        answer: [
            {text: "Alan Turing", correct: false},
            {text: "Arthur Samuel", correct: false},
            {text: "John McCarthy", correct: true},
            {text: "Alex Krizhevsky, (krisveski)", correct: false},
        ]
    },
    {
        question: "Hvornår startede den generative kunstige intelligens, ChatGPT?", 
        answer: [
            {text: "2020", correct: true},
            {text: "2018", correct: false},
            {text: "2019", correct: false},
            {text: "2021", correct: false},
        ]
    },
    {
        question: "Den amerikanske datalog Arthur Samuels udviklede et program til at spille et brætspil, hvad hedder brætspillet?", 
        answer: [
            {text: "Skak", correct: false},
            {text: "Dam", correct: true},
            {text: "Ludo", correct: false},
            {text: "Backgammon", correct: false},
        ]
    },
    {
        question: "John Mccarthy fik anerkendelsen for at starte kunstig intelligens, men hvem startede det i virkeligheden?", 
        answer: [
            {text: "Herbert Simons", correct: false},
            {text: "Edward Shortliffe", correct: false},
            {text: "Alex Krizhevsky, (krisveski)", correct: false},
            {text: "Alan Turing", correct: true},
        ]
    }
]; 
//Her henter vi de div og buttons vi har fra vores HTML, ved at kalde på det unikke id som HTML tagget har - se slutningen af hver af de 3 konstanter her
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Dette er til vores score og for at fortælle at vi starter på det første spørgsmål samt at vores score er 0, derved currentQuestionIndex = 0 er det første spørgsmål i den første konstant
let currentQuestionIndex = 0;
let score = 0;

//vores første funktion, som giver os mulighed for at starte quizzen, den tilføjer tekst en knap, som gør det muligt at komme videre til næste spørgsmål
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Næste";
    showQuestion();
};

//Funktionen starter med at kalde en funktion længere nede i dokumentet. derefter fortæller den currentQuestion at den skal vise det aktuelle spørgsmål i vores første konstant
function showQuestion(){
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

//Da vi i vores HTML har brugt knapper til vores svar i spørgsmålene, for vi denne del til at skrive svarmulighederne ind i de knapper som vi har
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =  answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    }); 
};
//ResetState er blot vores start, den fjerne knappen "næste" indtil et svar er valgt
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    };
};

//Funktionen for at vælge et svar, som derved også læser i datasættet efter om det er rigtigt og forkert og tilføjer en class på den knap for at indikere rigtigt svar og forkert svar. Da vi bruger Bootstrap har vi valgt at bruge deres classes for grønne og røde knapper. Derfor btn-success og btn-danger. Som er hhv. grønne og rødde knapper. Efter et svar er trykket og den viser det korrekte svar bliver alle "answer-buttons" disabled. og viser igen "næste" knappen
function selectanswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("btn-success");
        score++;
    }else{
        selectedBtn.classList.add("btn-danger");
    };
    Array.from(answerButtons.children).forEach(button =>{
        if (button.dataset.correct === "true"){
            button.classList.add("btn-success");
        };
        button.disabled = true; 
    });
    nextButton.style.display = "block"
};

//Denne funktion er vores konklusion på quiz, den fortæller brugeren, hvor mange rigtige ud af hvor mange spørgsmål brugeren fik. og giver der muligheden for at gentage quizzen, for eventuelt at få en bedre score. 
function showScore(){
    resetState();
    questionElement.innerHTML = `Du fik ${score} ud af ${questions.length} rigtige!`;
    nextButton.innerHTML = "Spil igen";
    nextButton.style.display = "block";
};

//Dette er til vores "next-button" den læser om vi er ved et spørgsmål eller om vi er nået igenenm alle spørgsmål. Hvis der stadig er spørgsmål tilbage vil den stadig vise spørgsmål, hvis der ikke er flere spørgsmål tilbage vil den referere til vores function showScore() som viser score 
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};


//Hvis der stadig er spørgsmål tilbage vil den vise de næste spørgsmål, hvis der ikke er flere tilbage vil den genstarte quizzen
nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton(); 
    }else{
        startQuiz();
    }
});

//kalder og eksekverer funktionen startQuiz
startQuiz();