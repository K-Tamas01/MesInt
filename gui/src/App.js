import './App.scss';
import Draw from './Components/canvas/canvas';
import Inputs from './Components/Inputs/Inputs';
import DrawProvider from './Context/DrawContext/draw.context';

function App() {

  return (

      <div className='Input-Canvas-Container'>
        <DrawProvider>
          <Inputs />
          <Draw />
        </DrawProvider>
      </div>
  );
}

export default App;
