/* 
 * created by: @andresdicamillo
 * mailto:pablo.donaire@membrify.com
 */
const ProductModel = require('../../models/product-model.js');
const { PRODUCT_TYPE_OPTIONS } = require('../../constants');

class ProductFactory {
  removeAll(){
    return ProductModel.remove({});
  }
  create(data={}) {
    const n = Math.random() * (10 - 1) + 1;
    var model = {
        sku: n,
        // stock: 1,
        productType: `Product Type ${n}`,
        type: PRODUCT_TYPE_OPTIONS[0],
        name: `Product ${n}`,
        description: `Description ${n}`,
        // customer: null,
    };
    model = Object.assign({}, model, data);
    var product = new ProductModel(model);
    return product.save();
  }
}
module.exports = new ProductFactory();