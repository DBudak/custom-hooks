import useFetch from '../hooks/useFetch';

const FetchComponent = () => {
  const [getResponse, getError, getStatus, getStatusCode] = useFetch({url:'https://jsonplaceholder.typicode.com/posts/1'});

  const [getFailedResponse, getFailedError, getFailedStatus, getFailedStatusCode] = useFetch({url:'https://jsonplaceholder.typicode.com/123123/'});

  const [postResponse, postError, postStatus, postStatusCode] = useFetch({
    url:'https://jsonplaceholder.typicode.com/posts', 
    method:'POST', 
    body:{title: 'foo', body: 'bar', userId: 533}
  });

  const [postFailedResponse, postFailedError, postFailedStatus, postFailedStatusCode] = useFetch({
    url:'https://jsonplaceholder.typicode.com/idonotexist', 
    method:'POST', 
    body:{title: 'foo', body: 'bar', userId: 533}
  });

  const [putResponse, putError, putStatus, putStatusCode] = useFetch({
    url:'https://jsonplaceholder.typicode.com/posts/1', 
    method:'PUT', 
    body:{id: 1, title: 'foo', body: 'bar', userId: 1}
  });

  const [putFailedResponse, putFailedError, putFailedStatus, putFailedStatusCode] = useFetch({
    url:'https://jsonplaceholder.typicode.com/posts/idonotexist', 
    method:'PUT', 
    body:{id: 1, title: 'foo', body: 'bar', userId: 1}
  });

  const [patchResponse, patchError, patchStatus, patchStatusCode] = useFetch({
    url: 'https://jsonplaceholder.typicode.com/posts/1', 
    method: 'PATCH', 
    body: {title: 'foo2'}
  });

  const [patchFailedResponse, patchFailedError, patchFailedStatus, patchFailedStatusCode] = useFetch({
    url: 'https://jsonplaceholder.typicode.com/dfsdfsd', 
    method: 'PATCH', 
    body: {id: 1, title: 'foo', body: 'bar', userId: 1}
  });

  const [deleteResponse, deleteError, deleteStatus, deleteStatusCode] = useFetch({
    url: 'https://jsonplaceholder.typicode.com/posts/1', 
    method: 'DELETE', 
    body: {title: 'foo2'}
  });

  const [deleteFailedResponse, deleteFailedError, deleteFailedStatus, deleteFailedStatusCode] = useFetch({
    url:'https://jsonplaceholder.typicode.com/dfsdfsd', 
    method:'DELETE',
  });

  const [fullResponse, fullError, fullStatus, fullStatusCode] = useFetch({
    url:'https://jsonplaceholder.typicode.com/posts',
    method:'POST',
    body:{
      title: 'foo',
      body: 'bar',
      userId: 11,
    },
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    },
    cache:'reload',
    credentials: 'same-origin',
    redirect: 'error',
    referrerPolicy:'origin',
    mode: 'cors'
  });

  const [corsFailResponse, corsFailError, corsFailStatus, corsFailStatusCode] = useFetch({
    url:'https://jsonplaceholder.typicode.com/posts',
    method:'POST',
    body:{
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    },
    cache:'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy:'no-referrer',
    mode: 'same-origin'
  });

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
        <div>{JSON.stringify(deleteFailedResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(deleteFailedError)}</div>
        <div><strong>Status</strong></div>
        <div>{deleteFailedStatus} {deleteFailedStatusCode}</div>
      </div>
      <div>
        <h3>All possible options/headers:</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(fullResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(fullError)}</div>
        <div><strong>Status</strong></div>
        <div>{fullStatus} {fullStatusCode}</div>
      </div>
      <div>
        <h3>CORS Failed:</h3>
        <div><strong>Response</strong></div>
        <div>{JSON.stringify(corsFailResponse)}</div>
        <div><strong>Error</strong></div>
        <div>{JSON.stringify(corsFailError)}</div>
        <div><strong>Status</strong></div>
        <div>{corsFailStatus} {corsFailStatusCode}</div>
      </div>
    </div>
  ); 
};

export default FetchComponent;