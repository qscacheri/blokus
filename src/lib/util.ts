export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const randInt = (min: number, max: number) =>
	Math.floor(Math.random() * (max - min + 1) + min);

export const deepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
