import {useEffect} from 'react';
import {useDispatch,useSelector} from "react-redux";
import { getPopular } from '../redux/actions/movieActions';
import Hero from '../components/Hero';
import { getGenres } from '../redux/actions/genreActions';
import Loader from '../components/Loader';
import Error from '../components/Error';
import MovieList from '../components/MovieList';



const MainPage = () => {
  const dispatch = useDispatch()

  const {isLoading , error, genres } = useSelector((store) =>store.genres); 


  useEffect(()=> {
    dispatch(getGenres())
    dispatch(getPopular())

  },[])
  
  return (
    <div>
     <Hero/>

    {
      isLoading 
      ? <Loader/>
      :error
      ? <Error/>
      :
      genres.map((genre)=> <div key={genre.id}><MovieList  genre={genre}/></div>)
    }

    </div>
  )
}

export default MainPage
