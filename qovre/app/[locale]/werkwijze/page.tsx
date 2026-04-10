import { permanentRedirect } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(`/${locale}/process`)
}

export default function WerkwijzePage() {
  permanentRedirect('/nl/process')
}
