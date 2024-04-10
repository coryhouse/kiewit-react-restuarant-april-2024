import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Menu } from "./menu";
import { ErrorBoundary } from "react-error-boundary";
import { Admin } from "./admin";

export function App() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        |{" "}
        <Link to="/menu" className="[&.active]:font-bold">
          Menu
        </Link>{" "}
        |{" "}
        <Link to="/admin" className="[&.active]:font-bold">
          Admin
        </Link>{" "}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={
            <ErrorBoundary fallback={<p>Menu failed to load</p>}>
              <Menu />
            </ErrorBoundary>
          }
        />
        <Route
          path="/admin"
          element={
            <ErrorBoundary fallback={<p>Menu failed to load</p>}>
              <Admin />
            </ErrorBoundary>
          }
        />
      </Routes>
    </>
  );
}
