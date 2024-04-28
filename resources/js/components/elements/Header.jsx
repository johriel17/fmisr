import React from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuthContext } from "../../hooks/useAuthContext";
const Header = () => {
    const {user, dispatch} = useAuthContext()

    const handleLogout = async() => {

        localStorage.removeItem('user')
        const logout = await axios.post('/api/logout')
        dispatch({type: 'LOGOUT'})

    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a
                        className="nav-link"
                        data-widget="pushmenu"
                        href="#"
                        role="button"
                    >
                        <i className="fas fa-bars"></i>
                    </a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown4"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {user&& user.name}
                    </a>
                    <div
                        className="dropdown-menu dropdown-menu-right"
                        aria-labelledby="navbarDropdown4"
                    >
                        <a className="dropdown-item" href="#">
                            Profile
                        </a>
                        <a className="dropdown-item" href="#">
                            Support
                        </a>
                        <div className="dropdown-divider" />
                        <a onClick={handleLogout} className="dropdown-item" href="#">
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Header;
