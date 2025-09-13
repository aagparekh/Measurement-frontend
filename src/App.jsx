// import { useEffect, useState } from "react";
// import "./App.css";
import { Button, Box, Heading } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SearchCustomer from "./pages/SearchCustomer.jsx";
import AddCustomer from "./pages/AddCustomer.jsx";
import CustomerDetails from "./pages/CustomerDetails.jsx";

function App() {
  // const [count, setCount] = useState(0)
  // const [msg, Setmsg] = useState("");

  // useEffect(() => {
  //   fetch("/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("data"), Setmsg(data.message);
  //     });
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchCustomer />} />
        <Route path="/addcustomer" element={<AddCustomer />} />
        <Route path="/customerdetails/:id" element={<CustomerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
