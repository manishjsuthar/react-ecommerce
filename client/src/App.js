import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import './App.css';
import Footer from './components/headers/Footer';
import Navbar from './components/headers/Navbar';
import Topheader from './components/headers/TopHeader'
import MainPages from './components/mainpages/Pages';
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";


//loader
const override = css`
  display: block;
  margin: auto;
  margin-Top: 400px;
`;
  

function App() {

  let [loading, setLoading] = useState(false);


  useEffect(() => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
      },2000)
  },[])


  return (
    <div>
    {loading? 
      <HashLoader color={"#123abc"} loading={loading} css={override} size={50} />
      :
    <DataProvider>
      <Router>
      <Topheader/>
      <Navbar/>
      <MainPages />
      <Footer/>
      </Router>
    </DataProvider>
    }
    </div>
  );
}

export default App;
