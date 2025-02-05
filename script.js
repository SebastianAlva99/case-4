document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const homeView = document.getElementById('home');
    const searchResultsView = document.getElementById('search-results');
    const resultsContainer = document.getElementById('results-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Show home view by default
    showView(homeView);

    // Handle navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);
            const view = document.getElementById(target);
            showView(view);
        });
    });

    // Handle search form submission
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        if (query) {
            try {
                const pokemon = await fetchPokemon(query);
                displayPokemon(pokemon);
                showView(searchResultsView);
            } catch (error) {
                alert('Pokémon not found!');
            }
        }
    });

    // Function to fetch Pokémon data
    async function fetchPokemon(query) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        return response.json();
    }

    // Function to display Pokémon data
    function displayPokemon(pokemon) {
        resultsContainer.innerHTML = `
            <div class="pokemon-card">
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                <p>Height: ${pokemon.height / 10}m</p>
                <p>Weight: ${pokemon.weight / 10}kg</p>
            </div>
        `;
    }

    // Function to show a specific view
    function showView(view) {
        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        view.classList.remove('hidden');
    }
});