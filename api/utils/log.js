(function () {
'use strict'

  /**
   * log the url and body when is a POST or PUT
  **/
  let logger = ((req,res,next) => {
    let _method = req.method,
    _body   = req.body,
    _path   = `${res.req.originalMethod}  ${res.req.originalUrl}`;

    console.log(_path);

    if (_method === 'POST' || _method === 'PUT') {
      console.log(_body);
    }

    next();
  });

  module.exports.log = logger;
})()
