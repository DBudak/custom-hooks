import {useRef, useEffect} from 'react';

const useRenderDebugger = (componentName, props, state) => {
  const consoleColors = ['#E91E63','#9C27B0','#673AB7','#3F51B5','#2196F3','#03A9F4','#00BCD4','#009688','#4CAF50','#8BC34A','#CDDC39','#E651007','#795548'];
  const prevProps = useRef(props);
  const prevState = useRef(state);
  const groupColor = useRef(consoleColors[Math.floor(Math.random() * consoleColors.length)]);

  const _isObject = o => typeof o === 'object' && o !== null
  const _isEmptyObject = o => _isObject(o) && Object.keys(o).length === 0;
  const _getObjectPropByPath = (o, path) => path.split('.').reduce((acc, k) => {
    return acc ? (acc[k] || undefined) : acc
  }, o);

  const _buildChangesReport = (a, b, key = "") => {
    if(!_isObject(a) && !_isObject(b)) return a === b ? 'unchanged' : 'changed';
    if(!a && b) return `changed, from ${a} to truthy value`;
    if(a && !b) return `changed, from truthy value to ${b}`;
    if(_isEmptyObject(a) && _isEmptyObject(b)) return `unchanged`;
    return Object.keys(a).reduce((acc, curKey) => {
      const path = key + (key ? '.' + curKey : curKey),
        value = a[curKey] === _getObjectPropByPath(b, path) ? 'unchanged' : 'changed';
        acc[curKey] = _isObject(a[curKey]) ? _buildChangesReport(a[curKey], b, path) : value;
      return acc; 
    }, {});
  };

  const _logGroup = (groupName, color, contents) => {
    console.groupCollapsed(`%c${groupName}`, `color: ${color}`);
    console.info(contents);
    console.groupEnd();
  }

  const _logger = (componentName, props, prevProps, propsReport, state, prevState, stateReport) => {
    console.groupCollapsed(`%c[${componentName}] was rerendered.`, `color:${groupColor.current}`);
    _logGroup('Old Props', '#9e9e9e', prevProps);
    _logGroup('New Props', '#009688', props);
    _logGroup('Prop Changes', '#607d8b', propsReport);  
    _logGroup('Old State', '#9e9e9e', prevState);
    _logGroup('New State', '#009688', state);
    _logGroup('State Changes', '#607d8b', stateReport);  
    console.groupEnd();
  }

  useEffect(() => {
    const propsReport = _buildChangesReport(prevProps.current, props),
      stateReport = _buildChangesReport(prevState.current, state);
    _logger(componentName, props, prevProps.current, propsReport, state, prevState.current, stateReport);
    prevProps.current = props;
    prevState.current = state;
  })
};

export default useRenderDebugger;