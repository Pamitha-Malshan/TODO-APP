import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./component/Common/Footer";
import Header from "./component/Common/Header";

const Registration = React.lazy(() => import("./component/Authentication/Registration"));
const Login = React.lazy(() => import("./component/Authentication/Login"));
const Addtodo = React.lazy(() => import("./component/TodoList/Addtodo"));
const FetchTodo = React.lazy(() => import("./component/TodoList/FetchTodo"));
const UpdateTodo = React.lazy(() => import("./component/TodoList/Updatetodo"));

function Layout({ children }) {
  const location = useLocation();

  const hideHeaderFooter = location.pathname === "/" || location.pathname === "/registration";

  return (
    <div>
      {!hideHeaderFooter && <Header />}
      <div>{children}</div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout>
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/" element={<Login />} />
              <Route path="/addtodo" element={<Addtodo />} />
              <Route path="/fetchtodo" element={<FetchTodo />} />
              <Route path="/updatetodo/:id" element={<UpdateTodo />} />
            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;