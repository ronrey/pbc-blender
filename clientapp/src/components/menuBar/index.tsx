/** @jsxImportSource @emotion/react */
import { Button, ButtonGroup, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import text from './text';

interface Props {
	dept?: string;
	title?: string;
}
export const MenuBar: React.FC<Props> = ({ dept, title }) => {
	const navagate = useNavigate();
	const renderButtons = () => {
		switch (dept) {
			case 'controls':
				return (
					<div css={styles.buttons}>
						<ButtonGroup aria-label="button group">
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonHome}
							</Button>
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/modules')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonModules}
							</Button>
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/module')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonModule}
							</Button>
						</ButtonGroup>
					</div>
				);
			case 'modules':
				return (
					<div css={styles.buttons}>
						<ButtonGroup aria-label="button group">
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonHome}
							</Button>

							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/controls')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonControls}
							</Button>
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/module')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonModule}
							</Button>
						</ButtonGroup>
					</div>
				);
			case 'module':
				return (
					<div css={styles.buttons}>
						<ButtonGroup aria-label="button group">
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonHome}
							</Button>
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/modules')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonModules}
							</Button>

							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/controls')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonControls}
							</Button>
						</ButtonGroup>
					</div>
				);
			case 'home':
				return (
					<div css={styles.buttons}>
						<ButtonGroup aria-label="button group">
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/modules')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonModules}
							</Button>
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/controls')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonControls}
							</Button>
							<Button
								css={styles.button}
								size="small"
								onClick={() => navagate('/module')}
								color="primary"
								variant="contained"
							>
								{text.menubar.buttonModule}
							</Button>
						</ButtonGroup>
					</div>
				);

			default:
				return (
					<div css={styles.buttons}>
						<Button
							css={styles.button}
							size="small"
							onClick={() => navagate('/')}
							color="primary"
							variant="contained"
						>
							{text.menubar.buttonHome}
						</Button>
						<Button
							css={styles.button}
							size="small"
							onClick={() => navagate('/modules')}
							color="primary"
							variant="contained"
						>
							{text.menubar.buttonModules}
						</Button>
						<Button
							css={styles.button}
							size="small"
							onClick={() => navagate('/controls')}
							color="primary"
							variant="contained"
						>
							{text.menubar.buttonControls}
						</Button>
						<Button
							css={styles.button}
							size="small"
							onClick={() => navagate('/module')}
							color="primary"
							variant="contained"
						>
							{text.menubar.buttonModule}
						</Button>
					</div>
				);
		}
	};
	return (
		<div css={styles.header}>
			<div css={styles.buttons}>
				{renderButtons()}
				{/* <ShoppingCartButton /> */}
			</div>

			<Typography css={styles.title} color="primary">
				{title ? title : dept}
			</Typography>
		</div>
	);
};
export default MenuBar;
