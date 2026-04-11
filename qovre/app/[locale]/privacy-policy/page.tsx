import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: locale === 'nl' ? 'Privacybeleid — Qovre' : 'Privacy Policy — Qovre',
    description: locale === 'nl'
      ? 'Privacybeleid van Qovre (GetFromTR). Hoe wij uw persoonsgegevens verwerken conform de AVG.'
      : 'Privacy policy of Qovre (GetFromTR). How we process your personal data in accordance with the GDPR.',
    path: `/${locale}/privacy-policy`,
    locale: locale as 'nl' | 'en',
  })
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isNL = locale === 'nl'
  const lastUpdated = '1 april 2025'

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <p className="text-xs font-semibold tracking-widest uppercase text-neutral-600 mb-3">
          {isNL ? 'Juridisch' : 'Legal'}
        </p>
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          {isNL ? 'Privacybeleid' : 'Privacy Policy'}
        </h1>
        <p className="text-neutral-500 text-sm">
          {isNL ? `Laatst bijgewerkt: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
        </p>
      </div>

      <div className="prose prose-invert prose-sm max-w-none text-neutral-300 leading-relaxed space-y-8">

        {isNL ? (
          <>
            <section>
              <h2 className="text-white text-xl font-semibold mb-3">1. Verantwoordelijke voor de verwerking</h2>
              <p>
                Qovre is een handelsnaam van <strong>GetFromTR</strong>, gevestigd in Den Haag, Nederland.
                Wij zijn verantwoordelijk voor de verwerking van uw persoonsgegevens zoals beschreven in dit privacybeleid.
              </p>
              <p className="mt-3">
                <strong>Contactgegevens:</strong><br />
                E-mail: {BRAND.email.primary}<br />
                Website: {BRAND.websiteUrl}
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">2. Welke gegevens wij verwerken</h2>
              <p>Qovre verwerkt persoonsgegevens die u actief aan ons verstrekt, waaronder:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Naam en e-mailadres (via contactformulieren en onboarding)</li>
                <li>Bedrijfsnaam en functietitel</li>
                <li>Technische projectinformatie die u vrijwillig deelt</li>
                <li>IP-adres en browsergegevens (analytische cookies)</li>
                <li>Communicatiehistorie (e-mail, WhatsApp)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">3. Grondslag voor verwerking</h2>
              <p>Wij verwerken uw gegevens op basis van één of meer van de volgende grondslagen:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Uitvoering van een overeenkomst:</strong> wanneer u een aanvraag indient of een opdracht met ons aangaat</li>
                <li><strong>Gerechtvaardigd belang:</strong> voor het verbeteren van onze diensten en communicatie</li>
                <li><strong>Toestemming:</strong> voor analytische cookies en marketingcommunicatie</li>
                <li><strong>Wettelijke verplichting:</strong> voor fiscale en administratieve bewaarplichten</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">4. Bewaartermijnen</h2>
              <p>
                Wij bewaren uw gegevens niet langer dan noodzakelijk voor het doel waarvoor zij zijn verzameld.
                Contactformulierdata wordt bewaard gedurende de looptijd van de zakelijke relatie en maximaal
                zeven (7) jaar na beëindiging conform de fiscale bewaarplicht. Analytische gegevens worden
                geanonimiseerd na 26 maanden.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">5. Delen met derden</h2>
              <p>
                Qovre deelt uw gegevens uitsluitend met verwerkers die noodzakelijk zijn voor de uitvoering
                van onze diensten, waaronder:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Supabase Inc.</strong> – databaseopslag (EU-regio)</li>
                <li><strong>Vercel Inc.</strong> – hosting en infrastructuur</li>
                <li><strong>Resend Inc.</strong> – transactionele e-mail</li>
                <li><strong>Google LLC</strong> – analytische diensten (met IP-anonimisering)</li>
              </ul>
              <p className="mt-3">
                Alle verwerkers zijn gebonden aan een verwerkersovereenkomst en mogen uw gegevens niet
                voor eigen doeleinden gebruiken. Wij verkopen uw gegevens nooit aan derden.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">6. Uw rechten (AVG)</h2>
              <p>Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Recht op inzage:</strong> u kunt opvragen welke gegevens wij van u verwerken</li>
                <li><strong>Recht op rectificatie:</strong> onjuiste gegevens laten corrigeren</li>
                <li><strong>Recht op verwijdering:</strong> uw gegevens laten wissen (het &lsquo;recht op vergetelheid&rsquo;)</li>
                <li><strong>Recht op beperking:</strong> verwerking tijdelijk beperken</li>
                <li><strong>Recht op overdraagbaarheid:</strong> uw gegevens in een gestructureerd formaat ontvangen</li>
                <li><strong>Recht van bezwaar:</strong> bezwaar maken tegen verwerking op basis van gerechtvaardigd belang</li>
              </ul>
              <p className="mt-3">
                Verzoeken kunt u indienen via <strong>{BRAND.email.primary}</strong>. Wij reageren binnen
                de wettelijke termijn van 30 dagen. Bent u het niet eens met onze verwerking, dan kunt u
                een klacht indienen bij de <strong>Autoriteit Persoonsgegevens</strong> (autoriteitpersoonsgegevens.nl).
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">7. Cookies</h2>
              <p>
                Qovre gebruikt functionele cookies (noodzakelijk voor de werking van de website) en analytische
                cookies (Google Analytics 4) uitsluitend na uw toestemming. U kunt uw cookievoorkeuren altijd
                herzien door uw browserinstellingen aan te passen of contact met ons op te nemen.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">8. Beveiligingsmaatregelen</h2>
              <p>
                Qovre treft passende technische en organisatorische maatregelen om uw gegevens te beschermen
                tegen ongeoorloofde toegang, verlies of vernietiging. Dit omvat versleutelde verbindingen (TLS),
                toegangscontrole op rollen (RBAC) en regelmatige beveiligingsaudits.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">9. Wijzigingen</h2>
              <p>
                Qovre behoudt het recht dit privacybeleid te wijzigen. Substantiële wijzigingen worden
                per e-mail gecommuniceerd aan actieve relaties. De meest recente versie is altijd
                beschikbaar op {BRAND.websiteUrl}/privacy-policy.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-white text-xl font-semibold mb-3">1. Data Controller</h2>
              <p>
                Qovre is a trade name of <strong>GetFromTR</strong>, registered in The Hague, the Netherlands.
                We are the data controller for the personal data described in this policy.
              </p>
              <p className="mt-3">
                <strong>Contact:</strong><br />
                Email: {BRAND.email.primary}<br />
                Website: {BRAND.websiteUrl}
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">2. Data We Collect</h2>
              <p>Qovre processes personal data that you actively provide to us, including:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Name and email address (via contact forms and onboarding)</li>
                <li>Company name and job title</li>
                <li>Technical project information you voluntarily share</li>
                <li>IP address and browser data (analytical cookies)</li>
                <li>Communication history (email, WhatsApp)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">3. Legal Basis for Processing</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Contract performance:</strong> when you submit a request or enter into an engagement</li>
                <li><strong>Legitimate interest:</strong> to improve our services and communication</li>
                <li><strong>Consent:</strong> for analytical cookies and marketing communications</li>
                <li><strong>Legal obligation:</strong> for tax and administrative retention requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">4. Retention Periods</h2>
              <p>
                We retain your data only as long as necessary for its original purpose. Contact form data
                is retained for the duration of the business relationship and up to seven (7) years after
                termination for tax compliance. Analytical data is anonymised after 26 months.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">5. Third-Party Processors</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Supabase Inc.</strong> – database storage (EU region)</li>
                <li><strong>Vercel Inc.</strong> – hosting and infrastructure</li>
                <li><strong>Resend Inc.</strong> – transactional email</li>
                <li><strong>Google LLC</strong> – analytics (with IP anonymisation)</li>
              </ul>
              <p className="mt-3">We never sell your data to third parties.</p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">6. Your GDPR Rights</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Right of access to your data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure (&lsquo;right to be forgotten&rsquo;)</li>
                <li>Right to restriction of processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing based on legitimate interest</li>
              </ul>
              <p className="mt-3">
                Submit requests to <strong>{BRAND.email.primary}</strong>. We respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">7. Cookies</h2>
              <p>
                Qovre uses functional cookies (required for the website) and analytical cookies (Google Analytics 4)
                only after your consent. You can change your preferences at any time via browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">8. Security</h2>
              <p>
                We implement appropriate technical and organisational measures including TLS encryption,
                role-based access control (RBAC), and regular security audits.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
