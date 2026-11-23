import React from 'react';
import { IconXMark } from '@tabler/icons-react';

import { api } from '../lib/api';
export default function Partrequest({
    onClose,
}) {
   const [requestmessage, setRequestmessage] = React.useState("");
   const [busy, setBusy] = React.useState(false);
   const [error, setError] = React.useState("");
   const [sent, setSent] = React.useState("");
   async function request(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("message", requestmessage.trim());
      await api ("/part-request", {
        method: "POST",
        body: form
      });
      setRequestmessage("");
      setSent(true);
    }catch (err) {
     setError(err.message);
    } finally {
     setBusy(false);
    }
  }
  return <div className="modal-backdrop" onMouseDown={event => {
          if (event.target === event.currentTarget) onClose();
      }}> <div className="modal editor-modal">
          <div className="modal-head">
            <h3>Request item..</h3>
            <button className="icon-button" onClick={onClose} aria-label="Close">
                <IconXMark size={21} />
              </button> 
            </div>
              <form onSubmit={request}>
                <label>Message:<textarea type="text" placeholder="item request.. or anything" value={requestmessage} onChange={(e) => setRequestmessage(e.target.value)} required/></label>
                <button type="submit" disable={busy}>Send</button>
              </form>
              {error && <div className="notice error">{error}</div>}
              {sent && <div className="notice success">Request Sent! we'll try added item ASAP thank you</div>}
            </div>
            </div>    
}
