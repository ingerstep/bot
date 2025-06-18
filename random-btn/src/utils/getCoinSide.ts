import { getRandomInt } from "./getRandomInt";

export const getCoinSide = () => getRandomInt(0, 1) === 0 ? "Орел" : "Решка";