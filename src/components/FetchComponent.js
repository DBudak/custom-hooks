import { useEffect, useRef, useState } from 'react';
import useRenderDebugger from '../hooks/renderDebugger';

const _getOptions = (method, body, headers,mode,cache,credentials,redirect,referrerPolicy) => {
  let options = {};
  if(method) options.method = method;
  if(body) options.body = body;
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


const useFetch = (url, method='GET', body, headers) => {
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

  useEffect(() => {
    //fixed infinite loop call was caused by body object being recreated on every rerender
    if(url){
      _doFetch(url, method, body, headers)
        .then(async res => {
          const json = await res.json();
          _setSuccessState(json, res.status);
        })
        .catch(async err => {
          const json = await err.json();
          _setFailedState(json, err.status);
        });
    }
  }, [url, method, body, headers]);

  return [state.res, state.error, state.status, state.statusCode];
};

const FetchComponent = () => {

  const [getResponse, getError, getStatus, getStatusCode] = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  const [getFailedResponse, getFailedError, getFailedStatus, getFailedStatusCode] = useFetch('https://jsonplaceholder.typicode.com/123123/');

  const [postResponse, postError, postStatus, postStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/posts', 
    'POST', 
    JSON.stringify({title: 'foo', body: 'bar', userId: 533})
  );
  console.log('I rerendered');

  return (
    <div>
      <div>Fetch component example</div>
      <div>Using https://jsonplaceholder.typicode.com/guide/</div>
      <div>
        <h3>Get (Success):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(getResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(getError)}</div>
        <div><strong>Status</strong></div>
        <div>{getStatus} {getStatusCode}</div>
      </div>
      <div>
        <h3>Get (Fail):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(getFailedResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(getFailedError)}</div>
        <div><strong>Status</strong></div>
        <div>{getFailedStatus} {getFailedStatusCode}</div>
      </div>
      <div>
        <h3>POST (Success):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(postResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(postError)}</div>
        <div><strong>Status</strong></div>
        <div>{postStatus} {postStatusCode}</div>
      </div>
      
    </div>
  ); 
};

export default FetchComponent;