import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	IconButton,
	Link,
	Badge,
	Typography,
	Popover,
	MenuItem,
	Divider,
	Menu,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { AuthContext } from '../../context/AuthProvider';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function UserNotification() {
	const [isNotified, setIsNotified] = useState(true);
	const [anchorEl, setAnchorEl] = useState(null);
	const isNotiOpen = Boolean(anchorEl);
	const notiId = isNotiOpen ? 'user-notification' : undefined;
	// const isMenuOpen = Boolean(anchorEl);
	// const id = isMenuOpen ? 'user-notification-menu' : undefined;
	// const handleMenuOpen = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };
	// const handleMenuClose = () => {
	// 	setAnchorEl(null);
	// };

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				size="large"
				aria-label=""
				color="inherit"
				aria-describedby={notiId}
				onClick={handleClick}
			>
				<Badge
					color="error"
					badgeContent=" "
					overlap="circular"
					variant="dot"
					invisible={!isNotified}
				>
					<NotificationsIcon />
				</Badge>
			</IconButton>
			<Popover
				id={notiId}
				open={isNotiOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				disableRestoreFocus
				sx={{maxWidth: '300px'}}
			>
				{isNotified ? (
					<>
						<MenuItem>
							<LibraryBooksIcon color="warning" fontSize="small" />
							{/* <Link
								component={RouterLink}
								to="/revision"
								underline="none"
								className="notification__link"
							> */}
							<RouterLink to="/revision" className="header__user">
								<Typography variant="subtitle2" sx={{ p: 1 }}>
									Word 'alibaba': Revise this word
								</Typography>
							</RouterLink>
							{/* </Link> */}
						</MenuItem>
						<MenuItem>
							<LibraryBooksIcon color="warning" fontSize="small" />
							<Typography variant="subtitle2" sx={{ p: 1 }} noWrap>
								Word 'alibabon': Revise this word in new page 
								Word 'alibabon': Revise this word in new page 
								Word 'alibabon': Revise this word in new page 
							</Typography>
						</MenuItem>
						<MenuItem>
							<LibraryBooksIcon color="warning" fontSize="small" />
							<Typography variant="subtitle2" sx={{ p: 1 }}>
								Word 'alibanam': Revise this word
							</Typography>
						</MenuItem>
						<Divider />
						<Link
							component={RouterLink}
							to="/revision"
							underline="hover"
							className="notification__link"
						>
							Go to Revision
						</Link>
					</>
				) : (
					'No Notifications'
				)}
			</Popover>
		</>
	);
}
