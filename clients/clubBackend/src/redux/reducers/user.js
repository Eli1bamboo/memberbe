import {
    SIGNIN, SIGNOUT,
    SIGNUP, UPDATE,
    EDIT_INFO,
    CHANGE_PASSWORD,
    RETRIEVE_PASSWORD,
    RETRIEVE_PASSWORD_STEP_TWO
} from '../actions/user';
import { UpdateUser } from '../actions/user';
import { AddFlashMessages } from '../actions/flashmessages';
import store from '../store/store';
import { ViewSiteAs }  from '../actions/session';
import axios from 'axios';
import { BACK_USER_MANAGER_URL } from '../../constants';
import { CustomersService } from '../../services/customers/CustomersService';

const userProfile = {
    email: '',
    token: '',
    error: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: '',
    userId: 0,
    viewAs: {customerId: '', customerName: ''}
};

export default function userReducer(state = userProfile, action) {
    switch (action.type) {
        case SIGNIN:
            axios({
                method: 'POST',
                url: `${BACK_USER_MANAGER_URL}users/login`,
                params: action.params,
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    var newState;
                    var data = response.data;
                    if (data.user && data.token) {
                        newState = Object.assign({}, state, {
                            token: data.token,
                            error: '',
                            email: data.user.email,
                            firstName: data.user.firstName,
                            lastName: data.user.lastName,
                            phone: data.user.phone,
                            roles: data.user.roles,
                            userId: data.user._id,
                            customerId: data.user.customerId
                        });
                        if (data.user.roles.indexOf('USER') === 0 || data.user.roles.indexOf('ADMIN') === 0) {
                            localStorage.setItem('user', JSON.stringify(newState));
                            localStorage.setItem('token', data.token);
                            let customerName = '';
                            CustomersService.getCustomer(data.user.customerId ,(u) => {
                                sessionStorage.setItem('customerId', data.user.customerId);
                                sessionStorage.setItem('customerName', u.name);
                                store.dispatch(ViewSiteAs(u.name, data.user.customerId));
                                newState.viewAs = { customerId: data.user.customerId, customerName: customerName };
                                setTimeout(() => store.dispatch(UpdateUser(newState)), 100);
                            });
                        } else if (data.user.roles.indexOf('SYS_ADMIN') === 0) {
                            localStorage.setItem('user', JSON.stringify(newState));
                            localStorage.setItem('token', data.token);
                            setTimeout(() => store.dispatch(UpdateUser(newState)), 100);
                        } else {
                            store.dispatch(AddFlashMessages([{ type: 'error', value: 'Unknown error, please contact administrator' }]));
                        }
                    } else {
                        store.dispatch(AddFlashMessages([{ type: 'error', value: data.message }]));
                        // console.log(response);
                        // store.dispatch(AddFlashMessages([{ type: 'error', value: 'Invalid credentials' }]));
                        // store.dispatch(UpdateUser({error: [{type: 'error', value: 'Invalid credentials'}]}));
                    }
                })
                .catch((error) => {
                    store.dispatch(AddFlashMessages([{ type: 'error', value: 'Error in server' }]));
                });
            return state;
        case SIGNUP:
            axios({
                method: 'POST',
                url: `${BACK_USER_MANAGER_URL}users/signup`,
                params: action.params,
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    var newState;
                    var data = response.data;
                    if (data.error) {
                        // store.dispatch(UpdateUser({error: [{type: 'error', value: data.message}]}));
                        store.dispatch(AddFlashMessages([{ type: 'error', value: data.message }]));
                    }
                    else if (data.user && data.token) {
                        newState = Object.assign({}, state, {
                            token: data.token,
                            error: '',
                            email: data.user.email,
                            firstName: data.user.firstName,
                            lastName: data.user.lastName,
                            phone: data.user.phone,
                            roles: data.user.roles,
                            userId: data.user._id
                        });
                        localStorage.setItem('user', JSON.stringify(newState));
                        localStorage.setItem('token', data.token);
                        setTimeout(() => store.dispatch(UpdateUser(newState)), 100);
                    } else {
                        // store.dispatch(UpdateUser({error: [{type: 'error', value: 'Invalid fields'}]}));
                        store.dispatch(AddFlashMessages([{ type: 'error', value: 'Invalid fields' }]));
                    }
                })
                .catch((/*error*/) => {
                    // setTimeout(()=>store.dispatch(UpdateUser({error: [{type: 'error', value: 'Invalid form'}]})), 100);;
                    store.dispatch(AddFlashMessages([{ type: 'error', value: 'Invalid form' }]));
                });
            return state;

        case CHANGE_PASSWORD:
            axios({
                method: 'POST',
                url: `${BACK_USER_MANAGER_URL}users/change-password`,
                params: action.params,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    var data = response.data;
                    if (data.status === 'ok')
                        store.dispatch(AddFlashMessages([{ type: 'success', value: 'Password Updated successfully' }]));
                    else
                        store.dispatch(AddFlashMessages([{ type: 'error', value: data.message }]));
                })
                .catch((error) => {
                    // setTimeout(()=>store.dispatch(UpdateUser({error: [{type: 'error', value: 'Invalid form'}]})), 100);;
                    store.dispatch(AddFlashMessages([{ type: 'error', value: 'Invalid Password' }]));
                });
            return state;

        case EDIT_INFO:
            axios({
                method: 'PUT',
                url: `${BACK_USER_MANAGER_URL}users/editInfo`,
                params: action.params,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    var data = response.data;
                    var newState;

                    if (data.status === 'updated'){
                        newState = Object.assign({}, state, {
                            email: data.user.email,
                            firstName: data.user.firstName,
                            lastName: data.user.lastName,
                            roles: data.user.roles,
                            userId: data.user._id,
                            customerId: data.user.customerId
                        });
                        console.log("newState");
                        console.log(newState);
                        localStorage.setItem('user', JSON.stringify(newState));
                        console.log(newState);
                        store.dispatch(UpdateUser(newState));
                        store.dispatch(AddFlashMessages([{ type: 'success', value: 'Info updated successfully' }]));
                    } else {
                        store.dispatch(AddFlashMessages([{ type: 'error', value: data.message }]));
                    }
                })
                .catch((error) => {
                    // setTimeout(()=>store.dispatch(UpdateUser({error: [{type: 'error', value: 'Invalid form'}]})), 100);;
                    store.dispatch(AddFlashMessages([{ type: 'error', value: 'Unnable to update user' }]));
                });
            return state;

        case RETRIEVE_PASSWORD:
            axios({
                method: 'POST',
                url: `${BACK_USER_MANAGER_URL}users/retrieve-password-step-one`,
                params: action.params
            }).then(response => {
                var data = response.data;
                if (data.status === 'ok')
                    store.dispatch(AddFlashMessages([{ type: 'success', value: 'Please review your email to restart your password ;)' }]));
                else
                    store.dispatch(AddFlashMessages([{ type: 'error', value: data.message }]));
            }).catch((error) => {
                console.log(error);
                store.dispatch(AddFlashMessages([{ type: 'error', value: 'Invalid Password' }]));
            });
            return state;

        case RETRIEVE_PASSWORD_STEP_TWO:
            axios({
                method: 'POST',
                url: `${BACK_USER_MANAGER_URL}users/retrieve-password-step-two`,
                params: action.params
            }).then(response => {
                var data = response.data;
                if (data.status === 'ok') {
                    store.dispatch(AddFlashMessages([{ type: 'success', value: 'Password Restarted successfully!' }]));
                    const newState = Object.assign({}, state, {
                        token: data.token,
                        error: '',
                        email: data.user.email,
                        firstName: data.user.firstName,
                        lastName: data.user.lastName,
                        roles: data.user.roles,
                        userId: data.user._id
                    });
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(newState));
                    setTimeout(() => store.dispatch(UpdateUser(newState)), 2000);
                }
                else
                    store.dispatch(AddFlashMessages([{ type: 'error', value: data.message }]));
            }).catch((error) => {
                store.dispatch(AddFlashMessages([{ type: 'error', value: 'Token expired' }]));
            });
            return state;

        case SIGNOUT:
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            sessionStorage.removeItem('customerId');
            sessionStorage.removeItem('customerName');
            return Object.assign({}, userProfile);
        case UPDATE:
            return Object.assign({}, state, action.user);
        default:
            return state;
    }
}
