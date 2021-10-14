import React, { useCallback, useState, useContext } from 'react';
import { Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import './historyPage.scss';
import { columns } from '../components/DataGridTable';
// import { HistoryToolbar } from '../components/CustomToolbar';
// import ToolbarButton from '../components/ToolbarButton';
import { AppContext } from '../../../context/AppProvider';
import { AuthContext } from '../../../context/AuthProvider';
import { removeToTrash } from '../../../firebase/services';

export default function History() {
	const { user } = useContext(AuthContext);
	const { historyList, isLoading } = useContext(AppContext);
	const [pageSize, setPageSize] = useState(10);
	const [selectionModel, setSelectionModel] = useState([]);
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);

	const deleteWord = useCallback(
		() => () => {
			removeToTrash(user.uid, selectionModel);
		},
		[user, selectionModel]
	);

	function CustomToolbar() {
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
					onClick={deleteWord}
				>
					Move to Trash
				</Button>
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
							rows={historyList}
							columns={columns}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => {
								setPageSize(newPageSize);
							}}
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
