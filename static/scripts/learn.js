function flip() {
  // Toggle visibility of the buttons
  const card = document.getElementById("flipCard");
  const buttonContainer = document.getElementById("buttonContainer");

  card.classList.toggle("is-flipped");
  buttonContainer.classList.toggle("show-buttons");
}

document.addEventListener("DOMContentLoaded", getWords);

var words = [];
var username = "";
var score = 0;
async function getWords() {
  username = window.location.href.split("/");
  username = username[username.length - 1];

  let result = await fetch(`http://127.0.0.1:5000/getwords/${username}`);

  if (!result.ok) {
    console.log("RESULT NOT OK");
    return;
  }
  words = await result.json();
  console.log(words);

  displayNextWord();
}

let wordIndex = 0;
function displayNextWord() {
  let word = document.getElementById("word");
  let meaning = document.getElementById("meaning");

  word.innerText = words[wordIndex].word;
  meaning.innerText = words[wordIndex].meaning;
}

async function handleAnswer(answer) {
  if (answer === 1) {
    words[wordIndex].correct_answers += 1;

    if (words[wordIndex].box_level < 5) {
      words[wordIndex].box_level += 1;
    }

    score += 100;
    console.log("I KNOW");
  } else {
    words[wordIndex].incorrect_answers += 1;

    if (words[wordIndex].box_level > 1) {
      words[wordIndex].box_level -= 1;
    }

    score -= 50;
    console.log("I DON'T KNOW");
  }

  if (wordIndex === 4) {
    console.log(words);
    alert("YOUR SCORE IS 1000");

    const updateReq = await fetch(
      `http://127.0.0.1:5000/updatewords/${username}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(words),
      }
    );

    if (!updateReq.ok) {
      alert("RESULT NOT OK!");
      return;
    }

    checkStreak();

    window.location.href = `http://127.0.0.1:5000/homepage/${username}`;
    return;
  }

  wordIndex += 1;
  flip();
  await new Promise((r) => setTimeout(r, 500));
  displayNextWord();
}

async function checkStreak() {
  let streakreq = await fetch(`http://127.0.0.1:5000/getstreak/${username}`);
  if (!streakreq.ok) {
    alert("RESULT NOT OK!");
    return;
  }
  let streakdata = await streakreq.json();

  if (!streakdata.laststreak) {
    streakdata.laststreak = new Date();
    streakdata.streak_count = 1;
  } else {
    let laststreak = new Date(streakdata.laststreak).getTime();
    let now = new Date().getTime();
    if (now - laststreak > 2 * 86400000) {
      streakdata.laststreak = new Date();
      streakdata.streak_count = 1;
    } else if (now - laststreak > 86400000) {
      streakdata.laststreak = new Date();
      streakdata.streak_count += 1;
    }
  }

  console.log(streakdata);

  let updatestreak = await fetch(
    `http://127.0.0.1:5000/updatestreak/${username}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(streakdata),
    }
  );

  if (!updatestreak.ok) {
    alert("RESULT NT OK!");
    return;
  }
}
