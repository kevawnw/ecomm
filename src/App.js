import Home from "./routes/home/Home";
import { Routes, Route} from 'react-router-dom';
import Navigation from "./routes/navigation/Navigation";
import Authentication from "./routes/Authentication/Authentication";



const Shop = () => {
  return(
    <h1>I am the shop page</h1>
  )
}


function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop/>}/>
        <Route path='auth' element={<Authentication/>}/>
      </Route>
    </Routes>
  )
}

export default App;



