import './App.css';
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import LoadingBar from 'react-top-loading-bar'
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/*", Component: Root },
]);

export default function App(){
  return <RouterProvider router={router}/>;
}
    function Root() {
 
    return (
      <div>
       
        <Navbar />       
        <LoadingBar
        color='#f11946'
        progress={100}
      />
      
        <Routes>
        {/* <Route key="home" path='*' element={<Home />}></Route> */}
            
            <Route key="todo" path='*' element={<Notes/>} ></Route>

        </Routes>

      </div>
    )
  }









// export default class App extends Component {
 
 
  
// render()  {
//     return (
//       <div>
//         <Navbar/>
//         <Routes>
//         <Route exact path="/" element={<News key="general" pageSize={9} country="in" category="general"/>}/>
//         {/* const router = createBrowserRouter([
//           {

// <Route exact path="/" element={<News key="general" pageSize={9} country="in" category="general"/>}/>


//             path= "/",
//             element=  <News pageSize={5} country="in" category="science"/>,
//           } */}
//         {/* ]); */}
//         </Routes>
//       </div>
//     )
//   }

// }
