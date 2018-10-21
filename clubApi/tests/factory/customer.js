/* 
 * created by: @andresdicamillo
 * mailto:pablo.donaire@memberbe.com
 */
const CustomerModel = require('../../models/customer-model.js');
const {
    ACCOUNT_TYPE_OPTIONS,
    ANNUAL_SALES_REVENUE_OPTIONS,
    ANNUAL_VOLUME_UNIT_OPTIONS, 
    INDUSTRY_VERTICAL_OPTIONS,
    ACCOUNT_NAME_OPTIONS
} = require('../../constants.js');

class CustomerFactory {
  removeAll(){
    return CustomerModel.remove({});
  }
  create(data={}) {
    const n = Math.random() * (10 - 1) + 1;
    var model = {
        admin: null,
        name: `customer ${n}`,
        users: [],
        documents: [],
        accountName: ACCOUNT_NAME_OPTIONS[0],
        accountType: ACCOUNT_TYPE_OPTIONS[0],
        website: `myweb-${n}.com`,
        billingAddress: `Billing Address ${n}`,
        phoneNumber: `${n}`,
        installationAddress: `Insallation address ${n}`,
        annualSalesRevenue: ANNUAL_SALES_REVENUE_OPTIONS[0],
        annualVolume: 100,
        annualVolumeUnit: ANNUAL_VOLUME_UNIT_OPTIONS[0],
        shippingAddress: `My shipping address ${n}`,
        email: `customer.${n}@paclab-analytics.com`,
        accountSource: `Account source ${n}`,
        industryVertical: INDUSTRY_VERTICAL_OPTIONS[0],
    };
    model = Object.assign({}, model, data);
    var customer = new CustomerModel(model);
    return customer.save();
  }
}
module.exports = new CustomerFactory();