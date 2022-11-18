const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
let overlay = document.querySelector(`#overlay`)
let header = document.querySelector(`#mainh1`)
let mainText = document.querySelector(`#maintext`)
let mainFooter = document.querySelector(`#mainFooter`)
let mainPage = document.querySelector(`main`)

let planetName = document.querySelector(`#planetName`)
let latinName = document.querySelector(`#latinName`)
let desc = document.querySelector(`#desc`)
let circum = document.querySelector(`#circum`)
let dist = document.querySelector(`#dist`)
let maxTemp = document.querySelector(`#maxTemp`)
let minTemp = document.querySelector(`#minTemp`)
let moons = document.querySelector(`#moons`)
let overlayAside_1 = document.querySelector(`#overlayAside`)
let overlayAside_2 = document.querySelector(`#overlayAside2`)
let overlayAside_3 = document.querySelector(`#overlayAside3`)
let planets = document.querySelectorAll(`.planets`)

// Funktion för att hämta nyckel och data från API

async function getPlanets() {

    // Hämta nyckel först vid varje anrop av planet info, så att vi får ny nyckel för varje request av planet-data.

    const keyResponse = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const keyData = await keyResponse.json(); /*Gör om data till JSON */
    // Hämta data
    const dataResponse = await fetch(`${BASE_URL}/bodies`, {
        method: `GET`,
        headers: {
            'x-zocom': `${keyData.key}`
        }
    });
    // Gör om data till JSON
    const data = await dataResponse.json();

    planets.forEach((aside, index) => {
        aside.addEventListener(`click`, function () {
            displayOn()
            planetName.innerHTML = `${data.bodies[index].name}`
            latinName.innerHTML = `${data.bodies[index].latinName}`
            desc.innerHTML = `${data.bodies[index].desc}`
            circum.innerHTML = `${data.bodies[index].circumference.toLocaleString()} km`
            dist.innerHTML = `${data.bodies[index].distance.toLocaleString()} km`
            maxTemp.innerHTML = `${data.bodies[index].temp.day}C`
            minTemp.innerHTML = `${data.bodies[index].temp.night}C`
            moons.innerHTML = `${data.bodies[index].moons.join(`, `)}`

            if (aside.id === `sun`) {
                overlayAside_1.style.backgroundColor = `#FFD029`;
                overlayAside_2.style.backgroundColor = `#FFD029`;
                overlayAside_3.style.backgroundColor = `#FFD029`;
            }
            if (aside.id === `mercury`) {
                overlayAside_1.style.backgroundColor = `#888888`;
                overlayAside_2.style.backgroundColor = `#888888`;
                overlayAside_3.style.backgroundColor = `#888888`;
            }
            if (aside.id === `venus`) {
                overlayAside_1.style.backgroundColor = `#E7CDCD`;
                overlayAside_2.style.backgroundColor = `#E7CDCD`;
                overlayAside_3.style.backgroundColor = `#E7CDCD`;
                overlay.style.gridTemplateColumns = `250px 1100px`;
            }
            if (aside.id === `earth`) {
                overlayAside_1.style.backgroundColor = `#428ED4`;
                overlayAside_2.style.backgroundColor = `#428ED4`;
                overlayAside_3.style.backgroundColor = `#428ED4`;
            }
            if (aside.id === `mars`) {
                overlayAside_1.style.backgroundColor = `#EF5F5F`;
                overlayAside_2.style.backgroundColor = `#EF5F5F`;
                overlayAside_3.style.backgroundColor = `#EF5F5F`;
            }
            if (aside.id === `jupiter`) {
                overlayAside_1.style.backgroundColor = `#E29468`;
                overlayAside_2.style.backgroundColor = `#E29468`;
                overlayAside_3.style.backgroundColor = `#E29468`;
            }
            if (aside.id === `saturn`) {
                overlayAside_1.style.backgroundColor = `#C7AA72`;
                overlayAside_2.style.backgroundColor = `#C7AA72`;
                overlayAside_3.style.backgroundColor = `#C7AA72`;
            }
            if (aside.id === `uranus`) {
                overlayAside_1.style.backgroundColor = `#C9D4F1`;
                overlayAside_2.style.backgroundColor = `#C9D4F1`;
                overlayAside_3.style.backgroundColor = `#C9D4F1`;
            }
            if (aside.id === `neptune`) {
                overlayAside_1.style.backgroundColor = `#7A91A7`;
                overlayAside_2.style.backgroundColor = `#7A91A7`;
                overlayAside_3.style.backgroundColor = `#7A91A7`;
            }
        })
    })
}

getPlanets();

// Default-display för overlay är NONE
overlay.style.display = `none`

// Funktion för att få upp overlay
function displayOn() {
    animateStars()
    overlay.style.display = "grid";
    overlayLeft.style.display = "flex";
    header.style.display = `none`;
    mainFooter.style.display = `none`;
    mainText.style.display = `none`;
}
function displayOff() {
    overlay.style.display = "none";
    header.style.display = `block`
    mainFooter.style.display = `flex`;
    mainText.style.display = `block`
    location.reload() // Nollställa animering då reset() inte fungerade
}


// Animering OVERLAY-sida

var starSkyContext = starSky.getContext("2d");
var W = window.innerWidth;
var H = window.outerHeight;

//canvas och bakgrund
starSky.width = W;
starSky.height = H;
starSkyContext.fillStyle = "#113";
starSkyContext.fillRect(0, 0, W, H);

// blänkade ljus
starSkyContext.shadowBlur = 10;
starSkyContext.shadowColor = "white";

function animateStars() {

    let x = W * Math.random(); /*Position*/
    let y = H * Math.random();
    let r = 2.5 * Math.random();

    starSkyContext.beginPath();
    starSkyContext.fillStyle = "white";
    starSkyContext.arc(x, y, r, 0, Math.PI * 2);
    starSkyContext.fill();

    setTimeout(animateStars, 100);
}