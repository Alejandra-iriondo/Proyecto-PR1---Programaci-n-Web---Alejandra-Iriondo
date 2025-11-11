// 1. Creación de la clase Pokemon, que representa a un objeto Pokemon
class Pokemon {
  constructor({ id, name, description, height, weight, baseExperience, types, sprites, stats }) {

  }

  // === Getters y Setters ===
  
}

// 2. Creación de la clase PokemonList
class PokemonList {
  constructor() {

  }

  // Añadir un Pokémon a la lista
  addPokemon(pokemon) {
    
  }

  // Eliminar un Pokémon de la lista por ID
  removePokemon(pokemonId) {

  }

  // Mostrar la lista de Pokémon (nombre, tipo principal e imagen)
  showList() {

  }

  // 3. Funciones flecha

  // Añadir múltiples Pokémon a la vez
  addMultiplePokemons = (...pokemons) => {
  
};

  // Obtener Pokémon dentro de un rango de peso
  getPokemonsByWeightRange = (minWeight, maxWeight) => {

  };

  // Ordenar Pokémon por experiencia base
  sortPokemonsByBaseExperience = () => {

  };
}

// 4. Función recursiva para buscar un Pokémon por ID
function findPokemonById(pokemonList, id, index = 0) {

}

// 5. Uso de reduce para encontrar el tipo más común
function getMostCommonType(pokemonList) {

}

// 6. Uso de map y filter para obtener Pokémon fuertes por ataque
function getStrongPokemons(pokemons, minAttack) {

}


/* ====================================
   DATOS DE EJEMPLO PARA LA VALIDACIÓN
   ==================================== */

// Creamos algunos Pokémon válidos
const pikachu = new Pokemon({
  id: 25,
  name: "Pikachu",
  description: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
  height: 4,
  weight: 60,
  baseExperience: 112,
  types: ["electric"],
  sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  stats: [
    { name: "hp", value: 35 },
    { name: "attack", value: 55 },
    { name: "defense", value: 40 },
    { name: "speed", value: 90 }
  ]
});

const bulbasaur = new Pokemon({
  id: 1,
  name: "Bulbasaur",
  description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
  height: 7,
  weight: 69,
  baseExperience: 64,
  types: ["grass", "poison"],
  sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  stats: [
    { name: "hp", value: 45 },
    { name: "attack", value: 49 },
    { name: "defense", value: 49 },
    { name: "speed", value: 45 }
  ]
});

const charmander = new Pokemon({
  id: 4,
  name: "Charmander",
  description: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
  height: 6,
  weight: 85,
  baseExperience: 62,
  types: ["fire"],
  sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
  stats: [
    { name: "hp", value: 39 },
    { name: "attack", value: 52 },
    { name: "defense", value: 43 },
    { name: "speed", value: 65 }
  ]
});

/* ====================================
    EJEMPLOS DE USO Y VALIDACIÓN
    ==================================== */


// Uso de getters y setters


// Crear una lista de Pokémons


// Ejemplo 1: añadir un Pokémon


// Ejemplo 2: añadir múltiples Pokémons


// Ejemplo 3: eliminar un Pokémon


// Ejemplo 4: eliminar un Pokémon


// Ejemplo 5: mostrar la lista de Pokémons


// Ejemplo 6: obtener Pokémon por rango de peso


// Ejemplo 7: ordenar Pokémon por experiencia base


// Ejemplo 8: F. Recursiva para buscar un Pokémon por ID


// Ejemplo 9: Tipo más común


// Ejemplo 10: Pokémon fuertes por ataque
