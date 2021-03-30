import './assets/css/styles.css'

import SQUADS from './data/squad.json'
import LOGO from './assets/img/logo.png'
import _players from './data/players.json'

let PLAYERS = [..._players]
if ( window.localStorage && window.localStorage.getItem("PLAYERS") ) {
    PLAYERS = JSON.parse(window.localStorage.getItem("PLAYERS"))
} else {
    window.localStorage.setItem("PLAYERS", JSON.stringify(PLAYERS))
}

const SQUAD_SLUGS = {
    'mi': "Mumbai Indians",
    'rcb': "Royal Challengers Bangalore"
}
const COLORS = [
    'linear-gradient(136deg,#005da0,#003a63)',
    'linear-gradient(136deg,#000,#464646)',
    'linear-gradient(136deg,#fdb913,#f85c00)',
    'linear-gradient(136deg,#004c93,#0358a7)',
    'linear-gradient(136deg,#aa4545,#740f0b)',
    'linear-gradient(136deg,#70458f,#3d2057)',
    'linear-gradient(136deg,#2d4d9d,#172e5e)',
    'linear-gradient(136deg,#fb643e,#b81c25)',
]
const ICON_POSITIONS = [
    '-316px -316px',
    '0 0',
    '-158px 0',
    '-474px -316px',
    '-474px 0',
    '-316px -158px',
    '-158px -474px',
    '-632px 0',
]

const main = document.querySelector('body > main')

const SEARCH_INDEX = [...SQUADS.map(s => ({value: s, type: "team"})), ...PLAYERS.map(({ name }) => ({ value: name, type: "player" }))]

// INIT PAGE
const logo = new Image()
logo.src = LOGO
document.body.querySelector(".logo").appendChild(logo)
document.body.querySelector(".add-player").onclick = () => {
    add_player()
}
document.querySelector(".search > input").onkeyup = ({ target: { value } }) => {
    let results = SEARCH_INDEX.filter(({ value: c }) => new RegExp(`(${value.toLowerCase()})`, "ig").test(c))
    if ( results.length > 0 ) {
        if ( document.querySelector(".search-results") ) {
            document.querySelector(".search").removeChild(document.getElementsById("search-results"))
        }        
        document.querySelector(".search").appendChild(
            create_element("div", (e) => {
                e.id = "search-results"
                results.forEach(({ value, type }) => {
                    e.appendChild(
                        create_element("div", (e) => {
                            e.innerHTML = `
                                <h3>${value}</h3>
                                <span>${type}</span>
                            `
                        })
                    )
                })
            })
        )
    }
}
document.querySelector(".search > input").onblur = () => {
    if ( document.querySelector(".search-results") ) {
        document.querySelector(".search").removeChild(document.getElementsById("search-results"))
    }
}
// End INIT

function add_player() {
    const id = prompt("Player Id")
    const playerName = prompt("Player Name")
    const isPlaying = Boolean(prompt("Is Playing? (true/false)")) || true
    const team = prompt("Team? (mi/rcb)")
    const price = prompt("Player Price")
    const description = prompt("Player Description")

    if (
        id !== "" &&
        playerName !== "" &&
        (team === "mi" || team === "rcb") &&
        price !== "" &&
        description !== ""
    ) {
        PLAYERS.push({
            id,
            playerName,
            isPlaying,
            price,
            description
        })
        localStorage.setItem("PLAYERS", JSON.stringify(PLAYERS))        
    } else {
        alert("Invalid player info")
    }
}

function index_page() {
    document.title = "IPL20 Squads"
    return create_element("div", (e) => {
        e.className = "index-page"
        e.innerHTML = `
            <h1>#IPL20 Squads</h1>
        `        
        const squadView = create_element("ul", (e) => e.className = "squad-list")
    
        SQUADS.forEach((squad, i) => {
            const _li = create_element("li", (e) => {
                e.innerHTML = `
                    <div class="squad-logo" style="background-position: ${ICON_POSITIONS[i]}"></div>
                    <h4>${squad}</h4>
                `
                e.style.background = COLORS[i]            
            })
            squadView.appendChild(_li) 
            
            let squad_slug = Object.entries(SQUAD_SLUGS).reduce((mem, [slug, name]) => name === squad ? slug : mem, null)
            if ( squad_slug ) {
                const _span = create_element("span", (e) => {
                    e.innerText = "View Squad"
                })
                _li.appendChild(_span)
                _li.onclick = () => nav_to_page("squad", squad_slug)
            }
        })
        e.appendChild(squadView)        
    })
}

function squad_page(squad) {
    if ( squad in SQUAD_SLUGS ) {
        document.title = `${SQUAD_SLUGS[squad]} Players | IPL20 Squads`        
        return create_element("div", (e) => {
            e.className = "squad-page"
            const page_nav = create_element("div", (e) => {
                e.className = "squad-nav"
                const _back_btn = create_element("button", (e) => {
                    e.innerText = "Back"
                    e.onclick = () => nav_to_page('index')                
                })
                const _h1 = create_element("h1", (e) => {
                    e.innerText = SQUAD_SLUGS[squad]
                })            
                e.appendChild(_back_btn)
                e.appendChild(_h1)
                e.appendChild(create_element("div"))
            })

            const player_table = create_element("table", (e) => {
                e.className = "squad-table"
                e.appendChild(
                    create_element("tbody", (e) => {
                        e.innerHTML = `
                            <tr>
                                <th>ID</th>
                                <th>Player Name</th>
                                <th>Type</th>
                                <th>In Squad</th>
                                <th>Price</th>
                            </tr>
                        `
                        PLAYERS.filter(({ from }) => from === squad).forEach(({ 
                            id, 
                            playerName,
                            description,
                            isPlaying,
                            price
                        }) => {
                            e.appendChild(
                                create_element("tr", (e) => {
                                    e.appendChild( create_element("td", (e) => e.innerText = id) )
                                    e.appendChild( create_element("td", (e) => e.innerText = playerName) )
                                    e.appendChild( create_element("td", (e) => e.innerText = description) )
                                    e.appendChild( create_element("td", (e) => e.innerText = isPlaying ? "YES" : "NO") )
                                    e.appendChild( create_element("td", (e) => e.innerText = price) )
                                })
                            )
                        })
                    })
                )
            })

            e.appendChild(page_nav)
            e.appendChild(player_table)
        })
    }

    return _404_page()
}

function _404_page() {
    document.title = "404 - Page Not Found"
    return create_element("div", (e) => {
        e.className = "404-page"
        e.innerHTML = `
            <h1>404 Page Not Found</h1>
        `        
    })
}

function nav_to_page(page, slug = null) {
    main.innerHTML = ""
    main.appendChild( slug ? routes[page](slug) : routes[page](slug))
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
}

function create_element(tagname, props=(_) => {}) {
    const element = document.createElement(tagname)
    props(element)
    return element
}

const routes = {
    "index": () => index_page(),
    "squad": (s) => squad_page(s),
}

nav_to_page("index")