/** @jsxImportSource @emotion/react */
// src/Counter.tsx
import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import _ from 'lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Button, Paper } from '@mui/material';
import { CoffeeMap, Coffee } from '../../types';
import { MenuBar } from '../menuBar';

interface Props {}
export const CoffeeMapping: React.FC<Props> = () => {
	const SET_COFFEE_MAP = gql`
		mutation SetCoffeeMap($coffeeModules: [CoffeeModuleInput!]!) {
			setCoffeeMap(coffeeModules: $coffeeModules) {
				success
				code
				message
			}
		}
	`;
	const GET_COFFEE_MAP = gql`
		query GetCoffeeMap {
			getCoffeeMap {
				stationId
				state
				moduleId
				coffeeId
			}
		}
	`;
	const GET_COFFEES = gql`
		query GetCoffees {
			getCoffees {
				key
				state
				region
				roast
			}
		}
	`;
	const [resetCoffeeMap] = useMutation(SET_COFFEE_MAP, {
		onCompleted(data) {
			console.log(data.setCoffeeMap.success);
		},
		onError: err => {
			debugger;
		},
	});
	const [coffeeMap, setCoffeeMap] = useState<CoffeeMap[]>([]);
	const [getCoffeeMap] = useLazyQuery(GET_COFFEE_MAP, {
		fetchPolicy: 'cache-and-network',
		onCompleted: data => {
			console.log(`data.getCoffeeMap`, data.getCoffeeMap);
			setCoffeeMap(data.getCoffeeMap);
		},
		onError: err => {
			debugger;
		},
	});
	const [dirty, setDirty] = useState(false);
	const [coffees, setCoffees] = useState<Coffee[] | null>(null);
	const [getCoffees] = useLazyQuery(GET_COFFEES, {
		fetchPolicy: 'cache-and-network',
		onCompleted: data => {
			const coffees = data.getCoffees;
			setCoffees(coffees);
		},
		onError: err => {
			debugger;
		},
	});
	useEffect(() => {
		getCoffeeMap();
	}, []);

	useEffect(() => {
		getCoffees();
	}, []);
	function handleCoffeeChange(event: SelectChangeEvent, moduleId: number, stationId: number) {
		if (!coffees) {
			return null;
		}
		const key = parseInt(event.target.value as string);
		const newCoffeeMap = _.cloneDeep(coffeeMap);
		const newStation = newCoffeeMap?.find(
			(coffee: CoffeeMap) => coffee.moduleId === moduleId && coffee.stationId === stationId
		);
		if (!newStation) {
			return null;
		}
		newStation.coffeeId = key;
		setCoffeeMap(newCoffeeMap);
		setDirty(true);
	}
	function handleCoffeeActiveChange(event: React.ChangeEvent<HTMLInputElement>, moduleId: number, stationId: number) {
		if (!coffees) {
			return null;
		}
		const state = event.target.checked ? 'active' : 'inactive';
		const newCoffeeMap = _.cloneDeep(coffeeMap);
		const newStation = newCoffeeMap?.find(
			(coffee: CoffeeMap) => coffee.moduleId === moduleId && coffee.stationId === stationId
		);
		if (!newStation) {
			return null;
		}
		newStation.state = state;
		setCoffeeMap(newCoffeeMap);
		setDirty(true);
	}
	function handleSave() {
		setDirty(false);
		const payload = coffeeMap.map((element: CoffeeMap) => {
			const { coffeeId, moduleId, stationId, state } = element;
			return { state, coffeeId, moduleId, stationId };
		});
		resetCoffeeMap({
			variables: {
				coffeeModules: payload,
			},
		});
	}
	function renderCoffeeSelect(key: number, moduleId: number, stationId: number) {
		if (!coffees) {
			return null;
		}
		const inStock = coffees.filter(coffee => coffee.state === 'instock');
		inStock.sort((a, b) => {
			if (a.key === b.key) {
				return a.key - b.key;
			}
			return a.key - b.key;
		});
		const coffs = inStock.map(coffee => {
			const { region, roast, key } = coffee;
			return (
				<MenuItem key={key} value={key}>
					{`${key} - ${roast} ${region}`}
				</MenuItem>
			);
		});
		return (
			<FormControl fullWidth size="small">
				<InputLabel>Coffee</InputLabel>
				<Select value={key.toString()} onChange={event => handleCoffeeChange(event, moduleId, stationId)}>
					{coffs.filter(item => item !== null)}
				</Select>
			</FormControl>
		);
	}
	function renderTable() {
		if (!coffeeMap || coffeeMap.length === 0 || !coffees) {
			return <div>Loading...</div>;
		}
		debugger;
		return (
			<TableContainer component={Paper} css={styles.tableContainer}>
				<Table size="small" aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center" css={styles.cellHeader}>
								#
							</TableCell>
							<TableCell align="center" css={styles.cellHeader}>
								Active
							</TableCell>
							<TableCell align="center" css={styles.cellHeader}>
								Coffee
							</TableCell>
							<TableCell align="center" css={styles.cellHeader}>
								Station
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{coffeeMap.map((row, i) => (
							<TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell align="center" css={styles.cell}>
									{i + 1}
								</TableCell>
								<TableCell align="center" css={styles.cell}>
									<Checkbox
										checked={row.state === 'active'}
										onChange={event => handleCoffeeActiveChange(event, row.moduleId, row.stationId)}
									/>
								</TableCell>
								<TableCell align="center" css={styles.cell}>
									{renderCoffeeSelect(row.coffeeId, row.moduleId, row.stationId)}
								</TableCell>
								<TableCell align="center" css={styles.cell}>{`${row.moduleId + 1} - ${
									row.stationId + 1
								}`}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
	function renderButtons() {
		if (!dirty) {
			return <div></div>;
		}
		return (
			<div css={styles.buttonContainer}>
				<Button
					fullWidth={true}
					variant="contained"
					color="primary"
					onClick={handleSave}
					css={styles.saveButton}
				>
					Save
				</Button>
			</div>
		);
	}
	return (
		<div css={styles.container}>
			<div css={styles.header}>
				<MenuBar dept="home" />

				{dirty ? (
					<Button
						fullWidth={true}
						variant="contained"
						color="primary"
						onClick={handleSave}
						css={styles.saveButton}
					>
						Save
					</Button>
				) : null}
			</div>
			{renderTable()}
		</div>
	);
};
export default CoffeeMapping;
