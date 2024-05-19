import React from 'react';
import { Box, Flex, Text, Link, ListItem, UnorderedList } from '@chakra-ui/react';
import Recorder from './../Timian/components/Recorder';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function GithubDemos() {
  return (
    <Flex justifyContent='center' alignItems='center'>
      <Box pt='5vh' textAlign="left" w='90%'>
        <Text>Prosjekter:</Text>
        <UnorderedList>
          <ListItem>
            <Link href='https://github.com/otvegg/webnovel-scraper' color='teal.500' isExternal>
              Webnovel Scraper <ExternalLinkIcon mx='2px' />
            </Link>
            <Text>Beskrivelse: Et program/script som laster ned en webnovel fra en nettside, for å så konvertere inn til ønsket format (txt,pdf/epub)</Text>
          </ListItem>
          <ListItem>
            <Link href='https://github.com/otvegg/bird-surveillance' color='teal.500' isExternal>
              Bird surveillance <ExternalLinkIcon mx='2px' />
            </Link>
            <Text>Beskrivelse: Model trent på australske fugler, for artsgjenkjenning av australske fugler</Text>
          </ListItem>
          <ListItem>
            <Link href='https://github.com/otvegg/coles-woolies-comparison' color='teal.500' isExternal>
              Coles Woolies comparison <ExternalLinkIcon mx='2px' />
            </Link>
            <Text>Beskrivelse: Sammenligner prisene til to store australske supermarked</Text>
          </ListItem>

        </UnorderedList>
      </Box>
    </Flex>
  );
}

export default GithubDemos;
