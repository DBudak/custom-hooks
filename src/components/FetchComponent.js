import { useEffect, useRef, useState } from 'react';
import useRenderDebugger from '../hooks/renderDebugger';


const _getData = url => fetch(url)
  .then(res => {
    if(!res.ok) throw res;
    return res;
  });

const _postData = (url,body, header) => fetch(new Request(
  url,
  {
    method: 'POST',
    body: body,
    header: header
  }
))
  .then(res => {
    if(!res.ok) throw res;
    return res;
  });

const fetchMap = {
  'GET': _getData,
  'POST': _postData
};

const useFetch = (url, type='GET', body, header) => {
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
    //POST happens infinite amount of time, need to abstract fetch ,method and remove fetchMap
    if(url && type==='GET'){
      fetchMap[type](url)
        .then(async res => {
          const json = await res.json();
          _setSuccessState(json, res.status);
        })
        .catch(async err => {
          const json = await err.json();
          _setFailedState(json, err.status);
        });
    } else if(url && type && body) {
      fetchMap[type](url, body, header)
        .then(async res => {
          const json = await res.json();
          _setSuccessState(json, res.status);
        })
        .catch(async err => {
          const json = await err.json();
          _setFailedState(json, err.status);
        });
    }
  },[url, type, body, header]);

  return [state.res, state.error, state.status, state.statusCode];
};

const FetchComponent = () => {

  const [getResponse, getError, getStatus, getStatusCode] = useFetch('https://jsonplaceholder.typicode.com/posts/1');
  const [getFailedResponse, getFailedError, getFailedStatus, getFailedStatusCode] = useFetch('https://jsonplaceholder.typicode.com/123123/');

  const [postResponse, postError, postStatus, postStatusCode] = useFetch(
    'https://jsonplaceholder.typicode.com/posts', 
    'POST', 
    {title: 'foo', body: 'bar', userId: 1}
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
      
    </div>
  ); 
};

export default FetchComponent;