import React, {useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'


function Navbar() {

    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart


    const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
            <div class="btn-group me-3">
            <button type="button" className="btn btn-outline-success">
            <Link className="text-decoration-none" to="/contactform">Enquiry</Link>
            </button>
            </div>
            <div class="btn-group me-3">
            <button type="button" className="btn btn-outline-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Add
            </button>
            <ul class="dropdown-menu">
                <li><Link className="dropdown-item" to="/create_product">Create Product</Link></li>
                <li> <Link className="dropdown-item" to="/category">Create Category</Link></li>
            </ul>
            </div>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
            <Link to="/history"><i class="fas fa-history me-3"></i></Link>
            <Link to="/" onClick={logoutUser}><i class="fas fa-sign-out-alt"></i></Link>
            </>
        )
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light shadow">
            <div className="container d-flex justify-content-between align-items-center">
                
                <h1>
                    <Link className="navbar-brand text-success logo h1 align-self-center" to="/home">{isAdmin ? 'Admin' : 'Zay'}</Link>
                </h1>
                
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                <div className="flex-fill">
                    <ul className="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Shop</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>
                    </ul>
                </div>

               

            
                <div className="navbar align-self-center d-flex">
                   
                    {
                        isAdmin ? '' 
                        :<div className="cart-icon">
                            <Link className="nav-icon position-relative text-decoration-none" to="/cart">
                            <i className="fa fa-fw fa-cart-arrow-down text-dark mr-1" />
                            <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">{cart.length}</span>
                            </Link>
                        </div>
                    }
                   
                   {isAdmin && adminRouter()}

                {
                    isLogged ? loggedRouter() : <div>
                        <Link className="nav-icon position-relative text-decoration-none" to="/login"><i className="fa fa-fw fa-user text-dark mr-3" /></Link>
                        </div>
                }
                </div>
                </div>
            </div>
            </nav>
        </div>
    )
}

export default Navbar
