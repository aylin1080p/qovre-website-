'use client'

import { useState, useRef, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, fadeIn } from '@/lib/animations'

type Message = {
  role: 'user' | 'model'
  parts: { text: string }[]
}

const QUICK_REPLIES = {
  nl: [
    {
      label: 'Onze diensten',
      response:
        'Qovre biedt vier diensten: Maatwerk Software, AI & Automatisering, Content & Groei, en Doorlopend Onderhoud. [Bekijk alle diensten](/nl/diensten).',
    },
    {
      label: 'Wat kost het?',
      response:
        'Projecten starten vanaf €3.000 met vaste scope en prijs. Geen uurtarief. [Plan een gratis gesprek](/nl/contact).',
    },
    {
      label: 'Hoe lang duurt het?',
      response:
        'Gemiddeld 6-12 weken voor een webapplicatie, 3-8 weken voor AI-integraties.',
    },
    {
      label: 'Contact opnemen',
      response:
        'Bereik ons via contact@qovre.nl — reactie binnen 1 werkdag. [Contactformulier](/nl/contact).',
    },
  ],
  en: [
    {
      label: 'Our services',
      response:
        'Qovre offers four services: Custom Software, AI & Automation, Content & Growth, and Ongoing Support. [View services](/en/services).',
    },
    {
      label: 'Pricing',
      response:
        'Projects start from €3,000 with fixed scope. No hourly billing. [Book a free call](/en/contact).',
    },
    {
      label: 'Timeline',
      response:
        'Typically 6-12 weeks for a web application, 3-8 weeks for AI integrations.',
    },
    {
      label: 'Get in touch',
      response:
        'Email us at contact@qovre.nl — we respond within one business day. [Contact form](/en/contact).',
    },
  ],
}

export default function ChatWidget() {
  const locale = useLocale() as 'nl' | 'en'
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [limitReached, setLimitReached] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickReplies = QUICK_REPLIES[locale] ?? QUICK_REPLIES.nl
  const greeting = locale === 'nl' ? 'Goedendag! Hoe kan ik u helpen?' : 'Hello! How can I help you?'
  const placeholder = locale === 'nl' ? 'Stel een vraag...' : 'Ask a question...'
  const limitMsg =
    locale === 'nl'
      ? 'De chat is tijdelijk niet beschikbaar. Neem contact op via contact@qovre.nl'
      : 'Chat is temporarily unavailable. Please email contact@qovre.nl'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text: string) {
    if (!text.trim() || loading || limitReached) return

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', parts: [{ text }] },
    ]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.slice(-10) }),
      })

      if (res.status === 503) {
        setLimitReached(true)
        setLoading(false)
        return
      }

      if (!res.ok) throw new Error('Request failed')

      const data = await res.json() as { reply: string }
      setMessages([...newMessages, { role: 'model', parts: [{ text: data.reply }] }])
    } catch {
      setMessages([
        ...newMessages,
        { role: 'model', parts: [{ text: locale === 'nl' ? 'Er is iets misgegaan. Probeer het opnieuw.' : 'Something went wrong. Please try again.' }] },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleQuickReply(response: string) {
    setMessages((prev) => [
      ...prev,
      { role: 'model', parts: [{ text: response }] },
    ])
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      {/* Dynamic Design Layer */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col w-[350px] md:w-[400px] h-[500px] rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl border border-neutral-800 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-bold text-white tracking-tight">Qovre {locale === 'nl' ? 'Assistent' : 'Assistant'}</span>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 custom-scrollbar">
              {messages.length === 0 && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-neutral-800/50 text-neutral-200">
                    {greeting}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((qr) => (
                      <button
                        key={qr.label}
                        onClick={() => handleQuickReply(qr.response)}
                        className="text-xs font-medium px-4 py-2 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white hover:border-blue-500/50 transition-all"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-neutral-800 text-neutral-200 rounded-tl-none'
                  }`}>
                    {msg.parts[0].text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <div className="w-1 h-1 bg-neutral-500 rounded-full animate-bounce" />
                    <div className="w-1 h-1 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-1 bg-neutral-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              {limitReached && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {limitMsg}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!limitReached && (
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                className="p-4 bg-neutral-900 border-t border-neutral-800"
              >
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    className="w-full bg-neutral-800 border-none rounded-2xl py-3 px-5 pr-12 text-sm text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500/50 transition-all"
                    disabled={loading}
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !input.trim()} 
                    className="absolute right-2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-30 transition-all"
                  >
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        {/* WhatsApp Toggle */}
        <a
          href="https://wa.me/31647656343"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white transition-all shadow-lg backdrop-blur-md"
          aria-label="WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>

        {/* Chat toggle button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close chat' : 'Open chat'}
          className={`flex items-center justify-center w-14 h-14 rounded-full transition-all shadow-lg backdrop-blur-md ${
            open ? 'bg-neutral-800 border border-neutral-700 text-white rotate-90' : 'bg-blue-600 border border-blue-500 text-white'
          }`}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          )}
        </button>
      </div>
    </div>
  )
}
