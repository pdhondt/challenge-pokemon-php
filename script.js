async function fetchPokemon(name_id_value) {
    let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + name_id_value);
    let result = await data.json();
    return result;
}

async function fetchPreviousEvolution(species_link) {
    let data = await fetch(species_link);
    let result = await data.json();
    return result;
}

async function fetchPreviousEvolutionImage(prev_evo_value) {
    let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + prev_evo_value);
    let result = await data.json();
    return result;
}

async function fetchEvolutionChain(evo_chain_link_value) {
    let data = await fetch(evo_chain_link_value);
    let result = await data.json();
    return result;
}

document.querySelector("#id_search").addEventListener("click", async () => {

    let pok_name_id = document.getElementById("pokemon_id").value;

    let pokemon = await fetchPokemon(pok_name_id);

    let moves_arr = pokemon.moves;
    if (moves_arr.length >= 4) {
        let moves = pokemon.moves.slice(0, 4);
        console.log(moves);
        moves.forEach((move) => {
            console.log(move.move.name);
        })
    } else {
        let move = moves_arr[0].move.name;
        console.log(move);
    }

    console.log(pokemon.id);
    console.log(pokemon);
    console.log(pokemon.sprites.front_default);
    console.log(pokemon.species.url);

    let species = await fetchPreviousEvolution(pokemon.species.url);
    console.log(species);

    if (species.evolves_from_species !== null) {
        let prev_evo_name = species.evolves_from_species.name;
        console.log(prev_evo_name);
        let prev_evo = await fetchPreviousEvolutionImage(prev_evo_name);
        let prev_evo_image = prev_evo.sprites.front_default;
        console.log(prev_evo_image);
        let evo_chain_link = species.evolution_chain.url;
        console.log(evo_chain_link);
        let evo_chain = await fetchEvolutionChain(evo_chain_link);
        let evolves_to = evo_chain.chain.evolves_to
        console.log(evolves_to);
        evolves_to.forEach( (evo_item) => {
            let evolutions = evo_item.evolves_to;
            console.log(evolutions);
            evolutions.forEach( (evo_species_item) => {
                console.log(evo_species_item.species.name);
            })
        })
    } else {
        let evo_chain_link = species.evolution_chain.url;
        console.log(evo_chain_link);
        let evo_chain = await fetchEvolutionChain(evo_chain_link);
        let evolves_to = evo_chain.chain.evolves_to
        console.log(evolves_to);
        evolves_to.forEach( (evo_item) => {
            let evolutions = evo_item.evolves_to;
            console.log(evolutions);
            evolutions.forEach( (evo_species_item) => {
                console.log(evo_species_item.species.name);
            })
        })
    }
})


/* async function evoChain() {
    let evo_chain_link = species.evolution_chain.url;
    console.log(evo_chain_link);
    let evo_chain = await fetchEvolutionChain(evo_chain_link);
    let evolves_to = evo_chain.chain.evolves_to
    console.log(evolves_to);
    evolves_to.forEach( (evo_item) => {
        let evolutions = evo_item.evolves_to;
        console.log(evolutions);
        evolutions.forEach( (evo_species_item) => {
            console.log(evo_species_item.species.name);
        })
    })
} */

/*
            let evo_chain_link = species.evolution_chain.url;
            console.log(evo_chain_link);
        }
    async function fetchEvolutionChain() {
        let data = await fetch(evo_chain_link);
        let evo_chain = await data.json();
        console.log(evo_chain);
        let evolves_to = evo_chain.chain.evolves_to
        console.log(evolves_to);
        evolves_to.forEach( (evo_item) => {
            let evolutions = evo_item.evolves_to;
            console.log(evolutions);
            evolutions.forEach( (evo_species_item) => {
                console.log(evo_species_item.species.name);
            })
        })
        fetchEvolutionChain();
    }
    fetchPreviousEvolutionImage();
}
fetchPreviousEvolution();
})
*/
/*
document.querySelector("#name_search").addEventListener("click", () => {
    let pok_name = document.getElementById("pokemon_name").value;
    console.log(pok_name);
    async function fetchPokemonByName() {
        let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + pok_name);
        let pokemon = await data.json();
        let moves = pokemon.moves.slice(0, 4);
        console.log(moves);
        moves.forEach( (move) => {
            console.log(move.move.name);
        })
        let species = pokemon.species.url;
        console.log(pokemon.id);
        console.log(pokemon);
        console.log(pokemon.sprites.front_default);
        console.log(species);
        async function fetchPreviousEvolution() {
            let data = await fetch(pokemon.species.url);
            let species = await data.json();
            console.log(species);
            let prev_evo = species.evolves_from_species.name;
            console.log(prev_evo);
            async function fetchPreviousEvolutionImage() {
                let data = await fetch("https://pokeapi.co/api/v2/pokemon/" + prev_evo);
                let prev_pokemon = await data.json();
                let prev_evo_image = prev_pokemon.sprites.front_default;
                console.log(prev_evo_image);
            }
            fetchPreviousEvolutionImage();
        }
        fetchPreviousEvolution();
    }
    fetchPokemonByName();
})
*/