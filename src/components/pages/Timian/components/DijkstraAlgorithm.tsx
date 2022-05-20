import React, { useEffect, useState } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';

enum State {
  Start = 0,
  Unexplored,
  Explored,
  Obstacle,
  Hindered,
}

const setState = (index: number, state: State | null = null) => {
  const gridEl = document.getElementById('box-' + index);
  if (gridEl) {
    console.log(state);
    switch (state) {
      case State.Start:
        gridEl.className = State.Start.toString();
        gridEl.style.backgroundColor = '#fc0703'; //red
        break;
      case State.Explored:
        gridEl.className = State.Explored.toString();
        gridEl.style.backgroundColor = '#ff6e6b'; //light red
        break;
      case State.Unexplored:
        gridEl.className = State.Unexplored.toString();
        gridEl.style.backgroundColor = '#ffffff'; //white
        break;
      case State.Obstacle:
        gridEl.className = State.Obstacle.toString();
        gridEl.style.backgroundColor = '#404040'; //dark gray
        break;
      case State.Hindered:
        gridEl.className = State.Hindered.toString();
        gridEl.style.backgroundColor = '#ab5cab'; //magenta
        break;
      case null:
        console.log('isnull');
        /* const stat = parseInt(gridEl.className);
        const newStat = stat === 4 ? 0 : stat + 1;
        setState(index, newStat); */
        break;
    }
    console.log(gridEl);
  }
};

function App() {
  const columnC = 25;
  const rowC = 25;
  const noOfBoxes = columnC * rowC;

  const width = window.innerWidth;
  const widthRec = (width * 0.9) / 55;

  const height = window.innerHeight;
  const heightRec = (height * 0.9) / 55;

  const [gridArray, setGridArray] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setGridArray(randJSXArr());
  }, []);

  const randJSXArr = () =>
    Array.from({ length: noOfBoxes }, (itm, idx) => (
      <GridItem
        key={'box-' + idx}
        id={'box-' + idx}
        as={Button}
        onClick={() => setState(idx, 3)}
        className={'0'}
        maxW={widthRec + 'px'}
        minH={heightRec + 'px'}
        colSpan={1}
        bg='orange'
        borderRadius='0px'>
        {idx}
      </GridItem>
    ));

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  const insertObstacles = (array: JSX.Element[], nObstacles: number) => {
    const rIndexes = Array.from({ length: nObstacles }, () => {
      return getRandomArbitrary(1, noOfBoxes - 1);
    });

    rIndexes.forEach((ind) => {
      setState(ind, 3);
    });
  };

  const resetGrid = () => {
    gridArray.map((_el, indx) => {
      setState(indx, 1);
    });
    const start = 1 * columnC + 1;
    const end = columnC * rowC - 2 - rowC;
    setState(start, 0);
    setState(end, 0);
  };
  return (
    <Flex className='viewport' flexDir='column' h='100vh' w='100vw' bg='green' justifyContent={'center'}>
      <Button onClick={resetGrid}>Reset grid</Button>
      <Button onClick={() => insertObstacles(gridArray, 205)}>Insert Obstacles</Button>

      <Flex alignItems={'center'} justifyContent={'center'} h='90vh' w='90vw'>
        <Grid boxSize={'80%'} templateRows={`repeat(${rowC}, 1fr)`} templateColumns={`repeat(${columnC}, 1fr)`} gap={0}>
          {gridArray}
        </Grid>
      </Flex>
    </Flex>
  );
}

export default App;
