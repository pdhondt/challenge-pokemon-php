// Globals //
const BASEAPILINK = "https://pokeapi.co/api/v2/pokemon/";
const TOTALPOKEMON = 898;
let APILink = "https://pokeapi.co/api/v2/pokemon/1";

// input //
const PBYINPUT = document.querySelector("#text-num"); // accepts both ID and Name to browse the API.

//functions//


async function fetchPokemons(APILink) {
    try {
        let pResult = await fetch(APILink);
        let pData = await pResult.json();
        console.log(pData);
        displayPokemon(pData);
        await fetchSpecies(pData);
        return pData;
    } catch (error) {
        console.error(error);
        console.log("all the pokemon just died because of you")
    }
}

async function fetchSpecies(pData) {
    try {
        let pSResult = await fetch(pData.species.url);
        let pSData = await pSResult.json();
        await fetchEvolutions(pSData)
        return pSData;
    } catch (error) {
        console.error(error);
        console.log("What have you done?! Why would anyone break all the poké eggs?!")
    }
}

async function fetchEvolutions(pSData) {
    try {
        let pEResult = await fetch(pSData.evolution_chain.url);
        let pEData = await pEResult.json();
        console.log(pEData);
        displayEvolutions(pEData);
        return pEData;
    } catch (error) {
        console.error(error);
        console.log("Hello? Can anyone hear me?! I've been stuck here since 1995")
    }
}

async function nextPokemon() {
    let temp = await fetchPokemons(APILink);
    let newId = Number(temp.id) + 1;
    if (newId > TOTALPOKEMON) {
        newId = 1;
    }
    APILink = BASEAPILINK + newId;
    fetchPokemons(APILink);
}

async function nextEvolution(){
    let temp = await fetchPokemons(APILink);
    let temp2 = await fetchSpecies(temp);
    let temp3 = await fetchEvolutions(temp2);
    if(temp3.chain.evolves_to[0]){
        let evoLink = temp3.chain.evolves_to[0].species.url.replace("-species", "");
        if (evoLink === APILink && temp3.chain.evolves_to[0].evolves_to.length === 1){
            evoLink = temp3.chain.evolves_to[0].evolves_to[0].species.url.replace("-species", "");
            APILink =  evoLink
        }else {
            APILink = evoLink
        }
    }
    fetchPokemons(APILink);
}
//(pEData.chain.evolves_to.length === 1 && pEData.chain.evolves_to[0].evolves_to.length === 1)
async function previousEvolution(){
    let temp = await fetchPokemons(APILink);
    let temp2 = await fetchSpecies(temp)
    if(temp2.evolves_from_species){
        let evoLink = temp2.evolves_from_species.url.replace("-species", "");
        APILink =  evoLink
        fetchPokemons(evoLink);
    }
}

async function previousPokemon() {
    let temp = await fetchPokemons(APILink);
    let newId = Number(temp.id) - 1
    if (newId === 0) {
        APILink = BASEAPILINK + TOTALPOKEMON;
        fetchPokemons(APILink);
    } else {
        APILink = BASEAPILINK + newId;
        fetchPokemons(APILink);
    }
}

function displayPokemon(pData) {
    const pFrontSprite = document.querySelector("#poke-sprite");
    const pTypeOne = document.querySelector("#type1-s");
    const pTypeTwo = document.querySelector("#type2-s");
    const pWeight = document.querySelector("#weight");
    const pHeight = document.querySelector("#height");
    const pName = document.querySelector("#poke-name");
    const pId = document.querySelector("#poke-id");
    const pMoves = document.getElementsByClassName("moves");
    pFrontSprite.src = pData.sprites.front_default;
    pName.textContent = pData.name;
    pId.textContent = "#"+pData.id.toString().padStart(3, "0"); //001 - 898
    pHeight.innerHTML = `<p class ="H-W">Height: ${pData.height} Poké-units</p>`; //@todo add class/id
    pWeight.innerHTML = `<P class ="H-W">Weight: ${pData.weight} Poké-units</p>`; // => pweight = "Weight: "+pdata.weight+" poké-units

    if (pData.moves.length === 1) {
        pMoves[0].innerText = pData.moves[0].move.name;
        pMoves[1].innerText = "-"
        pMoves[2].innerText = "-"
        pMoves[3].innerText = "-"
    } else if (pData.moves.length === 0) {
        pMoves[0].innerText = "-"
        pMoves[1].innerText = "-"
        pMoves[2].innerText = "-"
        pMoves[3].innerText = "-"
    } else {
        for (let i = 0; i < pMoves.length; i++) {
            pMoves[i].innerText = pData.moves[i].move.name
        }
    }
    pTypeOne.textContent = "";
    pTypeTwo.textContent = "";
    if (pData.types.length === 1) {
        pTypeOne.textContent = pData.types[0].type.name;
    } else {
        pTypeOne.textContent = pData.types[0].type.name;
        pTypeTwo.textContent = pData.types[1].type.name;
    }
    PBYINPUT.addEventListener("keyup", (event) => {
        if (event.key === 'Enter') {
            if (PBYINPUT.value !== "") {
                let nameOrId = PBYINPUT.value;
                APILink = BASEAPILINK + nameOrId;
                fetchPokemons(APILink);
            }
        }
    });
}

function displayEvolutions(pEData) {
    const EVO_ONE = document.querySelector("#img-1");
    const EVO_TWO = document.querySelector("#img-2");
    const EVO_THREE = document.querySelector("#img-3");

    EVO_ONE.className = "hidden";
    EVO_TWO.className = "hidden";
    EVO_THREE.className = "hidden";

    if (pEData.chain.evolves_to.length === 0) {
        let linkOne = pEData.chain.species.url.replace("-species", ""); //"https://pokeapi.co/api/v2/pokemon`-species`/132/"
        fetch(linkOne)
            .then(function (response) {
                return response.json();
            }).then(function (pData) {
            EVO_ONE.src = pData.sprites.front_default;
            EVO_ONE.className = "";
        });

    } else if (pEData.chain.evolves_to.length === 1 && pEData.chain.evolves_to[0].evolves_to.length === 1) {
        let linkOne = pEData.chain.species.url.replace("-species", "");
        let linkTwo = pEData.chain.evolves_to[0].species.url.replace("-species", "");
        let linkThree = pEData.chain.evolves_to[0].evolves_to[0].species.url.replace("-species", "");

        fetch(linkOne)
            .then(function (response) {
                return response.json();
            }).then(function (pData) {
            EVO_ONE.src = pData.sprites.front_default;
            EVO_ONE.className = "";
        });
        fetch(linkTwo)
            .then(function (response){
                return response.json();
            }).then(function (pData){
            EVO_TWO.src = pData.sprites.front_default;
            EVO_TWO.className = "";
        });
        fetch(linkThree)
            .then(function (response){
                return response.json();
            }).then(function (pData){
            EVO_THREE.src = pData.sprites.front_default;
            EVO_THREE.className = "";
        });
    }else if (pEData.chain.evolves_to.length === 1){
        let linkOne = pEData.chain.species.url.replace("-species", "");
        let linkTwo = pEData.chain.evolves_to[0].species.url.replace("-species", "");
        fetch(linkOne)
            .then(function (response) {
                return response.json();
            }).then(function (pData) {
            EVO_ONE.src = pData.sprites.front_default;
            EVO_ONE.className = "";
        });
        fetch(linkTwo)
            .then(function (response){
                return response.json();
            }).then(function (pData){
            EVO_TWO.src = pData.sprites.front_default;
            EVO_TWO.className = "";
        });
    }
}

// Execution //

fetchPokemons(APILink);