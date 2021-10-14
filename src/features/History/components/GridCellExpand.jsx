import React, { useRef, useState, useEffect } from 'react';
import { Typography, Paper, Popper } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			alignItems: 'center',
			lineHeight: '24px',
			width: '100%',
			height: '100%',
			position: 'relative',
			display: 'flex',
			'& .cellValue': {
				whiteSpace: 'nowrap',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			},
		},
	})
);

function isOverflown(element) {
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
	const { width, value } = props;
	const wrapper = useRef(null);
	const cellDiv = useRef(null);
	const cellValue = useRef(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const classes = useStyles();
	const [showFullCell, setShowFullCell] = useState(false);
	const [showPopper, setShowPopper] = useState(false);

	const handleMouseEnter = () => {
		const isCurrentlyOverflown = isOverflown(cellValue.current);
		setShowPopper(isCurrentlyOverflown);
		setAnchorEl(cellDiv.current);
		setShowFullCell(true);
	};

	const handleMouseLeave = () => {
		setShowFullCell(false);
	};

	useEffect(() => {
		if (!showFullCell) {
			return undefined;
		}

		function handleKeyDown(nativeEvent) {
			if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
				setShowFullCell(false);
			}
		}

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setShowFullCell, showFullCell]);

	return (
		<div
			ref={wrapper}
			className={classes.root}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div
				ref={cellDiv}
				style={{
					height: 1,
					width,
					display: 'block',
					position: 'absolute',
					top: 0,
				}}
			/>
			<div ref={cellValue} className="cellValue">
				{value}
			</div>
			{showPopper && (
				<Popper
					open={showFullCell && anchorEl !== null}
					anchorEl={anchorEl}
					style={{ width, offsetLeft: -17 }}
				>
					<Paper elevation={1} style={{ minHeight: wrapper.current.offsetHeight - 3 }}>
						<Typography variant="body2" style={{ padding: 8 }}>
							{value}
						</Typography>
					</Paper>
				</Popper>
			)}
		</div>
	);
});

export default function renderCellExpand(params) {
	return (
		<GridCellExpand
			value={params.value ? params.value.toString() : ''}
			width={params.colDef.computedWidth}
		/>
	);
}
