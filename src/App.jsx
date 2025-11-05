import React, { useState } from 'react';
import chatbot from './image/chatbot.jpg';
import sendbtn from './image/sendbtn.png';
import savebtn from './image/savebtn.png';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    const res = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    setLoading(false);
  };
  return (
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto', position: "fixed", top: 0 }}>
      <div>
        <img src={chatbot} style={{ width: "65px", height: "auto", display: "inline-block"}} />
        <h2 style={{display: "inline-block"}}>Kris Bot</h2>
      </div>
      
      <div className="content-box">
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '10px 0' }}>
            
            <strong>{m.role === 'user' ? 'You' : 'Kris'}:</strong> <div style={{whiteSpace: "pre-wrap"}}>{m.content}</div>
          </div>
        ))}
        {loading && <p style={{color: "#87CEEB", content: "text", fontWeight: "bold", fontStyle: "italic"}}>Typing Please Wait...</p>}
      </div>

      <div id="main_search">
        <input id="main_search_input" value={input} onChange={(e) => setInput(e.target.value)} style={{ width: '80%' }}
        placeholder="Type a message..." />
        <button className="search_button" onClick={sendMessage}>
          <img src={sendbtn} width="20" style={{padding: "0 0 0 5px"}} />
        </button>
      </div>
      
    </div>
  );
}
export default App;