import {
  AspectRatio,
  Box,
  Button,
  Checkbox,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import useRecorder from '../hooks/useRecorder';

interface IAdvancedOptions {
  showScreenRecording: boolean;
  showCameraRecording: boolean;
  mergeRecordings: boolean;
  videoFormat: string;
}

const Recorder = () => {
  const {
    toggleRecorder: toggleScreenRecorder,
    download: screenDownload,
    isRecording: isVideoRecording,
  } = useRecorder();
  const {
    toggleRecorder: toggleCameraRecorder,
    download: cameraDownload,
    isRecording: isCameraRecording,
  } = useRecorder();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disabledVideo, setDisabledVideo] = useState<boolean>(false);
  const [disabledScreen, setDisabledScreen] = useState<boolean>(false);
  const [singleVideo, setSingleVideo] = useState<boolean>(false);
  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const someref = useRef(null);

  const videoSize = singleVideo ? '80vw' : '45vw';

  const buttonArray = [
    {
      id: 0,
      description: 'Screen recording enabled',
      operation: () => setDisabledScreen(!disabledScreen),
      type: Checkbox,
      defaultState: !disabledScreen,
    },
    {
      id: 1,
      description: 'Camera recording enabled',
      operation: () => setDisabledVideo(!disabledVideo),
      type: Checkbox,
      defaultState: !disabledVideo,
    },
  ];

  const download = () => {
    //get blobs from capturers, keep original, copy blobs and merge copies blobs into main blob, convert all into video, download
    //evt. in the advanced options enable if video downloaded seperately or together.
  };

  const AdvancedOptionsModal = () => (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {buttonArray.map((el) => (
              <el.type
                key={el.id}
                defaultChecked={el.defaultState}
                onChange={(e: React.ChangeEvent) => {
                  e.preventDefault;
                  el.type === Checkbox ? el.operation() : () => '';
                }}
                onClick={el.type === Button ? el.operation : () => ''}>
                {el.description}
              </el.type>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );

  useEffect(() => {
    if (!disabledVideo && !disabledScreen) setSingleVideo(false);
    else setSingleVideo(true);

    if (disabledScreen) toggleScreenRecorder(true, screenRef);
    if (disabledVideo) toggleCameraRecorder(false, videoRef);
  }, [disabledVideo, disabledScreen]);

  return (
    <>
      <Flex padding={'25px'}>
        <Button
          onClick={() => {
            toggleScreenRecorder(true, screenRef);
          }}
          isActive={disabledScreen}>
          {'Toggle screen'}
        </Button>
        <Button
          onClick={() => {
            toggleCameraRecorder(false, videoRef);
          }}
          isActive={disabledVideo}>
          {'Toggle camera'}
        </Button>
        <Button
          onClick={
            /* download */ () => {
              ('');
            }
          }>
          {'Download'}
        </Button>
        <Button onClick={onOpen}>Advanced</Button>
        <AdvancedOptionsModal />
      </Flex>
      <Flex>
        {!disabledVideo && (
          <Box borderColor='red' borderWidth={'1px'} w={videoSize}>
            <Box
              borderWidth={'1px'}
              borderColor={'green'}
              as='video'
              ref={videoRef}
              w='100%'
              h='100%'
              bg='black'
              /* height='0px' */
              /* paddingBottom={'56.25%'} */
              autoPlay
            />
          </Box>
        )}
        {!disabledScreen && (
          <Box borderColor='red' borderWidth={'1px'} w={videoSize}>
            <Box
              borderWidth={'1px'}
              borderColor={'blue'}
              w='100%'
              h='100%'
              bg='black'
              /*  height='0px'
              paddingBottom={'56.25%'} */
              as='video'
              ref={screenRef}
              autoPlay
            />
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Recorder;
