const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecords = 150
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
        </div>
    </li>
    `
}

function loadPokemonItens(offset=0, limit=20){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    })        
}

loadPokemonItens(offset, limit)

// pokeApi.getPokemons().then((pokemons = []) => {
//     pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join('')
// })    

loadMoreButton.addEventListener('click', () => {
    offset += limit

    console.log(offset)

    if (offset + limit >= maxRecords) {
        loadPokemonItens(offset, offset + limit - maxRecords)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } 
    else {
        loadPokemonItens(offset, limit)
    }

})