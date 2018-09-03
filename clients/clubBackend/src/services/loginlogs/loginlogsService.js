import axios from 'axios';
import { BACK_USER_MANAGER_URL } from '../../constants';
import store from '../../redux/store/store';
import { globalDialog } from '../../redux/actions/globalDialog';

export class LoginlogsService {

    /**
     * Makes a request to get list of login logs.
     * 
     * @param {*} data 
     * @param {(customerData)=>void} onComplete 
     * @param {(string)=>void} onError 
     */

    static getLoginlogs(limit = null, onComplete = null, onError = null) {            
        axios(`${BACK_USER_MANAGER_URL}loginlogs`, {
            method: 'GET',
            params: { limit },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        ).then(response => {
            if (response.data.loginlogs) {
                if(onComplete != null)
                    onComplete(response.data.loginlogs);
            } else {
                if(onError != null)
                    onError(response.data.message);
                store.dispatch(globalDialog(response.data.message));
            }
        }).catch(error => {
            /*
            if(onError != null)
                onError(error);
            store.dispatch(globalDialog(error));
            */
        });
    }
}