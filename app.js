// let currentSong = new Audio();
// let songs;
// let currFolder;

// const { response } = require("express")

// const API_KEY = "AIzaSyA_04txaBVZPOGoclsXIrp1nVybAyyiRkg"; // Aapki API Key
// const FOLDER_ID = "1cUg1-IrHWA8b-bT1i9nrJw2SkYDPv6Kf";

// function secondsToMinutesSeconds(seconds) {
//     if(isNaN(seconds) || seconds <0){
//         return "00:00";
//     }
//   // Calculate minutes and seconds
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = Math.floor(seconds % 60);

//   // Format to ensure two digits
//   const formattedMinutes = String(minutes).padStart(2, '0');
//   const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//   // Return formatted string
//   return `${formattedMinutes}:${formattedSeconds}`;
// }


// async function getSongsFromFolder() {
//     const url = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name)`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if (!data.files) {
//             console.error("No files found!");
//             return;
//         }

//         data.files.forEach(folder => {
//             const songUrl = `https://drive.google.com/uc?export=download&id=${folder.id}`;
//             console.log(`Song: ${folder.name} → ${songUrl}`);
//         });
//     } catch (error) {
//         console.error("Error fetching songs:", error);
//     }
//     for (let index = 0; index < url.length; index++) {
//                 const element = url[index];
//                 if (element.href.endsWith(".mp3")) {
//                     songs.push(element.href.split(`/${folder}/`)[1])
//                 }
//             }

// // Function call
// // getSongsFromFolder();

// const songList = document.getElementById("songlist");
// // const Music = document.getElementById("Music");

// // API se songs fetch ho chuke hain
// const allSongs = [
//     { name: "sidhumoosewala", url: "https://drive.google.com/uc?export=download&id=1wtAXoxg-sQrH0z3nB4quoHsyr-rc_Emk" },
//     { name: "mood", url: "https://drive.google.com/uc?export=download&id=1zmTia9ztong5mp-BXFNdx_KFHSWoNeM7" },
//     { name: "gurnam", url: "https://drive.google.com/uc?export=download&id=1rdE6_6bJDLwJXeIA7V3-XObpVEIedfKy" },
//     { name: "hipe", url: "https://drive.google.com/uc?export=download&id=1vOjmPiDUjoQ-jze67edgnA4fEofIcZul" },
//     { name: "karan", url: "https://drive.google.com/uc?export=download&id=1BeVCtFYRxMwwRfv-7s0qBTnV4_lKmDH3" }
// ];


//  // // show all the songs in the playlist
//  let songUL = document.querySelector("#songlist").getElementsByTagName("ul")[0]
//  songUL.innerHTML = ""
//  for (const song of allSongs) {
    
//      songUL.innerHTML +=`<li><img class= "invert" src="music.svg" alt="">
//      <div class="info">
//      <div> </div>
//      <div></div>
//  </div>
//  <div class="playnow">
//      <span>Play Now</span>
//      <img class= "invert" src="play.svg" alt="">
//  </div> </li>`;

// }

// // Attach an event listner to each song
// Array.from(document.querySelector("#songlist").getElementsByTagName("li")).forEach(e=>{
//  e.addEventListener("click", element=>{
//   playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
  
//  })
// })
// //  return allSongs()
// }

// const playMusic = (track, pause=false) =>{
//  currentSong.src = `/${currFolder}/` + track
//  if(!pause){
//  currentSong.play()
//  play.src = "pause.svg"
//  }
//  document.querySelector(".songinfo").innerHTML = decodeURI(track)
//  document.querySelector(".songtime").innerHTML = "00:00 / 00"
//  }

//  async function displayAlbums() {
//      let a = await fetch(`https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name)`)
//      let response = await a.text();
//      console.log(response);
     
//      let div = document.createElement("div")
//      div.innerHTML = response;
//      let anchors  = div.getElementsByTagName("a")
//      let cardContainer = document.querySelector(".cardContainer")

//      Array.from(anchors).forEach(async e=>{

//          if(e.href.endsWith("/") && e.href.includes("/songs/")){
//            let folder = e.href.split("/").slice(-2, -1)[0]
           
//            try{
//          //   get the matadata of the folder
//          let metadata = await fetch(`AIzaSyCYhjr1ZRYT0wL5xY-fYK2tPVK6GDau0jw${folder}/info.json`)
//          if(!metadata.ok) throw new Error(`info.json not found in ${folder}`);
//          let response = await metadata.json();
      
//          cardContainer.innerHTML = cardContainer.innerHTML += `<div data-folder="${folder}" class="card">
//          <div class="circular-box">
//          <svg data-encore-id="icon"role="img"aria-hidden="true"viewBox="0 0 24 24"class="svg-icon">
//          <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
//          </div>

//          <img src ="/songs/${folder}/cover.jpg" alt=""${response.title} cover"></img>
//          <h2>${response.title}</h2>
//          <p>${response.description}</p>
//          </div>`
//          } catch (error) {
//              console.error(`Error processing folder: ${folder}`, error);
//          }
//      }
//      })
//  }


 
//  async function main() {
    
//      // get the list of all the songs
//      await getSongsFromFolder("songs/ncs")
//      playMusic([0], true)

//      // display all the albums on the page
//      displayAlbums()

// // Attach an event listner to play, next and previous
// play.addEventListener("click", ()=>{
//  if(currentSong.paused){
//      currentSong.play()
//      play.src = "pause.svg"
//  }
//  else{
//      currentSong.pause()
//      play.src = "play.svg"
//  }
// })
// // listen for timeupdate event
// currentSong.addEventListener("timeupdate", ()=>{
//  document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
//  document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration) * 100 + "%";
// })
// //  add an event listner in seekbar
// document.querySelector(".seekbar").addEventListener("click", e=>{
//  let persent =(e.offsetX/e.target.getBoundingClientRect().width)* 100;
//  document.querySelector(".circle").style.left = persent + "%";
//  currentSong.currentTime = ((currentSong.duration)* persent)/100
 
// })
// // Add an event listner for hamnurger
// document.querySelector(".hamburger").addEventListener("click", ()=>{
//  document.querySelector(".left").style.left = "0"
// })
// // Add event listner for close button
// document.querySelector(".close").addEventListener("click", ()=>{
//  document.querySelector(".left").style.left = "-120%"
// })
// // Add an event listner to previous  button
// previous.addEventListener("click", ()=>{
//  console.log("Previous clicked")
//  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//  if((index+1) >= 0){
//  playMusic(songs[index-1])
//  }
 
// })
// // Add an event listner to next 
// next.addEventListener("click", ()=>{
//  currentSong.pause()
//  console.log("Next clicked")
//  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
//  if((index+1) < songs.length){
//  playMusic(songs[index+1])
//  }
// })
// // Add an event listner to volume
// document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", 
// (e)=>{
//  console.log("Setting volume to", e.target, e.target.value, "/100");
//  currentSong.volume = parseInt(e.target.value)/100
 
// })
// // load the playlist whenever card is clicked
// Array.from(document.getElementsByClassName("card")).forEach(e =>{
//  e.addEventListener("click", async item=>{
//      allSongs= await getSongsFromFolder(`allSongs/${item.currentTarget.dataset.folder}`)
//      playMusic(allSongs[0])
//  })
// })


// //   add event listner to mute the track
// document.querySelector(".volume>img").addEventListener("click", e=>{
//  if(e.target.src.includes("volume.svg")){
//      e.target.src =  e.target.src.replace("volume.svg", "mute.svg")
//      currentSong.volume = 0;
//      document.querySelector(".range").getElementsByTagName("input")[0].value = 0
//  }
//  else{
//      e.target.src =  e.target.src.replace("mute.svg", "volume.svg")
//      currentSong.volume = .10;
//      document.querySelector(".range").getElementsByTagName("input")[0].value = 10
//  }
 
// })

//  }
//  getSongsFromFolder()


// async function main() {
//     let a = await fetch("https://www.dropbox.com/scl/fo/unkz2zn2sf3qn64kcbtlh/AJhF8JsIqcoyCZKGvW5_p7g?rlkey=s3e4w8ook1bf172xsxz12qmsb&st=hv7jsbey&dl=0")
//     let response =  await a.text();
//     console.log(response)
// }
// main()

/*"sl.u.AFkEGFrbk1iHvT-H03pVCuWph4wKqx2z7HldFvGSjmaTgYmUUqD5ptu_U-n7tcMjWtjHb9N_UFNBnX9alepUN9OiQImHfg3JlzdSA2j5XiT2XDOVmj-IRPXsthMR18X8qSC0vvJ9jcXsOldOy2aVBGjj6uKQ12DLxHGxuwhTKP_eNz-q5Wgy9x_arwNjDrxDenGeHHTDv3ERBfXvxF_ymptaEU-CiNmSSQ8RCj9R5qe3b_GY-XUEY6UeJzn_26xqVcMVX95nKm2yLKBlfXWy92vIm5Cff32irr2FFsdpR0--nmy4hl3hbqJMPKT8nE_FNdr7BgMEAbboI0qrVV_3VGwErpNUTkXHFr4o9EXj5She8PL5je_j7ZReoCvcd1vASG-JKtjHY1V5uHyWW-XMlU7Vm6uOSpgswkEE67qFAWb4AM0nN8UQZRxd9gNFgei4LG_JrC8uhOZtfuHQPAgjm6EBkuqToRX_Ffl_okc-Rl-fd2weIjK7gqv-PKVUEkHflfNABYagwgsExPxsCuLYJx3ptxjaek41IMQD4pKN4Q9-i9O41LDYINwKywyRItdk7-QZhqvWBwiNIeUcIHkqhvsTxohkbFq8JQd9Rz6rdI278eaSO2yWRYyRt7lFc50sUKULZ1xem8DigzFWlcGPbWTvUGAh2YNq_Hv_SKZSt8rpd43EF4KQ9CqT2BKNjaxG7zYtdpu_0luvQVRVZinVUvj8AYEn70OiisQC5lnmMuqZs3qiH0dlG8tkusjK4c1IQI7DuboH2A9OF6s08uCvAWdWN6Bo75gQMxY1fTOYqISaF5YmRV1uC9aroWxqEMICqZ4bxAYsDO-2osNazvYjRlcbbj8oEw5NO6yHtuTpkcJoX3aeQxSiAbePgeAkG_RdE-e6PrHTg0OIlrNs6VgOlQH9FQ1eTRBhaa1E_okHf4OmqOJ4ja3u6MMsi0pKIarHkqcGjwcCl5o3RPHjx9Id2zq06uvAyl3NQWI_8eyWzeoDXXhEGx0WqGipbImLaCEab5pBUKfdlySL5YDE-ixwBpiQSVe3_l7jlWH-ttaZWaup8BUnhWhPzxSd_gXJZ_PX1SKoMD30LnScPwoXXDuFhRQR0B6BA7AvqTpA-RAgagVPi4pHAZaKPDU2bKRoPwP0oPFUhI21zHE7hOwxnphRwiJ1LOZ1szFafTARjauzeOHmTXt9YkD8-t93spQCrGNKM5coIKbkXKUhqEZ7KmnxeBRU1hwiC31tPUdf2np07Eh3edWCzeKQ3nvdSOVtqr3ofYrq7TrO1I5s5aibddVtawg7EluxpXrLkv0Lmw0kXBb-xEVaysnSDU4ucJ2TDmwgE_wP8F8pcH4PpKHw84BR2-Wu0-xPYq5Wf0UJg9jfhhs0G1Dop7DYnDT34oncXdLvC9FGuVrWI4wkVIarTTvQQihkjxZgaHZyt0NGezykkKP7cw"*/


