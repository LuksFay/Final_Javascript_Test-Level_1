// https://pokeapi.co/api/v2/pokemon


function llamarPokemon() {
    for(let pokemonId = 1; pokemonId < 152 ; pokemonId++ ){
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
         .then(res => res.json())
         .then(objetosPokemon => {
             pokeInfo()
             console.log('estos son objetos pokemon', objetosPokemon )
         })
    }
};

function pokeInfo(info){
        console.log('esto es pokeinfo', info)
}

llamarPokemon()
