import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  // Shared state for the whole app
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
      {/* Pass the state to the Router wrapper */}
      <AppRoutes isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
}

export default App;
