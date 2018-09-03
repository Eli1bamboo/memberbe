import {
    UPDATE_CUSTOMERS,
    GET_MY_CUSTOMERS,
    DELETE_CUSTOMER,
    CREATE_CUSTOMER_USER,
    GET_CUSTOMER_DATA,
    GetMyCustomers,
    GetCustomerData,
    UpdateCustomers
} from '../actions/customer';
import store from '../store/store';
import { AddFlashMessages } from '../actions/flashmessages';
import axios from 'axios';
import { BACK_USER_MANAGER_URL } from '../../constants';

const customers = { errors: [], customers: [], currentCustomer: {} };

export default function userReducer(state = customers, action) {
    switch (action.type) {
        case GET_MY_CUSTOMERS:
            axios(`${BACK_USER_MANAGER_URL}customers`, {
                method: 'GET',
                params: action.params,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    var data = response.data;
                    if (data.customers) {
                        setTimeout(() => store.dispatch(UpdateCustomers({ customers: data.customers })), 100);
                    } else {
                        // store.dispatch(UpdateCustomers({errors: [{type: 'error', value: 'Error in server'}]}));
                        store.dispatch(AddFlashMessages([{ type: 'error', value: 'Error in server' }]));
                    }
                })
                .catch(error => {
                    // setTimeout(()=>store.dispatch(UpdateCustomers({error: "Error in server"})), 100);;
                    store.dispatch(AddFlashMessages([{ type: 'error', value: 'Error in server' }]));
                });
            return state;

        case UPDATE_CUSTOMERS:
            var newState = Object.assign({}, state, action.data);
            return newState;

        case DELETE_CUSTOMER:
            axios({
                method: 'DELETE',
                url: `${BACK_USER_MANAGER_URL}customers/${action.customerId}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
            )
                .then(response => {
                    var data = response.data;
                    if (data.status === 'deleted') {
                        store.dispatch(AddFlashMessages([{ type: 'success', value: 'Customer deleted successfully' }]));
                        store.dispatch(GetMyCustomers());
                    } else {
                        store.dispatch(AddFlashMessages([{ type: 'error', value: 'Error in server' }]));
                    }
                })
                .catch(error => {
                    console.log(error);
                    // setTimeout(()=>store.dispatch(UpdateCustomers({error: "Error in server"})), 100);;
                    store.dispatch(AddFlashMessages([{ type: 'error', value: 'Error in server' }]));
                });
            return state;
        // return state

        case CREATE_CUSTOMER_USER:
            /* Case that will create a user and asociate the user
                         * to the customer, the user has to verify him email 
                         * @params to send: email, firstName, lastName, customerId(optional)*/

            axios({
                method: 'POST',
                url: `${BACK_USER_MANAGER_URL}users/create`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                params: action.params,
            })
                .then(response => {
                    var data = response.data;

                    if (data.status === 'created') {
                        store.dispatch(AddFlashMessages([{ type: 'success', value: 'User added successfully' }]));
                        store.dispatch(GetCustomerData(action.params.customerId));
                    } else {
                        store.dispatch(AddFlashMessages([{ type: 'error', value: data.message }]));
                    }
                })
                .catch((/*error*/) => {
                    store.dispatch(AddFlashMessages([{ type: 'error', value: 'Invalid form' }]));
                });
            return state;

        case GET_CUSTOMER_DATA:
            axios({
                method: 'GET',
                url: `${BACK_USER_MANAGER_URL}customers/${action.customerId}`,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
                .then(response => {
                    var data = response.data;
                    if (data.status === 'ok') {
                        setTimeout(() => store.dispatch(UpdateCustomers({ currentCustomer: data.customer })), 300);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    store.dispatch(AddFlashMessages([{ type: 'error', value: 'Error getting the customer data' }]));
                });
            return state;
        default:
            return state;
    }
}
