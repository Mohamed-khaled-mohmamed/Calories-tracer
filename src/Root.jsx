import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import style from './index.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Root() {
  const [isSidebarActive, setSidebarActive] = useState(false);

  return (
    <div className={style.rootContainer}>
      <button className={style.menuToggle} onClick={() => setSidebarActive(!isSidebarActive)}>
        {isSidebarActive ? '✕' : '☰'}
      </button>
      <div id={style.sidebar} className={isSidebarActive ? style.active : ''}>
        <nav>
          <ul>
            <li>
              <NavLink to="/Calories-tracer" className={({ isActive }) => (isActive ? style.linkActive : '')}  onClick={() => setSidebarActive(!isSidebarActive)}>Home</NavLink>
              {/* <Link to="/" onClick={() => setSidebarActive(!isSidebarActive)}>Home</Link> */}
            </li>
            <li>
            <NavLink to="tracer" className={({ isActive }) => (isActive ? style.linkActive : '')}  onClick={() => setSidebarActive(!isSidebarActive)}>Tracker</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div id={style.detail}>
        <Outlet />
      </div>
    </div>
  );
}
