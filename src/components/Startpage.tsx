import { Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import BlogPostWithImage from './reusable/card';
import bris_frontImage from '../resources/bris/bris_frontImage.jpg';
import h20_frontImage from '../resources/H2O/h20_frontImage.png';
function StartPage() {
  return (
    <>
      <Flex flexDir='column' h='100vh' alignItems='center'>
        <>
          <HStack spacing={'50px'} h='70%'>
            <BlogPostWithImage
              path={'/H2O'}
              title='H2O Racing team'
              img={h20_frontImage}
              description='Diverse knyttet til H2O Racing Team'
            />
            <BlogPostWithImage
              path={'/Bris'}
              title='Bris'
              img={bris_frontImage}
              description='Hytte til leie på idylliske Søndre Sandøy'
            />
          </HStack>
        </>
      </Flex>
    </>
  );
}

export default StartPage;
