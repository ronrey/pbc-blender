/** @jsxImportSource @emotion/react */
// src/Counter.tsx
import React, { useState } from 'react';
import { styles } from './styles';
import { MenuBar } from '../menuBar';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

interface Props {}

const moduleUrls = ['192.168.0.40', '192.168.0.46', '192.168.0.43', '192.168.0.42', '192.168.0.47', '192.168.0.45'];
export const Module: React.FC<Props> = () => {
	const [index, setIndex] = useState(1);
	const [url, setUrl] = useState(moduleUrls[index - 1]);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value);
		setIndex(value);
		setUrl(moduleUrls[value - 1]);
	};
	function RowRadioButtonsGroup() {
		return (
			<FormControl css={styles.moduleSelectionContainer}>
				<Typography variant="subtitle1" css={styles.moduleSelectTitle}>
					Module:{' '}
				</Typography>

				<RadioGroup
					row
					aria-labelledby="demo-row-radio-buttons-group-label"
					name="row-radio-buttons-group"
					value={index}
					onChange={handleChange}
				>
					<FormControlLabel value="1" control={<Radio />} label="pbc1" />
					<FormControlLabel value="2" control={<Radio />} label="pbc2" />
					<FormControlLabel value="3" control={<Radio />} label="pbc3" />
					<FormControlLabel value="4" control={<Radio />} label="pbc4" />
					<FormControlLabel value="5" control={<Radio />} label="pbc5" />
					<FormControlLabel value="6" control={<Radio />} label="pbc6" />
				</RadioGroup>
			</FormControl>
		);
	}
	return (
		<div css={styles.container}>
			<MenuBar dept="module" />
			{RowRadioButtonsGroup()}
			<div css={styles.container}>
				<iframe
					src={`http://${url}:8080`}
					title="Embedded HTML Document"
					style={{ width: '100%', height: '90vh', border: 'none' }}
				/>
			</div>
		</div>
	);
};
