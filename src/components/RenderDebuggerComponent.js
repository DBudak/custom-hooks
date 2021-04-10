import {useEffect, useRef, useState} from 'react';

const useRenderDebugger = (componentName, props, ...states) => {
  const prevProps = useRef();

  const _logger = (componentName, props, prevProps) => {
    console.groupCollapsed(`%cComponent ${componentName} was rerendered.`, 'color:#2196f3');
    console.groupCollapsed('%cOld Props:', 'color: #9e9e9e');
    console.info(prevProps);
    console.groupEnd();
    console.groupCollapsed('%cNew Props:', 'color: #009688');
    console.info(props);
    console.groupEnd();
    console.groupEnd();
  }

  const _isObject = o => typeof o === 'object' && o !== null
  const _isEmptyObject = o => _isObject(o) && Object.keys(o).length === 0;
  const _getObjectPropByPath = (o, path) => path.split('.').reduce((acc, k) => {
    return acc ? (acc[k] || undefined) : acc
  }, o);

  const _buildChangesReport = (a, b, key = "") => {
    //handle these edge cases
    if(a && !b) return 'changed, new object is falsy';
    if(!a && b) return 'changed, from falsy to truthy';
    return Object.keys(a).reduce((acc, curKey) => {
      const path = key + (key ? '.' + curKey : curKey),
        value = a[curKey] === _getObjectPropByPath(b, path) ? 'unchanged' : 'changed';
        acc[curKey] = _isObject(a[curKey]) ? _buildChangesReport(a[curKey], b, path) : value;
      return acc; 
    }, {})
  };

  

  useEffect(() => {
    const report = _buildChangesReport(prevProps.current, props);
    console.log('?', report);
    _logger(componentName, props, prevProps.current);
    console.log(process.env.NODE_ENV);
    prevProps.current = props;
  })
}

const ChildComponent = ({number, nestedObject}) => {

  useRenderDebugger('ChildComponent', {number, nestedObject})

  return (
    <div>
      Child Component; props: {number}
    </div>
  )
}

const RenderDebuggerComponent = () => {

  const [number, setNumber] = useState(Math.random());
  const [nestedObject, setNestedObject] = useState({foo: {bar: {fox: 'cat'}}});
  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      setNumber(Math.random());
      setNestedObject({foo: {bar: {fox: 'dog'}}})
    },10000);
    return () => {
      clearInterval(interval.current);
    }
  })

  return (
    <div>
      Render Debugger Example<br/>
      Parent Component; state: {number}
      <ChildComponent 
        number={number}
        nestedObject={nestedObject}
      />
    </div>
  )  
};

export default RenderDebuggerComponent;