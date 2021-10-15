import React, { useCallback, useState, useContext } from 'react';
import { restoreToHistory, removeToArchive } from '../../../firebase/services';
import { AppContext } from '../../../context/AppProvider';
import { AuthContext } from '../../../context/AuthProvider';
import { TrashToolbar } from '../components/CustomToolbar';
import DataGridTable from '../components/DataGridTable';
import RemoveWordDialog from '../components/RemoveWordDialog';

export default function Trash() {
	const { user } = useContext(AuthContext);
	const { trashList } = useContext(AppContext);
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

	const restoreWord = useCallback(
		() => () => {
			restoreToHistory(user.uid, selectionModel);
		},
		[user, selectionModel]
	);

	function CustomToolbar() {
		return (
			<TrashToolbar
				isBtnDisabled={isBtnDisabled}
				handleRestore={restoreWord()}
				handleDelete={openDialog}
			/>
		);
	}

	return (
				<>
					<DataGridTable
						list={trashList}
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
