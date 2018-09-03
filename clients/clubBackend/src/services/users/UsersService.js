import axios from 'axios';
import { BACK_USER_MANAGER_URL } from '../../constants';
import store from '../../redux/store/store';
import { globalDialog } from '../../redux/actions/globalDialog';

export class UserService {


    /**
     * Makes a request to receive list of users.
     * 
     * @param {*} userData 
     * @param {(userData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */
    static getUsers(onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}users`,
            params: { 
                //customerId: customerId
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.users) {
                if(onComplete != null)
                    onComplete(response.data.users);
            } else {
                if(onError != null)
                    onError(response.data.message);
                store.dispatch(globalDialog(response.data.message));
            }
        }).catch(error => {
            if(onError != null)
                onError(error);
            store.dispatch(globalDialog(error));
        });
    }

    /**
     * Makes a request to receive a user
     * 
     * @param {*} userData 
     * @param {(userData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */
    static getUser(userId, onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}users/${userId}`,
            params: { 
                //customerId: customerId
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.user) {
                onComplete(response.data.user);
            } else {
                if(onError != null)
                    onError(response.data.message);
                store.dispatch(globalDialog(response.data.message));
            }
        }).catch(error => {
            if(onError != null)
                onError(error);
            store.dispatch(globalDialog(error));
        });
    }

    /**
     * Makes a request to create a user.
     * 
     * @param {*} customerData 
     * @param {(customerData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */
    static createUser(userData, customerId, onComplete, onError) {
        axios({
            method: 'POST',
            url: `${BACK_USER_MANAGER_URL}users/create`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email:userData.email,
                phone:userData.phone,
                customerId: customerId,
                roles: userData.roles
            }
        }
        ).then(response => {
            if (response.data.status === 'created') {
                onComplete();
            } else {
                if(onError != null)
                    onError(response.data.message);
                store.dispatch(globalDialog(response.data.message));
            }
        }).catch(error => {
            if(onError != null)
                onError(error);
            store.dispatch(globalDialog(error));
        });
    }

    /**
     * Makes a request to edit a user.
     * 
     * @param {*} customerData 
     * @param {(customerData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */
    static editUser(userId, userData, customerId, onComplete, onError) {
        axios({
            method: 'PUT',
            url: `${BACK_USER_MANAGER_URL}users/${userId}`,
            params: {
                userId: userId,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email:userData.email,
                phone:userData.phone,
                customerId: customerId,
                roles: userData.roles
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.user) {
                onComplete(response.data.user);
            } else {
                if(onError != null)
                    onError(response.data.message);
                store.dispatch(globalDialog(response.data.message));
            }
        }).catch(error => {
            if(onError != null)
                onError(error);
            store.dispatch(globalDialog(error));
        });
    }

    /**
     * Makes a request to remove a user.
     * 
     * @param {*} customerData 
     * @param {(customerData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */
    static deleteUser(userId, customerId, onComplete, onError) {
        axios({
            method: 'POST',
            url: `${BACK_USER_MANAGER_URL}customers/${customerId}/revoke-user`,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                userId: userId,
                customerId: customerId
            }
        }
        ).then(response => {
            if (response.data.status === 'ok') {
                onComplete();
            } else {
                if(onError != null)
                    onError(response.data.message);
                store.dispatch(globalDialog(response.data.message));
            }
        }).catch(error => {
            if(onError != null)
                onError(error);
            store.dispatch(globalDialog(error));
        });
    }
}