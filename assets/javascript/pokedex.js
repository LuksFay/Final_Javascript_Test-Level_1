const espacioParaCadaPokemon = document.querySelector('#pokemon_section'),
      botonBuscar = document.querySelector('#search_bar_submit'),
      barraBusqueda = document.querySelector('.search_bar_input');

      

let arrayDePokemonEnPantalla = []

let cargando = document.createElement('p');
cargando.textContent = 'CARGANDO...';
espacioParaCadaPokemon.appendChild(cargando); 


async function llamarPokemon() {
    console.log('loading')
    for(let i = 1 ; i < 152 ; i++ ){
        const urlApi = `https://pokeapi.co/api/v2/pokemon/${i}`
        const respuestaApi = await fetch(urlApi)
        const unPokemon = await respuestaApi.json()
            arrayDePokemonEnPantalla.push({
                image: unPokemon.sprites.front_default,
                id: unPokemon.id,
                name: unPokemon.name,
                type: unPokemon.types[0].type.name
            })
    };
    console.log('load complete');
    cargando.style.display = 'none';
    representarPokemon(arrayDePokemonEnPantalla);
};
    
function representarPokemon(arrayDePokemons) {
    espacioParaCadaPokemon.innerHTML = ""

    arrayDePokemons.forEach(pokemon => {
        espacioParaCadaPokemon.innerHTML += 
        `
        <div class="pokemon_display">
            <img src="${pokemon.image}" alt="pokemon sprite" width="70px">
           <p class="pokemon_id">${pokemon.id}</p>
           <p class="pokemon_name">${pokemon.name}</p>
           <p class="pokemon_type">type:${pokemon.type}</p>
           <button class="button_style fav_button">add to favs</button>
       </div>
        `
    });
}
function funcionBuscar(){
    const value = barraBusqueda.value;
    const busquedaFiltrada = arrayDePokemonEnPantalla.filter(pokeBuscado=>{
        return pokeBuscado.name.includes(value) ||
        pokeBuscado.type.includes(value)
    });
    representarPokemon(busquedaFiltrada);
}

botonBuscar.addEventListener('click',funcionBuscar);
barraBusqueda.addEventListener('keyup', () => {
    if(barraBusqueda.value.length === 0){
        representarPokemon(arrayDePokemonEnPantalla)
    }
})
llamarPokemon()