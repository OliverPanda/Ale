<template>
  <div class="al-ransfer-panel">
    <p class="al-ransfer-panel__header">
      <al-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate">
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </al-checkbox>
    </p>
    
    <div :class="['al-ransfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <al-input
        class="al-ransfer-panel__filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable">
        <i slot="prefix"
          :class="['al-input__icon', 'al-icon-' + inputIcon]"
          @click="clearQuery"
        ></i>
      </al-input>
      <al-checkbox-group
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="al-ransfer-panel__list">
        <al-checkbox
          class="al-ransfer-panel__item"
          :label="item.key"
          :disabled="item.disabled"
          :key="item.key"
          v-for="item in filteredData">
          <option-content :option="item"></option-content>
        </al-checkbox>
      </al-checkbox-group>
      <p
        class="al-ransfer-panel__empty"
        v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p
        class="al-ransfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch">{{ t('el.transfer.noData') }}</p>
    </div>
    <p class="al-ransfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import AlCheckboxGroup from 'ale-ui/packages/checkbox-group';
import AlCheckbox from 'ale-ui/packages/checkbox';
import AlInput from 'ale-ui/packages/input';
import Locale from 'ale-ui/src/mixins/locale';
import OptionContent from './option-content'
import {
  reactive,
  computed
} from 'vue'

export default {
  name: 'AlTransferPanel',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: String,
    placeholder: String,
    filterable: {
      type: Boolean,
      default: false
    }
    // props: Object // 去掉属性映射
  },
  emits: {},
  mixins: [Locale],
  components: {
    OptionContent
  },
  setup (props, { emit }) {
    const state = reactive({
      checked: [],
      allChecked: false,
      query: '', // 搜索值
      inputHover: false,
      checkChangeByUser: true,
      inputHover: false, // 搜索框有值并且鼠标移入时, 动态切换按钮
      filteredData: computed(() => {
        return this.data.filter(item => {
          if (typeof this.filterMethod === 'function') {
            return this.filterMethod(this.query, item);
          } else {
            const label = item[this.labelProp] || item[this.keyProp].toString();
            return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }
        });
      }),
      inputIcon: computed(() => {
        return (
          this.query.length > 0 && this.inputHover
            ? 'circle-close'
            : 'search'
        )
      }),
      checkableData: computed(() => {
        return this.filteredData.filter(i => !i.disabled)
      }),
      checkedSummary: computed(() => {
        return `${this.checked} / ${this.data.length}`
      }),
      isIndeterminate: computed(() => {
        const checkedLength = this.checked.length
        return (
          checkedLength > 0 &&
          checkedLength < this.checkableData.length
        )
      }),
      hasFooter: computed(() => {
        return !!this.$slot.default
      })
    })

    return {
      ...state
    }
  },
  clearQuery () {
    this.query = ''
  },
  handleAllCheckedChange (value) {
    this.checked = value
      ? this.checkableData.map(i => i.key)
      : []
  },

}
</script>