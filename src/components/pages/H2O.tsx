import { Divider, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import Video from '../../resources/H2O/videos/HeiOgHo.mp4';

function H2O() {
  return (
    <>
      <Flex flexDir='column' alignItems='center'>
        <Heading fontSize={'30px'} fontWeight={'bold'}>
          H2O
        </Heading>
        <Text>Diverse knyttet til H2O Racing Team</Text>
        <Flex w='full' flexDir='column' alignItems='center'>
          <Divider w='80%' h='1px' m='10px' />

          <video width='320' height='240' controls>
            <source src={Video} type='video/mp4' />
          </video>
        </Flex>
      </Flex>
    </>
  );
}

export default H2O;
