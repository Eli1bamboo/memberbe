import React, { Component } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../Login/actions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ClearIcon from '@material-ui/icons/Clear';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import UserCard from './UserCard';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	toolbar: {
		paddingRight: 24 // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36
	},
	menuButtonHidden: {
		display: 'none'
	},
	title: {
		flexGrow: 1
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9
		}
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		height: '100vh',
		overflow: 'auto'
	},
	chartContainer: {
		marginLeft: -22
	},
	tableContainer: {
		height: 320
	},
	greenAvatar: {
		margin: '10px 10px 10px 0',
		color: '#fff',
		backgroundColor: green[500]
	},
	redAvatar: {
		margin: '10px 10px 10px 0',
		color: '#fff',
		backgroundColor: red[500]
	},
	userHeader: {
		marginBottom: '15px',
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center'
	}
});

class UserCreate extends Component {
	constructor(props) {
		super();
		this.state = {
			open: true
		};
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, login } = this.props;

		const { active, email } = login.user;

		return (
			<React.Fragment>
				<div className={classes.appBarSpacer} />
				<div className={classes.userHeader}>
					{active ? (
						<Avatar className={classes.greenAvatar}>
							<VerifiedUserIcon />
						</Avatar>
					) : (
						<Avatar className={classes.redAvatar}>
							<ClearIcon />
						</Avatar>
					)}
					<Typography variant="display1">{email}sss</Typography>
				</div>
				<div className={classes.tableContainer}>
					<UserCard data={login.user} />
				</div>
			</React.Fragment>
		);
	}
}

UserCreate.propTypes = {
	classes: PropTypes.object.isRequired
};

function mapStateToProps({ login }) {
	return { login };
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, actions));

export default enhance(UserCreate);
