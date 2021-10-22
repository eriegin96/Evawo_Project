import React, { useState, useContext, useCallback } from 'react';
import './history.scss';
import { Menu, MenuItem } from '@mui/material';
import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';
import { HistoryToolbar } from '../components/CustomToolbar';
import DataGridTable from '../components/DataGridTable';
import RemoveWordDialog from '../components/RemoveWordDialog';
import { addToRevision, removeFromRevision, removeToTrash } from '../../../firebase/services';

export default function HistoryPage() {
	const { user } = useContext(AuthContext);
	const { historyList, totalHistory, revisionList, notRevisionList } = useContext(AppContext);
	const [pageSize, setPageSize] = useState(10);
	const [selectionModel, setSelectionModel] = useState([]);
	const [isViewMode, setIsViewMode] = useState(true);
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleOpenDialog = () => {
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	const reviseWord = useCallback(
		() => () => {
			addToRevision(user.uid, selectionModel);
		},
		[selectionModel]
	);

	const handleClickAddRevision = useCallback(
		() => () => {
			console.log(selectionModel);
			// addToRevision(user.uid, selectionModel);
		},
		[selectionModel]
	);

	const handleClickRemoveRevision = useCallback(
		() => () => {
			// removeFromRevision(user.uid, selectionModel);
		},
		[selectionModel]
	);

	function CustomToolbar() {
		return (
			<HistoryToolbar
				isViewMode={isViewMode}
				setIsViewMode={setIsViewMode}
				isBtnDisabled={isBtnDisabled}
				handleRevise={reviseWord()}
				handleRemove={handleOpenDialog}
			/>
		);
	}

	return (
		<>
			<DataGridTable
				list={isViewMode ? historyList : notRevisionList}
				loading={totalHistory !== 0 && historyList.length === 0}
				pageSize={pageSize}
				handleSetPageSize={setPageSize}
				handleSetSelectionModel={setSelectionModel}
				handleSetIsBtnDisabled={setIsBtnDisabled}
				selectionModel={selectionModel}
				CustomToolbar={CustomToolbar}
			/>
			<RemoveWordDialog
				action={removeToTrash}
				title="Remove Words"
				content="Remove to Trash?"
				selectionModel={selectionModel}
				open={isDialogOpen}
				handleClose={handleCloseDialog}
			/>
		</>
	);
}
