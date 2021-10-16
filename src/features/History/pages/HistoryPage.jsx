import React, { useState, useContext, useCallback } from 'react';
import './history.scss';
import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';
import { HistoryToolbar } from '../components/CustomToolbar';
import DataGridTable from '../components/DataGridTable';
import RemoveWordDialog from '../components/RemoveWordDialog';
import { addToRevision, removeToTrash } from '../../../firebase/services';

export default function History() {
	const { user } = useContext(AuthContext);
	const { historyList, totalHistory } = useContext(AppContext);
	const [pageSize, setPageSize] = useState(10);
	const [selectionModel, setSelectionModel] = useState([]);
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const openDialog = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	const reviseWord = useCallback(
		() => () => {
			addToRevision(user.uid, selectionModel);
		},
		[selectionModel]
	);

	function CustomToolbar() {
		return (
			<HistoryToolbar
				isBtnDisabled={isBtnDisabled}
				handleRevise={reviseWord()}
				handleRemove={openDialog}
			/>
		);
	}

	return (
		<>
			<DataGridTable
				list={historyList}
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
				handleClose={closeDialog}
			/>
		</>
	);
}
