import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Car from "./pages/car/car";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import "./style.css";
import { Provider } from "react-redux";
import store from ".//store/store";
import Flight from "./pages/flight/flight";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
function App() {
  return (
    <Auth0Provider
      domain="dev-7mo8qrze.us.auth0.com"
      clientId="MOyfUN8m8U1KLb1UmIZxxDpXADHTohpU"
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<List />} />
            <Route path="/hotels/:id" element={<Hotel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route path="/flight" element={<Flight />} />
            <Route path="/car" element={<Car />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  );
}

export default App;
