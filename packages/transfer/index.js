import AlTansfer from './src/transfer';

/* istanbul ignore next */
AlTansfer.install = function (Vue) {
  Vue.component(AlTansfer.name, AlTansfer)
}
export default AlTansfer;
