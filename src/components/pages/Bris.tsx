import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  useColorModeValue,
  ModalContent,
  Modal,
  useDisclosure,
  ModalBody,
  ModalHeader,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import someimg from '../../resources/bris/common/bris_0.jpg';
import backgroundImage from '../../resources/bris/repeating_cubes.jpg';
function Bris() {
  // Get all image links from an api call?
  const images = require.context('../../resources/bris/common');
  const [showImages, setShowImages] = useState<boolean>(false);
  const modal = useDisclosure();
  console.log(showImages, setShowImages);
  return (
    <>
      <Flex h='100vh' flexDir='column' alignItems='center' bgImage={backgroundImage} backgroundRepeat={'repeat'}>
        <Flex h='full' w='80%' flexDir='column' alignItems='center' bg={useColorModeValue('white', '#2d2e30')}>
          <Box w='full' h='30vh' bgImage={someimg} bgPosition={'-90px -500px'} /*  w='full' h='30vh !important' */>
            {/* <Image src={someimg} objectFit={'contain'} w='200px' h='50px' /> */}
          </Box>
          <Heading fontSize={'30px'} fontWeight={'bold'}>
            Bris
          </Heading>
          <Text>Vakker hytte på Søndre Sandøy, Hvaler</Text>
          <Flex w='full' flexDir='column' alignItems='center'>
            <Divider w='80%' h='1px' m='10px' borderColor={useColorModeValue('#2d2e30', 'white')} />
            <Button
              bg={useColorModeValue('gray.500', '#5f6062')}
              onClick={() => {
                modal.isOpen ? modal.onClose() : modal.onOpen();
              }}>
              Click me to show picture
            </Button>
            <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
              <ModalContent bg={useColorModeValue('white', '#2d2e30')} top='20vh'>
                <ModalHeader /* align='center' */ h='40px' p='5px'>
                  Modal header
                </ModalHeader>
                <ModalBody>
                  <Flex alignItems={'center'} justifyContent='center'>
                    <Button bg='transparent' variant='iterateImagesButton'>
                      {'<'}
                    </Button>
                    <Flex flexDir='column'>
                      <Image w='30vh' src={images(`./bris_${0}.jpg`)} objectFit={'contain'} />
                      <Text align='center'>Some description</Text>
                    </Flex>
                    <Flex>
                      <Button bg='transparent' fontSize={'40px'} fontWeight='bold'>
                        {'>'}
                      </Button>
                    </Flex>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>

            {
              // Iterate over data object
              /* Object.keys(data).map((keyname, keyindex)=> {

                    //let code = data[keyname]["code"];
                    //let title = data[keyname]["title"];
                    // Dynamically reference image

                    let imgsrc = images(`./bris_${keyindex}.png`);

          
                    return <Image  key={keyindex} src={imgsrc}  objectFit={'contain'} />
                               
                                
                                
                                
                           
                }) */
            }
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Bris;
