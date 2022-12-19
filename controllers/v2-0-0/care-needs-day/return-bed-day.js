const {
  urls,
  match,
  validation,
  registerController,
} = require('../../../utils/controller');

const config = {
  name: urls.returnBedDay,
  previous: urls.bedDay,
  next: [
    {
      page: urls.washDay,
      condition: {
        field: urls.dayDifficulties,
        value: ['daytime-washing'],
        match: match.anyOne,
      },
    },
    {
      page: urls.dressDay,
      condition: {
        field: urls.dayDifficulties,
        value: ['daytime-dressing'],
        match: match.anyOne,
      },
    },
    {
      page: urls.movingIndoorsDay,
      condition: {
        field: urls.dayDifficulties,
        value: ['daytime-moving'],
        match: match.anyOne,
      },
    },
    {
      page: urls.toiletDay,
      condition: {
        field: urls.dayDifficulties,
        value: ['daytime-toilet'],
        match: match.anyOne,
      },
    },
    {
      page: urls.eatDrinkDay,
      condition: {
        field: urls.dayDifficulties,
        value: ['daytime-eating'],
        match: match.anyOne,
      },
    },
    {
      page: urls.medicationTreatmentDay,
      condition: {
        field: urls.dayDifficulties,
        value: ['daytime-medication'],
        match: match.anyOne,
      },
    },
    {
      page: urls.socialActivitiesDay,
      condition: {
        field: urls.dayDifficulties,
        value: ['daytime-hobbies'],
        match: match.anyOne,
      },
    },
    {
      page: urls.communicationDay,
      condition: {
        field: urls.dayDifficulties,
        value: ['daytime-communication'],
        match: match.anyOne,
      },
    },
    {
      page: urls.keepEyeIntroduction,
    },
  ],
  validation: [
    {
      type: validation.radios,
      name: 'return-bed-day',
    },
    {
      name: 'return-bed-day-times',
      type: validation.textInput,
      options: {
        minLength: 1,
        maxLength: 4,
      },
      errors: {
        required: 'Enter how many times do you need to get in and out of bed.',
      },
      condition: {
        field: 'return-bed-day',
        value: 'yes',
      },
    },
  ],
};

module.exports = registerController(config.name, config);
