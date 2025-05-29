import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import CookieConsent from "react-cookie-consent";
import ComingSoon from "./components/coming-soon";
import Header from "./components/navs/header";
import Footer from "./components/navs/footer";
import HomePage from "./components/home-page/home-page";
import NotFound from "./components/not-found";
import Tutorial from "./components/document/tutorial";
import PrivacyNotice from "./components/document/privacy-notice";
import MarkdownPage from "./components/document/markdown";
import SpeciesPage from './components/species/species-page';
import ObservationPage from './components/species/observation-page';

function App() {
    console.log('App component is rendering');
    return (
        <BrowserRouter>
            <Header />
            <div id="moulting-body">
                <CustomRoutes />
                <CookieConsent
                    buttonText="Do not show this banner again"
                    cookieName="moulting-privacy-policy"
                    expires={365}
                    sameSite={"strict"}
                    cookieSecurity={"true"}>
                    This website requires cookies, and limited processing of your personal data in order to function.
                    By using the site you are agreeing to this as outlined in our <Link to="/about/privacy-notice">privacy notice</Link>.
                </CookieConsent>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

function CustomRoutes() {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/about" element={<Navigate replace to="/about/moulting" />}  />
            <Route path="/about/moulting" element={<MarkdownPage pageTitle={"About"} />} />
            <Route path="/about/privacy-notice" element={<PrivacyNotice />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/news/:date" element={<MarkdownPage key="news-date" pageTitle={"News"}/>} />
            <Route path="/species/:taxonId" element={<SpeciesPage />} />
            <Route path="/observations/:observationId" element={<ObservationPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}
