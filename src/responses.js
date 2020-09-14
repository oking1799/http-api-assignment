let requestType;

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, responseXML) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(responseXML);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  console.log(`TYPE : ${acceptedTypes[0]}`);
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
         <response>
            <message>This is a successful response</message>
            <id>Success</id>
          </response>
        `;
    return respondXML(request, response, 200, responseXML);
  }
  const responseJSON = {
    message: 'This is a successful response',
    id: 'Success',
  };
  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'success',
  };
  if (!params.valid || params.valid !== 'true') {
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `
           <response>
              <message>missing valid parameter set equal to true</message>
              <id>Bad Request</id>
            </response>
          `;
      return respondXML(request, response, 400, responseXML);
    }
    responseJSON.message = 'missing valid parameter set equal to true';
    responseJSON.id = 'Bad Request';
    return respondJSON(request, response, 400, responseJSON);
  }
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
         <response>
            <message>This request has the required parameters</message>
            <id>Success</id>
          </response>
        `;
    return respondXML(request, response, 200, responseXML);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
         <response>
            <message>The page you are looking for was not found.</message>
            <id>Not Found</id>
          </response>
        `;
    return respondXML(request, response, 404, responseXML);
  }

  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'Not Found',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'User is logged in.',
    id: 'Success',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    if (acceptedTypes[0] === 'text/xml') {
      const responseXML = `
           <response>
              <message>Missing loggedIn query parameter set to yes.</message>
              <id>Unauthorized</id>
            </response>
          `;
      return respondXML(request, response, 401, responseXML);
    }
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'Unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
         <response>
            <message>User is logged in</message>
            <id>success</id>
          </response>
        `;
    return respondXML(request, response, 200, responseXML);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
         <response>
            <message>you do not have access to this content</message>
            <id>Forbidden</id>
          </response>
        `;
    return respondXML(request, response, 403, responseXML);
  }
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'Forbidden',
  };

  return respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
         <response>
            <message>Internal server error, Something went wrong.</message>
            <id>Internal Error</id>
          </response>
        `;
    return respondXML(request, response, 500, responseXML);
  }
  const responseJSON = {
    message: 'Internal Server Error, Something went wrong.',
    id: 'Internal Error',
  };

  return respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `
         <response>
            <message>A get request has not been implemented yet. Check again later for updated content</message>
            <id>Not Implemented</id>
          </response>
        `;
    return respondXML(request, response, 501, responseXML);
  }
  const responseJSON = {
    message: 'A get request has not been implemented yet. Check again later for updated content',
    id: 'Not Implemented',
  };

  return respondJSON(request, response, 501, responseJSON);
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  requestType,

};
