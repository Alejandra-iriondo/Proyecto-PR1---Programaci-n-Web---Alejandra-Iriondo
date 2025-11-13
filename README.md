# Proyecto PR1 - Programación Web - Alejandra Iriondo

GESTIÓN DE POKÉMON UTILIZANDO PokéAPI

Este proyecto es parte de la asignatura de Programación Web de la UOC. 

Este proyecto forma parte de la PEC1 de Programación Web y consiste en implementar un sistema capaz de buscar, gestionar y manipular información de Pokémon, utilizando:

Programación Orientada a Objetos (POO)

- Clases, getters, setters y métodos estáticos

- Funciones flecha

- Recursividad

- map, filter, reduce

-Fetch API para acceder a PokéAPI

El objetivo es crear una aplicación que pueda cargar Pokémon desde la API oficial, almacenarlos en una lista, filtrarlos, ordenarlos y mostrar diferentes estadísticas.

## Técnologías utilizadas
- JavaScript ES6+

- PokéAPI (https://pokeapi.co/)

- HTML para cargar el script en el navegador

- Consola del navegador (Chrome, Firefox, Edge)

## Estructura del Proyecto

El proyecto contiene los siguientes archivos:

- `pra1.js`: Archivo principal que contiene la lógica del código completo.
- `README.md`: Archivo con explicaciones.


## Objetivos del Proyecto
1. Clase Pokemon
Representa un Pokémon con propiedades como:

- id

- name

- description

- height / weight

- baseExperience

- types

- sprites

- stats

Incluye:

- getters y setters

- modelos compatibles con PokéAPI


2. Clase PokemonList

- Permite gestionar varios Pokémon:

- añadir Pokémon

- eliminar Pokémon por ID

- mostrar lista básica

- añadir múltiples Pokémon (rest + arrow function)

- obtener Pokémon por rango de peso

- ordenar por experiencia base

4. Función recursiva

findPokemonById()

Permite buscar un Pokémon dentro de la lista sin usar bucles tradicionales.

6. Uso de reduce
   
getMostCommonType()

Devuelve el tipo más repetido entre todos los Pokémon.

8. Pokémon fuertes por ataque

getStrongPokemons() usando filter + map

9. Conexión con PokéAPI

Funcionalidades añadidas:

- Cargar un Pokémon por nombre o ID usando fetch()

- Obtener información adicional desde /pokemon-species/

- Cargar varios Pokémon y añadirlos a la lista

Código principal:

loadPokemonFromAPI("pikachu")

loadManyPokemonsFromAPI(["pikachu", "bulbasaur", "charmander"])

## Ejemplo de salida en consola

1.Pokémon añadidos

Pikachu (Ash)

Bulbasaur

Charmander

2.Orden por experiencia base

Charmander(62), Bulbasaur(64), Pikachu (Ash)(112)

3.Tipo más común

fire

4.Pokémon fuertes por ataque

["Pikachu (Ash)"]

5.Carga desde PokéAPI

=== LISTA DESDE API ===

pikachu | electric | https://raw.githubusercontent.com/...

bulbasaur | grass | https://raw.githubusercontent.com/...

charmander | fire | https://raw.githubusercontent.com/...

Encontrado ID 25: pikachu

## Conclusiones
Este proyecto implementa todos los conceptos fundamentales de la asignatura:

Clases y POO

- Funciones flecha y rest/spread

- Recursión

- Manipulación avanzada de arrays

- JSON + Fetch API

Y además integra PokéAPI para trabajar con datos reales.

## Autores

- Alejandra Iriondo palacios

