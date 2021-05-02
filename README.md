# React BitClout Login

This project is based on [mubashariqbal/login-with-bitclout](https://github.com/mubashariqbal/login-with-bitclout) repository.

[@mubashariqbal](https://bitclout.com/u/mubashariqbal), Thanks a lot for your code!

## Security
This code is very raw and may contain vulnerabilities. I ask you to help make it better. Feel free to add issues and pull requests.

### JWT
If you only want to verify Bitclout users, JWT token would be enough for this goal.
Storing it in the database is safer than encryptedSeedHex(with high access level) because JWT can't sign Bitclout transactions. You can validate user publicKey by JWT token. See an example here:
https://docs.bitclout.com/devs/identity-api#validation-in-go

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
[![https://bitclout.com/u/transhumanist](public/logo96.png)](https://bitclout.com/u/transhumanist)