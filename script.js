

let currentSong = new Audio()
let songs;
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


async function getSongs(){
    let a = await fetch(`http://127.0.0.1:5502/songs`)
    let response = await a.text();
    console.log(a);
}
getSongs()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as= div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href)
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    

const playMusic = (track, pause=false)=>{
    currentSong.src = `/${folder}/` + track
    if(!pause){
    currentSong.play()
    play.src = "icon/pause.svg"
     }
  document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function main(){

   
 // get the list all the songs 
songs =await getSongs()
playMusic(songs[0], true)

// show all the songs in the playlist
let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
for (const song of songs) {
    songUL.innerHTML = songUL.innerHTML + `<li><img class= "invert" src="icon/music.svg" alt="">
    <div class="info">
        <div> ${song.replaceAll("%20", " ")}</div>
        <div>simi</div>
    </div>
    <div class="playnow">
        <span>Play Now</span>
        <img class= "invert" src="icon/play.svg" alt="">
    </div> </li>`;
}
    
// // Attach an event listner to each song
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
   e.addEventListener("click", element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML);
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
   })
})
// Attach an event listner to play, next and previous
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
    console.log(currentSong.currentTime, currentSong.duration);
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
// Add an event listner to previous  button
previous.addEventListener("click", ()=>{
    console.log("Previous clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if((index+1) >= 0){
    playMusic(songs[index-1])
    }
    
})
// Add an event listner to next 
next.addEventListener("click", ()=>{
    currentSong.pause()
    console.log("Next clicked")
    let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    if((index+1) < songs.length){
    playMusic(songs[index+1])
    }
})
// Add an event listner to volume
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", 
(e)=>{
    console.log("Setting volume to", e.target, e.target.value, "/100");
    currentSong.volume = parseInt(e.target.value)/100
    
})
}




/*let a =  await fetch(`http://127.0.0.1:5502/songs/${folder}/info.json`)        
// let response = await a.json();
// cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="ncs" class="card">
// <div class="circular-box">
// <svg data-encore-id="icon"role="img"aria-hidden="true"viewBox="0 0 24 24"class="svg-icon">
// <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
// </div>

//     <img src ="/songs/${folder}/cover.jpg/" alt=""></img>
//     <h2>${response.title}</h2>
//     <p>${response.discription}</p>
// </div>`*/
