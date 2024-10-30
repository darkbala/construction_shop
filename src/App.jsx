import './App.css'
import {Route, Routes} from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import ErrorPage from './Pages/Errorpage/Errorpage'
import Layout from "./components/Layout/Layout.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Vacancy from "./Pages/Vacancy/Vacancy.jsx";
function App() {

    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/' exact element={<Homepage/>}/>
                    <Route path='/vacancy'  element={<Vacancy/>}/>
                    <Route path='*' element={<ErrorPage/>}/>
                </Routes>
            </Layout>
        </>
    )
}

export default App
