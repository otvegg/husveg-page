import { Box, Heading, Text, useColorModeValue, Image, Flex } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
interface BlogProps {
  title: string;
  img: string;
  description: string;
  path: string;
}
const BlogPostWithImage = (props: BlogProps) => {
  const { title, img, description, path } = props;
  return (
    <Box
      as={Link}
      to={path}
      borderWidth={'0px'}
      _hover={{ background: 'transparent', boxShadow: '2xl' }}
      maxW={'250px'}
      boxShadow='xl'
      p='0'>
      <Flex flexDir='column'>
        <Box h='100%'>
          <Image src={img} objectFit='cover' />
        </Box>
        <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} fontFamily={'body'}>
          {title}
        </Heading>
        <Box>
          <Text color={'gray.500'} word-break='break-word' maxW={'445px'} whiteSpace='normal'>
            {description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default BlogPostWithImage;
