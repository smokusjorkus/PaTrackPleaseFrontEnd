import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* 2. Add the Toaster here. 
          It stays visible even when you navigate between pages! */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            fontFamily: "Outfit",
          },
          success: {
            iconTheme: {
              primary: "#fff05a", // Matching your brand yellow
              secondary: "#333",
            },
          },
        }}
      />

      <AppRoutes />
    </>
  );
}

export default App;
