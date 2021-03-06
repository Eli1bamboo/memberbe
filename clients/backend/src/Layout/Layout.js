import React, { Component } from 'react';

import { compose } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Navigation from '../Components/Navigation';
import TopBar from '../Components/TopBar';

import Routes from '../Routes';

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
	}
});

class Layout extends Component {
	constructor(props) {
		super();

		this.state = {
			open: true
		};
	}

	componentWillMount() {
		const { history, login } = this.props;

		const isAuth = login.isAuth;

		if (isAuth) {
			history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		const { login } = this.props;

		const isAuth = login.isAuth;

		if (isAuth) {
			this.setState({
				isAuth: true
			});
		}
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		const { open, isAuth } = this.state;

		return (
			<div>
				{isAuth ? (
					<React.Fragment>
						<CssBaseline />
						<div className={classes.root}>
							<TopBar pageTitle={'Layout'} open={open} handleDrawerOpen={this.handleDrawerOpen} />
							<Drawer
								variant="permanent"
								classes={{
									paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose)
								}}
								open={open}
							>
								<div className={classes.toolbarIcon}>
									<IconButton onClick={this.handleDrawerClose}>
										<ChevronLeftIcon />
									</IconButton>
								</div>
								<Divider />
								<Navigation />
							</Drawer>
							<main className={classes.content}>
								<Routes />
							</main>
						</div>
					</React.Fragment>
				) : (
					<Routes />
				)}
			</div>
		);
	}
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const { login } = state;

	return {
		login
	};
};

const enhance = compose(withStyles(styles), connect(mapStateToProps));

export default enhance(Layout);
