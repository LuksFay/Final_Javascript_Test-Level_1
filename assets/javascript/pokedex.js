const espacioParaCadaPokemon = document.querySelector('#pokemon_section');

let arrayDePokemonEnPantalla = []

let cargando = document.createElement('p')
cargando.textContent = 'CARGANDO...'
espacioParaCadaPokemon.appendChild(cargando) 

async function llamarPokemon() {
    for(let i = 1 ; i < 152 ; i++ ){
        const urlApi = `https://pokeapi.co/api/v2/pokemon/${i}`
        const respuestaApi = await fetch(urlApi)
        const unPokemon = await respuestaApi.json()
            console.log('loading')
            arrayDePokemonEnPantalla.push({
                image: unPokemon.sprites.front_default,
                id: unPokemon.id,
                name: unPokemon.name,
                type: unPokemon.types[0].type.name
            })
    }
    console.log('load complete')
    cargando.style.display = 'none'
    for(let i = 0 ; i < 151 ; i++ ){
        let a = arrayDePokemonEnPantalla;
        console.log('los 150',a[i])
        a.forEach( a => {
            document.write
        });
    }   
        
    };
    

    llamarPokemon()
