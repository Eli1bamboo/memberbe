import axios from 'axios';
import { BACK_USER_MANAGER_URL } from '../../constants';
import store from '../../redux/store/store';
import { globalDialog } from '../../redux/actions/globalDialog';

export class ProductsService {

    /**
     * Makes a request to create a customer.
     * 
     * @param {*} productData 
     * @param {(customerData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */
    static createProduct(productData, onComplete, onError) {
        axios({
            method: 'POST',
            url: `${BACK_USER_MANAGER_URL}products`,
            params: { 
                sku: productData.sku,
                name: productData.name,
                description: productData.description,
                type: productData.type,
                productType: productData.productType
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.product) {
                onComplete(response.data.product);
            } else {
                if(onError != null)
                    onError(response.data.message);
                store.dispatch(globalDialog(response.data.message));
            }
        }).catch(error => {
            console.log(error);
            if(onError != null)
                onError(error);
            store.dispatch(globalDialog(error));
        });
    }

    static editProduct(productId, productData, onComplete, onError) {
        axios({
            method: 'PUT',
            url: `${BACK_USER_MANAGER_URL}products/${productId}`,
            params: { 
                customerId: sessionStorage.getItem('customerId'),
                sku: productData.sku,
                name: productData.name,
                description: productData.description,
                type: productData.type,
                productType: productData.productType,
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.product) {
                onComplete(response.data.product);
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

    static deleteProduct(productId, customerId, onComplete, onError) {
        axios({
            method: 'DELETE',
            url: `${BACK_USER_MANAGER_URL}products/${productId}`,
            params: {
                customerId: customerId
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if(response.data.status === 'deleted')
            {
                if(onComplete != null)
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

    static getProducts(onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}products`,
            params: { 
                //customerId: customerId
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.products) {
                if(onComplete != null)
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

    static getProduct(productId, onComplete = null, onError = null) {
        axios({
            method: 'GET',
            url: `${BACK_USER_MANAGER_URL}products/${productId}`,
            params: { 
                //customerId: customerId
            },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.product) {
                onComplete(response.data.product);
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