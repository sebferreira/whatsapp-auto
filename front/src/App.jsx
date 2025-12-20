import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import HomeAuth from "./protectedRoutes/HomeAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeAuth />}>
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
                      overflowY: "hidden",
                    }}>
                    {/* 
                    <Navbar />
                    <Home /> */}
                    <p>hola</p>
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
