import NextLink from 'next/link';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Button, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <NextLink passHref href={'/'} legacyBehavior>
          <Link underline='none' textTransform='none' component={'span'} display="flex" alignItems="center" sx={{ cursor:'pointer'}}>
          <Typography fontSize={30} color='white' >  Pokedex</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar