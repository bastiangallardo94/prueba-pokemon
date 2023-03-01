import { NextPage } from 'next'
import React from 'react'
import { Layout } from '../../layout/Layout';
import { GetStaticProps } from 'next'
import axios from 'axios';
import { GetStaticPaths } from 'next'
import { EvolutionHistory, Pokemon, Location } from '@/interafaces';
import { Grid, Typography, Card, CardMedia, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import { processingEvolutions } from '@/utils/pokemon';
import { ShortDescPokemon } from '../../interafaces/pokemon';
import { PokemonCard } from '../../components/ui/PokemonCard';

interface Props {
  pokemon: Pokemon;
  evolutionList: ShortDescPokemon[];
  ubication: Location[];
}

const PokemonDetailPage: NextPage<Props> = ({ pokemon, evolutionList, ubication }) => {

  return (
    <Layout title={pokemon.name}>

      <Grid container mt={2} spacing={3}>

        <Grid item xs={12} md={3}>
          <Card>
            <CardMedia
              component="img"
              image={pokemon.sprites.other?.dream_world.front_default}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant='h2' component='h2' textTransform='capitalize'>{pokemon.name}</Typography>

          <Box display='flex' justifyContent='start' letterSpacing={1} alignItems='center' mb={2}>
            <Typography variant='h6' component='h6' textTransform='capitalize'>Tipo: </Typography>
            {
              pokemon.types.map(type => (
                <Typography variant='subtitle1' component='h5' ml={2} textTransform='capitalize' key={type.type.name}>{type.type.name}</Typography>
              ))
            }
          </Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="location"
              id="location"
            >
              Ubicación
            </AccordionSummary>
            <AccordionDetails>
              {
                ubication.map(ubi => (
                  <Typography variant='h6' textTransform='capitalize' key={ubi.location_area.name}>{ubi.location_area.name}</Typography>
                ))
              }
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="moves"
              id="moves"
            >
              Ataques
            </AccordionSummary>
            <AccordionDetails sx={{ height: '300px', overflowY: 'scroll' }}>
              {
                pokemon.moves.map(mov => (
                  <Typography variant='h6' textTransform='capitalize' key={mov.move.name}>{mov.move.name}</Typography>
                ))
              }
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="abilities"
              id="abilities"
            >
              Habilidades
            </AccordionSummary>
            <AccordionDetails>
              {
                pokemon.abilities.map(ab => (
                  <Typography variant='h6' textTransform='capitalize' key={ab.slot}>{ab.ability.name}</Typography>
                ))
              }
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Box display='flex' justifyContent='center' width='100%'>
        <Typography variant='h3' textAlign='center'>Evoluciones</Typography>

        </Box>
        <Grid item xs={12} display='flex' justifyContent='space-around'>
          {evolutionList.map((pokemon, index) => (
            <Grid item xs={12} sm={4} key={pokemon.name}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))
          }
        </Grid>
      </Grid>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {

  const pokemon151 = [...Array(151)].map((_, index) => `${index + 1}`);

  return {
    paths: pokemon151.map(id => ({
      params: { id }
    })),
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { id } = params as { id: string }

  // se obtienen los datos del pokemon
  const { data: pokemon } = await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}/`); // your fetch function here 

  // la ubicación donde se puede encontrar
  const { data: ubication } = await axios.get<Location[]>(pokemon.location_area_encounters);

  const { data: specie} = await axios.get(` https://pokeapi.co/api/v2/pokemon-species/${id}`);
  
  //  las evoluciones del pokemon
  const { data: evolutions } = await axios.get<EvolutionHistory>(specie.evolution_chain.url);

  const evolutionList: ShortDescPokemon[] = JSON.parse(JSON.stringify(processingEvolutions(evolutions)));
  // const evolutionList = processingEvolutions(evolutions);




  return {
    props: {
      pokemon,
      evolutionList,
      ubication
    }
  }
}

export default PokemonDetailPage