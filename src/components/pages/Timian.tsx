import React from 'react';
import { Flex } from '@chakra-ui/react';
import Recorder from './Timian/components/Recorder';
function Timian() {
  return (
    <Flex justifyContent='center' alignItems='center'>
      <Flex flexDirection='column' alignItems='center'>
        <Recorder />
      </Flex>
    </Flex>
  );
}

export default Timian;
