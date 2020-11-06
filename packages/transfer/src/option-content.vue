<script>
export default {
  name: 'optionContent',
  props: {
    option: Object
  },
  render (h) {
    const getParent = vm => {
      if (vm.$options.componentName === 'AlTransferPanel') {
        return vm;
      } else if (vm.$parent) {
        return getParent(vm.$parent);
      } else {
        return vm;
      }
    };
    const panel = getParent(this);
    const transfer = panel.$parent || panel;
    return panel.renderContent
      ? panel.renderContent(h, this.option)
      : transfer.$scopedSlots.default
        ? transfer.$scopedSlots.default({ option: this.option })
        : <span>{ this.option[panel.labelProp] || this.option[panel.keyProp] }</span>;
  },
  components: {
  }
}
</script>

<style scoped lang="less">
</style>
