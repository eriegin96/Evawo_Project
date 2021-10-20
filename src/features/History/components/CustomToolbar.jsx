import React from 'react';
import { Button } from '@mui/material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import ViewListIcon from '@mui/icons-material/ViewList';
import ModeIcon from '@mui/icons-material/Mode';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import BookIcon from '@mui/icons-material/Book';

export function HistoryToolbar(props) {
	const { isViewMode, setIsViewMode, isBtnDisabled, handleRevise, handleRemove } = props;

	return (
		<GridToolbarContainer>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<Button
				size="small"
				variant="outlined"
				color="error"
				disabled={isBtnDisabled}
				style={{ margin: '0 4px' }}
				startIcon={<DeleteIcon />}
				onClick={handleRemove}
			>
				Move to Trash
			</Button>
			{/* {isViewMode ? (
				<>
					<Button
						size="small"
						variant="text"
						disabled={!isViewMode}
						style={{ margin: '0 4px' }}
						startIcon={<ViewListIcon />}
						onClick={() => setIsViewMode(!isViewMode)}
					>
						View Mode
					</Button>
					<Button
						size="small"
						variant="outlined"
						color="error"
						disabled={isBtnDisabled}
						style={{ margin: '0 4px' }}
						startIcon={<DeleteIcon />}
						onClick={handleRemove}
					>
						Move to Trash
					</Button>
				</>
			) : (
				<>
					<Button
						size="small"
						variant="text"
						disabled={isViewMode}
						style={{ margin: '0 4px' }}
						startIcon={<ModeIcon />}
						onClick={() => setIsViewMode(!isViewMode)}
					>
						Add Mode
					</Button>
					<Button
						size="small"
						variant="outlined"
						disabled={isBtnDisabled}
						style={{ margin: '0 4px' }}
						startIcon={<AddCircleIcon />}
						onClick={handleRevise}
					>
						Add to Revision
					</Button>
				</>
			)} */}
		</GridToolbarContainer>
	);
}

export function TrashToolbar(props) {
	const { isBtnDisabled, handleRestore, handleDelete } = props;

	return (
		<GridToolbarContainer>
			<GridToolbarColumnsButton />
			<GridToolbarFilterButton />
			<Button
				size="small"
				variant="outlined"
				color="success"
				disabled={isBtnDisabled}
				style={{ margin: '0 4px' }}
				startIcon={<RestoreIcon />}
				onClick={handleRestore}
			>
				Restore
			</Button>
			<Button
				size="small"
				variant="outlined"
				color="error"
				disabled={isBtnDisabled}
				style={{ margin: '0 4px' }}
				startIcon={<RemoveCircleIcon />}
				onClick={handleDelete}
			>
				Delete
			</Button>
		</GridToolbarContainer>
	);
}
