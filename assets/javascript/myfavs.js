const espacioParaCadaPokemon = document.querySelector('#pokemon_section');
let pokeFav = JSON.parse(localStorage.getItem('pokemonFav'));


function llamarPokemonFavs(){
    console.log(pokeFav)
    representarPokemonFavs(pokeFav);
}

function representarPokemonFavs(arrayDePokemons){
    espacioParaCadaPokemon.innerHTML = "";

    arrayDePokemons.forEach(pokemon => {
        espacioParaCadaPokemon.innerHTML += 
        `
        <div class="pokemon_display">
            <img src="${pokemon.image}" alt="pokemon sprite" width="70px">
           <p class="pokemon_id">${pokemon.id}</p>
           <p class="pokemon_name">${pokemon.name}</p>
           <p class="pokemon_type">type:${pokemon.type}</p>
           <button class="button_style addtofav_button ${pokemon.favorito ? 'remove' : ''}" onclick="funcionStorage(${pokemon.id})">${pokemon.favorito ? 'remove' : 'add to favs'}</button>
       </div>
        `
    });
}
function funcionStorage(id){
    let newArray = pokeFav.map(unPokemon => {
        if(unPokemon.id === id){
            unPokemon.favorito = !unPokemon.favorito
            return unPokemon
        }else{
            return unPokemon
        }
    });
    let filtrados = newArray.filter(unPokemon =>
        unPokemon.favorito === true
    );
    localStorage.setItem("pokemonFav", JSON.stringify(filtrados));
    representarPokemonFavs(filtrados);

};

llamarPokemonFavs()