import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import renderCellExpand from './GridCellExpand';

export const columns = [
	{ field: 'id', headerName: 'ID', width: 50 },
	{
		field: 'word',
		headerName: 'Word',
		width: 150,
		renderCell: (params) => <Link to={`/history/${params.value}`}>{params.value}</Link>,
	},
	{
		field: 'phonetic',
		headerName: 'Phonetic',
		width: 100,
		sortable: false,
	},
	{
		field: 'type',
		headerName: 'Type',
		width: 80,
	},
	{
		field: 'definition',
		headerName: 'Definition',
		width: 400,
		sortable: false,
		renderCell: renderCellExpand,
	},
	{
		field: 'example',
		headerName: 'Example',
		width: 350,
		sortable: false,
		renderCell: renderCellExpand,
	},
	{
		field: 'origin',
		headerName: 'Origin',
		width: 200,
		sortable: false,
		renderCell: renderCellExpand,
	},
	{
		field: 'synonyms',
		headerName: 'Synonyms',
		width: 150,
		sortable: false,
		renderCell: renderCellExpand,
	},
	{
		field: 'antonyms',
		headerName: 'Antonyms',
		width: 100,
		sortable: false,
		renderCell: renderCellExpand,
	},
];

export default function DataGridTable(props) {
	const {
		list,
		pageSize,
		handleSetPageSize,
		handleSetSelectionModel,
		handleSetIsBtnDisabled,
		selectionModel,
		CustomToolbar,
	} = props;

	return (
		<>
			{list.length === 0 ? (
				<CircularProgress />
			) : (
				<div style={{ height: 500, width: '100%' }}>
					<div style={{ display: 'flex', height: '100%' }}>
						<div style={{ flexGrow: 1 }}>
							<DataGrid
								rows={list}
								columns={columns}
								pageSize={pageSize}
								onPageSizeChange={(newPageSize) => handleSetPageSize(newPageSize)}
								rowsPerPageOptions={[10, 15, 20]}
								checkboxSelection
								disableSelectionOnClick
								onSelectionModelChange={(newSelectionModel) => {
									handleSetSelectionModel(newSelectionModel);
									handleSetIsBtnDisabled(newSelectionModel.length === 0);
								}}
								selectionModel={selectionModel}
								disableColumnMenu={true}
								components={{
									Toolbar: CustomToolbar,
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
