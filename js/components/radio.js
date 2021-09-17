Fliplet.FormBuilder.field('radio', {
  name: 'Radios (single-select)',
  category: 'Multiple options',
  props: {
    description: {
      type: String
    },
    options: {
      type: Array,
      default: function() {
        return [
          {
            label: T('widgets.formBuilder.dataSource.radio.defaultOptions.option1')
          },
          {
            label: T('widgets.formBuilder.dataSource.radio.defaultOptions.option2')
          }
        ];
      }
    }
  },
  validations: function() {
    var rules = {
      value: {}
    };

    if (this.required) {
      rules.value.required = window.validators.required;
    }

    return rules;
  },
  methods: {
    clickHandler: function(option) {
      this.value = option.id || option.label;
      this.updateValue();
    },
    focusHandler: function(index) {
      var newIndex = index;

      if (index > this.options.length - 1) {
        newIndex = 0;
      } else if (index < 0) {
        newIndex = this.options.length - 1;
      }

      this.$refs.radioButton[newIndex].focus();
      this.clickHandler(this.options[newIndex]);
    }
  }
});
