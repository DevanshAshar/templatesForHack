import './App.css';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from './Layouts/RootLayout';
import ContactUs from "./Pages/ContactUs"
import AboutUs from "./Pages/AboutUs"
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import ErrorPage from './Pages/ErrorPage';
import SplitLoginPage from './Pages/SplitLoginPage';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={< SplitLoginPage />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="abc" element={<LoginPage />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="*" element={<ErrorPage />}></Route>
    </Route>
  )
)



function App() {
  return <RouterProvider router={router} />;
}

export default App;
