import React, { Component, Fragment } from 'react';

import { withRouter, Link } from 'react-router-dom';

import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';

import LogoutButton from '../LogoutButton';

const styles = {
	root: {
		width: '100%',
		overflowX: 'auto'
	}
};

class Navigation extends Component {
	render() {
		return (
			<Fragment>
				<List>
					<Link to="/dashboard">
						<ListItem button>
							<ListItemIcon>
								<DashboardIcon />
							</ListItemIcon>
							<ListItemText primary="Dashboard" />
						</ListItem>
					</Link>
					<Link to="/users">
						<ListItem button>
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary="Users" />
						</ListItem>
					</Link>
					<Link to="/users/profile">
						<ListItem button>
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary="User Profile" />
						</ListItem>
					</Link>
					<Link to="/users/create">
						<ListItem button>
							<ListItemIcon>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary="User Create" />
						</ListItem>
					</Link>
				</List>
				<Divider />
				<List>
					<ListSubheader inset>Saved reports</ListSubheader>
					<ListItem button>
						<LogoutButton history={this.props.history} />
					</ListItem>
				</List>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	const { users } = state;

	return {
		users
	};
};

const enhance = compose(withStyles(styles), connect(mapStateToProps));

export default enhance(withRouter(Navigation));
