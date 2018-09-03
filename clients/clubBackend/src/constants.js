const BACK_USER_MANAGER_URL = process.env.REACT_APP_BACK_USER_MANAGER_URL;
const BACK_SEARCH_MANAGER_URL = process.env.REACT_APP_BACK_SEARCH_MANAGER_URL;
const METRC_API_SANDBOX = 'https://sandbox-api-or.metrc.com/';
const METRC_API_KEY_VENDOR_SANDBOX = 'NwREWGP-uO55gClKc6eAeO4xkhQPE5SAAJ2mlpBWfqIi1Ziq';
const METRC_API_KEY_SANDBOX = '4ABk0xpkhATaOhFgB81dses94sRCBA2jqV5xrAwX9fpUPZO6';
const testingStatusOptions = [
    'Testing Not Ordered',
    'Sample Collection Requested',
    'Testing In Process-Awaiting Results',
    'Test Results Available-PASS',
    'Test Results Available-Fail-IMPOUND',
    'R&D Test Results Available'
];
module.exports = {
    testingStatusOptions,
    BACK_USER_MANAGER_URL,
    BACK_SEARCH_MANAGER_URL,
    METRC_API_SANDBOX,
    METRC_API_KEY_SANDBOX,
    METRC_API_KEY_VENDOR_SANDBOX
};