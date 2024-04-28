import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="#" className="brand-link">
                <span className="brand-text font-weight-light">
                    Inventory System
                </span>
            </a>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Dashboard
                                    {/* <i class="right fas fa-angle-left"></i> */}
                                </p>
                            </Link>
                            {/* <ul class="nav nav-treeview">
                <li class="nav-item">
                <a href="../../index.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Dashboard v1</p>
                </a>
                </li>
                <li class="nav-item">
                <a href="../../index2.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Dashboard v2</p>
                </a>
                </li>
                <li class="nav-item">
                <a href="../../index3.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Dashboard v3</p>
                </a>
                </li>
            </ul> */}
                        </li>
                        <li className="nav-item">
                            <Link to="/sale_logs" className="nav-link">
                                <i className="nav-icon fas fa-clipboard" />
                                <p>
                                    Sale Logs
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/frozens" className="nav-link">
                                <i className="nav-icon fas fa-icicles" />
                                <p>
                                    Frozen Foods
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/categories" className="nav-link">
                                <i className="nav-icon fas fa-folder" />
                                <p>
                                    Categories
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/brands" className="nav-link">
                                <i className="nav-icon fas fa-star" />
                                <p>
                                    Brands
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
};

export default Sidebar;
