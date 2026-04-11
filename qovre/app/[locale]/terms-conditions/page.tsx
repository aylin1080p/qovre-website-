import { generateMeta } from '@/lib/metadata'
import { BRAND } from '@/data/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return generateMeta({
    title: locale === 'nl' ? 'Algemene Voorwaarden — Qovre' : 'Terms & Conditions — Qovre',
    description: locale === 'nl'
      ? 'Algemene voorwaarden van Qovre (GetFromTR) voor digitale diensten, SaaS-ontwikkeling en AI-automatisering.'
      : 'Terms and conditions of Qovre (GetFromTR) for digital services, SaaS development, and AI automation.',
    path: `/${locale}/terms-conditions`,
    locale: locale as 'nl' | 'en',
  })
}

export default async function TermsPage({
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
          {isNL ? 'Algemene Voorwaarden' : 'Terms & Conditions'}
        </h1>
        <p className="text-neutral-500 text-sm">
          {isNL ? `Versie 1.0 · ${lastUpdated}` : `Version 1.0 · ${lastUpdated}`}
        </p>
      </div>

      <div className="prose prose-invert prose-sm max-w-none text-neutral-300 leading-relaxed space-y-8">

        {isNL ? (
          <>
            <section>
              <h2 className="text-white text-xl font-semibold mb-3">1. Definities</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Opdrachtnemer:</strong> GetFromTR, handelend onder de naam Qovre, gevestigd te Den Haag.</li>
                <li><strong>Opdrachtgever:</strong> de natuurlijke of rechtspersoon die een overeenkomst aangaat met Qovre.</li>
                <li><strong>Diensten:</strong> alle door Qovre te leveren werkzaamheden, waaronder maar niet beperkt tot: webontwikkeling, SaaS-development, AI-automatisering, contentcreatie en doorlopend onderhoud.</li>
                <li><strong>Offerte:</strong> elk schriftelijk voorstel van Qovre met betrekking tot te leveren diensten.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">2. Toepasselijkheid</h2>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten
                tussen Qovre en opdrachtgever. Afwijkingen zijn uitsluitend geldig indien schriftelijk overeengekomen.
                De toepasselijkheid van eventuele inkoop- of andere voorwaarden van opdrachtgever wordt uitdrukkelijk
                van de hand gewezen.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">3. Totstandkoming overeenkomst</h2>
              <p>
                Een overeenkomst komt tot stand door schriftelijke aanvaarding van een offerte door opdrachtgever,
                dan wel door feitelijke aanvang van de werkzaamheden door Qovre na bevestiging van de opdracht.
                Offertes zijn geldig gedurende 30 dagen tenzij anders vermeld.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">4. Uitvoering van de opdracht</h2>
              <p>
                Qovre voert de opdracht naar beste inzicht en vermogen uit, overeenkomstig de eisen van
                goed vakmanschap. Qovre heeft een <strong>inspanningsverplichting</strong>, geen resultaatsverplichting,
                tenzij schriftelijk uitdrukkelijk anders is overeengekomen. Qovre is gerechtigd bepaalde
                werkzaamheden te laten verrichten door derden.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">5. Verplichtingen opdrachtgever</h2>
              <p>Opdrachtgever is verantwoordelijk voor:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Het tijdig aanleveren van benodigde informatie, materialen en toegangscodes</li>
                <li>De juistheid en volledigheid van verstrekte gegevens</li>
                <li>Het beoordelen en goedkeuren van tussentijdse deliverables binnen de afgesproken termijnen</li>
                <li>Naleving van toepasselijke wet- en regelgeving met betrekking tot de te ontwikkelen applicatie</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">6. Tarieven en betaling</h2>
              <p>
                Tarieven worden vastgelegd in de offerte en zijn exclusief BTW, tenzij anders vermeld.
                Facturen dienen binnen <strong>14 dagen</strong> na factuurdatum te worden voldaan. Bij
                overschrijding van de betalingstermijn is opdrachtgever van rechtswege in verzuim en is
                Qovre gerechtigd wettelijke rente en incassokosten in rekening te brengen. Qovre behoudt
                het recht werkzaamheden op te schorten bij uitblijven van betaling.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">7. Intellectueel eigendom</h2>
              <p>
                Alle door Qovre ontwikkelde software, ontwerpen, documentatie en overige materialen zijn
                auteursrechtelijk beschermd. Na volledige betaling van alle overeengekomen vergoedingen
                verleent Qovre opdrachtgever een niet-exclusieve, niet-overdraagbare licentie voor gebruik
                van de specifiek voor opdrachtgever ontwikkelde onderdelen. Hergebruik van generieke
                componenten, frameworks en tooling door Qovre is altijd voorbehouden.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibond mb-3">8. Vertrouwelijkheid</h2>
              <p>
                Beide partijen verplichten zich tot strikte geheimhouding van alle vertrouwelijke informatie
                die zij in het kader van de overeenkomst van de andere partij ontvangen. Deze verplichting
                geldt gedurende de looptijd van de overeenkomst en voor een periode van drie (3) jaar daarna.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">9. Aansprakelijkheid</h2>
              <p>
                De aansprakelijkheid van Qovre is beperkt tot het bedrag dat in het kader van de betreffende
                opdracht door opdrachtgever is betaald, met een maximum van <strong>€ 10.000</strong> per
                schadegeval. Qovre is nimmer aansprakelijk voor indirecte schade, gevolgschade of gederfde winst.
                Opdrachtgever vrijwaart Qovre voor aanspraken van derden die voortvloeien uit door
                opdrachtgever verstrekte onjuiste of onvolledige informatie.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">10. SLA en doorlopend onderhoud</h2>
              <p>
                Voor zover van toepassing zijn de Service Level Agreements en voorwaarden voor doorlopend
                onderhoud vastgelegd in een afzonderlijke SLA-bijlage, die integraal onderdeel uitmaakt
                van de overeenkomst.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">11. Beëindiging</h2>
              <p>
                Elk der partijen kan de overeenkomst schriftelijk opzeggen met inachtneming van een
                opzegtermijn van <strong>30 dagen</strong>. Bij tussentijdse opzegging door opdrachtgever
                is de tot dan toe verrichte arbeid volledig verschuldigd. Qovre kan de overeenkomst per
                direct beëindigen indien opdrachtgever in verzuim is of surseance van betaling aanvraagt.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">12. Toepasselijk recht en geschillen</h2>
              <p>
                Op deze overeenkomst is <strong>Nederlands recht</strong> van toepassing. Geschillen
                worden bij voorkeur in onderling overleg opgelost. Indien dit niet slaagt, worden
                geschillen voorgelegd aan de bevoegde rechter in het arrondissement <strong>Den Haag</strong>.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-white text-xl font-semibold mb-3">1. Definitions</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Service Provider:</strong> GetFromTR, trading as Qovre, registered in The Hague, NL.</li>
                <li><strong>Client:</strong> the individual or legal entity entering into an agreement with Qovre.</li>
                <li><strong>Services:</strong> all work delivered by Qovre including web development, SaaS, AI automation, content creation, and ongoing support.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">2. Applicability</h2>
              <p>
                These terms apply to all offers, quotes, and agreements between Qovre and Client.
                Deviations are only valid when agreed in writing.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">3. Payment</h2>
              <p>
                Fees are exclusive of VAT unless stated otherwise. Invoices are due within <strong>14 days</strong>.
                Late payment incurs statutory interest and collection costs. Qovre may suspend work pending overdue payment.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">4. Intellectual Property</h2>
              <p>
                Upon full payment, Qovre grants Client a non-exclusive licence to use the deliverables developed
                specifically for the project. Generic components and frameworks remain Qovre property.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">5. Liability</h2>
              <p>
                Qovre&apos;s liability is limited to the amount paid for the relevant engagement, with a maximum
                of <strong>€10,000</strong> per incident. Indirect damages and lost profits are excluded.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">6. Termination</h2>
              <p>
                Either party may terminate with <strong>30 days</strong> written notice.
                Work completed to date is always billable upon early termination by Client.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-3">7. Governing Law</h2>
              <p>
                These terms are governed by <strong>Dutch law</strong>. Disputes are submitted to
                the competent court in <strong>The Hague</strong>.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
