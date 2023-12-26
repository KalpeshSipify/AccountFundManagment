import { MainContextProvider } from "../Context/MainContext";
import MainNavigation from "./Navigation/MainNavigation";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-white flex justify-center items-center">
        <MainContextProvider>
          <MainNavigation />
        </MainContextProvider>
      </div>
    </>
  );
}

export default App;
