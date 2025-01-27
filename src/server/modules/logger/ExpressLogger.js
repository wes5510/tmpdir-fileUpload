import expressBunyanLogger from 'express-bunyan-logger';

import LoggerUtils from './LoggerUtils';

const ExpressLogger = {
  use: (app) => {
    app.use(expressBunyanLogger({
      streams: [{
        level: LoggerUtils.level.express,
        stream: LoggerUtils.stream || null,
      }],
    }));
  },
};

export default ExpressLogger;
