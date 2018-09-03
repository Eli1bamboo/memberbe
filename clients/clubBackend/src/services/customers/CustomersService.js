import axios from 'axios';
import { BACK_USER_MANAGER_URL } from '../../constants';
import store from '../../redux/store/store';
import { globalDialog } from '../../redux/actions/globalDialog';

export class CustomersService {

    /**
     * Makes a request to create a customer.
     * 
     * @param {*} customerData 
     * @param {(customerData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */
    static createCustomer(customerData, onComplete, onError) {
        axios({
            method: 'POST',
            url: `${BACK_USER_MANAGER_URL}customers`,
            params: { 
                name: customerData.name,
                accountName:customerData.accountName,
                accountType:customerData.accountType,
                website:customerData.website,
                billingAddress:customerData.billingAddress,
                phoneNumber:customerData.phoneNumber,
                installationAddress:customerData.installationAddress,
                annualSalesRevenue:customerData.annualSalesRevenue,
                annualVolume:customerData.annualVolume,
                annualVolumeUnit:customerData.annualVolumeUnit,
                shippingAddress:customerData.shippingAddress,
                email:customerData.email,
                accountSource:customerData.accountSource,
                industryVertical:customerData.industryVertical
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.customer) {
                onComplete(response.data.customer);
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
     * Makes a request to edit a customer.
     * 
     * @param {*} customerData
     * @param {(customerData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */
    static editCustomer(customerId, customerData, onComplete, onError) {
        axios({
            method: 'PUT',
            url: `${BACK_USER_MANAGER_URL}customers/${customerId}`,
            params: {
                name: customerData.name,
                accountName:customerData.accountName,
                accountType:customerData.accountType,
                website:customerData.website,
                billingAddress:customerData.billingAddress,
                phoneNumber:customerData.phoneNumber,
                installationAddress:customerData.installationAddress,
                annualSalesRevenue:customerData.annualSalesRevenue,
                annualVolume:customerData.annualVolume,
                annualVolumeUnit:customerData.annualVolumeUnit,
                shippingAddress:customerData.shippingAddress,
                email:customerData.email,
                accountSource:customerData.accountSource,
                industryVertical:customerData.industryVertical
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.customer) {
                onComplete(response.data.customer);
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

    static getCustomer(customerId, onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}customers/${customerId}`,
            params: { 
                //customerId: customerId
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then(response => {
            if (response.data.customer) {
                onComplete(response.data.customer);
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

    static importCustomers(formData, onComplete = null, onError = null) {
        axios.post(BACK_USER_MANAGER_URL + 'customers/import', formData, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data' }
        }).then(response => {
            if (response.data.status === 'OK') {
                onComplete(response.data);
            } else {
                if(onError != null)
                    onError(response.data.message);
                store.dispatch(globalDialog(response.data.message));
            }
        }).catch(error => {
            if(onError != null)
                onError(error);
            store.dispatch(globalDialog(error));
        })
    }
}