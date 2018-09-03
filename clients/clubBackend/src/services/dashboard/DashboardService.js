import axios from 'axios';
import { BACK_USER_MANAGER_URL } from '../../constants';
import store from '../../redux/store/store';
import { globalDialog } from '../../redux/actions/globalDialog';

export class DashboardService {

    /**
     * Makes a request to get stats for dashboard graphics.
     * 
     * @param {*} customerId
     * @param {(customerData)=>void} onComplete
     * @param {(string)=>void} onError
     */
    static getCustomersStats(onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}statsCustomers`,
            params: { 
                //customerId: customerId
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then(response => {
            if (response.data.customers) {
                onComplete(response.data.customers);
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
     * Makes a request to get stats for dashboard graphics.
     * 
     * @param {*} customerId
     * @param {(customerData)=>void} onComplete
     * @param {(string)=>void} onError
     */
    static getProductsStats(onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}statsProducts`,
            params: { 
                //customerId: customerId
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then(response => {
            if (response.data.products) {
                onComplete(response.data.products);
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
     * Makes a request to get stats for dashboard graphics.
     * 
     * @param {*} 
     * @param {(customerData)=>void} onComplete
     * @param {(string)=>void} onError
     */
    static getInventoryStats(onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}statsInventory`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then(response => {
            if (response.data.inventory) {
                const inventory = [];
                for (let i = 0; i < response.data.inventory.length; i += 1) {
                    inventory.push({ name: response.data.inventory[i]._id.value , value: response.data.inventory[i].total });
                }
                onComplete(inventory);
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
     * Makes a request to get stats for dashboard graphics.
     * 
     * @param {*} 
     * @param {(customerData)=>void} onComplete
     * @param {(string)=>void} onError
     */
    static getLoginlogsStats(onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}statsLoginlogs`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then(response => {
            if (response.data.loginlogs) {
                onComplete(response.data.loginlogs);
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