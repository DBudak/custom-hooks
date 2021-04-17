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
  console.log('I rerendered');

  const [getResponse, getError, getStatus, getStatusCode] = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  const [getFailedResponse, getFailedError, getFailedStatus, getFailedStatusCode] = useFetch('https://jsonplaceholder.typicode.com/123123/');

  const [postResponse, postError, postStatus, postStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/posts', 
    'POST', 
    JSON.stringify({title: 'foo', body: 'bar', userId: 533})
  );
  const [postFailedResponse, postFailedError, postFailedStatus, postFailedStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/idonotexist', 
    'POST', 
    JSON.stringify({title: 'foo', body: 'bar', userId: 533})
  );

  const [putResponse, putError, putStatus, putStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/1', 
    'PUT', 
    JSON.stringify({id: 1, title: 'foo', body: 'bar', userId: 1})
  );
  const [putFailedResponse, putFailedError, putFailedStatus, putFailedStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/idonotexist', 
    'PUT', 
    JSON.stringify({id: 1, title: 'foo', body: 'bar', userId: 1})
  );

  const [patchResponse, patchError, patchStatus, patchStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/1', 
    'PATCH', 
    JSON.stringify({title: 'foo2'})
  );
  const [patchFailedResponse, patchFailedError, patchFailedStatus, patchFailedStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/dfsdfsd', 
    'PATCH', 
    JSON.stringify({id: 1, title: 'foo', body: 'bar', userId: 1})
  );
  const [deleteResponse, deleteError, deleteStatus, deleteStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/1', 
    'DELETE', 
    JSON.stringify({title: 'foo2'})
  );
  const [deleteFailedResponse, deleteFailedError, deleteFailedStatus, deleteFailedStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/dfsdfsd', 
    'DELETE' 
  );
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
      <div>
        <h3>POST (Fail):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(postFailedResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(postFailedError)}</div>
        <div><strong>Status</strong></div>
        <div>{postFailedStatus} {postFailedStatusCode}</div>
      </div>
      <div>
        <h3>PUT (Success):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(putResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(putError)}</div>
        <div><strong>Status</strong></div>
        <div>{putStatus} {putStatusCode}</div>
      </div>
      <div>
        <h3>PUT (Fail):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(putFailedResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(putFailedError)}</div>
        <div><strong>Status</strong></div>
        <div>{putFailedStatus} {putFailedStatusCode}</div>
      </div>
      <div>
        <h3>PATCH (Success):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(patchResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(patchError)}</div>
        <div><strong>Status</strong></div>
        <div>{patchStatus} {patchStatusCode}</div>
      </div>
      <div>
        <h3>PATCH (Fail):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(patchFailedResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(patchFailedError)}</div>
        <div><strong>Status</strong></div>
        <div>{patchFailedStatus} {patchFailedStatusCode}</div>
      </div>
      <div>
        <h3>DELETE (Success):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(deleteResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(deleteError)}</div>
        <div><strong>Status</strong></div>
        <div>{deleteStatus} {deleteStatusCode}</div>
      </div>
      <div>
        <h3>DELETE (Fail):</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(patchFailedResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(patchFailedError)}</div>
        <div><strong>Status</strong></div>
        <div>{deleteFailedStatus} {deleteFailedStatusCode}</div>
      </div>
      
    </div>
  ); 
};

export default FetchComponent;