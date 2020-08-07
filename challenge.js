const counter = document.querySelector("#counter");
const minusButton = document.querySelector("#\\-");
const plusButton = document.querySelector("#\\+");
const heartButton = document.querySelector("#\\<3");
const pauseButton = document.querySelector("#pause");
const commentForm = document.querySelector("#comment-form");
const formSubmitButton = document.querySelector("#submit");
const likesUl = document.querySelector(".likes");
const commentDiv = document.querySelector("#list");

const numLikes = {};

let currentNum = parseInt(counter.innerText);
let runGame = true;

// As a user, i should see the timer increment every second once the page has loaded
setInterval(incrementCounter, 1000)

function incrementCounter() {
  if (runGame) {
    counter.innerText = `${currentNum += 1}`;
    let daKey = counter.innerText;
    
    if (numLikes.hasOwnProperty(daKey)) {
      likesUl.innerText = `${numLikes[daKey]} Likes`;
    } else {
      likesUl.innerText = "No Likes";
    }
  }
}

// As a user I can pause the game, which should disable all buttons except the pause button, which should now show the text 'resume'
pauseButton.addEventListener("click", (evt) => {
  runGame = !runGame;
  if (runGame) {
    pauseButton.innerText = "pause";
  } else {
    pauseButton.innerText = "resume";
  }
  changeButtonClickability();
})

function changeButtonClickability() {
  // Helper function, will enable all buttons (except the pause button) if the buttons are disabled; will disable all buttons (except the pause button) if the buttons are enable
  let allButtons = document.querySelectorAll("button");

  for (let singleButton of allButtons) {
    if (singleButton.id !== "pause" && singleButton.disabled) {
      singleButton.removeAttribute("disabled");
    } else if (singleButton.id !== "pause") {
      singleButton.setAttribute("disabled", "true");
    }
  }
}

// As a user, i can manually increment and decrement the counter as i like
minusButton.addEventListener("click", (evt) => {
  currentNum -= 1;
})

plusButton.addEventListener("click", (evt) => {
  currentNum += 1;
})

// As a user, i can like an individual number of the counter. I should see the appropriate number of likes associated with that particular number
heartButton.addEventListener("click", (evt) => {
  let daKey = counter.innerText;
  
  if (numLikes.hasOwnProperty(daKey)){
    numLikes[daKey] += 1;
  } else {
    numLikes[daKey] = 1;
  }
})

// As a user I can leave comments on my gameplay, such as "Wow, what a fun game this is"
commentForm.addEventListener("submit", evt => {
  evt.preventDefault();

  let comment = evt.target["comment"].value;
  let newParagraph = document.createElement("p");
  newParagraph.innerText = comment;
  let line = document.createElement("hr");
  
  commentDiv.append(newParagraph);
  commentDiv.append(line);

  evt.target.reset();
})