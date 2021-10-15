import React, { useState, useContext } from 'react';
import './historyPage.scss';
import { removeToTrash } from '../../../firebase/services';
import { AppContext } from '../../../context/AppProvider';
import { HistoryToolbar } from '../components/CustomToolbar';
import DataGridTable from '../components/DataGridTable';
import RemoveWordDialog from '../components/RemoveWordDialog';

export default function History() {
	const { historyList } = useContext(AppContext);
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

	function CustomToolbar() {
		return <HistoryToolbar isBtnDisabled={isBtnDisabled} handleClickRemove={openDialog} />;
	}

	return (
		<>
			<DataGridTable
				list={historyList}
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
