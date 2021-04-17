import { NavLink } from 'react-router-dom';

const NavigationComponent = () => {

  return(
    <nav>
      <NavLink exact to='/'>Home</NavLink>
      <NavLink to='/debugger'>Render Debugger Hook</NavLink>
      <NavLink to='/fetch'>Fetch Hook</NavLink>
    </nav>
  );
};

export default NavigationComponent;