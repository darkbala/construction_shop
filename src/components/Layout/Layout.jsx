import Nav from "../Nav/Nav.jsx";
import Footer from "../Footer/Footer.jsx";
import EndLine from "../EndLine/EndLine.jsx";
const Layout = ({children}) => {

    return (
        <>
            <header>
                <Nav/>
            </header>
            <main>
                {children}
            </main>
            <Footer/>
            <EndLine/>
        </>
    )
}

export default Layout;