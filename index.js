const playerId = document.getElementById("player-id");
const playerName = document.getElementById("player-name");
const playerTeam = document.getElementById("player-team");
const playerPrice = document.getElementById("player-price");
const playerStatus = document.getElementById("player-status");
const playerDescription = document.getElementById("player-description");
const imageUrl = document.getElementById("img-url");
const addPlayerMenu = document.getElementById("add-players-container");

// if(window.location.search == "csk")


// function saveData(){

//     const playersData = {
//                 "id" : playerId.value,
//                 "playerName" : playerName.value,
//                 "from" : playerTeam.value,
//                 "price" : playerPrice.value,
//                 "isPlaying" : playerStatus.value,
//                 "description" : playerDescription.value,
//                 "image-url" : imageUrl.value
//             };
        
    
//     const xhr = new XMLHttpRequest();
    
//     xhr.onreadystatechange = function(){
//         if (xhr.status === 1){ 
//             console.log("req sent");
//         }
//         if (xhr.status === 4){ 
//              console.log("save success");
//         }
//         };
    
//     xhr.open(
//         "POST",
//         "https://ipl-team-afc91-default-rtdb.firebaseio.com/teams.json",
//         true
//     );
    
//     xhr.send(JSON.stringify(playersData));
    
// };
// store data in local 
let allPlayers = {};
function getData(){
    const xhr = new XMLHttpRequest();
    
    xhr.open(
        "GET",
        "https://ipl-team-afc91-default-rtdb.firebaseio.com/teams.json",
        true
    );

    xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE && xhr.status === 200){
            allPlayers = Object.values(JSON.parse(xhr.response));
            // console.log(allPlayers);
            // const keys = Object.keys(allPlayers);
            // console.log(keys)
            // console.log(allUsers.id) //undefined case
            
            showDataToDom();
        }
    };
    xhr.send();
}
getData();
let stringdata = {};
function showDataToDom(){
    console.log(allPlayers);
    stringdata = JSON.stringify(allPlayers);
    let localData = localStorage.setItem('allData', stringdata );
    // console.log(stringdata)

}

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
function onclickedrr(){
    localStorage.setItem("team", "RR");
};
function onclickedkkr(){
    localStorage.setItem("team", "KKR");
};
function onclickedkep(){
    localStorage.setItem("team", "KEP");
};
function onclickedsrh(){
    localStorage.setItem("team", "SRH");
};
function onclickedmi(){
    localStorage.setItem("team", "MI");
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

let getfromlocal = JSON.parse(localStorage.getItem('allData'));
console.log(getfromlocal);
let objArray = [];

console.log(objArray);
function saveData(){
    const playersData = {
        "id" : playerId.value,
        "playerName" : playerName.value,
        "from" : playerTeam.value,
        "price" : playerPrice.value,
        "isPlaying" : playerStatus.value,
        "description" : playerDescription.value,
        "image" : imageUrl.value
    };
    console.log(playersData)
    
    objArray.push(playersData);
    console.log(objArray)
    let newLocal = getfromlocal.concat(objArray)
    console.log(newLocal);
    // localStorage.setItem('allData', newLocal);
    localStorage.setItem('allData', JSON.stringify(newLocal));
};

// console.log(localData)

//adding players tab 


function addPlayers(){
    localStorage.setItem('addmenu', true);
    showCorrectComponent();

}

function showCorrectComponent(){
    console.log(localStorage.getItem('addmenu'))
    if(localStorage.getItem('addmenu') === "false"){
        // console.log("hi")
        addPlayerMenu.remove();
    }else{
        document.getElementById("content-wrapper").append(addPlayerMenu);
    }
}

function closeSubmit(){
    localStorage.setItem('addmenu', false)
    showCorrectComponent();
}

//searchbar

const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');


searchBar.addEventListener('keyup', (e) => {
    console.log(e.target.value)
    const searchString = e.target.value.toLowerCase();
    
    

    const filteredCharacters = getfromlocal.filter((character) => {
        return (
            // character.playerName.toLowerCase().includes(searchString) ||
            character.from.toLowerCase().includes(searchString)
            
        );
        
    });
    displayCharacters(filteredCharacters);
    
});


const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <div id="card">
                <h2>${character.playerName}</h2>
                <p>Team: ${character.from}</p>
                <img src="${character.image}"></img>            
            </div>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};



