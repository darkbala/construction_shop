import Nav from "../Nav/Nav.jsx";
import {useDispatch} from "react-redux";

const Layout = ({children}) => {

    return (
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