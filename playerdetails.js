const container = document.getElementById("player-container");
const leftSection = document.getElementById("leftsection")
const rightSection = document.getElementById("rightsection")

let playerName = localStorage.getItem("name");
console.log(playerName);

let localData = JSON.parse(localStorage.getItem('allData'))
console.log(localData)

allPlayers = localData;

// function getData(){
//     const xhr = new XMLHttpRequest();
    
//     xhr.open(
//         "GET",
//         "https://ipl-team-afc91-default-rtdb.firebaseio.com/teams.json",
//         true
//     );

//     xhr.onreadystatechange = function(){
//         if (xhr.readyState === xhr.DONE && xhr.status === 200){
//             allPlayerss = JSON.parse(xhr.response);
//             // console.log(allPlayers);
            
//             // console.log(allUsers.id) //undefined case
//             showDataToDom();
//         }
//     };
//     xhr.send();
// }
// getData();

showDataToDom();

function showDataToDom(){
    for(let i=0; i < allPlayers.length; i++){
        if(allPlayers[i].playerName == playerName){
            // console.log(allPlayers[i].description)

            const image = document.createElement('img');
            image.src = allPlayers[i].image;
            
            const name = document.createElement("h5");
            name.innerHTML = "He is " + allPlayers[i].playerName;

            const team = document.createElement("h5");
            team.innerHTML = "Playing for " + allPlayers[i].from;

            const price = document.createElement("h5");
            price.innerHTML = "Bought for " + allPlayers[i].price + " Crores";
            
            const playingStatus = document.createElement("h5");
            
            
            
            if(allPlayers[i].isPlaying === "true"){
                    
                    playingStatus.innerHTML = "Current Status is Playing";
            }else{
                    playingStatus.innerHTML = "Current Status is On-Bench";
            }

            const role = document.createElement('h5');
            role.innerHTML = "Playing as " + allPlayers[i].description;
                
            




            leftSection.append(image);
            rightSection.append(name);
            rightSection.append(team);
            rightSection.append(price);
            rightSection.append(playingStatus);
            rightSection.append(role);
            container.append(leftSection);
            container.append(rightSection);


        }
    }
}