import React from "react";

//elements
import Header from "./components/elements/Header";
import Sidebar from "./components/elements/Sidebar";
import Footer from "./components/elements/Footer";
import Content from "./components/Content";

const AdminLTE = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <Content />
            <Footer />
        </>
    );
};

export default AdminLTE;
