// // loadbalancer.ts

// import { Module } from '../../module';
// import { coffeeToModules, CoffeeModule } from '../settings';

// export async function getSiloWithMostWeight(coffeeId: number): Promise<number> {
// 	const coffee: CoffeeModule | undefined = coffeeToModules.find(
// 		(coffee: CoffeeModule) => coffee.coffeeId === coffeeId
// 	);

// 	if (!coffee) {
// 		throw new Error('Coffee not found');
// 	}

// 	const module = new Module(moduleUrls[coffee.moduleId]);
// 	const siloIds = Array.from({ length: 18 }, (_, i) => i + 1);

// 	const siloWeights = await Promise.all(
// 		siloIds.map(async siloId => {
// 			const weight = await module.getSiloGrams(siloId);
// 			return { siloId, weight };
// 		})
// 	);

// 	const siloWithMostWeight = siloWeights.reduce((maxSilo, currentSilo) =>
// 		currentSilo.weight > maxSilo.weight ? currentSilo : maxSilo
// 	);

// 	return siloWithMostWeight.siloId;
// }
// loadbalancer.ts

import { Module, getModuleByNumber } from '../.././module';
import { coffeeToModules, CoffeeModule } from '../settings';

export async function getSiloWithMostWeight(coffeeId: number): Promise<number> {
	const coffee: CoffeeModule | undefined = coffeeToModules.find(
		(coffee: CoffeeModule) => coffee.coffeeId === coffeeId
	);

	if (!coffee) {
		throw new Error('Coffee not found');
	}

	const module = getModuleByNumber(coffee.moduleId);
	const siloIds = Array.from({ length: 18 }, (_, i) => i + 1);

	const siloWeights = await Promise.all(
		siloIds.map(async siloId => {
			const weight = await module.getSiloGrams(siloId);
			return { siloId, weight };
		})
	);

	const siloWithMostWeight = siloWeights.reduce((maxSilo, currentSilo) =>
		currentSilo.weight > maxSilo.weight ? currentSilo : maxSilo
	);

	return siloWithMostWeight.siloId;
}
