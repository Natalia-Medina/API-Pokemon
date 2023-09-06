document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('pokemon-number');
    const button = document.getElementById('fetch-button');
    const container = document.getElementById('pokemon-container');

    button.addEventListener('click', () => {
        const pokemonNumber = input.value;

        if (pokemonNumber) {
            fetchPokemonData(pokemonNumber, container);
        } else {
            container.innerHTML = '<p>Por favor, ingrese un número.</p>';
        }
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const pokemonNumber = input.value;

            if (pokemonNumber) {
                fetchPokemonData(pokemonNumber, container);
            } else {
                container.innerHTML = '<p>Por favor, ingrese un número.</p>';
            }
        }
    });
});

async function fetchPokemonData(pokemonNumber, container) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);

        if (!response.ok) {
            throw new Error('No se encontró el Pokémon');
        }

        const data = await response.json();

        const pokemonCard = `
        <div class="pokemon-card">
          <h2>${data.name}</h2>
          <img src="${data.sprites.front_default}" alt="${data.name}">
          <p>Tipo principal: ${data.types[0].type.name}</p>
          <p>Altura: ${(data.height / 10).toFixed(1)} m</p>
          <p>Peso: ${(data.weight / 10).toFixed(1)} kg</p>
        </div>
      `;

        container.innerHTML = pokemonCard;
    } catch (error) {
        container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
