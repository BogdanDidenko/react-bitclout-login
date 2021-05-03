import './App.css';
import React from "react";
import BitcloutLogin from './BitcloutLogin.js'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [response, setResponse] = React.useState('');
  const responseClout = (response) => {
    setResponse(JSON.stringify(response, null, 2));
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
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
      <div className={classes.paper}>
        <BitcloutLogin
          accessLevel={accessLevel}
          onSuccess={responseClout}
          onFailure={responseClout}
          JWT={JWT}
        />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Bitclout auth response"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <pre>
              {response}
            </pre>
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
