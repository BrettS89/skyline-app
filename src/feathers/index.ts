import feathers from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import { url } from '../config';

const app = feathers();

// Connect to the same as the browser URL (only in the browser)
// const restClient = rest();

// Connect to a different URL
const restClient = rest(url);

// Configure an AJAX library (see below) with that client 
app.configure(restClient.fetch(window.fetch));

const setAuthHeader = (context: any) => {
  context.params.headers = Object.assign({}, {
    'authorization': localStorage.getItem('token'),
  }, context.params.headers);
  return context;
}

app.hooks({
  before: {
    all: [
      setAuthHeader,
    ]
  }
});

export default app;
