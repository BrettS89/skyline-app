import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5367FF',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: "\"Proxima Nova\", sans-serif",
    button: {
      textTransform: 'none',
      // borderRadius: 30
      //@ts-ignore
      // fontWeight: '500',
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 4.5
      }, 
    }, 
  }, 
});

export default theme;
