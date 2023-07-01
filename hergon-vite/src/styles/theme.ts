import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    body: 'Rubik',
    heading: 'Rubik'
  },
  styles: {
    global: {
      '*': {
        boxSizing: 'border-box',
      },

      'html': {
        //480px
        sm: {
          fontSize: '87.5%' // 14px
        },
        //768px
        md: {
          fontSize: '93.75%' // 15px
        }, 
        //1280px
        xl: {
          fontSize: '100%' //16px
        },        
      },

      'body': {
        backgroundColor: 'gray.50',
        fontWeight: 400,
        fontSize: '1rem',
        //padding: '1rem 1rem 0',

        xl: {
          padding: '0 2rem',
        }
      },

      'body, input, textarea, button': {
        fontWeight: 400,
        fontSize: '1rem',
      },
      
      'a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    
      'ul': {
        listStyle: 'none',
      },
    
      'button': {
        cursor: 'pointer',
        font: 'inherit',
      },
    
      'table': {
        borderCollapse: 'collapse',
      }
    }
  },
  color: {
    orangeGradient: 'linear-gradient(to right, #f8924f, #ffc444)',
  }
});

