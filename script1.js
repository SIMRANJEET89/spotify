
let currentSong = new Audio();
let songs;
let currFolder;



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
    let a = await fetch(`${folder}/`)
    let response = await a.text();
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }

    // // show all the songs in the playlist
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
       
        songUL.innerHTML +=`<li><img class= "invert" src="music.svg" alt="">
        <div class="info">
        <div> ${song.replaceAll("%20", " ")}</div>
        <div></div>
    </div>
    <div class="playnow">
        <span>Play Now</span>
        <img class= "invert" src="play.svg" alt="">
    </div> </li>`;

 }

 // Attach an event listner to each song
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element=>{
     playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
 })
 return songs
}

 const playMusic = (track, pause=false) =>{
    currentSong.src = `/${currFolder}/` + track
    if(!pause){
    currentSong.play()
    play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00"
    }

    async function displayAlbums() {
        let a = await fetch(` `)
        let response = await a.text();
        console.log(response);
        
        let div = document.createElement("div")
        div.innerHTML = response;
        let anchors  = div.getElementsByTagName("a")
        let cardContainer = document.querySelector(".cardContainer")

        Array.from(anchors).forEach(async e=>{

            if(e.href.endsWith("/") && e.href.includes("/songs/")){
              let folder = e.href.split("/").slice(-2, -1)[0]
              
              try{
            //   get the matadata of the folder
            let metadata = await fetch(``)
            if(!metadata.ok) throw new Error(`info.json not found in ${folder}`);
            let response = await metadata.json();
         
            cardContainer.innerHTML = cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
            <div class="circular-box">
            <svg data-encore-id="icon"role="img"aria-hidden="true"viewBox="0 0 24 24"class="svg-icon">
            <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
            </div>

            <img src ="/songs/${folder}/cover.jpg" alt=""${response.title} cover"></img>
            <h2>${response.title}</h2>
            <p>${response.description}</p>
            </div>`
            } catch (error) {
                console.error(`Error processing folder: ${folder}`, error);
            }
        }
        })
    }

  
    
    async function main() {
       
        // get the list of all the songs
        await getSongs("songs/ncs")
        playMusic([0], true)

        // display all the albums on the page
        displayAlbums()

 // Attach an event listner to play, next and previous
 play.addEventListener("click", ()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "play.svg"
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
// load the playlist whenever card is clicked
  Array.from(document.getElementsByClassName("card")).forEach(e =>{
    e.addEventListener("click", async item=>{
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        playMusic(songs[0])
    })
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

    }
main()