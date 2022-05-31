import {
  Box,
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Table,
  TableContainer,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  AspectRatio,
  Divider,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { videoBlob } from '../../../../utils/interfaces-types';
import useRecorder from '../hooks/useRecorder';

const Recorder = () => {
  const {
    toggleRecorder: toggleScreenRecorder,
    downloadBlob: downloadScreenBlob,
    getBlobs: getScreenBlobs,
  } = useRecorder();
  const {
    toggleRecorder: toggleCameraRecorder,
    downloadBlob: downloadCameraBlob,
    getBlobs: getCameraBlobs,
  } = useRecorder();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [screenStatus, setScreenStatus] = useState<{ isActive: boolean; isDisabled: boolean }>({
    isActive: false,
    isDisabled: false,
  });
  const [cameraStatus, setCameraStatus] = useState<{ isActive: boolean; isDisabled: boolean }>({
    isActive: false,
    isDisabled: false,
  });
  const [singleVideo, setSingleVideo] = useState<boolean>(false);
  const [activeButtons, setActiveButtons] = useState<{
    camera: string | undefined;
    screen: string | undefined;
  }>({
    camera: undefined,
    screen: undefined,
  });

  const [allButtons, setAllButtons] = useState<videoBlob[]>([]);
  const [sortedButtons, setSortedButtons] = useState<videoBlob[][]>([]);

  const cameraRef = useRef(null);
  const screenRef = useRef(null);

  const videoSize = singleVideo ? '80vw' : '45vw';

  const handleToggleCamera = () => {
    setCameraStatus({
      ...cameraStatus,
      isActive: !cameraStatus.isActive,
    });
    toggleCameraRecorder(false, cameraRef);
  };

  const handleToggleScreen = () => {
    setScreenStatus({
      ...screenStatus,
      isActive: !screenStatus.isActive,
    });
    toggleScreenRecorder(true, screenRef);
  };

  const buttonArray = [
    {
      id: 0,
      description: 'Screen recording enabled',
      operation: () =>
        setScreenStatus({
          ...screenStatus,
          isDisabled: !screenStatus.isDisabled,
        }),
      type: Checkbox,
      defaultState: !screenStatus.isDisabled,
    },
    {
      id: 1,
      description: 'Camera recording enabled',
      operation: () =>
        setCameraStatus({
          ...cameraStatus,
          isDisabled: !cameraStatus.isDisabled,
        }),
      type: Checkbox,
      defaultState: !cameraStatus.isDisabled,
    },
  ];
  const AdvancedOptionsModal = () => (
    <>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Advanced options...</ModalHeader>
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

  /**
   * Disables all the other buttons except the button with the given id
   */
  const updateCheckBoxes = (id: string) => {
    const selectedButton = allButtons.find((i) => i.id === id);
    let updatedButtons = [...allButtons];

    if (selectedButton) {
      if (selectedButton.type !== 'none' && activeButtons[selectedButton.type] === selectedButton.id) {
        updatedButtons = updatedButtons.map((b) => {
          if (b.type !== selectedButton.type) return b;
          return { ...b, isDisabled: false };
        });
        setActiveButtons({ ...activeButtons, [selectedButton.type]: undefined });
      } else {
        updatedButtons = updatedButtons.map((b) => {
          if (b.type !== selectedButton.type) return b;
          if (b.id === id) return { ...b, isDisabled: false };
          else return { ...b, isDisabled: true };
        });
        setActiveButtons({ ...activeButtons, [selectedButton.type]: selectedButton.id });
      }
    }
    setAllButtons(updatedButtons);
  };

  /**
   * Filters out old blobs
   */
  const getNewBlobs = (oldArray: videoBlob[], newArray: videoBlob[]) => {
    const oldIds: string[] = oldArray.map((el) => el.id);
    return newArray.filter((item) => !oldIds.includes(item.id));
  };

  useEffect(() => {
    // when a new blob has been produced, get the new blob and add to array
    const screens = allButtons.filter((i) => i.type === 'screen');
    const cameras = allButtons.filter((i) => i.type === 'camera');
    const screenBlobs: videoBlob[] = getNewBlobs(screens, getScreenBlobs()).map((blob) => {
      return {
        id: blob.id,
        isDisabled: activeButtons.screen ? true : false,
        type: 'screen',
      };
    });

    const cameraBlobs: videoBlob[] = getNewBlobs(cameras, getCameraBlobs()).map((blob) => {
      return {
        id: blob.id,
        isDisabled: activeButtons.camera ? true : false,
        type: 'camera',
      };
    });
    if (screenBlobs.length > 0) setAllButtons((prevButtons) => [...prevButtons, ...screenBlobs]);
    if (cameraBlobs.length > 0) setAllButtons((prevButtons) => [...prevButtons, ...cameraBlobs]);
  }, [getCameraBlobs(), getScreenBlobs(), activeButtons.camera, activeButtons.screen]);

  useEffect(() => {
    const emptyObj: videoBlob = {
      id: '',
      type: 'none',
      isDisabled: false,
    };

    // reduces the 1d array into 2d
    // if object has no "partner", receives a dummy
    // attempt to use Array.prototype.reduce for fewer lines?
    const screens = allButtons.filter((i) => i.type === 'screen');
    const cameras = allButtons.filter((i) => i.type === 'camera');
    const max = Math.max(screens.length, cameras.length);
    const newArr: videoBlob[] = [];
    for (let i = 0; i < max; i++) {
      if (cameras[i]) newArr.push(cameras[i]);
      else newArr.push(emptyObj);
      if (screens[i]) newArr.push(screens[i]);
      else newArr.push(emptyObj);
    }
    const reducedArray: videoBlob[][] = [];
    while (newArr.length) reducedArray.push(newArr.splice(0, 2));
    setSortedButtons(reducedArray);
  }, [allButtons]);

  useEffect(() => {
    if (!cameraStatus.isDisabled && !screenStatus.isDisabled) setSingleVideo(false);
    else setSingleVideo(true);
  }, [cameraStatus.isDisabled, screenStatus.isDisabled]);

  const BlobDownload = () => {
    const disabled = !Object.values(activeButtons).every((x) => x === undefined);
    const handleDownload = () => {
      if (activeButtons.camera) downloadCameraBlob(activeButtons.camera);
      if (activeButtons.screen) downloadScreenBlob(activeButtons.screen);
    };

    return (
      <Button isDisabled={!disabled} onClick={handleDownload}>
        Download
      </Button>
    );
  };

  return (
    <>
      <Flex padding={'25px'}>
        {/* Reduce button onclick into handlers */}
        <Button onClick={handleToggleScreen} isDisabled={screenStatus.isDisabled}>
          {'Toggle screen'}
        </Button>
        <Button onClick={handleToggleCamera} isDisabled={cameraStatus.isDisabled}>
          {'Toggle camera'}
        </Button>
        <Button onClick={onOpen}>Advanced</Button>
        <AdvancedOptionsModal />
      </Flex>
      <Flex>
        {!cameraStatus.isDisabled && (
          <AspectRatio ratio={16 / 9} w={videoSize}>
            <Box as='video' ref={cameraRef} objectFit='fill' bg='black' autoPlay boxShadow={'dark-lg'} />
          </AspectRatio>
        )}
        <Divider orientation='vertical' />
        {!screenStatus.isDisabled && (
          <AspectRatio ratio={16 / 9} w={videoSize}>
            <Box objectFit='contain' bg='black' as='video' ref={screenRef} autoPlay boxShadow={'dark-lg'} />
          </AspectRatio>
        )}
      </Flex>
      {/* TODO: Add different view with table if there is only one video. example: move downloads to the right of video square... */}

      <TableContainer borderColor='orange' borderWidth='2px' marginTop='15px'>
        <Table>
          <TableCaption placement='top'>
            <BlobDownload />
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Camera captures</Th>
              <Th>Screen captures</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedButtons.map((row, i) => (
              <Tr key={'row' + i}>
                {row.map((col) => (
                  <Td key={col.id}>
                    {col.type !== 'none' ? (
                      <Checkbox isDisabled={col.isDisabled} onChange={() => updateCheckBoxes(col.id)}>
                        {col.id}
                      </Checkbox>
                    ) : (
                      <Box />
                    )}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Recorder;
