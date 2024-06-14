export interface PokemonData {
    Name: string;
    BattlerPlayerX: number;
    BattlerPlayerY: number;
    BattlerEnemyX: number;
    BattlerEnemyY: number;
    BattlerShadowX: number;
    BattlerShadowSize: number;
    BattlerAltitude?: number;
}
export const pokemonIdToDataMap: Record<string,PokemonData> = {
  "1": {
    "Name": "Bulbasaur",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 23,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 25,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "2": {
    "Name": "Ivysaur",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "3": {
    "Name": "Venusaur",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "4": {
    "Name": "Charmander",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "5": {
    "Name": "Charmeleon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 12,
    "BattlerShadowX": -3,
    "BattlerShadowSize": 2
  },
  "6": {
    "Name": "Charizard",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "7": {
    "Name": "Squirtle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 18,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 1
  },
  "8": {
    "Name": "Wartortle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "9": {
    "Name": "Blastoise",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "10": {
    "Name": "Caterpie",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "11": {
    "Name": "Metapod",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 18,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 33,
    "BattlerAltitude": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "12": {
    "Name": "Butterfree",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "13": {
    "Name": "Weedle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "14": {
    "Name": "Kakuna",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 30,
    "BattlerAltitude": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "15": {
    "Name": "Beedrill",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerAltitude": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "16": {
    "Name": "Pidgey",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "17": {
    "Name": "Pidgeotto",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerAltitude": 30,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "18": {
    "Name": "Pidgeot",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 7,
    "BattlerEnemyY": 8,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 3
  },
  "19": {
    "Name": "Rattata",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 23,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 27,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "20": {
    "Name": "Raticate",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 2
  },
  "21": {
    "Name": "Spearow",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 21,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 22,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 1
  },
  "22": {
    "Name": "Fearow",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -2,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "23": {
    "Name": "Ekans",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "24": {
    "Name": "Arbok",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "25": {
    "Name": "Pikachu",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "26": {
    "Name": "Raichu",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "27": {
    "Name": "Sandshrew",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 24,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 23,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 1
  },
  "28": {
    "Name": "Sandslash",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "29": {
    "Name": "Nidoran",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 18,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "30": {
    "Name": "Nidorina",
    "BattlerPlayerX": 5,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 2
  },
  "31": {
    "Name": "Nidoqueen",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "32": {
    "Name": "Nidoran",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 24,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "33": {
    "Name": "Nidorino",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "34": {
    "Name": "Nidoking",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "35": {
    "Name": "Clefairy",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "36": {
    "Name": "Clefable",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "37": {
    "Name": "Vulpix",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "38": {
    "Name": "Ninetales",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "39": {
    "Name": "Jigglypuff",
    "BattlerPlayerX": 2,
    "BattlerPlayerY": 22,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 23,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 1
  },
  "40": {
    "Name": "Wigglytuff",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "41": {
    "Name": "Zubat",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -16,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerAltitude": 30,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "42": {
    "Name": "Golbat",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerAltitude": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "43": {
    "Name": "Oddish",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "44": {
    "Name": "Gloom",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "45": {
    "Name": "Vileplume",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "46": {
    "Name": "Paras",
    "BattlerPlayerX": -1,
    "BattlerPlayerY": 27,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 29,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "47": {
    "Name": "Parasect",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "48": {
    "Name": "Venonat",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "49": {
    "Name": "Venomoth",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -16,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "50": {
    "Name": "Diglett",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 29,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 30,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "51": {
    "Name": "Dugtrio",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 21,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "52": {
    "Name": "Meowth",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "53": {
    "Name": "Persian",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 3
  },
  "54": {
    "Name": "Psyduck",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "55": {
    "Name": "Golduck",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "56": {
    "Name": "Mankey",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 2
  },
  "57": {
    "Name": "Primeape",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "58": {
    "Name": "Growlithe",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 19,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "59": {
    "Name": "Arcanine",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "60": {
    "Name": "Poliwag",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 17,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 1
  },
  "61": {
    "Name": "Poliwhirl",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "62": {
    "Name": "Poliwrath",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "63": {
    "Name": "Abra",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 18,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 2
  },
  "64": {
    "Name": "Kadabra",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "65": {
    "Name": "Alakazam",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "66": {
    "Name": "Machop",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "67": {
    "Name": "Machoke",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "68": {
    "Name": "Machamp",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "69": {
    "Name": "Bellsprout",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 22,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 23,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "70": {
    "Name": "Weepinbell",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 20,
    "BattlerAltitude": 10,
    "BattlerShadowX": -4,
    "BattlerShadowSize": 2
  },
  "71": {
    "Name": "Victreebel",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerAltitude": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "72": {
    "Name": "Tentacool",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 7,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "73": {
    "Name": "Tentacruel",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 5,
    "BattlerAltitude": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "74": {
    "Name": "Geodude",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 26,
    "BattlerAltitude": 16,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 1
  },
  "75": {
    "Name": "Graveler",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "76": {
    "Name": "Golem",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 10,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 3
  },
  "77": {
    "Name": "Ponyta",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "78": {
    "Name": "Rapidash",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "79": {
    "Name": "Slowpoke",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "80": {
    "Name": "Slowbro",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 8,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 3
  },
  "81": {
    "Name": "Magnemite",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerAltitude": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "82": {
    "Name": "Magneton",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "83": {
    "Name": "Farfetch'd",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 15,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 2
  },
  "84": {
    "Name": "Doduo",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 2
  },
  "85": {
    "Name": "Dodrio",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "86": {
    "Name": "Seel",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 2
  },
  "87": {
    "Name": "Dewgong",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 9,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 3
  },
  "88": {
    "Name": "Grimer",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 24,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 3
  },
  "89": {
    "Name": "Muk",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 5
  },
  "90": {
    "Name": "Shellder",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 25,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 25,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "91": {
    "Name": "Cloyster",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "92": {
    "Name": "Gastly",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 5,
    "BattlerAltitude": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "93": {
    "Name": "Haunter",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerAltitude": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "94": {
    "Name": "Gengar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "95": {
    "Name": "Onix",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 3
  },
  "96": {
    "Name": "Drowzee",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "97": {
    "Name": "Hypno",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "98": {
    "Name": "Krabby",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 24,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 23,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "99": {
    "Name": "Kingler",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "100": {
    "Name": "Voltorb",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 23,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "101": {
    "Name": "Electrode",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "102": {
    "Name": "Exeggcute",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 26,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 23,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "103": {
    "Name": "Exeggutor",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "104": {
    "Name": "Cubone",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 21,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "105": {
    "Name": "Marowak",
    "BattlerPlayerX": 5,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 5,
    "BattlerShadowSize": 2
  },
  "106": {
    "Name": "Hitmonlee",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -2,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "107": {
    "Name": "Hitmonchan",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "108": {
    "Name": "Lickitung",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "109": {
    "Name": "Koffing",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 14,
    "BattlerAltitude": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "110": {
    "Name": "Weezing",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "111": {
    "Name": "Rhyhorn",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "112": {
    "Name": "Rhydon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 3,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "113": {
    "Name": "Chansey",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "114": {
    "Name": "Tangela",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "115": {
    "Name": "Kangaskhan",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "116": {
    "Name": "Horsea",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 24,
    "BattlerAltitude": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "117": {
    "Name": "Seadra",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 9,
    "BattlerAltitude": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "118": {
    "Name": "Goldeen",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 17,
    "BattlerAltitude": 11,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "119": {
    "Name": "Seaking",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerAltitude": 10,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 2
  },
  "120": {
    "Name": "Staryu",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerAltitude": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "121": {
    "Name": "Starmie",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerAltitude": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "122": {
    "Name": "Mr. Mime",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "123": {
    "Name": "Scyther",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "124": {
    "Name": "Jynx",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "125": {
    "Name": "Electabuzz",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "126": {
    "Name": "Magmar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "127": {
    "Name": "Pinsir",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 13,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "128": {
    "Name": "Tauros",
    "BattlerPlayerX": 1,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": -7,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 4,
    "BattlerShadowSize": 3
  },
  "129": {
    "Name": "Magikarp",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "130": {
    "Name": "Gyarados",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 2,
    "BattlerAltitude": 2,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 3
  },
  "131": {
    "Name": "Lapras",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "132": {
    "Name": "Ditto",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 30,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 28,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "133": {
    "Name": "Eevee",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 20,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 1
  },
  "134": {
    "Name": "Vaporeon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 16,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "135": {
    "Name": "Jolteon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 2
  },
  "136": {
    "Name": "Flareon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "137": {
    "Name": "Porygon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "138": {
    "Name": "Omanyte",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 24,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 23,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "139": {
    "Name": "Omastar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "140": {
    "Name": "Kabuto",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "141": {
    "Name": "Kabutops",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": -5,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 3
  },
  "142": {
    "Name": "Aerodactyl",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -19,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "143": {
    "Name": "Snorlax",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": -4,
    "BattlerEnemyY": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "144": {
    "Name": "Articuno",
    "BattlerPlayerX": -3,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 9,
    "BattlerEnemyY": 2,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 3
  },
  "145": {
    "Name": "Zapdos",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 1,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "146": {
    "Name": "Moltres",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": -8,
    "BattlerShadowX": -4,
    "BattlerShadowSize": 2
  },
  "147": {
    "Name": "Dratini",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "148": {
    "Name": "Dragonair",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "149": {
    "Name": "Dragonite",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 3,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 4
  },
  "150": {
    "Name": "Mewtwo",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -3,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "151": {
    "Name": "Mew",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerAltitude": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "152": {
    "Name": "Chikorita",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "153": {
    "Name": "Bayleef",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 2
  },
  "154": {
    "Name": "Meganium",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 1,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 3
  },
  "155": {
    "Name": "Cyndaquil",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 20,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 1
  },
  "156": {
    "Name": "Quilava",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "157": {
    "Name": "Typhlosion",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "158": {
    "Name": "Totodile",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 21,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "159": {
    "Name": "Croconaw",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 7,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 12,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 2
  },
  "160": {
    "Name": "Feraligatr",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -2,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "161": {
    "Name": "Sentret",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "162": {
    "Name": "Furret",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "163": {
    "Name": "Hoothoot",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 18,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 1
  },
  "164": {
    "Name": "Noctowl",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 11,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 2
  },
  "165": {
    "Name": "Ledyba",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -1,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "166": {
    "Name": "Ledian",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -12,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -2,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "167": {
    "Name": "Spinarak",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 32,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "168": {
    "Name": "Ariados",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 21,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 23,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "169": {
    "Name": "Crobat",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -10,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 8,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "170": {
    "Name": "Chinchou",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "171": {
    "Name": "Lanturn",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 10,
    "BattlerAltitude": 11,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 2
  },
  "172": {
    "Name": "Pichu",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 23,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "173": {
    "Name": "Cleffa",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 27,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "174": {
    "Name": "Igglybuff",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 19,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 1
  },
  "175": {
    "Name": "Togepi",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 25,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 26,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "176": {
    "Name": "Togetic",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerAltitude": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "177": {
    "Name": "Natu",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 22,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 25,
    "BattlerShadowX": -3,
    "BattlerShadowSize": 1
  },
  "178": {
    "Name": "Xatu",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 13,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 2
  },
  "179": {
    "Name": "Mareep",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "180": {
    "Name": "Flaaffy",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 15,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 2
  },
  "181": {
    "Name": "Ampharos",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "182": {
    "Name": "Bellossom",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 23,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "183": {
    "Name": "Marill",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 23,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 22,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 1
  },
  "184": {
    "Name": "Azumarill",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 13,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 3
  },
  "185": {
    "Name": "Sudowoodo",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "186": {
    "Name": "Politoed",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 20,
    "BattlerAltitude": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "187": {
    "Name": "Hoppip",
    "BattlerPlayerX": -1,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": -2,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 1
  },
  "188": {
    "Name": "Skiploom",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "189": {
    "Name": "Jumpluff",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 15,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "190": {
    "Name": "Aipom",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "191": {
    "Name": "Sunkern",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "192": {
    "Name": "Sunflora",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 2
  },
  "193": {
    "Name": "Yanma",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "194": {
    "Name": "Wooper",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 20,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "195": {
    "Name": "Quagsire",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "196": {
    "Name": "Espeon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "197": {
    "Name": "Umbreon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "198": {
    "Name": "Murkrow",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 40,
    "BattlerAltitude": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "199": {
    "Name": "Slowking",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 7,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 3
  },
  "200": {
    "Name": "Misdreavus",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerAltitude": 27,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "201": {
    "Name": "Unown",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 25,
    "BattlerAltitude": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "202": {
    "Name": "Wobbuffet",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "203": {
    "Name": "Girafarig",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "204": {
    "Name": "Pineco",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 22,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "205": {
    "Name": "Forretress",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 9,
    "BattlerAltitude": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "206": {
    "Name": "Dunsparce",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 23,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "207": {
    "Name": "Gligar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 9,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "208": {
    "Name": "Steelix",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "209": {
    "Name": "Snubbull",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "210": {
    "Name": "Granbull",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "211": {
    "Name": "Qwilfish",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerAltitude": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "212": {
    "Name": "Scizor",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 3
  },
  "213": {
    "Name": "Shuckle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "214": {
    "Name": "Heracross",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 2
  },
  "215": {
    "Name": "Sneasel",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 16,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "216": {
    "Name": "Teddiursa",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 19,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "217": {
    "Name": "Ursaring",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 3
  },
  "218": {
    "Name": "Slugma",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 4,
    "BattlerShadowSize": 2
  },
  "219": {
    "Name": "Magcargo",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "220": {
    "Name": "Swinub",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 28,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 27,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "221": {
    "Name": "Piloswine",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "222": {
    "Name": "Corsola",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 22,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "223": {
    "Name": "Remoraid",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 24,
    "BattlerAltitude": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "224": {
    "Name": "Octillery",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "225": {
    "Name": "Delibird",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "226": {
    "Name": "Mantine",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "227": {
    "Name": "Skarmory",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "228": {
    "Name": "Houndour",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 2
  },
  "229": {
    "Name": "Houndoom",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 10,
    "BattlerShadowX": -3,
    "BattlerShadowSize": 3
  },
  "230": {
    "Name": "Kingdra",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 10,
    "BattlerAltitude": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "231": {
    "Name": "Phanpy",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 24,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 23,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "232": {
    "Name": "Donphan",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": -4,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 3
  },
  "233": {
    "Name": "Porygon2",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 19,
    "BattlerAltitude": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "234": {
    "Name": "Stantler",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -3,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "235": {
    "Name": "Smeargle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 2
  },
  "236": {
    "Name": "Tyrogue",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "237": {
    "Name": "Hitmontop",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "238": {
    "Name": "Smoochum",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 20,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "239": {
    "Name": "Elekid",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 19,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "240": {
    "Name": "Magby",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 22,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "241": {
    "Name": "Miltank",
    "BattlerPlayerX": -2,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 17,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 2
  },
  "242": {
    "Name": "Blissey",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "243": {
    "Name": "Raikou",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "244": {
    "Name": "Entei",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "245": {
    "Name": "Suicune",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "246": {
    "Name": "Larvitar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "247": {
    "Name": "Pupitar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 24,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "248": {
    "Name": "Tyranitar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -2,
    "BattlerEnemyX": 8,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "249": {
    "Name": "Lugia",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerAltitude": 26,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "250": {
    "Name": "Ho-Oh",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerAltitude": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "251": {
    "Name": "Celebi",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerAltitude": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "252": {
    "Name": "Azurill",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 20,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "253": {
    "Name": "Wynaut",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "254": {
    "Name": "Ambipom",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": 20,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "255": {
    "Name": "Mismagius",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 26,
    "BattlerAltitude": 28,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "256": {
    "Name": "Honchkrow",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 14,
    "BattlerShadowX": -1,
    "BattlerShadowSize": 3
  },
  "257": {
    "Name": "Bonsly",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "258": {
    "Name": "Mime Jr.",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "259": {
    "Name": "Happiny",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "260": {
    "Name": "Munchlax",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "261": {
    "Name": "Mantyke",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerAltitude": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "262": {
    "Name": "Weavile",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 2
  },
  "263": {
    "Name": "Magnezone",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 40,
    "BattlerAltitude": 45,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "264": {
    "Name": "Lickilicky",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "265": {
    "Name": "Rhyperior",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 23,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "266": {
    "Name": "Tangrowth",
    "BattlerPlayerX": 1,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "267": {
    "Name": "Electivire",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "268": {
    "Name": "Magmortar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "269": {
    "Name": "Togekiss",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerAltitude": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "270": {
    "Name": "Yanmega",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerAltitude": 30,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "271": {
    "Name": "Leafeon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "272": {
    "Name": "Glaceon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 7,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 26,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "273": {
    "Name": "Gliscor",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "274": {
    "Name": "Mamoswine",
    "BattlerPlayerX": 3,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": -5,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 5,
    "BattlerShadowSize": 5
  },
  "275": {
    "Name": "Porygon-Z",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "276": {
    "Name": "Treecko",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "277": {
    "Name": "Grovyle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerAltitude": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "278": {
    "Name": "Sceptile",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "279": {
    "Name": "Torchic",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "280": {
    "Name": "Combusken",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "281": {
    "Name": "Blaziken",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": -4,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "282": {
    "Name": "Mudkip",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "283": {
    "Name": "Marshtomp",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "284": {
    "Name": "Swampert",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "285": {
    "Name": "Ralts",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 21,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "286": {
    "Name": "Kirlia",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "287": {
    "Name": "Gardevoir",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -2,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "288": {
    "Name": "Gallade",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "289": {
    "Name": "Shedinja",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerAltitude": 23,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "290": {
    "Name": "Kecleon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "291": {
    "Name": "Beldum",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerAltitude": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "292": {
    "Name": "Metang",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 23,
    "BattlerAltitude": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "293": {
    "Name": "Metagross",
    "BattlerPlayerX": -2,
    "BattlerPlayerY": 26,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "294": {
    "Name": "Bidoof",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 20,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "295": {
    "Name": "Spiritomb",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 28,
    "BattlerAltitude": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "296": {
    "Name": "Lucario",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "297": {
    "Name": "Gible",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "298": {
    "Name": "Gabite",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "299": {
    "Name": "Garchomp",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "300": {
    "Name": "Mawile",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 2
  },
  "301": {
    "Name": "Lileep",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "302": {
    "Name": "Cradily",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": -5,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "303": {
    "Name": "Anorith",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "304": {
    "Name": "Armaldo",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "305": {
    "Name": "Cranidos",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "306": {
    "Name": "Rampardos",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "307": {
    "Name": "Shieldon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 18,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "308": {
    "Name": "Bastiodon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "309": {
    "Name": "Slaking",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "310": {
    "Name": "Absol",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "311": {
    "Name": "Duskull",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -15,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerAltitude": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "312": {
    "Name": "Dusclops",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "313": {
    "Name": "Dusknoir",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": -4,
    "BattlerEnemyY": -7,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 3
  },
  "314": {
    "Name": "Wailord",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -2,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "315": {
    "Name": "Arceus",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -6,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "316": {
    "Name": "Turtwig",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 1
  },
  "317": {
    "Name": "Grotle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "318": {
    "Name": "Torterra",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "319": {
    "Name": "Chimchar",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "320": {
    "Name": "Monferno",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "321": {
    "Name": "Infernape",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "322": {
    "Name": "Piplup",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 24,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 25,
    "BattlerShadowX": -2,
    "BattlerShadowSize": 1
  },
  "323": {
    "Name": "Prinplup",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "324": {
    "Name": "Empoleon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "325": {
    "Name": "Nosepass",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "326": {
    "Name": "Probopass",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "327": {
    "Name": "Honedge",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 8,
    "BattlerEnemyY": 9,
    "BattlerAltitude": 5,
    "BattlerShadowX": -6,
    "BattlerShadowSize": 1
  },
  "328": {
    "Name": "Doublade",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerAltitude": 1,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "329": {
    "Name": "Aegislash",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 8,
    "BattlerAltitude": 10,
    "BattlerShadowX": -3,
    "BattlerShadowSize": 3
  },
  "330": {
    "Name": "Pawniard",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "331": {
    "Name": "Bisharp",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "332": {
    "Name": "Luxray",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 3,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 9,
    "BattlerShadowX": -4,
    "BattlerShadowSize": 4
  },
  "333": {
    "Name": "Aggron",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": -6,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "334": {
    "Name": "Flygon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerAltitude": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "335": {
    "Name": "Milotic",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 7,
    "BattlerEnemyY": 9,
    "BattlerAltitude": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "336": {
    "Name": "Salamence",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": -4,
    "BattlerEnemyY": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "337": {
    "Name": "Klinklang",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "338": {
    "Name": "Zoroark",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "339": {
    "Name": "Sylveon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "340": {
    "Name": "Kyogre",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 1,
    "BattlerAltitude": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "341": {
    "Name": "Groudon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "342": {
    "Name": "Rayquaza",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": 2,
    "BattlerAltitude": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "343": {
    "Name": "Dialga",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 7,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "344": {
    "Name": "Palkia",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -2,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "345": {
    "Name": "Giratina",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 5
  },
  "346": {
    "Name": "Regigigas",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": -4,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 5
  },
  "347": {
    "Name": "Darkrai",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 7,
    "BattlerAltitude": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "348": {
    "Name": "Genesect",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": -5,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "349": {
    "Name": "Reshiram",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 1,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "350": {
    "Name": "Zekrom",
    "BattlerPlayerX": 7,
    "BattlerPlayerY": -9,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": -4,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 5
  },
  "351": {
    "Name": "Kyurem",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerShadowX": 6,
    "BattlerShadowSize": 5
  },
  "352": {
    "Name": "Roserade",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "353": {
    "Name": "Drifblim",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerAltitude": 25,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "354": {
    "Name": "Lopunny",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "355": {
    "Name": "Breloom",
    "BattlerPlayerX": -6,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "356": {
    "Name": "Ninjask",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -17,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 14,
    "BattlerAltitude": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "357": {
    "Name": "Banette",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "358": {
    "Name": "Rotom",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 27,
    "BattlerAltitude": 25,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "359": {
    "Name": "Reuniclus",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 23,
    "BattlerAltitude": 25,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "360": {
    "Name": "Whimsicott",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "361": {
    "Name": "Krookodile",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "362": {
    "Name": "Cofagrigus",
    "BattlerPlayerX": 3,
    "BattlerPlayerY": -13,
    "BattlerEnemyX": -5,
    "BattlerEnemyY": -10,
    "BattlerShadowX": 4,
    "BattlerShadowSize": 3
  },
  "363": {
    "Name": "Galvantula",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 25,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "364": {
    "Name": "Ferrothorn",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "365": {
    "Name": "Litwick",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 19,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 1
  },
  "366": {
    "Name": "Lampent",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 2,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "367": {
    "Name": "Chandelure",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -20,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 23,
    "BattlerAltitude": 33,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "368": {
    "Name": "Haxorus",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -9,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 5
  },
  "369": {
    "Name": "Golurk",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "370": {
    "Name": "Pyukumuku",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 31,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 28,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "371": {
    "Name": "Klefki",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 10,
    "BattlerAltitude": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "372": {
    "Name": "Talonflame",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 2,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "373": {
    "Name": "Mimikyu",
    "BattlerPlayerX": -2,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 7,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "374": {
    "Name": "Volcarona",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 8,
    "BattlerEnemyY": 18,
    "BattlerAltitude": 27,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "375": {
    "Name": "Deino",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 2
  },
  "376": {
    "Name": "Zweilous",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "377": {
    "Name": "Hydreigon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 15,
    "BattlerAltitude": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "378": {
    "Name": "Latias",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 39,
    "BattlerAltitude": 41,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "379": {
    "Name": "Latios",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 28,
    "BattlerAltitude": 30,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "380": {
    "Name": "Deoxys",
    "BattlerPlayerX": -1,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "381": {
    "Name": "Jirachi",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -13,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 31,
    "BattlerAltitude": 34,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "382": {
    "Name": "Nincada",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 29,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 27,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "383": {
    "Name": "Bibarel",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 12,
    "BattlerShadowX": -3,
    "BattlerShadowSize": 4
  },
  "384": {
    "Name": "Riolu",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "385": {
    "Name": "Slakoth",
    "BattlerPlayerX": -2,
    "BattlerPlayerY": 31,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 32,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "386": {
    "Name": "Vigoroth",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "387": {
    "Name": "Wailmer",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 8,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "388": {
    "Name": "Shinx",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "389": {
    "Name": "Luxio",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "390": {
    "Name": "Aron",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 22,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 26,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 1
  },
  "391": {
    "Name": "Lairon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "392": {
    "Name": "Trapinch",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 5,
    "BattlerShadowSize": 2
  },
  "393": {
    "Name": "Vibrava",
    "BattlerPlayerX": -2,
    "BattlerPlayerY": 13,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 19,
    "BattlerShadowX": -3,
    "BattlerShadowSize": 3
  },
  "394": {
    "Name": "Feebas",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -8,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 17,
    "BattlerAltitude": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "395": {
    "Name": "Bagon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "396": {
    "Name": "Shelgon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "397": {
    "Name": "Klink",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerAltitude": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "398": {
    "Name": "Klang",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 17,
    "BattlerAltitude": 11,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 3
  },
  "399": {
    "Name": "Zorua",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "400": {
    "Name": "Budew",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "401": {
    "Name": "Roselia",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "402": {
    "Name": "Drifloon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -14,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 9,
    "BattlerAltitude": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "403": {
    "Name": "Buneary",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 1
  },
  "404": {
    "Name": "Shroomish",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 20,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 23,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "405": {
    "Name": "Shuppet",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerAltitude": 17,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 1
  },
  "406": {
    "Name": "Solosis",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 14,
    "BattlerAltitude": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "407": {
    "Name": "Duosion",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -9,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 12,
    "BattlerAltitude": 13,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "408": {
    "Name": "Cottonee",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 16,
    "BattlerAltitude": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "409": {
    "Name": "Sandile",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 28,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 27,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 2
  },
  "410": {
    "Name": "Krokorok",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "411": {
    "Name": "Yamask",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 10,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": 21,
    "BattlerAltitude": 14,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "412": {
    "Name": "Joltik",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 29,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": 27,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "413": {
    "Name": "Ferroseed",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 29,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "414": {
    "Name": "Axew",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 1
  },
  "415": {
    "Name": "Fraxure",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 7,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "416": {
    "Name": "Golett",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 6,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 11,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "417": {
    "Name": "Fletchling",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "418": {
    "Name": "Fletchinder",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -2,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "419": {
    "Name": "Larvesta",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 15,
    "BattlerEnemyX": -2,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "420": {
    "Name": "Stunfisk",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 22,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "421": {
    "Name": "Sableye",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 16,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "422": {
    "Name": "Venipede",
    "BattlerPlayerX": 6,
    "BattlerPlayerY": 25,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 25,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "423": {
    "Name": "Whirlipede",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "424": {
    "Name": "Scolipede",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": -14,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 2,
    "BattlerShadowSize": 5
  },
  "425": {
    "Name": "Tyrunt",
    "BattlerPlayerX": 1,
    "BattlerPlayerY": 14,
    "BattlerEnemyX": -7,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "426": {
    "Name": "Tyrantrum",
    "BattlerPlayerX": 2,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 7,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "427": {
    "Name": "Snorunt",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": 17,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 1,
    "BattlerShadowSize": 1
  },
  "428": {
    "Name": "Glalie",
    "BattlerPlayerX": 7,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -2,
    "BattlerShadowX": 3,
    "BattlerShadowSize": 3
  },
  "429": {
    "Name": "Froslass",
    "BattlerPlayerX": 3,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 2,
    "BattlerShadowX": 6,
    "BattlerShadowSize": 1
  },
  "430": {
    "Name": "Oricorio",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "431": {
    "Name": "Oricorio",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "432": {
    "Name": "Oricorio",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "433": {
    "Name": "Oricorio",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 15,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "434": {
    "Name": "Trubbish",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 21,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "435": {
    "Name": "Garbodor",
    "BattlerPlayerX": 5,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "436": {
    "Name": "Carvanha",
    "BattlerPlayerX": -1,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "437": {
    "Name": "Sharpedo",
    "BattlerPlayerX": -2,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": -4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "438": {
    "Name": "Phantump",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "439": {
    "Name": "Trevenant",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -1,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "440": {
    "Name": "Noibat",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -6,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "441": {
    "Name": "Noivern",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 8,
    "BattlerShadowSize": 5
  },
  "442": {
    "Name": "Swablu",
    "BattlerPlayerX": 4,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "443": {
    "Name": "Altaria",
    "BattlerPlayerX": -2,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "444": {
    "Name": "Goomy",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 22,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 24,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "445": {
    "Name": "Sliggoo",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "446": {
    "Name": "Goodra",
    "BattlerPlayerX": 8,
    "BattlerPlayerY": -7,
    "BattlerEnemyX": 8,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "447": {
    "Name": "Regirock",
    "BattlerPlayerX": 1,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "448": {
    "Name": "Regice",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "449": {
    "Name": "Registeel",
    "BattlerPlayerX": 1,
    "BattlerPlayerY": 3,
    "BattlerEnemyX": -5,
    "BattlerEnemyY": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "450": {
    "Name": "Necrozma",
    "BattlerPlayerX": 8,
    "BattlerPlayerY": -3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -1,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "451": {
    "Name": "Stufful",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 19,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "452": {
    "Name": "Bewear",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 7,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "453": {
    "Name": "Dhelmise",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -10,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -2,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "454": {
    "Name": "Mareanie",
    "BattlerPlayerX": -6,
    "BattlerPlayerY": 11,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": 17,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "455": {
    "Name": "Toxapex",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 1,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "456": {
    "Name": "Hawlucha",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 2,
    "BattlerEnemyX": -3,
    "BattlerEnemyY": 9,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "457": {
    "Name": "Cacnea",
    "BattlerPlayerX": -2,
    "BattlerPlayerY": 19,
    "BattlerEnemyX": 2,
    "BattlerEnemyY": 19,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "458": {
    "Name": "Cacturne",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 4,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "459": {
    "Name": "Sandygast",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 23,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "460": {
    "Name": "Palossand",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 18,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 18,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "461": {
    "Name": "Amaura",
    "BattlerPlayerX": 3,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "462": {
    "Name": "Aurorus",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -2,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": -2,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "463": {
    "Name": "Rockruff",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 12,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 16,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "464": {
    "Name": "Lycanroc",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 4,
    "BattlerEnemyX": 1,
    "BattlerEnemyY": 12,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "465": {
    "Name": "Lycanroc",
    "BattlerPlayerX": 1,
    "BattlerPlayerY": -5,
    "BattlerEnemyX": -6,
    "BattlerEnemyY": 5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "466": {
    "Name": "Meloetta",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": -1,
    "BattlerEnemyX": 5,
    "BattlerEnemyY": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "467": {
    "Name": "Meloetta",
    "BattlerPlayerX": 3,
    "BattlerPlayerY": -4,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "468": {
    "Name": "Cresselia",
    "BattlerPlayerX": -5,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 3,
    "BattlerEnemyY": -5,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "469": {
    "Name": "Bruxish",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "470": {
    "Name": "Necrozma",
    "BattlerPlayerX": 8,
    "BattlerPlayerY": -3,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": -1,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "999999": {
    "Name": "Zapmolcuno",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000000": {
    "Name": "Zapmolcuno",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerAltitude": 10,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000001": {
    "Name": "Enraicune",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "1000002": {
    "Name": "Kyodonquaza",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "1000003": {
    "Name": "Paldiatina",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "1000004": {
    "Name": "Zekyushiram",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "1000005": {
    "Name": "Celemewchi",
    "BattlerPlayerX": -13,
    "BattlerPlayerY": 5,
    "BattlerEnemyX": 4,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "1000006": {
    "Name": "Venustoizard",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "1000007": {
    "Name": "Megaligasion",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "1000008": {
    "Name": "Swamptiliken",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "1000009": {
    "Name": "Torterneon",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "1000010": {
    "Name": "Deosectwo",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 4
  },
  "1000011": {
    "Name": "Bulbmantle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 25,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000012": {
    "Name": "Ivymelortle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 21,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000013": {
    "Name": "Totoritaquil",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000014": {
    "Name": "Baylavanaw",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 20,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "1000015": {
    "Name": "Torkipcko",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000016": {
    "Name": "Gromarshken",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000017": {
    "Name": "Turcharlup",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 1
  },
  "1000018": {
    "Name": "Prinfernotle",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000019": {
    "Name": "Zapmolcuno Z",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000020": {
    "Name": "Zapmolcuno M",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerAltitude": 8,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  },
  "1000021": {
    "Name": "Zapmolcuno A",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000022": {
    "Name": "Paldiatina D",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 2,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000023": {
    "Name": "Paldiatina P",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 0,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 5
  },
  "1000024": {
    "Name": "Paldiatina G",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000025": {
    "Name": "Cool Dino",
    "BattlerPlayerX": 0,
    "BattlerPlayerY": 32,
    "BattlerEnemyX": 0,
    "BattlerEnemyY": 3,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 2
  },
  "1000026": {
    "Name": "Regiregi",
    "BattlerPlayerX": 1,
    "BattlerPlayerY": 0,
    "BattlerEnemyX": -1,
    "BattlerEnemyY": 6,
    "BattlerShadowX": 0,
    "BattlerShadowSize": 3
  }
}
