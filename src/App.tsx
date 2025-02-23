import { Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from './context/ThemeContext';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Flyout from './components/Flyout';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Flyout />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
