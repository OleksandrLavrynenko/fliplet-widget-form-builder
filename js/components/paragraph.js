Fliplet.FormBuilder.field('paragraph', {
  name: 'Paragraph',
  category: 'Formatting',
  submit: false,
  props: {
    label: undefined,
    showLabel: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: function() {
        return T('widgets.formBuilder.dataSource.paragraph.valueDefault');
      }
    },
    canHide: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    htmlValue: function() {
      return this.value;
    }
  }
});
