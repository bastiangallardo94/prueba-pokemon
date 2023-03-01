import React from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { ShortDescPokemon } from '@/interafaces';
import { FC } from 'react';
import { useRouter } from 'next/router';


interface Props {
    pokemon:ShortDescPokemon
}

export const PokemonCard: FC<Props> = ({pokemon}) => {

    const router = useRouter();

    const handleClickCard = (id: number) => {
      
      router.push("/pokemon/"+id);
  
    }
  

    return (
        <Card
            onClick={() => handleClickCard(pokemon.id)}
            sx={{
                cursor:'pointer'
            }}
        >
            <CardMedia
                component="img"
                image={pokemon.img}
                alt={pokemon.name}
            />
            <CardContent>
                <Typography textAlign='center' textTransform='capitalize' variant="h5" component="div">
                    #{pokemon.id} {pokemon.name}
                </Typography>
            </CardContent>
        </Card>
    )
}
