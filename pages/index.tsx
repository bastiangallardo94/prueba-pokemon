import { Layout } from '../layout/Layout';
import { GetStaticProps } from 'next';
import axios from 'axios';
export default function Home({pokemones}) {
  console.log({pokemonesya});
  
  return (
    <Layout>
      <h1>hola pokedex</h1>
    </Layout>
  );


}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")

  return {
    props: {
      pokemones: data
    }
  }
}