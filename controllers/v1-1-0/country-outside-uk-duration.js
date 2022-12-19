const {
  urls,
  validation,
  match,
  registerController,
} = require('../../utils/controller');

const config = {
  name: urls.countryOutsideUKDuration,
  next: [
    {
      page: urls.countryOutsideUKDurationInelgible,
      condition: {
        field: urls.countryOutsideUKDuration,
        value: 'yes',
        match: match.value,
      },
    },
    {
      page: urls.nationalInsurance,
    },
  ],
  validation: {
    type: validation.radios,
  },
};

module.exports = registerController(config.name, config);
