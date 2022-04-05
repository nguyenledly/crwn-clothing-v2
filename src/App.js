import { Route, Routes } from "react-router-dom";
import "./app.scss";
import Home from "./components/home/home.component";
import Navigation from "./components/navigation/navigation.component";
import Shop from "./components/shop/shop.component";
import Authentication from "./components/authentication/auththentication.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* This is called: Nested route */}
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
