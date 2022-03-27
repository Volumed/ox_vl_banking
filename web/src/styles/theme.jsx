import { extendTheme  } from '@chakra-ui/react';

const config  = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config: config ,
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'none',
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'none',
        },
      },
      variants: {
        outline: {
          field: {
            borderRadius: 0,
            borderLeft: 'none',
            borderTop: 'none',
            borderRight: 'none'
          }
        }
      },
      defaultProps: {
        variant: "outline"
      }
    },
  }
});
