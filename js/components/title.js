Fliplet.FormBuilder.field('title', {
  name: 'Title',
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
        return T('widgets.formBuilder.dataSource.title.defaultValue');
      }
    },
    canHide: {
      type: Boolean,
      default: false
    }
  }
});
