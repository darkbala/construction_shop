import './App.css'
import {Route, Routes} from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import ErrorPage from './Pages/Errorpage/Errorpage'
import Layout from "./components/Layout/Layout.jsx";
import Vacancy from "./Pages/Vacancy/Vacancy.jsx";
import CatalogPage from "./Pages/CatalogPage/CatalogPage.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage.jsx";
import './i18n';

const App = () => {

    return (
        <>
            <Layout>
                <Routes>
                    <Route path='/' exact element={<Homepage/>}/>
                    <Route path='/vacancy' element={<Vacancy/>}/>
                    <Route path='/catalog' element={<CatalogPage/>}/>
                    <Route path='/catalog/product/:id' element={<ProductDetailPage/>}/>
                    <Route path='/:id' element={<ProductDetailPage/>}/>
                    <Route path='*' element={<ErrorPage/>}/>
                </Routes>
            </Layout>
        </>
    )
}

export default App
