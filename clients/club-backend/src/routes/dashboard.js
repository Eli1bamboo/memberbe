// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import BubbleChart from '@material-ui/icons/BubbleChart'
import LocationOn from '@material-ui/icons/LocationOn'
import Notifications from '@material-ui/icons/Notifications'
import Unarchive from '@material-ui/icons/Unarchive'
// core components/views
import DashboardPage from 'views/Dashboard/Dashboard.js'
import UserProfile from 'views/UserProfile/UserProfile.js'
import TableList from 'views/TableList/TableList.js'
import Typography from 'views/Typography/Typography.js'
import Icons from 'views/Icons/Icons.js'
import Maps from 'views/Maps/Maps.js'
import NotificationsPage from 'views/Notifications/Notifications.js'
import UpgradeToPro from 'views/UpgradeToPro/UpgradeToPro.js'

const dashboardRoutes = [
  {
    path: '/dashboard',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: '/user',
    sidebarName: 'User Profile',
    navbarName: 'Profile',
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' }
]

export default dashboardRoutes
