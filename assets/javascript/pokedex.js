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
           <button class="button_style addtofav_button" onclick="funcionClick(${pokemon.id})">add to favs</button>
       </div>
        `
    });
// botonFav = document.querySelector('.addtofav_button');
// botonFav.addEventListener('click', () => {
    
//     if(botonFav.innerText == 'remove'){
//         botonFav.innerText= '';
//         botonFav.innerText= 'add to favs';
//         botonFav.style.background = '#00b3dc';
//         botonFav.style.color = '#fff';
//         localStorage.removeItem("Favorito")
//     }else{
//         botonFav.innerText= '';
//         botonFav.innerText= 'remove';
//         botonFav.style.background = '#fff';
//         botonFav.style.color = '#00b3dc';
//         botonFav.style.border = '1px solid #00b3dc';
//         localStorage.setItem("Favorito", "guardado en favoritos")
//     }
// })
}
function funcionClick(id) {
    localStorage.setItem("Favorito", id)
        if(id.innerText == 'remove'){
        id.innerText= '';
        id.innerText= 'add to favs';
        id.style.background = '#00b3dc';
        id.style.color = '#fff';
        localStorage.removeItem("Favorito")
    }else{
        id.innerText= '';
        id.innerText= 'remove';
        id.style.background = '#fff';
        id.style.color = '#00b3dc';
        id.style.border = '1px solid #00b3dc';
        localStorage.setItem("Favorito", "guardado en favoritos")
    }
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