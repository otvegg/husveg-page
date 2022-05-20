import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';
import { Flex, Icon, IconButton, Tooltip, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Navbar(props: { title: string }) {
  const { title } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const cmIcon = colorMode === 'light' ? MoonIcon : SunIcon;
  const cmDescription = 'Change to ' + (colorMode === 'light' ? 'darkmode' : 'lightmode');
  return (
    <>
      <Flex
        w='full'
        h='50px'
        bg={useColorModeValue('gray.200', 'gray.900')}
        px={4}
        justifyContent='space-between'
        alignItems='center'>
        <Text as={Link} to='/' fontWeight='semibold' fontSize='lg'>
          {title}
        </Text>
        <Tooltip label={cmDescription}>
          <IconButton
            variant='navbarButton'
            onClick={toggleColorMode}
            aria-label={'colormode'}
            bg='transparent'
            name={'colormode'}>
            <Icon as={cmIcon} />
          </IconButton>
        </Tooltip>
      </Flex>
    </>
  );
}

export default Navbar;
