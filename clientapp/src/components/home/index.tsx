/** @jsxImportSource @emotion/react */
// src/Counter.tsx
import React, { useState } from 'react';
import { styles } from './styles';
import { MenuBar } from '../menuBar';

interface Props {}

export const Home: React.FC<Props> = () => {
	return (
		<div css={styles.container}>
			<MenuBar dept="home" />

			<h1>Home</h1>
		</div>
	);
};
