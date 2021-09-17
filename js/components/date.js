Fliplet.FormBuilder.field('date', {
  name: 'Date picker',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    },
    description: {
      type: String
    },
    autofill: {
      type: String,
      default: 'default'
    },
    defaultSource: {
      type: String,
      default: 'load'
    },
    empty: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      datePicker: null,
      isInputFocused: false
    };
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
  computed: {
    isWeb: function() {
      return Fliplet.Env.get('platform') === 'web';
    },
    isApplyCurrentDateField: function() {
      return this.autofill === 'always' || this.autofill === 'default';
    }
  },
  mounted: function() {
    var $vm = this;

    if (Fliplet.Env.get('platform') === 'web') {
      this.datePicker = $(this.$el).find('input.date-picker').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        autoclose: true
      });

      // Set an initial value as configured
      if (this.autofill !== 'empty') {
        this.datePicker.datepicker('setDate', new Date(this.value) || new Date());
      }

      // Attach changeDate listener after initial value is assigned
      this.datePicker.on('changeDate', function(e) {
        if (e.date) {
          $vm.value = TD(e.date, { format: 'L' });
        }

        $vm.updateValue();
      });
    }

    if (this.defaultValueSource !== 'default') {
      this.setValueFromDefaultSettings({ source: this.defaultValueSource, key: this.defaultValueKey });
    }

    if (!this.value || this.autofill === 'always') {
      // HTML5 date field wants YYYY-MM-DD format
      var now = new Date();

      this.value = TD(now, { format: 'L' });
      this.empty = false;
    }

    if (this.autofill === 'empty') {
      this.value = '';
      this.datePicker.datepicker('setDate', '');

      return;
    }

    this.$emit('_input', this.name, this.value, false, true);
    $vm.$v.$reset();
  },
  watch: {
    value: function(val) {
      if (!val && this.autofill !== 'empty') {
        var now = new Date();

        this.updateValue(TD(now, { format: 'L' }));
      }

      this.highlightError();
      this.$emit('_input', this.name, val, false, true);
    }
  }
});
