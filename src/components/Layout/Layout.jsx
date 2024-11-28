import Nav from "../Nav/Nav.jsx";
import Footer from "../Footer/Footer.jsx";
import EndLine from "../Footer/EndLine/EndLine.jsx";

const Layout = ({children}) => {

    return (
        <>
            <header>
                <Nav/>
            </header>
            <main style={{minHeight: "100vh"}}>
                {children}
            </main>
            <Footer/>
            <EndLine/>
        </>
    )
}

export default Layout;