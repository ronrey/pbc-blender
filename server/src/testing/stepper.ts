import { Gpio } from 'onoff';

class StepperMotor {
	private stepPin: Gpio;
	private dirPin: Gpio;

	constructor(stepPinNumber: number, dirPinNumber: number) {
		this.stepPin = new Gpio(stepPinNumber, 'out');
		this.dirPin = new Gpio(dirPinNumber, 'out');
	}

	// Move the motor by a specified number of steps
	async move(steps: number, delay: number) {
		// Determine direction
		const direction = steps >= 0 ? 1 : 0;
		this.dirPin.writeSync(direction);

		// Execute steps
		for (let i = 0; i < Math.abs(steps); i++) {
			this.stepPin.writeSync(1);
			await this.sleep(delay);
			this.stepPin.writeSync(0);
			await this.sleep(delay);
		}
	}

	// Sleep function
	private sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	// Cleanup the GPIO resources
	cleanup() {
		this.stepPin.unexport();
		this.dirPin.unexport();
	}
}

// Usage:
(async () => {
	const motor = new StepperMotor(17, 18); // Adjust GPIO pins as necessary

	try {
		await motor.move(200, 2); // Move 200 steps with a 2ms delay between each step
	} finally {
		motor.cleanup();
	}
})();
