import { Routes, Route } from 'react-router-dom';
import { ControlPanels } from '../controlPanels';
import { BlenderControls } from '../blenderControls';
interface Props {}
export const AppRoutes: React.FC<Props> = () => {
	return (
		<Routes>
			<Route path="/" element={<BlenderControls />} />
			<Route path="/controls" element={<BlenderControls />} />
		</Routes>
	);
};
