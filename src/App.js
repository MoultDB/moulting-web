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
            <Footer />
            <AuthVerify />
        </BrowserRouter>
    );
}

export default App;

function CustomRoutes() {

    const isLocalhost = Boolean(
        window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/explore" element={<ComingSoon />} />
            <Route path="/explore/:type" element={<ComingSoon />} />
            <Route path="/contribute/photo-upload" element={<ComingSoon />} />
            <Route path="/contribute/video-upload" element={<ComingSoon />} />
            <Route path="/contribute/find-species" element={<ComingSoon />} />
            <Route path="/about" element={<Navigate replace to="/about/moulting" />}  />
            <Route path="/about/moulting" element={<MarkdownPage />} />
            <Route path="/about/publications" element={<ComingSoon />} />
            <Route path="/about/blog" element={<ComingSoon />} />
            <Route path="/about/privacy-notice" element={<PrivacyNotice />} />
            <Route path="/user/registration" element={<Registration />} />
            <Route path="/user/email-validation" element={<Validation />} />
            <Route path="/user/login" element={<LoginForm />} />
            <Route path="/user/change-password" element={<ComingSoon />} />
            <Route path="/user/reset-password" element={<ComingSoon />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/logout" element={<ComingSoon />} />
            <Route path="/help" element={<ComingSoon />} />
            <Route path="/404" element={<Notfound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}

