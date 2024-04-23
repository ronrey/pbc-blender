import React from 'react';

interface CentralHexagonTrianglesProps {
	size?: number; // Size of the hexagon's radius
}

const CentralHexagonTriangles: React.FC<CentralHexagonTrianglesProps> = ({ size = 100 }) => {
	const radius = size;
	const center = { x: 650, y: 450 };

	const triangleArea = (Math.sqrt(3) / 4) * (radius * radius);
	const circleArea = 0.2 * triangleArea;
	const circleRadius = Math.sqrt(circleArea / Math.PI);

	const getTrianglePoints = (angleOffset: number) => {
		const angleRad = angleOffset * (Math.PI / 180);
		const nextAngleRad = (angleOffset + 60) * (Math.PI / 180);

		const x1 = center.x + radius * Math.cos(angleRad);
		const y1 = center.y + radius * Math.sin(angleRad);
		const x2 = center.x + radius * Math.cos(nextAngleRad);
		const y2 = center.y + radius * Math.sin(nextAngleRad);

		return `${center.x},${center.y} ${x1},${y1} ${x2},${y2}`;
	};

	const getCircleCenters = (angleOffset: number) => {
		const angleRad = angleOffset * (Math.PI / 180);
		const angleMid = (angleOffset + 30) * (Math.PI / 180); // Midpoint angle for placing circle

		const x = center.x + (radius / 2) * Math.cos(angleMid);
		const y = center.y + (radius / 2) * Math.sin(angleMid);

		return [x, y];
	};

	const svgSize = radius * 3;

	return (
		<svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
			{[...Array(6)].map((_, i) => {
				const points = getTrianglePoints(i * 60);
				const [cx, cy] = getCircleCenters(i * 60);

				return (
					<g key={i}>
						<polygon points={points} fill={`hsl(${i * 60}, 100%, 70%)`} stroke="black" strokeWidth="2" />
						<circle cx={cx} cy={cy} r={circleRadius} fill="white" stroke="black" strokeWidth="1" />
						<circle
							cx={cx + circleRadius}
							cy={cy}
							r={circleRadius}
							fill="white"
							stroke="black"
							strokeWidth="1"
						/>
						<circle
							cx={cx - circleRadius}
							cy={cy}
							r={circleRadius}
							fill="white"
							stroke="black"
							strokeWidth="1"
						/>
					</g>
				);
			})}
		</svg>
	);
};

export default CentralHexagonTriangles;
