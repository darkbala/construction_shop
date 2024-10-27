import NavItem from "./NavItem/NavItem.jsx";

const Nav = () => {
    return (
        <nav>
            <ul>
                <NavItem to="/">Home</NavItem>
                <NavItem to="/ax">ax</NavItem>
            </ul>
        </nav>
    )
}

export default Nav;