import React from 'react';
import { Button } from '@mui/material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';


export function HistoryToolbar(props) {
	const { isBtnDisabled, handleRemove } = props;

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
