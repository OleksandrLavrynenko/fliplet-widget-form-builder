Fliplet.FormBuilder.field('password', {
  name: 'Password input',
  category: 'Text inputs',
  props: {
    placeholder: {
      type: String
    },
    hash: {
      type: Boolean,
      default: false
    },
    autogenerate: {
      type: Boolean,
      default: false
    },
    autogenerateLength: {
      type: Number,
      default: 10
    },
    confirm: {
      type: Boolean,
      default: false
    },
    passwordConfirmation: {
      type: String,
      default: ''
    },
    hasConfirmationError: {
      type: Boolean,
      default: false
    },
    saveProgress: {
      type: Boolean,
      default: false
    },
    populateOnUpdate: {
      type: Boolean,
      default: false
    },
    submitWhenFalsy: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    },
    validationStatus: {
      type: String,
      default: 'success'
    }
  },
  data: function() {
    return {
      isFocus: false,
      isPreview: Fliplet.Env.get('preview'),
      validationClasses: {
        success: 'panel-default',
        error: 'panel-danger'
      }
    };
  },
  validations: function() {
    var rules = {
      value: {
        required: window.validators.required,
        minLength: window.validators.minLength(8),
        validLength: function(value) {
          return this.$v.value.minLength && value;
        },
        containsUppercase: function(value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase: function(value) {
          return /[a-z]/.test(value);
        },
        containsNumber: function(value) {
          return /[0-9]/.test(value);
        },
        containsSpecial: function(value) {
          return /[#?!@$%^&*-]/.test(value);
        }
      },
      passwordConfirmation: {
        sameAsPassword: window.validators.sameAs('value')
      }
    };

    if (this.confirm) {
      rules.passwordConfirmation.sameAsPassword = window.validators.sameAs('value');
    }

    return rules;
  },
  computed: {
    fieldPlaceholder: function() {
      return this.autogenerate ? 'A password will be automatically generated' : this.placeholder;
    },
    validationClass: function() {
      if (this.validationStatus) {
        return this.validationClasses[this.validationStatus];
      }

      return this.validationClasses.success;
    }
  },
  mounted: function() {
    if (this.autogenerate && !this.value) {
      this.value = this.generateRandomPassword(this.autogenerateLength);
      this.updateValue();
    }
  },
  methods: {
    generateRandomPassword: function(length) {
      var alphabet = 'abcdefghijklmnopqrstuvwxyz!#$%&*-ABCDEFGHIJKLMNOP1234567890';
      var password = '';

      for (var x = 0; x < length; x++) {
        password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      }

      return password;
    },
    updatePasswordConfirmation: function() {
      this.$v.passwordConfirmation.$touch();
      this.highlightError();
    },
    onPasswordConfirmationInput: function($event) {
      this.$emit('_input', this.name, $event.target.value, true, true);
    }
  }
});
