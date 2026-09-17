const playButtons = document.querySelectorAll(".play-album");

playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const article = button.closest(".album");
    const track = article.dataset.track;
    const title = article.dataset.title;

    audio.src = track;
    audio.play();

    document.getElementById("now-playing").innerHTML = `<span>${title}</span>`;
  });
});

const nowPlaying = document.getElementById("now-playing");

audio.addEventListener("play", () => {
  nowPlaying.querySelector("span").style.animationPlayState = "running";
});

audio.addEventListener("pause", () => {
  nowPlaying.querySelector("span").style.animationPlayState = "paused";
});
