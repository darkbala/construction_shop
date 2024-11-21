import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import Homepage from './Pages/Homepage/Homepage';
import ErrorPage from './Pages/Errorpage/Errorpage';
import Layout from "./components/Layout/Layout.jsx";
import Vacancy from "./Pages/Vacancy/Vacancy.jsx";
import CatalogPage from "./Pages/CatalogPage/CatalogPage.jsx";
import ProductDetailPage from "./Pages/ProductDetailPage/ProductDetailPage.jsx";
import './i18n';
import AdminPage from "./Pages/AdminPage/AdminPage.jsx";
import AllProducts from "./components/AllProducts/AllProducts.jsx";
import ModifySpecialOffer from "./components/ModifySpecialOffer/ModifySpecialOffer.jsx";
import ChangeCollection from "./components/AllCollections/ChangeCollection/ChangeCollection.jsx";
import AddCategory from "./components/AddCategory/AddCategory.jsx";
import AllVacancy from "./components/AllVacancy/AllVacancy.jsx";
import AllCollections from "./components/AllCollections/AllCollections.jsx";
import Register from "./components/Auth/Register/Register.jsx";
import Login from "./components/Auth/Login/Login.jsx";
import AddCollection from "./components/AllCollections/AddCollection/AddCollection.jsx";


const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > Date.now() / 1000;
    } catch {
        return false;
    }
};

// Компонент для защиты маршрутов
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({isAuthenticated, children}) => {
    return isAuthenticated ? children : <Navigate to="/"/>;
};

const App = () => {
    const isAdmin = isAuthenticated();

    return (
        <Layout>
            <Routes>
                {/* Клиентские маршруты */}
                <Route path="/" element={<Homepage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/vacancy" element={<Vacancy/>}/>
                <Route path="/catalog" element={<CatalogPage/>}/>
                <Route path="/catalog/:type/:id" element={<ProductDetailPage/>}/>
                <Route path="*" element={<ErrorPage/>}/>


                {isAdmin && (
                    <>
                        <Route path="/admin/" element={
                            <ProtectedRoute isAuthenticated={isAdmin}>
                                <AdminPage/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/admin/all-products" element={<AllProducts/>}/>
                        <Route path="/admin/all-collections" element={<AllCollections/>}/>
                        <Route path="/admin/add-collection" element={<AddCollection/>}/>
                        <Route path="/admin/change-collections/:id" element={<ChangeCollection/>}/>
                        <Route path="/admin/discount" element={<ModifySpecialOffer/>}/>
                        <Route path="/admin/add-category" element={<AddCategory/>}/>
                        <Route path="/admin/all-vacancies" element={<AllVacancy/>}/>
                    </>
                )}
            </Routes>
        </Layout>
    );
};

export default App;
