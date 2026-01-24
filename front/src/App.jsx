import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import Signup from "./pages/UserPages/Register";
import Signin from "./pages/UserPages/Login";
import {ChatPage} from "./pages/ChatsPage/ChatPage";
import Navbar from "./components/navbar/Navbar";
import ClientsPage from "./pages/ClientsPage/ClientsPage";
import AdminProtectedRoutes from "./protectedRoutes/adminProtectedRoutes";
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main
                  style={{
                    objectFit: "cover",
                    minHeight: "100vh",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "69%",
                    backgroundAttachment: "scroll",
                    justifyContent: "center",
                    width: "100vw",
                  }}>
                  <Signin />
                </main>
              </>
            }
          />
          <Route element={<AdminProtectedRoutes />}>
            <Route
              path="/register"
              element={
                <>
                  <main
                    style={{
                      objectFit: "cover",
                      minHeight: "100vh",
                      height: "100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "scroll",
                      overflow: "hidden",
                      justifyContent: "center",
                      width: "100vw",
                    }}>
                    <Navbar />
                    <Signup />
                  </main>
                </>
              }
            />
            <Route
              path="/clientes"
              element={
                <>
                  <main
                    style={{
                      objectFit: "cover",
                      height: "100vh",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "scroll",
                      overflow: "hidden",
                      justifyContent: "center",
                      /*   backgroundColor: "#fff", */
                      width: "100vw",
                    }}>
                    {" "}
                    <Navbar />
                    <ClientsPage />
                  </main>
                </>
              }
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/chats"
              element={
                <>
                  <main
                    style={{
                      objectFit: "cover",
                      height: "100dvh",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "69%",
                      backgroundAttachment: "scroll",
                      overflow: "hidden",
                      justifyContent: "center",
                      width: "100vw",
                    }}>
                    {" "}
                    <ChatPage />
                  </main>
                </>
              }
            />
            <Route
              path="/chats/:chatId"
              element={
                <>
                  <main
                    style={{
                      height: "100vh",
                      width: "100vw",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}>
                    {/*  <Navbar /> */}
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        minHeight: 0,
                      }}>
                      <ChatPage />
                    </div>
                  </main>
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
