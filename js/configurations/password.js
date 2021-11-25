Fliplet.FormBuilder.configuration('password', {
  watch: {
    autogenerateLength: function(val) {
      if (!isNaN(Number(val)) && Number(val) > 7) {
        return;
      }

      this.autogenerateLength = 8;
    },
    autogenerate: function(val) {
      if (!val) {
        return;
      }

      if (this.confirm) {
        Fliplet.Modal.alert({
          message: 'Password confirmation and autogeneration can\'t both be enabled. Enabling one disables the other.'
        });
      }

      this.confirm = false;
    }
  }
});
