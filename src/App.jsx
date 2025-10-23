import "./App.css";
import Header from "./header";
import Footer from "./footer";
import FilterSidebar from "./filterSide";
import PaginationComponent from "./PaginationComponent";

function App() {
  return (
    <>
      <Header />
      <div className="max-w-7xl m-auto min-h-screen bg-gray-50 flex justify-start items-start p-10">
        <FilterSidebar />
        <PaginationComponent />
      </div>

      <Footer />
    </>
  );
}

export default App;
