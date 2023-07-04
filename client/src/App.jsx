import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import SplitLoginPage from "./Pages/SplitLoginPage";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import Landing from "./Pages/Landing";
import AuthLayout from "./Layouts/AuthLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="login" element={<SplitLoginPage />} />
      <Route path="signup" element={<SignUp />} />

      <Route index element={<Home />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />

      <Route element={<AuthLayout />}>
        <Route path="abc" element={<LoginPage />} />
      </Route>

      <Route path="landing" element={<Landing />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  if (import.meta.env.NODE_ENV === 'production') {
    disableReactDevTools();
  }
  
  return <RouterProvider router={router} />;
}

export default App;
