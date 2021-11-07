import { Link } from 'react-router-dom';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import renderCellExpand from './ExpandGridCell';
import { useMemo } from 'react';

const CustomNoRowsOverlay = () => {
	return (
		<GridOverlay>
			<div>No words to show</div>
		</GridOverlay>
	);
};

export default function DataGridTable(props) {
	const {
		list,
		loading,
		pageSize,
		handleSetPageSize,
		handleSetIsBtnDisabled,
		selectionModel,
		handleSetSelectionModel,
		CustomToolbar,
	} = props;

	const columns = useMemo(
		() => [
			{ field: 'id', headerName: 'ID', width: 50, type: 'number' },
			// {
			// 	field: 'isInRevision',
			// 	headerName: 'Revision',
			// 	width: 100,
			// 	type: 'boolean',
			// },
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
			// {
			// 	field: 'actions',
			// 	headerName: 'Actions',
			// 	type: 'actions',
			// 	width: 80,
			// 	getActions: (params) => [
			// 		<GridActionsCellItem
			// 			// onClick={/* deleteUser(params.id) */ () => console.log('click', params)}
			// 		/>,
			// 	],
			// },
		],
		[]
	);

	return (
		<div style={{ height: 500, width: '100%' }}>
			<div style={{ display: 'flex', height: '100%' }}>
				<div style={{ flexGrow: 1 }}>
					<DataGrid
						rows={list}
						columns={columns}
						pageSize={pageSize}
						onPageSizeChange={(newPageSize) => handleSetPageSize(newPageSize)}
						rowsPerPageOptions={[5, 10, 15, 20]}
						checkboxSelection
						disableSelectionOnClick
						disableColumnMenu={true}
						selectionModel={selectionModel}
						onSelectionModelChange={(newSelectionModel) => {
							handleSetSelectionModel(newSelectionModel);
							handleSetIsBtnDisabled(newSelectionModel.length === 0);
						}}
						components={{
							Toolbar: CustomToolbar,
							NoRowsOverlay: CustomNoRowsOverlay,
						}}
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
}
