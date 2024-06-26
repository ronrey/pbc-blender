import { Routes, Route } from 'react-router-dom';
import { BlenderControls } from '../blenderControls';
import { Modules } from '../modules';
import { Home } from '../home';
import { Module } from '../module';
import { CoffeeMapping } from '../CoffeeMapping';
interface Props {}
export const AppRoutes: React.FC<Props> = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/controls" element={<BlenderControls />} />
			<Route path="/modules" element={<Modules />} />
			<Route path="/module" element={<Module />} />
			<Route path="/coffeemapping" element={<CoffeeMapping />} />
		</Routes>
	);
};
