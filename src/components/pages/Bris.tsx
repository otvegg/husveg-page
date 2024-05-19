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
  Link,
  AspectRatio,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import React, { useState } from 'react';
import someimg from '../../resources/bris/common/bris_0.jpg';
import backgroundImage from '../../resources/bris/repeating_cubes.jpg';
import {
  bris_bad1,
  soverom_1,
  soverom_2,
  stue_1,
  stue_2,
  stue_3
} from '../../resources/bris/index'


const imageList = [
  { src: bris_bad1, description: 'Baderom (oppvaskum)' },
  { src: soverom_1, description: 'Soverom 1, køyeseng' },
  { src: soverom_2, description: 'Soverom 2, køyeseng' },
  { src: stue_1, description: 'Kjøkken og spisebord' },
  { src: stue_2, description: 'Sofa med sofabord og TV' },
  { src: stue_3, description: 'Godt med naturlig lys' },
];


function Bris() {
  const [showImages, setShowImages] = useState<boolean>(false);
  const [imageCount, setImageCount] = useState<number>(0);
  const modal = useDisclosure();
  console.log(showImages, setShowImages);


  const incrementImages = () => {
    setImageCount((imageCount + 1) % imageList.length);
  };

  const decrementImages = () => {
    setImageCount((imageCount - 1 + imageList.length) % imageList.length);
  };

  function extraInfo() {
    return (
      <Box textAlign="left" w='80%'>
        <Text>Ekstra Info:</Text>
        <UnorderedList>
          <ListItem>
            <Link href='https://no.wikipedia.org/wiki/S%C3%B8ndre_Sand%C3%B8y' color='teal.500' isExternal>
              Wikipedia om Søndre Sandøy <ExternalLinkIcon mx='2px' />
            </Link>
          </ListItem>
          <ListItem>
            <Link href='https://livetleker.wordpress.com/2009/06/20/saltkrakan-s%C3%B8ndre-sand%C3%B8y-eller-deromkring/' color='teal.500' isExternal>
              Beskrivelse av tur til Søndre Sandøy <ExternalLinkIcon mx='2px' />
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
    );
  }

  return (
    <>
      <Flex h='100vh' flexDir='column' alignItems='center' bgImage={backgroundImage} backgroundRepeat={'repeat'}>
        <Flex h='full' w='80%' flexDir='column' alignItems='center' bg={useColorModeValue('white', '#2d2e30')}>
          <Box w='full' h='30vh' bgImage={someimg} bgPosition={'-90px -500px'} >
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
              Bla gjennom bilder
            </Button>
            <Divider w='80%' h='1px' m='10px' borderColor={useColorModeValue('#2d2e30', 'white')} />
            {extraInfo()}
            <Divider w='80%' h='1px' m='10px' borderColor={useColorModeValue('#2d2e30', 'white')} />


            <iframe width="425" height="350"
              src="https://www.openstreetmap.org/export/embed.html?bbox=11.078735589981079%2C59.00107209435399%2C11.082785725593569%2C59.003561281295184&amp;layer=mapnik&amp;marker=59.00231671032385%2C11.080760657787323"
            >
            </iframe>
            <Button colorScheme="teal" onClick={() => window.open('https://www.openstreetmap.org/?mlat=59.00231&amp;mlon=11.08077#map=18/59.00231/11.08077', '_blank')}>
              View Large map
            </Button>



            <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
              <ModalContent bg={useColorModeValue('white', '#2d2e30')} top='5vh'>
                <ModalHeader h='40px' p='5px'>
                  Bris bilder
                </ModalHeader>
                <ModalBody minH='250px' minW='200px'>
                  <Flex alignItems={'center'} justifyContent='center' flexDir='row'>
                    <Button bg='transparent' onClick={decrementImages} variant='iterateImagesButton'>
                      {'<'}
                    </Button>
                    <Flex flexDir='column' w='100%'>
                      <AspectRatio maxW='600px' ratio={12 / 19}>
                        <Image w='30vh' src={imageList[imageCount].src} objectFit={'contain'} />
                      </AspectRatio>
                      <Text align='center'>{imageList[imageCount].description}</Text>
                    </Flex>
                    <Button bg='transparent' onClick={incrementImages} fontSize={'40px'} fontWeight='bold'>
                      {'>'}
                    </Button>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}

export default Bris;
