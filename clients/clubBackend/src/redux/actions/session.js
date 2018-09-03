export const VIEWAS = 'VIEWAS';

export function ViewSiteAs(customerName, customerId) {
    return {type: VIEWAS, customerName, customerId };
}