const playerId = document.getElementById("player-id");
const playerName = document.getElementById("player-name");
const playerTeam = document.getElementById("player-team");
const playerPrice = document.getElementById("player-price");
const playerStatus = document.getElementById("player-status");
const playerDescription = document.getElementById("player-description");
const imageUrl = document.getElementById("img-url");

// if(window.location.search == "csk")


function saveData(){

    const playersData = {
                "id" : playerId.value,
                "playerName" : playerName.value,
                "from" : playerTeam.value,
                "price" : playerPrice.value,
                "isPlaying" : playerStatus.value,
                "description" : playerDescription.value,
                "image-url" : imageUrl.value
            };
        
    
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function(){
        if (xhr.status === 1){ 
            console.log("req sent");
        }
        if (xhr.status === 4){ 
             console.log("save success");
        }
        };
    
    xhr.open(
        "POST",
        "https://ipl-team-afc91-default-rtdb.firebaseio.com/teams.json",
        true
    );
    
    xhr.send(JSON.stringify(playersData));
    
};

//onclicks

const csk = document.getElementById("csk")
const mi = document.getElementById("mi")
const rr = document.getElementById("rr")
const dc = document.getElementById("dc")
// const csk = document.getElementById("csk")

function onclickedcsk(){
    localStorage.setItem("team", "CSK");
};
function onclickeddc(){
    localStorage.setItem("team", "DC");
};





// let objArray = [localStorage.getItem('dataKey', JSON.parse())];
// let getData = JSON.parse(localStorage.getItem('dataKey'));
// console.log(getData);
// let objArray = [];
// objArray.push(getData);
// console.log(objArray);
// function saveData(){
//     // console.log(playerId.value);
//     //object
//     const playersData = {
//         "id" : playerId.value,
//         "playerName" : playerName.value,
//         "from" : playerTeam.value,
//         "price" : playerPrice.value,
//         "isPlaying" : playerStatus.value,
//         "description" : playerDescription.value
//     };
    
    
    

    
//     // objArray.push(playersData);
    
//     objArray.push(playersData);
//     console.log(objArray);
//     localStorage.setItem('dataKey', JSON.stringify(objArray));
//     // let getData = JSON.parse(localStorage.getItem('dataKey')).value;
//     // objArray.push(getData);


//     // let getData = JSON.parse(localStorage.getItem('dataKey'));
    
//     // 
//     // // console.log(getData)
//     // objArray.push(getData);
//     // localStorage.setItem('dataKey', JSON.stringify(playersData));
//     // console.log(objArray)


//     // console.log(Object.keys(objArray))
    

//     // console.log(objArray);

//     // localStorage.setItem('dataKey', getData);
    
//     // console.log(localStorage)
//     // console.log(typeof(data))
// }
