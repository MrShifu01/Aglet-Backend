import "./style.css";
import Hero from "./components/Hero";
import Categories from "./components/Categories";

function App() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="w-custom-90 h-custom-90 bg-dark rounded-2">
          <Hero className="position-relative" />
          <Categories />
        </div>
      </div>
    </>
  );
}

export default App;
