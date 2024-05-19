import React from 'react';
import { Flex, HStack, useColorMode } from '@chakra-ui/react';
import BlogPostWithImage from './../reusable/card';
import bris_frontImage from '../../resources/bris/repeating_cubes.jpg';
import github_Mark_white from '../../resources/timian/github-mark-white.png';
import github_Mark from '../../resources/timian/github-mark.png';
import movie_camera_white from '../../resources/timian/movie_camera_white.png';
import movie_camera_black from '../../resources/timian/movie_camera_black.png';


function Timian() {
  const { colorMode, toggleColorMode } = useColorMode()
  console.log(colorMode)
  return (
    <Flex flexDir='column' h='100vh' alignItems='center'>
        <>
          <HStack spacing={'50px'} h='70%'>
            <BlogPostWithImage
                    path={'./RecorderPage'}
                    title='Video- og lydopptak'
                    img={colorMode === 'light' ? movie_camera_black : movie_camera_white}
                    description='Ta opptak av skjerm, kamera og lyd. Kan lastes ned.'
                  />
            <BlogPostWithImage
                    path={'./githubdemos'}
                    title='Github prosjekter'
                    img={colorMode === 'light' ? github_Mark : github_Mark_white}
                    description='Demonstrasjon av Timians (github) prosjekter'
                  />
          </HStack>
        </>
    </Flex>
  );
}

export default Timian;
