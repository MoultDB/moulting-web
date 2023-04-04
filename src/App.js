import {BrowserRouter, Route, Link, Routes, useNavigate, Navigate} from "react-router-dom";
import './App.css';
import CookieConsent from "react-cookie-consent";
import ComingSoon from "./components/coming-soon";
import ReactGA from "react-ga";
import Header from "./components/navs/header";
import HomePage from "./components/home-page/home-page";
import Notfound from "./components/notfound";
import {useEffect} from "react";
import Footer from "./components/navs/footer";
import Usergrid from "./components/user/user-grid";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <div id="moulting-body">
                <CustomRoutes />
                {/*<CookieConsent*/}
                {/*    location="bottom"*/}
                {/*    buttonText="Do not show this banner again"*/}
                {/*    cookieName="__Host-moulting-privacy-policy"*/}
                {/*    cookieValue="1"*/}
                {/*    style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}*/}
                {/*    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}*/}
                {/*    expires={365}*/}
                {/*    sameSite={"strict"}*/}
                {/*    cookieSecurity={"true"}*/}
                {/*>*/}
                {/*    This website requires cookies, and limited processing of your personal data in order to function.*/}
                {/*    By using the site you are agreeing to this as outlined in our <Link to="/about/privacy-notice">privacy notice</Link>.*/}
                {/*</CookieConsent>*/}
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

function CustomRoutes() {
    const history = useNavigate();

    const isLocalhost = Boolean(
        window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    // ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
    //     testMode: isLocalhost,
    //     gaOptions: {
    //         cookieFlags: "SameSite=None; Secure",
    //         cookieExpires: "7200"
    //     }
    // });

    // useEffect(() => {
    //     trackPageView(); // To track the first pageview upon load
    //     history.listen(trackPageView); // To track the subsequent pageviews
    // }, [history]);

    function trackPageView() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    return (
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/explore" element={<ComingSoon />} />
            <Route path="/explore/:type" element={<ComingSoon />} />
            <Route path="/contribute/photo-upload" element={<ComingSoon />} />
            <Route path="/contribute/video-upload" element={<ComingSoon />} />
            <Route path="/contribute/find-species" element={<ComingSoon />} />
            <Route path="/about/moulting" element={<ComingSoon />} />
            <Route path="/about/publications" element={<ComingSoon />} />
            <Route path="/about/blog" element={<ComingSoon />} />
            <Route path="/about/privacy-notice" element={<ComingSoon />} />
            <Route path="/community/user-grid" element={<ComingSoon />} />
            <Route path="/community/user-list" element={<ComingSoon />} />
            <Route path="/community/user-profile" element={<ComingSoon />} />
            <Route path="/community/user-rate" element={<ComingSoon />} />
            <Route path="/help" element={<ComingSoon />} />
            <Route path="/user/registration" element={<ComingSoon />} />
            <Route path="/user/login" element={<ComingSoon />} />
            <Route path="/user/logout" element={<ComingSoon />} />
            <Route path="/user/admin" element={<ComingSoon />} />
            <Route path="/user/grid" element={<Usergrid />} />
            <Route path="/user/change-password" element={<ComingSoon />} />
            <Route path="/user/forget-password" element={<ComingSoon />} />
            <Route path="/404" element={<Notfound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}

