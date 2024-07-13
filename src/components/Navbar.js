import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import './Navbar.css';
import './AnimatedGif';
import logogif from './iocllogo1.gif'
const Navbar=()=>{
  const location = useLocation();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Set selected based on current path
    const currentPath = location.pathname.split('/')[1];
    setSelected(currentPath);
  }, [location]);

  const handleSelect = (option) => {
    setSelected(option);
  };

    return (
      <div>
        <header className='site-header fixed'>
  <div className="navbar nav-section fixed-top navbar-expand-lg navbar-light">
    <div className='row'>
      <div className='col-lg-3'>
        <div className='logo'>
          <a href="#"><img src={logogif} alt='IOCL Logo'/></a>
        </div>
      </div>
      <div className='col-lg-9'>
        <div className='header-right'>
          <div className='site-nav clearfix'>
            <ul className='clearfix'>
              <li className='has-sub'></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

      </div>
    )
  
}

export default Navbar
