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
      isInputFocused: false,
      dateFormat: 'YYYY-MM-DD',
      localDateFormat: moment.localeData().longDateFormat('L')
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
    }
  },
  methods: {
    changeDate: function(evt) {
      this.updateValue(evt.date);
    },
    updateValue: function(date) {
      if (date) {
        this.value = moment(date).locale('en').format(this.dateFormat);
      }

      this.highlightError();
      this.$emit('_input', this.name, this.value);
    }
  },
  created: function() {
    if (this.defaultValueSource !== 'default') {
      this.setValueFromDefaultSettings({ source: this.defaultValueSource, key: this.defaultValueKey });
    }

    if (!this.value || this.autofill === 'always') {
      // HTML5 date field wants YYYY-MM-DD format
      this.value = moment().locale('en').format(this.dateFormat);
      this.empty = false;
    }

    this.$emit('_input', this.name, this.value);
  },
  mounted: function() {
    var $vm = this;

    var params = {
      format: {
        toDisplay: function(date) {
          return moment(date).format($vm.localDateFormat);
        },
        toValue: function(date) {
          return date;
        }
      },
      todayHighlight: true,
      autoclose: true
    };

    if (Fliplet.Env.get('platform') === 'web') {
      this.datePicker = $(this.$el).find('input.date-picker').datepicker(params).on('changeDate', this.changeDate);
      this.datePicker.datepicker('setDate', new Date(this.value) || new Date());
    }

    $vm.$v.$reset();
  },
  watch: {
    value: function(val) {
      if (!val) {
        this.updateValue();
      }
    }
  }
});
