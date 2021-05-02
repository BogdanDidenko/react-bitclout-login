

import React from 'react';
import Button from "@material-ui/core/Button";
import Icon from './icon';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

function initLogin(accessLevel, JWT) {
  return new Promise(function (resolve, reject) {
    function login() {
      identityWindow = window.open('https://identity.bitclout.com/log-in?accessLevel='+accessLevel, null, 'toolbar=no, width=800, height=1000, top=0, left=0');
    }

    function handleInit(e) {
      if (!init) {
        init = true;

        for (const e of pendingRequests) {
          e.source.postMessage(e, "*");
        }

        pendingRequests = []
        pm_id = e.data.id
        source = e.source
      }
      respond(e.source, e.data.id, {})
    }

    function handleLogin(payload) {
      user = payload['users'][payload.publicKeyAdded]
      if (identityWindow) {
        if (JWT === false) {
          identityWindow.close();
          identityWindow = null;
          resolve(user)
        } else {
          var payload = {
            accessLevel: user.accessLevel,
            accessLevelHmac: user.accessLevelHmac,
            encryptedSeedHex: user.encryptedSeedHex
          };
          source.postMessage({
            id: pm_id,
            service: 'identity',
            method: 'jwt',
            payload: payload
          }, "*");
        }
      }
    }

    function handleJWT(payload) {
      user['jwt'] = payload['jwt'];
      identityWindow.close();
      identityWindow = null;
      resolve(user);
    }

    function respond(e, t, n) {
      e.postMessage({
        id: t,
        service: "identity"
      }, "*")
    }

    window.addEventListener('message', message => {
      const { data: { id: id, method: method, service: service, payload: payload } } = message;
      if (service !== "identity"){ return };

      if (method == 'initialize') {
        handleInit(message);
      } else if (method == 'login') {
        handleLogin(payload);
      } else if ('jwt' in payload) {
        handleJWT(payload);
      }
    });

    var init = false;
    var pm_id = ''
    var source = null;
    var user = null;
    var pendingRequests = [];
    var identityWindow = null;
    login()
  });
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    textTransform: 'none'
  }
}));

const BitcloutLogin = (props) => {
	const classes = useStyles();
  const {accessLevel, onSuccess, onFailure, JWT, ...other} = props
	const handleLogin = () => {
		initLogin(accessLevel, JWT).then(e=>{
			onSuccess(e);
		}).catch(e=>{
      onFailure(e);
    });
	}
	return (
    <div className={classes.paper}>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<Icon />}
        onClick={handleLogin}
      >
        Sign in with Bitclout
      </Button>
    </div>
  );
}

BitcloutLogin.propTypes = {
  accessLevel: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  JWT: PropTypes.bool
}
export default BitcloutLogin