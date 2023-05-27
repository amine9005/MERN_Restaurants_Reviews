import { Routes, Route } from "react-router-dom";
import "./App.scss";
import AddReview from "./components/AddReview";
import Layout from "./components/Layout";
import Home from "./components/Home";
import RestaurantView from "./components/RestaurantView";
import Login from "./components/Login";
import Register from "./components/Register";
import RouteGuard from "./components/RouteGuard";
import EditReview from "./components/UpdateReview";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index="/" element={<Home />} />
          <Route element={<AuthGuard />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/view/:id" element={<RestaurantView />} />

          <Route element={<RouteGuard />}>
            <Route path="/add/:id" element={<AddReview />} />
            <Route
              path="/view/:restaurant_id/edit/:review_id"
              element={<EditReview />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
