import React from 'react';
// import { ArrowRight, BookOpen, LoaderCircle, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { IconArrowBadgeRight, IconTopologyStarRing3, IconDevices2, IconSend2, IconBrandTabnine, IconMessageSparkle, IconXMark } from '@tabler/icons-react';
import { api } from '../lib/api';
export default function Chat({
  session,
  onClose,
  onSignIn,
  onOpenPost
}) {
  const [question, setQuestion] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [busy, setBusy] = React.useState(false);
  const bottom = React.useRef(null);
  React.useEffect(() => {
    bottom.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages, busy]);
  async function send(event) {
    event.preventDefault();
    const text = question.trim();
    if (!text || busy) return;
    setQuestion('');
    setMessages(current => [...current, {
      role: 'user',
      text
    }]);
    setBusy(true);
    try {
      const result = await api('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: text
        })
      });
      setMessages(current => [...current, {
        role: 'assistant',
        text: result.answer,
        sources: result.sources
      }]);
    } catch (err) {
      setMessages(current => [...current, {
        role: 'assistant',
        text: `Sorry, I couldn't answer that. ${err.message}`,
        sources: []
      }]);
    } finally {
      setBusy(false);
    }
  }
  return <div className="drawer-backdrop" onMouseDown={event => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <aside className="chat-drawer">
      <div className="chat-head">
        <div className="chat-icon">
          <IconTopologyStarRing3 size={20} />
        </div>
        <div>
          <h2>Ask AI</h2>
          <p>Curious? Just ask.</p>
        </div>
        <button className="icon-button" onClick={onClose} aria-label="Close chat">
          <IconXMark size={21} />
        </button>
      </div>
      <div className="chat-messages">
        {!session ? <div className="chat-welcome">
          <div className="welcome-icon">
            <IconMessageSparkle size={28} />
          </div>
          <h3>Find more</h3>
          <p>Sign in to ask questions across all published build.</p>
          <button className="button button-dark" onClick={onSignIn}>Sign in to chat <IconArrowBadgeRight size={16} /></button>
        </div> : messages.length === 0 ? <div className="chat-welcome">
          <div className="welcome-icon">
            <IconTopologyStarRing3 size={28} />
          </div>
          <h3>What would you like to know?</h3>
          <p>Ask a question and I'll search for an answer.</p>
          <div className="suggestions">
            {['What are the latest build about?', 'Summarize the main ideas'].map(text => <button key={text} onClick={() => setQuestion(text)}>
              {text}
              {" "}
              <IconArrowBadgeRight size={14} />
            </button>)}
          </div>
        </div> : messages.map((message, index) => <div key={index} className={`message ${message.role}`}>
          <div className="message-label">
            {message.role === 'assistant' ? <><IconTopologyStarRing3 size={13} />AI</> : 'YOU'}
          </div>
          <div className="message-bubble">
            {message.text}
          </div>
          {message.sources?.length > 0 && <div className="sources">
            <span>Sources</span>
            {message.sources.map(source => <button key={source.id} onClick={() => onOpenPost(source.id)}>
              <IconDevices2 size={13} />
              {source.title}
              <IconArrowBadgeRight size={12} />
            </button>)}
          </div>}
        </div>)}
        {busy && <div className="thinking"><IconBrandTabnine className="spin" size={16} /> Searching...</div>}
        <div ref={bottom} />
      </div>
      {session && <form className="chat-input" onSubmit={send}>
        <input value={question} onChange={event => setQuestion(event.target.value)} maxLength={2000} placeholder="Ask about the build..." aria-label="Ask about the posts" />
        <button disabled={busy || !question.trim()} title="Send question">
          <IconSend2 size={18} />
        </button>
      </form>}
      <div className="chat-disclaimer">Answers are based on published build.</div>
    </aside>
  </div>;
}
