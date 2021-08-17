const espacioParaCadaPokemon = document.querySelector('#pokemon_section'),
      botonBuscar = document.querySelector('#search_bar_submit'),
      barraBusqueda = document.querySelector('.search_bar_input');

      

let arrayDePokemonEnPantalla = [];
let cargando = document.createElement('p');
cargando.textContent = 'CARGANDO...';
espacioParaCadaPokemon.appendChild(cargando); 


async function llamarPokemon() {
    
    
    for(let i = 1 ; i < 152 ; i++ ){
        console.log('loading',[i]);
        const urlApi = `https://pokeapi.co/api/v2/pokemon/${i}`;
        const respuestaApi = await fetch(urlApi);
        const unPokemon = await respuestaApi.json();
            arrayDePokemonEnPantalla.push({
                image: unPokemon.sprites.front_default,
                id: unPokemon.id,
                name: unPokemon.name,
                type: unPokemon.types[0].type.name,
                favorito: false
            });
    };
    console.log('load complete');
    cargando.style.display = 'none';
    marcarFavoritos(arrayDePokemonEnPantalla);
    representarPokemon(arrayDePokemonEnPantalla);
};

function representarPokemon(arrayDePokemons) {
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
};

function funcionStorage(id){
    let newArray = arrayDePokemonEnPantalla.map(unPokemon => {
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
    representarPokemon(newArray);
    localStorage.setItem("pokemonFav", JSON.stringify(filtrados));

};
function marcarFavoritos(array){
    let pokeFavLS = JSON.parse(localStorage.getItem('pokemonFav'));
    if(pokeFavLS === null){
        console.log('Ningun Pokemon esta en la lista de favoritos')
    }else{
        // pokeFavLS.forEach(element => {
        //     arrayDePokemonEnPantalla.map(()=>{
        //         if(pokeFavLS.id === array.id){
        //             unPokemon.favorito = !unPokemon.favorito;
        //         }else{
        //             console.log('?');
        //         }
        //     })
        // });
        representarPokemon(pokeFavLS)
    }
    console.log(pokeFavLS)
};

function funcionBuscar(){
    const value = barraBusqueda.value;
    const busquedaFiltrada = arrayDePokemonEnPantalla.filter(pokeBuscado=>{
        return pokeBuscado.name.includes(value) ||
        pokeBuscado.type.includes(value)
    });
    representarPokemon(busquedaFiltrada);
};


botonBuscar.addEventListener('click',funcionBuscar);

barraBusqueda.addEventListener('keyup', () => {
    if(barraBusqueda.value.length === 0){
        representarPokemon(arrayDePokemonEnPantalla)
    };
});

llamarPokemon();