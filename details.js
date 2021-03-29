

if(localStorage.getItem("team")){
    console.log(localStorage.getItem("team"));
}
let team = localStorage.getItem("team");
let teamName = team.toUpperCase();
console.log(teamName);
const welcome = document.getElementById("welcome")

welcome.innerText = "Welcome to " + team + " team";

let allUsers = {};
function getData(){
    const xhr = new XMLHttpRequest();
    
    xhr.open(
        "GET",
        "https://ipl-team-afc91-default-rtdb.firebaseio.com/teams.json",
        true
    );

    xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE && xhr.status === 200){
            allPlayers = JSON.parse(xhr.response);
            // console.log(allPlayers.length);
            
            // console.log(allUsers.id) //undefined case
            showDataToDom();
        }
    };
    xhr.send();
}
getData();

const playerCard = document.getElementById("playerCard")
function showDataToDom(){
    for(let i=0; i < allPlayers.length; i++){
        if(allPlayers[i].from == teamName){
            console.log(i);
            const cardWrapper = document.createElement("div")
            const playerName = document.createElement("h4")
            
            
            playerName.innerText = allPlayers[i].playerName;
            cardWrapper.appendChild(playerName);
            playerCard.appendChild(cardWrapper);
        }
    }
}