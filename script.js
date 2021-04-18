const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: "a14f6158df8e4c8889551c4c21180010",
    src: joke,
    hl: "en-us",
    r: "0",
    c: "mp3",
    f: "44khz_16bit_stereo",
  });
}

// get Jokes from Joke API
async function getJokes() {
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    let joke = "";
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text to speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (error) {
    // Catch errors here
    console.log("whoops", error);
  }
}
// Event listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
