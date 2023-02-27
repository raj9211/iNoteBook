import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    }
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/chart" ? "active" : ""}`} to="/chart">Chart</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                        </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
        // <>
        //     <div className="container-fluid">
        //         <div className="row flex-nowrap">
        //             <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        //                 <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        //                     <Link to="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        //                         <span className="fs-5 d-none d-sm-inline">iNoteBook</span>
        //                     </Link>
        //                     <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
        //                         <li className="nav-item">
        //                             <Link className={`nav-link align-middle px-0 ${location.pathname === "/" ? "active" : ""}`} to="/">
        //                                 <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
        //                             </Link>
        //                         </li>
        //                         <li>
        //                             <Link data-bs-toggle="collapse" className={`nav-link px-0 align-middle ${location.pathname === "/" ? "active" : ""}`} to="/">
        //                                 <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
        //                             <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
        //                                 <li className="w-100">
        //                                     {!localStorage.getItem('token') ? <form className="d-flex" role="search">
        //                                         <Link className="nav-link px-0" to="/login">Login</Link>
        //                                     </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
        //                                 </li>
        //                                 <li>
        //                                     {!localStorage.getItem('token') ? <form className="d-flex" role="search">
        //                                         <Link className="nav-link px-0" to="/signup">Signup</Link>
        //                                     </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
        //                                 </li>
        //                             </ul>
        //                         </li>
        //                         <li>
        //                             <Link className={`nav-link px-0 align-middle ${location.pathname === "/about" ? "active" : ""}`} to="/about">
        //                                 <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">About</span></Link>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             {/* <div className="col py-3">
        //                 <h3>Left Sidebar with Submenus</h3>
        //                 <p className="lead">
        //                     An example 2-level sidebar with collasible menu items. The menu functions like an "accordion" where only a single
        //                     menu is be open at a time. While the sidebar itself is not toggle-able, it does responsively shrink in width on smaller screens.</p>
        //                 <ul className="list-unstyled">
        //                     <li><h5>Responsive</h5> shrinks in width, hides text labels and collapses to icons only on mobile</li>
        //                 </ul>
        //             </div> */}
        //         </div>
        //     </div>
        // </>
    )
}

export default Navbar
