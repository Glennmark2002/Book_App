import Gato from '../assets/Gato.gif'


function Spinner() {
  return (
    <img src={Gato} className='w-64 h-auto'/>
    // <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600' />
);
}

export default Spinner;