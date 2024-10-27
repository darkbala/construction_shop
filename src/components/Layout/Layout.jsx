import Nav from "../Nav/Nav.jsx";

const Layout = ({ children }) => {
    return(
        <>
            <header>
                <Nav/>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout;