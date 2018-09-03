export const GET_MY_CUSTOMERS = 'GET_MY_CUSTOMERS';
export const UPDATE_CUSTOMERS = 'UPDATE_CUSTOMERS';
export const DELETE_CUSTOMER = 'DELETE_CUSTOMER';
export const CREATE_CUSTOMER_USER = 'CREATE_CUSTOMER_USER';
export const GET_CUSTOMER_DATA = 'GET_CUSTOMER_DATA';

export function GetMyCustomers(params) {
    return {
        type: GET_MY_CUSTOMERS,
        params
    };
}

export function UpdateCustomers(data) {
    return {
        type: UPDATE_CUSTOMERS,
        data
    };
}
export function DeleteCustomer(customerId) {
    return {
        type: DELETE_CUSTOMER,
        customerId
    };
}
export function CreateCustomerUser(params) {
    return {
        type: CREATE_CUSTOMER_USER,
        params
    };
}
export function GetCustomerData(customerId) {
    return {
        type: GET_CUSTOMER_DATA,
        customerId
    };
}
