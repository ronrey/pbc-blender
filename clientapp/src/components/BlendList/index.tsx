/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Button, Input, MenuItem, Paper, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { styles } from './styles';
import { BlendItem } from '../blenderControls';
import { cloneDeep } from '@apollo/client/utilities';
interface Props {
	list: BlendItem[];
	title: string;
	onChange: (list: BlendItem[]) => void;
}

const protoBlend = {
	coffeeId: 0,
	grams: 10,
};

const coffeeList = [
	{ value: 0, display: 'mod 1 - node 1' },
	{ value: 1, display: 'mod 1 - node 2' },
	{ value: 2, display: 'mod 1 - node 3' },
	{ value: 3, display: 'mod 2 - node 1' },
	{ value: 4, display: 'mod 2 - node 2' },
	{ value: 5, display: 'mod 2 - node 3' },
	{ value: 6, display: 'mod 3 - node 1' },
	{ value: 7, display: 'mod 3 - node 2' },
	{ value: 8, display: 'mod 3 - node 3' },
	{ value: 9, display: 'mod 4 - node 1' },
	{ value: 10, display: 'mod 4 - node 2' },
	{ value: 11, display: 'mod 4 - node 3' },
	{ value: 12, display: 'mod 5 - node 1' },
	{ value: 13, display: 'mod 5 - node 2' },
	{ value: 14, display: 'mod 5 - node 3' },
	{ value: 15, display: 'mod 6 - node 1' },
	{ value: 16, display: 'mod 6 - node 2' },
	{ value: 17, display: 'mod 6 - node 3' },
];
export const BlendList: React.FC<Props> = ({ list, onChange, title }) => {
	const [edit, setEdit] = useState<BlendItem>({ ...protoBlend });
	// const handleListItemChange = (
	// 	key: string,
	// 	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	// 	i: number
	// ) => {
	// 	const newList = cloneDeep(list);
	// 	const item = newList[i];
	// 	switch (key) {
	// 		case 'coffeeId':
	// 			item.coffeeId = parseInt(event.target.value);
	// 			break;
	// 		case 'grams':
	// 			item.grams = parseFloat(event.target.value);
	// 			break;
	// 		default:
	// 			debugger;
	// 	}
	// 	if (newList) onChange(newList);
	// };
	function onListGramsChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) {
		const newList = cloneDeep(list);
		const item = newList[i];
		item.grams = parseFloat(event.target.value);

		if (newList) onChange(newList);
	}
	const handleAdd = () => {
		const newList = [...list];
		if (edit !== null) newList.push(edit);

		setEdit({ ...protoBlend });
		if (newList) onChange(newList);
	};
	const handleDelete = (i: number) => {
		const newList = [...list];
		newList.splice(i, 1);
		if (newList) onChange(newList);
	};
	function onGramsEditChange(value: string | number) {
		const newEdit = { ...edit };
		newEdit.grams = typeof value === 'string' ? +value : value;
		setEdit(newEdit);
	}
	function onCoffeeIdEditChange(value: number | string) {
		const newEdit = { ...edit };
		newEdit.coffeeId = typeof value === 'string' ? +value : value;
		setEdit(newEdit);
	}
	function onListCoffeeChange(i: number, value: number | string) {
		const newList = [...list];
		const item = newList[i];
		item.coffeeId = typeof value === 'string' ? +value : value;
		if (newList) onChange(newList);
	}
	const renderList = () => {
		return (
			<div css={styles.itemContainer}>
				{list.map((item: BlendItem, i: number) => (
					<div css={styles.item} key={i}>
						<Input
							css={styles.editInput}
							value={item.grams}
							onChange={e => onListGramsChange(e, i)}
							type="number"
							inputProps={
								{
									// min: 0.01,
									// step: 0.01,
								}
							}
						/>

						<Select value={item.coffeeId} onChange={e => onListCoffeeChange(i, e.target.value)}>
							{coffeeList.map((item, i) => (
								<MenuItem key={i} value={item.value}>
									{item.display}
								</MenuItem>
							))}
						</Select>

						<Button onClick={() => handleDelete(i)} size="small">
							<DeleteIcon fontSize="small" />
						</Button>
					</div>
				))}
			</div>
		);
	};

	const renderEdit = () => {
		return (
			<Paper elevation={8} css={styles.editContainer}>
				<Input
					css={styles.editInput}
					value={edit.grams}
					onChange={e => onGramsEditChange(e.target.value)}
					type="number"
					inputProps={
						{
							// min: 0.01,
							// step: 0.01,
						}
					}
				/>

				<Select value={edit.coffeeId} onChange={(event, i) => onCoffeeIdEditChange(event.target.value)}>
					{coffeeList.map((item, i) => (
						<MenuItem key={i} value={item.value}>
							{item.display}
						</MenuItem>
					))}
				</Select>
				<Button size="small">
					{true ? (
						<AddIcon onClick={handleAdd} fontSize="small" />
					) : (
						<NotInterestedIcon fontSize="small" color="error" />
					)}
				</Button>
			</Paper>
		);
	};
	return (
		<Paper elevation={16} css={styles.container}>
			<Typography css={styles.title} variant="h6">
				{title}
			</Typography>
			{renderEdit()}
			{renderList()}
		</Paper>
	);
};
export default BlendList;
