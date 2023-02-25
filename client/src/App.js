import './App.css';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from './Layouts/RootLayout';
import Abc from "./Pages/Abc"
import ContactUs from "./Pages/ContactUs"
import AboutUs from "./Pages/AboutUs"
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import ErrorPage from './Pages/ErrorPage';
import SplitLoginPage from './Pages/SplitLoginPage';
import SignIn from './Pages/SignIn';
import ForgotPassword from './Pages/ForgotPassword';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={< LoginPage />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="signup" element={<SignIn />} />
      <Route path="abc" element={<SplitLoginPage />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="*" element={<ErrorPage />}></Route>
    </Route>
  )
)



function App() {
  return <RouterProvider router={router} />;
}

export default App;
