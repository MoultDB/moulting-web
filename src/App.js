import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import CookieConsent from "react-cookie-consent";
import ComingSoon from "./components/coming-soon";
import Header from "./components/navs/header";
import HomePage from "./components/home-page/home-page";
import Notfound from "./components/notfound";
import Footer from "./components/navs/footer";
import UserProfile from "./components/user/user-profile";
import LoginForm from "./components/user/login";
import Registration from "./components/user/registration";
import PrivacyNotice from "./components/document/privacy-notice";
import MarkdownPage from "./components/document/markdown";
import Validation from "./components/user/validation";
import AuthVerify from "./services/auth-verify";
import UploadFiles from "./components/upload/upload-files";
import Explore from "./components/data/explore";
import ResetPassword from "./components/user/reset-password";
import ForgotPassword from "./components/user/forgot-password";
import ImageAnnotations from "./components/data/image-annotations";
// import AuthVerify from "./services/auth-verify";

function App() {
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
            <AuthVerify />
        </BrowserRouter>
    );
}

export default App;

function CustomRoutes() {

    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/contribute/photo-upload" element={<ComingSoon />} />
            <Route path="/about" element={<Navigate replace to="/about/moulting" />}  />
            <Route path="/about/moulting" element={<MarkdownPage pageTitle={"About"} />} />
            <Route path="/about/publications" element={<ComingSoon />} />
            <Route path="/about/blog" element={<ComingSoon />} />
            <Route path="/about/privacy-notice" element={<PrivacyNotice />} />
            <Route path="/news" element={<MarkdownPage key="news-summary" pagePath={"news/summary"} pageTitle={"News"} />} />
            <Route path="/news/:date" element={<MarkdownPage key="news-date" pageTitle={"News"}/>} />
            <Route path="/404" element={<Notfound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}

