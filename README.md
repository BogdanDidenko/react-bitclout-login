# React BitClout Login

This project is based on [mubashariqbal/login-with-bitclout](https://github.com/mubashariqbal/login-with-bitclout) repository.

[@mubashariqbal](https://bitclout.com/u/mubashariqbal), Thanks a lot for your code!

## Security
This code is very raw and may contain vulnerabilities. I ask you to help make it better. Feel free to add issues and pull requests.

## How to use

```js
import './App.css';
import React from "react";
import BitcloutLogin from './BitcloutLogin.js'

function App() {
  const responseClout = (response) => {
    console.log(response)
  }
  /**
   * https://docs.bitclout.com/devs/identity-api#access-levels
  */
  const accessLevel = 4;
  /**
   * JWT requires access leve 2+
   * https://github.com/bitclout/identity/blob/main/src/app/identity.service.ts#L115
   * https://github.com/bitclout/identity/blob/b4c4a041414778e8acb22d39afed5e7d72752178/src/types/identity.ts#L31
   */
  const JWT = true;
  return (
    <div className="App">
      <BitcloutLogin
        accessLevel={accessLevel}
        onSuccess={responseClout}
        onFailure={responseClout}
        JWT={JWT}
      />
    </div>
  );
}

export default App;
```

Commands for run:
```shell
git clone git@github.com:BogdanDidenko/react-bitclout-login.git
cd react-bitclout-login
npm install
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Developed by [@transhumanist](https://bitclout.com/u/transhumanist)
[![https://bitclout.com/u/transhumanist](data:image/jpeg;base64,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)](https://bitclout.com/u/transhumanist)