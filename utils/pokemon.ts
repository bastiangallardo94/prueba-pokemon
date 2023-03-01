import { EvolutionHistory } from "@/interafaces";

export const processingEvolutions = (history: EvolutionHistory) => {


    let evolutionList = [];
    let flag = true;
    let currentHistory = history.chain.evolves_to;
    if (currentHistory.length === 0 || !history) return [];
    while (flag === true) {
        if (currentHistory.length === 0) return evolutionList;

        const id = currentHistory[0].species.url.split('/')

        evolutionList.push({ ...currentHistory[0].species, id: id[id.length - 2], img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[id.length - 2]}.png` });
        if (currentHistory.length === 0) {
            return evolutionList;
        } else {
            currentHistory = currentHistory[0].evolves_to;
        }
    }


    return evolutionList;
}