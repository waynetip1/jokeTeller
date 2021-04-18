const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
var mykey = config.MY_KEY;
// Disable Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: mykey,
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
