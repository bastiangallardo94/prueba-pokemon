import { Layout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
import { PokemonListResponse, ShortDescPokemon } from '@/interafaces';
import { FC, useState } from 'react';
import { Box, Grid, TextField } from '@mui/material';

import { PokemonCard } from '@/components/ui/PokemonCard';


interface Props {
  pokemones: ShortDescPokemon[]
}

export const Home: FC<Props> = ({ pokemones }) => {

  const [pokemonList, setPokemonList] = useState(pokemones);


  const handleSearch = (text: string) => {
    
    if(text.length === 0) {
      setPokemonList(pokemones)
    }

    const word = text.toLocaleLowerCase();


    setPokemonList(() => 
       pokemones.filter(pok => pok.name.match(word))
    )

  }

  return (
    <Layout>
      <>
        <Box display='flex' justifyContent='start' mt={1} mb={1}>
          <TextField label='Buscar Pokemon' variant='outlined' onChange={(e) => handleSearch(e.target.value)} />
        </Box>
        <Box mt={2}>
          <Grid container spacing={2}>
            {pokemonList.map((pokemon, index) => (
              <Grid item xs={12} sm={6} md={4} key={pokemon.name}>
                <PokemonCard pokemon={pokemon} />
              </Grid>
            ))
            }
          </Grid>
        </Box>
      </>
    </Layout>
  );


}

export const getStaticProps: GetStaticProps = async (ctx) => {


  const { data } = await axios.get<PokemonListResponse>("https://pokeapi.co/api/v2/pokemon?limit=151");

  const pokemonsWithImg: ShortDescPokemon[] = data.results.map((poke, index) => {

    const id = index + 1;
    return {
      ...poke,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  })

  return {
    props: {
      pokemones: pokemonsWithImg
    }
  }
}

export default Home;