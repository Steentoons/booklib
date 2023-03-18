import React from "react";

const Header = () => {
    return <div className="header_layout">
        <h1 className="type-logo">booklib</h1>
        <nav>
            <ul>
                {/* <li>Home</li> */}
                <li className="type-bold">New book</li>
                <li className="type-bold">New category</li>
                <li className="type-bold">Books</li>
                <li className="type-bold">Categories</li>
                {/* <li>Login</li> */}
                <li className="type-bold">Account</li>
                {/* <li>Register</li> */}
            </ul>
        </nav>
    </div>;
};

export default Header;
