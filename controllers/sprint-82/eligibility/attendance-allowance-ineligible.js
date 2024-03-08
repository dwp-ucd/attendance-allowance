const {
    urls,
    match,
    registerController,
  } = require('../../../utils/controller');
  
  const config = {
    name: urls.attendanceAllowanceIneligible,
    previous: 
    [
        {
            page: urls.otherBenefits,
        }
    ]
  };
  
  module.exports = registerController(config.name, config);
