import { permanentRedirect } from 'next/navigation'

export default function LegacyDutchFaqRedirect() {
  permanentRedirect('/nl/faq')
}
