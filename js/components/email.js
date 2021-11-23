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
  created: function() {
    if (this.value) {
      this.validateCharacters();
    }
  },
  methods: {
    validateCharacters: function() {
      // Remove invalid characters to avoid invisible characters
      this.value = this.value.replace(/([^a-zA-Z0-9!#$%&\'*@+-/=?^_`{|}~.]+)/gi, '');
    }
  },
  watch: {
    value: function(value) {
      if (value) {
        this.validateCharacters();
      }
    }
  }
});
