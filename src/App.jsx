import CustomProvider from './components/CustomContext/CustomContext';
import MainContent from './components/MainContent/MainContent';

function App() {
  return (
    <CustomProvider>
      <MainContent />
    </CustomProvider>
  );
}

export default App;
