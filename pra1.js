// 1. Creación de la clase Pokemon, que representa a un objeto Pokemon
class Pokemon {
  constructor({ id, name, description, height, weight, baseExperience, types, sprites, stats }) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._height = height;
    this._weight = weight;
    this._baseExperience = baseExperience;
    this._types = types || [];
    this._sprites = sprites;
    this._stats = stats || [];
  }

  // === Getters y Setters ===
  get id() { return this._id; }
  set id(v) { this._id = v; }

  get name() { return this._name; }
  set name(v) { this._name = v; }

  get description() { return this._description; }
  set description(v) { this._description = v; }

  get height() { return this._height; }
  set height(v) { this._height = v; }

  get weight() { return this._weight; }
  set weight(v) { this._weight = v; }

  get baseExperience() { return this._baseExperience; }
  set baseExperience(v) { this._baseExperience = v; }

  get types() { return this._types; }
  set types(v) { this._types = v || []; }

  get sprites() { return this._sprites; }
  set sprites(v) { this._sprites = v; }

  get stats() { return this._stats; }
  set stats(v) { this._stats = v || []; }
}

// 2. Creación de la clase PokemonList
class PokemonList {
  constructor() {
    this.list = [];
  }

  // Añadir un Pokémon a la lista
  addPokemon(pokemon) {
    this.list.push(pokemon);
  }

  // Eliminar un Pokémon de la lista por ID
  removePokemon(pokemonId) {
    this.list = this.list.filter(p => p.id !== pokemonId);
  }

  // Mostrar la lista de Pokémon (nombre, tipo principal e imagen)
  showList() {
    this.list.forEach(p => {
      const mainType = (p.types && p.types.length > 0) ? p.types[0] : "unknown";
      console.log(`${p.name} | ${mainType} | ${p.sprites}`);
    });
  }

  // 3. Funciones flecha

  // Añadir múltiples Pokémon a la vez
  addMultiplePokemons = (...pokemons) => {
    pokemons.forEach(p => this.addPokemon(p));
  };

  // Obtener Pokémon dentro de un rango de peso
  getPokemonsByWeightRange = (minWeight, maxWeight) => {
    return this.list.filter(p => p.weight >= minWeight && p.weight <= maxWeight);
  };

  // Ordenar Pokémon por experiencia base (ascendente)
  sortPokemonsByBaseExperience = () => {
    this.list.sort((a, b) => a.baseExperience - b.baseExperience);
    return this.list;
  };
}

// 4. Función recursiva para buscar un Pokémon por ID
function findPokemonById(pokemonList, id, index = 0) {
  const arr = Array.isArray(pokemonList) ? pokemonList : pokemonList.list;
  if (index >= arr.length) return null;
  if (arr[index].id === id) return arr[index];
  return findPokemonById(arr, id, index + 1);
}

// 5. Uso de reduce para encontrar el tipo más común
function getMostCommonType(pokemonList) {
  const arr = Array.isArray(pokemonList) ? pokemonList : pokemonList.list;
  const typeCount = arr.reduce((acc, p) => {
    (p.types || []).forEach(t => {
      acc[t] = (acc[t] || 0) + 1;
    });
    return acc;
  }, {});

  let mostType = null;
  let max = -1;
  for (const t in typeCount) {
    if (typeCount[t] > max) {
      max = typeCount[t];
      mostType = t;
    }
  }
  return mostType; // string con el tipo más común (o null si no hay)
}

// 6. Uso de map y filter para obtener Pokémon fuertes por ataque
function getStrongPokemons(pokemons, minAttack) {
  return pokemons.filter(p => {
    const attackObj = (p.stats || []).find(s => s.name === "attack");
    return attackObj && attackObj.value >= minAttack;
  });
}

// ======================================
// 7) Helpers para cargar desde PokéAPI
// ======================================

// Mapea el JSON de /pokemon a nuestro constructor Pokemon
function mapPokemonAPItoModel(data, descriptionText = "") {
  return new Pokemon({
    id: data.id,
    name: data.name,
    description: descriptionText, // opcional desde species
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
    types: (data.types || []).map(t => t.type.name),
    sprites: data.sprites?.other?.["official-artwork"]?.front_default || data.sprites?.front_default || "",
    stats: (data.stats || []).map(s => ({ name: s.stat.name, value: s.base_stat }))
  });
}

// Obtiene una descripción (si existe) desde /pokemon-species/{id} en el idioma indicado
async function fetchSpeciesDescription(id, lang = "es") {
  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    if (!resp.ok) return "";
    const species = await resp.json();
    const entry =
      species.flavor_text_entries.find(e => e.language?.name === lang) ||
      species.flavor_text_entries.find(e => e.language?.name === "en");
    return entry ? entry.flavor_text.replace(/\s+/g, " ").trim() : "";
  } catch {
    return "";
  }
}

// Carga un Pokémon por nombre o id desde PokéAPI y devuelve una instancia de nuestra clase
async function loadPokemonFromAPI(nameOrId, lang = "es") {
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  if (!resp.ok) throw new Error(`No se encontró el Pokémon: ${nameOrId}`);
  const data = await resp.json();
  const description = await fetchSpeciesDescription(data.id, lang);
  return mapPokemonAPItoModel(data, description);
}

// Carga varios por nombre/id
async function loadManyPokemonsFromAPI(namesOrIds, lang = "es") {
  const results = [];
  for (const n of namesOrIds) {
    try {
      const p = await loadPokemonFromAPI(n, lang);
      results.push(p);
    } catch (e) {
      console.warn(`No se pudo cargar ${n}:`, e.message);
    }
  }
  return results;
}

// ==================================================
// 8) Demo: cargar desde API y usar con PokemonList
// ==================================================
(async () => {
  const toLoad = ["pikachu", "bulbasaur", "charmander"];
  const loaded = await loadManyPokemonsFromAPI(toLoad, "es");

  const apiList = new PokemonList();
  apiList.addMultiplePokemons(...loaded);

  console.log("=== LISTA DESDE API ===");
  apiList.showList();

  const found = findPokemonById(apiList, 25);
  console.log("Encontrado ID 25:", found?.name);
})(); // <-- cierro IIFE 

/* ====================================
   DATOS DE EJEMPLO PARA LA VALIDACIÓN
   ==================================== */

// Creamos algunos Pokémon válidos (mock)
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
pikachu.name = "Pikachu (Ash)";
console.log(pikachu.name);

// Crear una lista de Pokémons
const list = new PokemonList();

// Ejemplo 1: añadir un Pokémon
list.addPokemon(pikachu);

// Ejemplo 2: añadir múltiples Pokémons
list.addMultiplePokemons(bulbasaur, charmander);

// Ejemplo 3: eliminar un Pokémon inexistente
list.removePokemon(999);

// Ejemplo 4: eliminar un Pokémon existente
list.removePokemon(4); // elimina a Charmander

// Volver a añadir Charmander para seguir con los ejemplos
list.addPokemon(charmander);

// Ejemplo 5: mostrar la lista de Pokémons
list.showList();

// Ejemplo 6: obtener Pokémon por rango de peso
console.log("Peso 60-80:", list.getPokemonsByWeightRange(60, 80).map(p => p.name));

// Ejemplo 7: ordenar Pokémon por experiencia base
list.sortPokemonsByBaseExperience();
console.log("Orden por baseExperience:", list.list.map(p => `${p.name}(${p.baseExperience})`));

// Ejemplo 8: función recursiva para buscar un Pokémon por ID
console.log("Buscar ID 1:", findPokemonById(list, 1)?.name);

// Ejemplo 9: tipo más común
console.log("Tipo más común:", getMostCommonType(list));

// Ejemplo 10: Pokémon fuertes por ataque (>= 53)
console.log("Fuertes (attack >= 53):", getStrongPokemons(list.list, 53).map(p => p.name));
