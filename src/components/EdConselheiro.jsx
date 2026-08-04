import { useEffect, useRef, useState } from 'react'
import './EdConselheiro.css'

const INITIAL_MESSAGE = {
  id: 'init',
  sender: 'bot',
  text: 'E aí! Eu sou o Ed. Aqui não tem resposta certa ou errada, não tem julgamento, e tudo que você falar fica entre a gente. Pode ser sobre o futuro, sobre como tá se sentindo, sobre família, escola, qualquer coisa. Me conta: como você tá hoje, de verdade?',
}

const QUICK_REPLIES = [
  'Tô com a cabeça cheia',
  'Não sei o que fazer da vida',
  'Quero conversar sobre algo',
  'Tô bem, só curiosidade',
]

const API_URL = import.meta.env.DEV ? 'http://localhost:3001/api/chat' : '/api/chat'

export default function EdConselheiro() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [showQuick, setShowQuick] = useState(true)
  const [typing, setTyping] = useState(false)
  const [apiError, setApiError] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen, typing])

  function addMessage(sender, text) {
    setMessages(prev => [...prev, { id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, sender, text }])
  }

  async function callAI(convHistory) {
    setTyping(true)
    setApiError(false)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: convHistory }),
      })

      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()
      setTyping(false)
      addMessage('bot', data.text || 'Hmm, tive um probleminha aqui. Manda de novo?')
    } catch (err) {
      console.error('Ed AI error:', err)
      setTyping(false)
      setApiError(true)
      addMessage(
        'bot',
        'Ops, não consegui me conectar agora. Isso pode ser um problema de configuração da API. Enquanto isso, tente refletir sobre isso: o que exatamente você tá sentindo agora, em uma palavra?'
      )
    }
  }

  function sendUserMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || typing) return
    setShowQuick(false)
    const newHistory = [...messages, { id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, sender: 'user', text: trimmed }]
    setMessages(newHistory)
    setInputValue('')
    callAI(newHistory)
  }

  return (
    <div className="ed-conselheiro">
      {!isOpen && (
        <button className="ed-fab" onClick={() => setIsOpen(true)}>
          <span className="ed-fab-icon">💬</span>
          <span>Ed Conselheiro</span>
        </button>
      )}

      <div className={`ed-panel ${isOpen ? 'ed-panel-open' : ''}`}>
        <div className="ed-header">
          <div className="ed-header-info">
            <span className="ed-header-title">Ed Conselheiro</span>
            <span className="ed-header-status">
              <span className="ed-status-dot" />
              {apiError ? 'Modo offline' : 'Online — IA'}
            </span>
          </div>
          <div className="ed-header-actions">
            <button className="ed-icon-btn" onClick={() => setIsOpen(false)} title="Minimizar">&#95;</button>
            <button className="ed-icon-btn" onClick={() => setIsOpen(false)} title="Fechar">&#10005;</button>
          </div>
        </div>

        <div className="ed-messages">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`ed-message ${msg.sender === 'user' ? 'ed-message-user' : 'ed-message-bot'}`}
            >
              {msg.text}
            </div>
          ))}

          {typing && (
            <div className="ed-message ed-message-bot ed-typing">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          )}

          {showQuick && (
            <div className="ed-quick-replies">
              {QUICK_REPLIES.map(label => (
                <button
                  key={label}
                  className="ed-quick-reply-btn"
                  onClick={() => sendUserMessage(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="ed-input-area">
          <input
            type="text"
            className="ed-input"
            placeholder={typing ? 'Ed tá pensando...' : 'Fala comigo...'}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendUserMessage(inputValue)}
            disabled={typing}
          />
          <button
            className="ed-send-btn"
            onClick={() => sendUserMessage(inputValue)}
            disabled={typing || !inputValue.trim()}
          >
            &#10148;
          </button>
        </div>

        <div className="ed-disclaimer">
          Ed é uma IA — não substitui acompanhamento profissional. CVV: 188 (24h).
        </div>
      </div>
    </div>
  )
}
