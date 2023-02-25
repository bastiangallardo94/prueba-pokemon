import {FC} from "react";
import Head from "next/head";
import Navbar from './Navbar';


interface Props {
  title?: string,
  children: JSX.Element
}

export const Layout: FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Bastian Gallardo"/>
        <meta name="description" content="Información sobre el pokemón"/>
        <meta name="keywords" content="pokemon, pokedex"/>
      </Head>

      <Navbar/>

      <main style={{
        padding: "0px 20px"
      }}>
        {children}
      </main>
    </>
  )
};