import { useEffect, useState } from "react";
import "./index.css";
import { PokemonCards } from "./PokemonCards";


export const Pokemon = () => {

   const [Pokemon ,setPokemon] = useState([]);
   const [loading , setloading]  = useState(true);
   const[error, seterror] = useState(null)
   const [search,setsearch] = useState("");

// const FetchAPI = () =>{
//     fetch("https://pokeapi.co/api/v2/pokemon/ditto")
//     .then(responce => responce.json()) //convert data to josn
//     .then(data =>{
//         console.log(data);
//     })
    
    
// }
const API = "https://pokeapi.co/api/v2/pokemon?limit=60";

const FetchPokemonData = async () => {
    try {
        const res = await fetch(API);
        const data = await res.json();
        console.log(data);

        const detailPokemonData = data.results.map(async(curPokemon) =>{
            // console.log(curPokemon.url);

            const responses = await fetch(curPokemon.url);

                if (!responses.ok) {
                    throw new Error(`Failed to fetch ${curPokemon.url}`);
                    }

            const UrlData = await responses.json();
            // console.log(UrlData)
            return UrlData;

           
 
        })

        const ResponceDetails =  await Promise.all(detailPokemonData );
        setPokemon(ResponceDetails)
        setloading(false)
        console.log(ResponceDetails);
        


        
        
    } catch (error) {
        console.log(error)
        seterror(error)
        
    }

}




    useEffect (() =>{
        FetchPokemonData();
    },[])

    //search funtion
    const searchData = Pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    )



    if(loading){
        return(
            <div >
                <h1>Loading...</h1>
            </div>
        )
    }
    if(loading){
        return(
            <div >
                <h1>{error.massege}</h1>
            </div>
        )
    }



     return (
        <>
        <section className="container">
            <header>
                <h1>Lat's Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                <input  type="text" placeholder="search Pokemon" value={search} onChange={(e) => setsearch(e.target.value)} />
            </div>

            <div>
                <ul className="cards">
                    {
                        searchData.map ((curPokemon) =>{
                            return(
                                <PokemonCards key={curPokemon.id} pokemonData = {curPokemon}/>
                            );
                        })
                    }
                </ul>
            </div>
        </section>
        </>
    
     );
};