Fliplet.FormBuilder.field('email', {
  name: 'Email input',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    },
    description: {
      type: String
    }
  },
  validations: function() {
    var rules = {
      value: {
        email: window.validators.email
      }
    };

    if (this.required) {
      rules.value.required = window.validators.required;
    }

    return rules;
  },
  watch: {
    value: function(value) {
      if (value) {
        // Remove invalid characters to avoid invisible characters
        this.value = value.replace(/([^a-zA-Z0-9!#$%&\'*@+-/=?^_`{|}~.]+)/gi, '');
      }
    }
  }
});
