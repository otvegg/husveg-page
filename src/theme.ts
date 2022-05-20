import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initalColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Input: {
      variants: {
        submit: {
          field: {
            bg: '#003049 ',
            color: '#FFFFFF',
            borderRadius: '0px',
            _hover: {
              backgroundColor: '#669bbc !important',
            },
          },
        },
        insert: (props: { colorMode: string }) => ({
          field: {
            border: '1px',
            borderColor: '#767676',
            color: props.colorMode === 'light' ? '#000' : 'gray.400',
            bg: props.colorMode === 'light' ? '#fff' : '#2D3748',
            _active: { borderColor: '#003049', boxShadow: '0 0 0 1px #003049' },
            _focus: { borderColor: '#003049', boxShadow: '0 0 0 1px #003049' },
            _hover: { borderColor: '#8b8b8b', boxShadow: '0 0 0 1px #8b8b8b' },
            _invalid: { borderColor: 'red', boxShadow: '0 0 0 1px red' },
          },
        }),
      },
    },

    Select: {
      variants: {
        roleSelect: (props: { colorMode: string }) => ({
          field: {
            bg: props.colorMode === 'light' ? '#fff' : '#2D3748',
            _active: { borderColor: '#003049', boxShadow: '0 0 0 1px #003049' },
            _focus: { borderColor: '#003049', boxShadow: '0 0 0 1px #003049' },
            _hover: { borderColor: '#8b8b8b', boxShadow: '0 0 0 1px #8b8b8b' },
            border: '1px',
            borderColor: '#767676',
          },
        }),
      },
    },

    Button: {
      // 1. We can update the base styles
      baseStyle: () => ({}),
      // 2. We can add a new button size or extend existing
      sizes: {},
      // 3. We can add a new visual variant
      variants: {
        navbarButton: (props: { colorMode: string }) => ({
          /* bg: 'transparent', */
          marginTop: '0px !important',
          _hover: { bg: props.colorMode === 'dark' ? '#FAFAFA19' : '#dce1e8' },
          _active: { boxShadow: '0px 0px 0px ' },
          _after: { boxShadow: '0px 0px 0px ' },
          _focus: { boxShadow: '0px 0px 0px' },
        }),

        iterateImagesButton: (props: { colorMode: string }) => ({
          /* bg: 'transparent', */
          marginTop: '0px !important',
          _hover: { bg: props.colorMode === 'dark' ? '#FAFAFA19' : '#dce1e8' },
          _active: { boxShadow: '0px 0px 0px ' },
          _after: { boxShadow: '0px 0px 0px ' },
          _focus: { boxShadow: '0px 0px 0px' },
          fontSize: '40px',
          fontWeight: 'bold',
        }),
        // 4. We can override existing variants
        /* solid: (props: { colorMode: string }) => ({
          bg: props.colorMode === 'dark' ? 'red.300' : '#003049',
        }), */
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        overflow: 'hidden',
      },
    },
  },
});

export default theme;
