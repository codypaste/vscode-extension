const rp = require('request-promise');

const initializeSnippetsClient = (snippetsServiceBaseUrl) => {

  const groupsEndpoint = `${snippetsServiceBaseUrl}snippets/groups`;
  const snippetsEndpoint = `${snippetsServiceBaseUrl}snippets/snippets`;  

  const postGroup = async (payload) => {
    const options = {
      method: "POST",
      uri: groupsEndpoint,
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
      json: true
    };

    return rp(options);
  };

  const postSnippet = async (payload) => {
    const options = {
      method: "POST",
      uri: snippetsEndpoint,
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
      json: true
    };
        
    return rp(options);
  };

  return {
    postGroup,
    postSnippet
  }
};

module.exports = { initializeSnippetsClient };
