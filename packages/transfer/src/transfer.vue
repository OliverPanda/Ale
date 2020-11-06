<template>
  <div class="al-transfer">
    <transfer-panel
      v-bind="$props"
      ref="leftPanel"
      :data="sourceData"
      :title="titles[0] || t('el.transfer.titles.0')"
      :default-checked="leftDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onSourceCheckedChange">
      <slot name="left-footer"></slot>
    </transfer-panel>
    <div class="al-transfer__buttons">
      <al-button
        type="primary"
        :class="['al-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0">
        <i class="al-icon-arrow-left"></i>
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
      </al-button>
      <al-button
        type="primary"
        :class="['al-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0">
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i class="al-icon-arrow-right"></i>
      </al-button>
    </div>
    <transfer-panel
      v-bind="$props"
      ref="rightPanel"
      :data="targetData"
      :title="titles[1] || t('el.transfer.titles.1')"
      :default-checked="rightDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checked-change="onTargetCheckedChange">
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script>
export default {
  name: 'AlTransfer',
  props: {
  },
  components: {

  }
}
</script>

<style scoped lang="less">
</style>
