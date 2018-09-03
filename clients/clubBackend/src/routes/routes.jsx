// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
// import ContentPaste from '@material-ui/icons/ContentPaste';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
// core components/views
import DashboardPage from '../views/Dashboard/Dashboard';
import UsersList from '../views/Users/List';
import UserProfile from '../views/UserProfile/UserProfile';
import TableList from '../views/TableList/TableList';
import Typography from '../views/Typography/Typography';
import Icons from '../views/Icons/Icons';
import Maps from '../views/Maps/Maps';
import NotificationsPage from '../views/Notifications/Notifications';

const routes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/users',
    sidebarName: 'Users',
    navbarName: 'Users List',
    icon: Person,
    component: UsersList
  },
  {
    path: '/user/:id',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile
  },
  {
    path: '/table',
    sidebarName: 'Table List',
    navbarName: 'Table List',
    icon: 'content_paste',
    component: TableList
  },
  {
    path: '/typography',
    sidebarName: 'Typography',
    navbarName: 'Typography',
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: '/icons',
    sidebarName: 'Icons',
    navbarName: 'Icons',
    icon: BubbleChart,
    component: Icons
  },
  {
    path: '/maps',
    sidebarName: 'Maps',
    navbarName: 'Map',
    icon: LocationOn,
    component: Maps
  },
  {
    path: '/notifications',
    sidebarName: 'Notifications',
    navbarName: 'Notifications',
    icon: Notifications,
    component: NotificationsPage
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' }
];

export default routes;
