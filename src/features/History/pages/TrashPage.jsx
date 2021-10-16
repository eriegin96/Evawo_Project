import React, { useCallback, useState, useContext, useEffect } from 'react';
import { restoreToHistory, removeToArchive } from '../../../firebase/services';
import { AppContext } from '../../../context/AppProvider';
import { AuthContext } from '../../../context/AuthProvider';
import { TrashToolbar } from '../components/CustomToolbar';
import DataGridTable from '../components/DataGridTable';
import RemoveWordDialog from '../components/RemoveWordDialog';

export default function Trash() {
	const { user } = useContext(AuthContext);
	const { trashList, totalTrash } = useContext(AppContext);
	const [pageSize, setPageSize] = useState(10);
	const [selectionModel, setSelectionModel] = useState([]);
	const [isBtnDisabled, setIsBtnDisabled] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	useEffect(() => {}, []);

	const openDialog = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
	};

	const restoreWords = useCallback(
		() => () => {
			restoreToHistory(user.uid, selectionModel);
		},
		[user, selectionModel]
	);

	function CustomToolbar() {
		return (
			<TrashToolbar
				isBtnDisabled={isBtnDisabled}
				handleRestore={restoreWords()}
				handleDelete={openDialog}
			/>
		);
	}

	return (
		<>
			<DataGridTable
				list={trashList}
				loading={totalTrash !== 0 && trashList.length === 0}
				pageSize={pageSize}
				handleSetPageSize={setPageSize}
				handleSetSelectionModel={setSelectionModel}
				handleSetIsBtnDisabled={setIsBtnDisabled}
				selectionModel={selectionModel}
				CustomToolbar={CustomToolbar}
			/>
			<RemoveWordDialog
				action={removeToArchive}
				title="Delete Words"
				content="The word(s) will be deleted permanently. Continue?"
				selectionModel={selectionModel}
				open={isDialogOpen}
				handleClose={closeDialog}
			/>
		</>
	);
}
