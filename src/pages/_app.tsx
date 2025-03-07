import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import { ThemeProvider } from '../../src/context/ThemeContext';
import ErrorBoundary from '../../src/components/ErrorBoundary';
import Flyout from '../src/../components/Flyout';
import { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
          <Flyout />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
