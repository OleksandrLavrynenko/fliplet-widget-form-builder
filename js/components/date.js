var DATE_FORMAT = 'YYYY-MM-DD';
var LOCAL_DATE_FORMAT = moment.localeData().longDateFormat('L');

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
    dateControl: {
      get: function() {
        return moment(this.value).format(LOCAL_DATE_FORMAT);
      },
      set: function(date) {
        var dateFormat = moment(date).format(DATE_FORMAT);

        this.updateValue(dateFormat);
      }
    }
  },
  methods: {
    updateValue: function(value) {
      if (value) {
        this.value = value;
      }

      this.highlightError();
      this.$emit('_input', this.name, this.value);
    }
  },
  mounted: function() {
    var $vm = this;

    if (Fliplet.Env.get('platform') === 'web') {
      this.datePicker = $(this.$el).find('input.date-picker').datepicker({
        format: {
          toDisplay: function(date) {
            return moment(date).format(LOCAL_DATE_FORMAT);
          },
          toValue: function(date) {
            return date;
          }
        },
        todayHighlight: true,
        autoclose: true
      }).on('changeDate', function(e) {
        $vm.dateControl = moment(e.date).format(DATE_FORMAT);
        $vm.updateValue();
      });

      this.datePicker.datepicker('setDate', this.dateControl || new Date());
    }

    if (this.defaultValueSource !== 'default') {
      this.setValueFromDefaultSettings({ source: this.defaultValueSource, key: this.defaultValueKey });
    }

    if (!this.value || this.autofill === 'always') {
      // HTML5 date field wants YYYY-MM-DD format
      this.dateControl = moment().format(DATE_FORMAT);
      this.empty = false;
    }

    console.log(this.value, this.dateControl);

    this.$emit('_input', this.name, this.value);
    $vm.$v.$reset();
  },
  watch: {
    value: function(date) {
      console.log(date);

      if (!date) {
        this.updateValue(moment().format(DATE_FORMAT));
      }
    },
    dateControl: function(date) {
      console.log(date);
    }
  }
});
