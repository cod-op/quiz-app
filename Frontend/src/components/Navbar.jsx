import React from 'react'
import {navbarStyles} from '../assets/datastyle'
import { Link ,NavLink, useNavigate} from 'react-router-dom'
import { FiAward } from "react-icons/fi";
import { useState,useEffect } from 'react';
import { CiLogin, CiLogout} from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { Award, X } from "lucide-react";



function Navbar({logoSrc}) {

 const navigate=useNavigate();
 const [loggedIn,setLoggedIn]=useState(false);
 const [menuOpen,setMenuOpen]=useState(false);

 //useeffect hook to show the login state change
  useEffect(() => {
    try {
      const u = localStorage.getItem("authToken");
      setLoggedIn(!!u);
    } catch (e) {
      setLoggedIn(false);
    }

    const handler = (ev) => {
      const detailUser = ev?.detail?.user ?? null;
      setLoggedIn(!!detailUser);
    };
    window.addEventListener("authChanged", handler);

    return () => window.removeEventListener("authChanged", handler);
  }, []);

//LOGOUT FUNCTION
const handlelogout=()=>{
  try{
      localStorage.removeItem('authToken');
      localStorage.clear();
  }
  catch(error){

  }
  window.dispatchEvent(
    new CustomEvent("authChanged",{detail:{user:null}})
  );
  setMenuOpen(false);
  try{
    navigate('/login');
  }
  catch(error){
    window.location.href='/login';
  }
};


  return (
    <nav className={navbarStyles.nav}>
     <div
        className={navbarStyles.decorativePattern}
        style={{
          backgroundImage: navbarStyles.decorativePatternBackground,
        }}
      ></div>

     <div className={navbarStyles.bubble1}></div>
      <div className={navbarStyles.bubble2}></div>
       <div className={navbarStyles.bubble3}></div>

    <div className={navbarStyles.container}>
      <div className={navbarStyles.logoContainer}>
         <Link to='/' className={navbarStyles.logoButton}>
         
         <div className={navbarStyles.logoInner}>
              <img
                src={
                  logoSrc ||
                  "https://yt3.googleusercontent.com/eD5QJD-9uS--ekQcA-kDTCu1ZO4d7d7BTKLIVH-EySZtDVw3JZcc-bHHDOMvxys92F7rD8Kgfg=s900-c-k-c0x00ffffff-no-rj"
                }
                alt="QuizMaster logo"
                className={navbarStyles.logoImage}
              />
         </div>
         </Link>
      </div>

       <div className={navbarStyles.titleContainer}>
           <div className={navbarStyles.titleBackground}>
               <h1 className={navbarStyles.titleText}> Software Developer Quiz Application</h1>
           </div>
       </div>

       <div className={navbarStyles.desktopButtonsContainer}>
            <div className={navbarStyles.spacer}></div>
            <NavLink to='/result' className={navbarStyles.resultsButton}>
                 <FiAward className={navbarStyles.buttonIcon} />
                 My Result
            </NavLink>

            {loggedIn?(
              <button onClick={handlelogout} className={navbarStyles.logoutButton}>
                <CiLogout className={navbarStyles.buttonIcon}/>
                Logout
              </button>
            ):(
              <NavLink to='/login' className={navbarStyles.loginButton}>
                <CiLogin className={navbarStyles.buttonIcon}/>
                Login
              </NavLink>
            )}
       </div>


       <div className={navbarStyles.mobileMenuContainer}>
             <button onClick={()=>setMenuOpen((s)=> !s)} className={navbarStyles.menuToggleButton}>
                  {menuOpen?(
                    <X className={navbarStyles.menuIcon}/>
                  ):(
                    <IoMdMenu className={navbarStyles.menuIcon}/>
                  )}
             </button>
             {menuOpen && (
              <div className={navbarStyles.mobileMenuPanel}>
                <ul className={navbarStyles.mobileMenuList}>
                  <li>
                    <NavLink
                    to='/result'
                    className={navbarStyles.mobileMenuItem}
                    onClick={()=>setMenuOpen(false)}>
                      <Award className={navbarStyles.mobileMenuIcon}/>
                      My result
                    </NavLink>
                  </li>

                  {loggedIn?(
                    <li>
                        <button type='button' onClick={handlelogout} className={navbarStyles.mobileMenuItem}>
                          <CiLogout className={navbarStyles.mobileMenuIcon}/>
                          Logout
                        </button>
                    </li>
                  ):(
                    <li>
                      <NavLink to='/login' className={navbarStyles.mobileMenuItem}
                      onClick={()=>setMenuOpen(false)}>
                        <CiLogin className={navbarStyles.mobileMenuIcon}/>
                           Login
                      </NavLink>
                    </li>
                  )}

                    </ul>
                  </div>
             )}

       </div>

    </div>

  

  <style>{navbarStyles.animations}</style>
    </nav>
  )
}

export default Navbar