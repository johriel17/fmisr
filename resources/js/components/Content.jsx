import React from "react";
import { Routes, Route } from "react-router-dom";

//pages
import Dashboard from "../pages/Dashboard";

//Frozens
import FrozenIndex from '../pages/frozens/index'
import FrozenAdd from '../pages/frozens/add'
import FrozenView from '../pages/frozens/view'
import FrozenEdit from '../pages/frozens/edit'

//categories
import CategoryIndex from '../pages/categories/index'
import CategoryAdd from '../pages/categories/add'
import CategoryView from '../pages/categories/view'
import CategoryEdit from '../pages/categories/edit'
//brands
import BrandsIndex from '../pages/brands/index'
import BrandsAdd from '../pages/brands/add'
import BrandsView from '../pages/brands/view'
import BrandsEdit from '../pages/brands/edit'
//saleLogs
import SaleLogIndex from '../pages/sale_logs/index'
import SaleLogAdd from '../pages/sale_logs/add'
import SaleLogView from '../pages/sale_logs/view'
import SaleLogEdit from '../pages/sale_logs/edit'
import NavigationButtons from "./NavigationButtons";

const Content = () => {
    return (
        <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="row mb-2 pt-2">
                            <NavigationButtons />
                        </div>
                    </div>
                </section>
            <Routes>

                <Route path="/" element={<Dashboard/>} />
                <Route path="frozens">
                    <Route path="" element={<FrozenIndex />} />
                    <Route path="add" element={<FrozenAdd />} />
                    <Route path="view/:id" element={<FrozenView />} />
                    <Route path="edit/:id" element={<FrozenEdit />} />
                </Route>
                <Route path="categories">
                    <Route path="" element={<CategoryIndex />} />
                    <Route path="add" element={<CategoryAdd />} />
                    <Route path="view/:id" element={<CategoryView />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                </Route>
                <Route path="brands">
                    <Route path="" element={<BrandsIndex />} />
                    <Route path="add" element={<BrandsAdd />} />
                    <Route path="view/:id" element={<BrandsView />} />
                    <Route path="edit/:id" element={<BrandsEdit />} />
                </Route>
                <Route path="sale_logs">
                    <Route path="" element={<SaleLogIndex />} />
                    <Route path="add" element={<SaleLogAdd />} />
                    <Route path="view/:id" element={<SaleLogView />} />
                    <Route path="edit/:id" element={<SaleLogEdit />} />
                </Route>

            </Routes>
        </div>

    );
};

export default Content;
