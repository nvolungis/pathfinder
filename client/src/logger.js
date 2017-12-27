const isDev = process.env.NODE_ENV === 'development';

const devLogger = {
  info  : console.info,
  log   : console.log,
  error : console.error,
};

const noop = () => null;

const testLogger = {
  info  : noop,
  log   : noop,
  error : noop,
};

const prodLogger = {
  info  : noop,
  log   : noop,
  error : noop,
};

const logger = () => {
  switch(process.env.NODE_ENV) {
    case 'development' : return devLogger;
    case 'test'        : return testLogger;
    case 'production'  : return prodLogger;
  }
};

export default logger();
