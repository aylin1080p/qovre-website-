'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function CookieConsent() {
  const locale = useLocale() as 'nl' | 'en'
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('qovre_cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('qovre_cookie_consent', 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('qovre_cookie_consent', 'declined')
    setVisible(false)
  }

  const isNL = locale === 'nl'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          role="dialog"
          aria-label={isNL ? 'Cookiemelding' : 'Cookie notice'}
        >
          <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <p className="text-white text-sm font-semibold mb-1">
                {isNL ? 'Wij gebruiken cookies' : 'We use cookies'}
              </p>
              <p className="text-neutral-400 text-xs leading-relaxed">
                {isNL
                  ? 'Qovre gebruikt analytische en functionele cookies om de website te verbeteren en uw ervaring te personaliseren. Raadpleeg ons '
                  : 'Qovre uses analytical and functional cookies to improve the website and personalise your experience. See our '}
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  {isNL ? 'privacybeleid' : 'privacy policy'}
                </Link>
                {isNL ? ' voor meer informatie.' : ' for more information.'}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-600 rounded-xl transition-all"
              >
                {isNL ? 'Weigeren' : 'Decline'}
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all"
              >
                {isNL ? 'Accepteren' : 'Accept'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
