'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FAQ as FAQ_DATA } from '@/data/seo'
import { fadeUp, viewportOnce, faqAnswer } from '@/lib/animations'

export default function FAQ({ locale }: { locale: string }) {
  const t = useTranslations('faq')
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq" className="py-24 px-4 bg-neutral-950">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-neutral-400 text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {FAQ_DATA.map((item) => (
            <div
              key={item.id}
              className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/30"
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-neutral-800/50 transition-colors"
              >
                <span className="font-bold text-lg text-white">
                  {locale === 'nl' ? item.questionNL : item.questionEN}
                </span>
                <span className={`text-2xl transition-transform duration-300 ${openId === item.id ? 'rotate-45 text-blue-400' : 'text-neutral-500'}`}>
                  +
                </span>
              </button>
              
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    variants={faqAnswer}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="p-6 pt-0 text-neutral-400 leading-relaxed border-t border-neutral-800/50 mt-4">
                      {locale === 'nl' ? item.answerNL : item.answerEN}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
