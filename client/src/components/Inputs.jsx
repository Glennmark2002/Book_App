import { useState, useEffect } from "react"
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from 'axios'; 
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';


function Inputs({  }) {

  const [title, setTitle] = useState('');  
  const [author, setAuthor] = useState('');  
  const [publishYear, setPublishYear] = useState('');  
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar} = useSnackbar();
  
  const handleSaveBook = () => {
    const data = {
      title, 
      author, 
      publishYear
    };  
    setLoading(true);   
    axios.post('http://localhost:3000/books', data)
         .then(() => {
            setLoading(false);  
            enqueueSnackbar('Book Edit Successfully', {variant : 'success'});  
            navigate('/'); 
         }).catch((error) => {
            setLoading(false);  
            alert('An error happened. Please Check Console');
            console.log(error);
         });  
  }; 


  return (
    <div className='flex flex-col border-2 border-sky-400 max-w-[600px] rounded-xl  p-4 mx-auto'>
      <div className='my-4'>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className='border-2 border-gray-500 px-4 py-2 w-full'  />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" className='border-2 border-gray-500 px-4 py-2 w-full'  />
        <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} placeholder="Publish Year" className='border-2 border-gray-500 px-4 py-2 w-full'  />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}> Save </button>
    </div>
  );
}

export default Inputs;