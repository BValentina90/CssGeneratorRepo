import '../App.css';
import SidebarComponent from './SidebarComponent';
import GradientComponent from './GradientComponent';
import GradientContext from '../context/Context';
import FooterComponent from './FooterComponent';
import InfoComponent from './InfoComponent';

function Main() {
  
  return (
    <>
    <div className='container-fluid'>
      <div className='row'>
        <GradientContext>
          <SidebarComponent/>
          <GradientComponent />
        </GradientContext>
      </div>
      <div className='row text-center m-3 p-3'>
        <InfoComponent />
      </div>
      <div className='row'>
        <FooterComponent />
      </div>
    </div>
    </>
  );
}

export default Main;
