import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utilis/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./components/LoadingSpinner";

const Menu = lazy(() => import("./components/menu/Menu"));
const Modal = lazy(() => import("./components/modal/Modal"));
const Home = lazy(() => import("./pages/Home"));
const Signin = lazy(() => import("./pages/Signin"));
const Login = lazy(() => import("./pages/Login"));
const Product = lazy(() => import("./pages/Product"));
const SellerProfile = lazy(() => import("./pages/SellerProfile"));
const UserProfileAndCardProduct = lazy(
  () => import("./pages/UserProfileAndCartProduct")
);

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense
            fallback={
              <LoadingSpinner extraStyle={"size-10 mt-[35%] sm:mt-[15%] "} />
            }
          >
            <Menu />
            <Modal />
            <ToastContainer
              position="bottom-right"
              autoClose={1300}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <div className="h-[calc(100dvh-70px)] w-full p-5 overflow-y-auto flex flex-col items-center">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signin" element={<Signin />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/seller/:sellerName" element={<SellerProfile />} />
                <Route
                  path="/profile"
                  element={<UserProfileAndCardProduct />}
                />
              </Routes>
            </div>
            <ReactQueryDevtools initialIsOpen={true} />
          </Suspense>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
