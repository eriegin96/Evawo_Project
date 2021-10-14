import React, { useCallback, useState, useContext } from 'react';
import { Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { columns } from '../components/DataGridTable';
import { removeToArchive, restoreToHistory } from '../../../firebase/services';
import { AppContext } from '../../../context/AppProvider';
import { AuthContext } from '../../../context/AuthProvider';
// import { TrashToolbar } from '../components/CustomToolbar';

export default function Trash() {
	const { user } = useContext(AuthContext);
	const { trashList, isLoading } = useContext(AppContext);
	const [selectionModel, setSelectionModel] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);

	const restoreWord = useCallback(
		() => () => {
			restoreToHistory(user.uid, selectionModel);
		},
		[user, selectionModel]
	);

	const deleteWord = useCallback(
		() => () => {
			removeToArchive(user.uid, selectionModel);
		},
		[user, selectionModel]
	);

	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<Button
					color="success"
					disabled={isBtnDisabled}
					icon={<RestoreIcon />}
					onClick={restoreWord}
					children="Restore"
				/>
				<Button
					color="error"
					disabled={isBtnDisabled}
					icon={<DeleteIcon />}
					onClick={deleteWord}
					children="Delete"
				/>
			</GridToolbarContainer>
		);
	}

	return (
		<div style={{ height: 500, width: '100%' }}>
			<div style={{ display: 'flex', height: '100%' }}>
				<div style={{ flexGrow: 1 }}>
					{isLoading ? (
						<CircularProgress />
					) : (
						<DataGrid
							rows={trashList}
							columns={columns}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							rowsPerPageOptions={[10, 15, 20]}
							checkboxSelection
							disableSelectionOnClick
							onSelectionModelChange={(newSelectionModel) => {
								setSelectionModel(newSelectionModel);
								setIsBtnDisabled(newSelectionModel.length === 0);
							}}
							selectionModel={selectionModel}
							disableColumnMenu={true}
							components={{
								Toolbar: CustomToolbar,
							}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
