import './App.css';
import { Navigation } from './Router/routerApp';
function App() {
  console.log(process.env.REACT_APP_API_RRHH);
  return (
    <div>
      {/*  <Container> */}
      <Navigation></Navigation>
      {/* </Container> */}
    </div>
  );
}

export default App;
