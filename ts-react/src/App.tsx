import React from 'react';
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Alert from "./components/Alert/alert";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large} onClick={() => {
          console.log('click');
        }}>123</Button>
        <Alert closeable={true} closeText="确定" type="success" onClose={
          () => {
            console.log('close');
          }
        }>
          <p>123</p>
        </Alert>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>123</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>123</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>123</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
