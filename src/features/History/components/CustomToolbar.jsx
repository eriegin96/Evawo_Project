import React from 'react';
import { Button } from '@mui/material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import BookIcon from '@mui/icons-material/Book';

export function HistoryToolbar(props) {
	const { isBtnDisabled, handleRevise, handleRemove } = props;

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
				startIcon={<BookIcon />}
				onClick={handleRevise}
			>
				Add to Revision
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
				startIcon={<DeleteIcon />}
				onClick={handleDelete}
			>
				Delete
			</Button>
		</GridToolbarContainer>
	);
}
