
let currentSong = new Audio()
let songs = [];
let currFolder ="";


function secondsToMinutesSeconds(seconds) {
    if(isNaN(seconds) || seconds <0){
        return "00:00";
    }
  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format to ensure two digits
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  // Return formatted string
  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currFolder = folder;
    let a = await fetch(`http://127.0.0.1:5502/${folder}/`)
    let response = await a.text();
    let div = document.createElement('div')
    div.innerHTML = response;
    let as = div.getElementsByTagName('a')
    songs = []
   for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if(element.href.endsWith('.mp3')){
        songs.push(decodeURIComponent(element.href.split(`${folder}`)[1]));

    }
   }
  
   // show all the songs in the playlist
   function formatSongName(song) {
    return song.replace(/^\/+|\/+$/g, "")
               .replace(/\.mp3$/i, "") 
               .replace(/^\d+ /, "")     
               .replace(/\s+/g, " ")      
               .trim();                    
}

let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
console.log(songUL);

songUL.innerHTML = ""
for (const song of songs){
    let formattedSongName = formatSongName(song);
    songUL.innerHTML = songUL.innerHTML + `<li><img class= "invert" src="icon/music.svg" alt="">
        <div class="info">
        <div> ${formattedSongName}</div>
        <div></div>
    </div>
    <div class="playnow">
       
        <img class= "invert" src="icon/play.svg" alt="">
    </div></li>`;
}
//  Atttach an event listner to each song
 Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        
    })
    
 })

}
function formatSongName(song) {
    return song.replace(/\.mp3$/i, "")
               .replace(/\s+/g, " ")    
               .trim();                
            }
    const playMusic = (track, pause = false) => {
        track = track.trim().replace(/^\/+/, ""); 
        if (!track.endsWith(".mp3")) {
            track += ".mp3";
        }
        let songURL = `${window.location.origin}/${currFolder}/${encodeURIComponent(track)}`;
        currentSong.src = songURL;
        currentSong.load();

        currentSong.onerror = () => {
            console.error("Error: Song failed to load:", songURL);
        };
        if (!pause) {
            currentSong.play().catch(error => console.error("Playback Error:", error));
            let playButton = document.querySelector("#play");
            if (playButton) {
                playButton.src = "icon/pause.svg";
            }
        }
    
        document.querySelector(".songinfo").innerHTML = formatSongName(decodeURIComponent(track));
        document.querySelector(".songtime").innerHTML = "00:00 / 00";
    };

    async function displayAlbums() {
        let a = await fetch(`http://127.0.0.1:5502/songs/`)
        let responseText = await a.text();
        let div = document.createElement('div')
        div.innerHTML = responseText;
        let anchors = div.getElementsByTagName("a")
        let cardContainer = document.querySelector(".cardContainer")
      Array.from(anchors).forEach(async e=>{
            if(e.href.includes("songs")){
                let folder = e.getAttribute("href").replace(/\/$/, "").split("/").pop();


        //  Get the metadata of the folder

        let a = await fetch(`/songs/${folder}/info.json`)
        let imagePath = `/songs/${folder}/cover.jpg`;  
        imagePath = imagePath.replace(/\/+/g, "/");
        console.log("Generated Image Path: ", imagePath)

        let response = await a.json();
        console.log(response);
        cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
        <div class="circular-box">
            <svg data-encore-id="icon"role="img"aria-hidden="true"viewBox="0 0 24 24"class="svg-icon">
            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
            </div>
             <img src="${imagePath}" onerror="this.onerror=null; this.src='/default.jpg';" alt="${response.title} cover">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
            </div>`;
          yle.paddingBottom = "160px";
            
            }
        })
        
    }
async function main(){
    // get the list of all the songs
await getSongs("songs/gurnam")
if (songs.length > 0) {
    playMusic(songs[0], true);
}


//  Display all the albums on the page
displayAlbums()

// Attach an event listner to play next and previous
play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "icon/pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "icon/play.svg"
    }
  })
 
  // listen for timeupdate event
currentSong.addEventListener("timeupdate", ()=>{
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 + "%";
})
//  add an event listner in seekbar
document.querySelector(".seekbar").addEventListener("click", e=>{
    let persent =(e.offsetX/e.target.getBoundingClientRect().width)* 100;
    document.querySelector(".circle").style.left = persent + "%";
    currentSong.currentTime = ((currentSong.duration)* persent)/100
    
})
// Add an event listner for hamnurger
document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0"
})
// Add event listner for close button
document.querySelector(".close").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "-120%"
})

// Previous button
previous.addEventListener("click", () => {
    console.log("Previous clicked");

    let currentTrack = decodeURIComponent(currentSong.src.split("/").pop())
        .replace(/^\/+|\/+$/g, "")
        .replace(/\.mp3$/, "")
        .trim();

    let normalizedSongs = songs.map(song => song.replace(/^\/+|\/+$/g, "").replace(/\.mp3$/, "").trim());
    let index = normalizedSongs.indexOf(currentTrack);

    // Go to previous song, or loop to last song if at start
    let prevIndex = (index - 1 + songs.length) % songs.length;
    playMusic(songs[prevIndex]);

    // Ensure the song plays immediately
    currentSong.play().catch(error => console.error("Autoplay blocked:", error));

    // Fix play button disappearing issue
    document.querySelector(".play-btn").style.display = "block";
});

// Next button
next.addEventListener("click", () => {
    console.log("Next clicked");

    let currentTrack = decodeURIComponent(currentSong.src.split("/").pop())
        .replace(/^\/+|\/+$/g, "")
        .replace(/\.mp3$/, "")
        .trim();

    let normalizedSongs = songs.map(song => song.replace(/^\/+|\/+$/g, "").replace(/\.mp3$/, "").trim());
    let index = normalizedSongs.indexOf(currentTrack);

    // Go to next song, or loop back to first song if at end
    let nextIndex = (index + 1) % songs.length;
    playMusic(songs[nextIndex]);

    // Ensure the song plays immediately
    currentSong.play().catch(error => console.error("Autoplay blocked:", error));

    // Fix play button disappearing issue
    document.querySelector(".play-btn").style.display = "block";
});

// 🔥 Automatically play next song when current song ends
currentSong.addEventListener("ended", () => {
    console.log("Current song ended, playing next...");

    let currentTrack = decodeURIComponent(currentSong.src.split("/").pop())
        .replace(/^\/+|\/+$/g, "")
        .replace(/\.mp3$/, "")
        .trim();

    let normalizedSongs = songs.map(song => song.replace(/^\/+|\/+$/g, "").replace(/\.mp3$/, "").trim());
    let index = normalizedSongs.indexOf(currentTrack);

    // Auto-play the next song (looping back if last song)
    let nextIndex = (index + 1) % songs.length;
    playMusic(songs[nextIndex]);

    // Ensure autoplay starts without user interaction
    currentSong.play().catch(error => console.error("Autoplay blocked:", error));
});

// Add an event listner to volume
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", 
(e)=>{
    console.log("Setting volume to", e.target, e.target.value, "/100");
    currentSong.volume = e.target.value / 100
    
})
//   add event listner to mute the track
document.querySelector(".volume>img").addEventListener("click", e=>{
    if(e.target.src.includes("volume.svg")){
        e.target.src =  e.target.src.replace("volume.svg", "mute.svg")
        currentSong.volume = 0;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 0
    }
    else{
        e.target.src =  e.target.src.replace("mute.svg", "volume.svg")
        currentSong.volume = .10;
        document.querySelector(".range").getElementsByTagName("input")[0].value = 10
    }
    
})
// load the playlist whenever card is clicked
document.addEventListener("click", async (event) => {
    let card = event.target.closest(".card");
    if (card) {
        let folder = card.dataset.folder;
        console.log(`Loading songs from folder: ${folder}`);
        await getSongs(`songs/${folder}`);
        if (songs.length > 0) {
            playMusic(songs[0]);
        }
    }
});
document.getElementById("toggle-form").addEventListener("click", function() {
    let title = document.getElementById("form-title");
    let form = document.getElementById("auth-form");

    if (title.innerText === "Login") {
        title.innerText = "Sign Up";
        form.innerHTML = `
            <input type="text" placeholder="Username" required>
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
            <p id="toggle-form">Already have an account? <span>Login</span></p>
        `;
    } else {
        title.innerText = "Login";
        form.innerHTML = `
            <input type="email" placeholder="Email" required>
            <input type="password" placeholder="Password" required>
            <button type="submit">Submit</button>
            <p id="toggle-form">Don't have an account? <span>Sign up</span></p>
        `;
    }

    document.getElementById("toggle-form").addEventListener("click", arguments.callee);
});


}
main()


   
