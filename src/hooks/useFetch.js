
import {useState, useEffect} from 'react';

const _getOptions = (
  method, 
  body, 
  headers, 
  mode, 
  cache,
  credentials,
  redirect,
  referrerPolicy) => {
  let options = {};
  if(method) options.method = method;
  if(body) options.body = JSON.stringify(body);
  if(headers) options.headers = headers;
  if(mode) options.mode = mode;
  if(cache) options.cache = cache;
  if(credentials) options.credentials = credentials;
  if(redirect) options.redirect = redirect;
  if(referrerPolicy)  options.referrerPolicy = referrerPolicy;
  return options;
};

const _doFetch = (
  url, 
  method, 
  body, 
  headers,
  mode,
  cache,
  credentials,
  redirect,
  referrerPolicy) => fetch(url, _getOptions(method, body, headers, mode, cache, credentials, redirect, referrerPolicy))
  .then(res => {
    if(!res.ok) throw res;
    return res;
  });


const useFetch = ({
  url, 
  method='GET', 
  body, 
  headers, 
  mode, 
  cache, 
  credentials, 
  redirect, 
  referrerPolicy
}) => {

  const [state, setState] = useState({
    res: undefined,
    error: undefined,
    status: 'Fetching',
    statusCode: undefined
  });

  const _setSuccessState = (json, code) => {
    setState({
      res: json,
      error: undefined,
      status: 'Success',
      statusCode: code
    });
  };

  const _setFailedState = (json, code) => {
    setState({
      res: undefined,
      error: json,
      status: 'Failed',
      statusCode: code
    });
  };

  const _maybeParseJSON = async res => {
    try {
      const json =  await res.json();
      return json;
    } catch {
      return res;
    }
  };

  useEffect(() => {
    if(url){
      _doFetch(url, method, body, headers, mode, cache, credentials, redirect, referrerPolicy)
        .then(async res => {
          const json = await _maybeParseJSON(res);
          _setSuccessState(json, res.status);
        })
        .catch(async err => {
          const json = await _maybeParseJSON(err);
          _setFailedState(json, err.status);
        });
    }
  }, []); // eslint-disable-line

  return [state.res, state.error, state.status, state.statusCode];
};

export default useFetch;