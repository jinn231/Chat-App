// import { store,persistor } from '@/redux/store'
import '@/styles/globals.css'
import { Provider } from 'react-redux';
import App from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import store from '@/redux/store';
export default function MyApp({ Component, pageProps }) {
  App.effectAllowed = () => false;

  return (
    <>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor} > */}
          <Component {...pageProps} />
        {/* </PersistGate> */}
      </Provider>
    </>
    )
}
