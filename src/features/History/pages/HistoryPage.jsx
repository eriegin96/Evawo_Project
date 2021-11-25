import React, { useState, useContext } from 'react';
import './history.scss';
import { AppContext } from '../../../context/AppProvider';
import { HistoryToolbar } from '../components/CustomToolbar';
import DataGridTable from '../components/DataGridTable';
import RemoveWordDialog from '../components/RemoveWordDialog';
import { removeToTrash } from '../../../firebase/services';

export default function HistoryPage() {
	const { historyList, totalHistory, notRevisionList } = useContext(AppContext);
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

	function CustomToolbar() {
		return (
			<HistoryToolbar
				isViewMode={isViewMode}
				setIsViewMode={setIsViewMode}
				isBtnDisabled={isBtnDisabled}
				handleRemove={handleOpenDialog}
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
				handleClose={handleCloseDialog}
			/>
		</>
	);
}
