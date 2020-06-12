import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { getFluid } from "../util/helper";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const UsefulInfoPage = () => {
	const data = useStaticQuery(graphql`
		query UsefulInfoPageQuery {
			allFile(filter: { relativePath: { in: ["ui_pool.jpg", "ui_algae.jpg"] } }) {
				edges {
					node {
						relativePath
						childImageSharp {
							fluid(maxWidth: 1920) {
								...GatsbyImageSharpFluid
								...GatsbyImageSharpFluidLimitPresentationSize
							}
						}
					}
				}
			}
		}
	`);

	const fluidPool = getFluid(data.allFile.edges, "ui_pool.jpg");
	const fluidAlgae = getFluid(data.allFile.edges, "ui_algae.jpg");

	return (
		<Layout>
			<SEO title="Hasznos infók" />
			<div className="container text-lg">
				<div className="flex flex-wrap mx-3 md:flex-column mb-8">
					<div className="w-full xl:w-1/2">
						<h1 className="pt-8 text-4xl leading-tight font-semibold">A medence vízkezelése</h1>
						<p className="mt-3">
							„Az uszodák medencéjének vize él” –mivel naponta változó hatásoknak van kitéve. Az emberek,
							a környezet és a természet különböző szervetlen és szerves anyagot juttatnak a vízbe.
							Amennyiben Ön ezt nem veszi tudomásul, akkor medencéjének vize rövid idő alatt zavaros
							pocsolyává válik, mivel a kezeletlen víz a baktériumok és algák szaporodásának ideális
							közege.
						</p>
						<p className="mt-3 text-red-600 font-semibold">
							A legfontosabb a víz egyensúlyának beállítása és fenntartása, valamint a megfelelő
							fertőtlenítőszer-szint folyamatos fenntartása
						</p>
						<h2 className="pt-8 text-2xl leading-tight font-semibold">PH – érték szabályozás</h2>
						<p className="mt-3">
							Amennyiben a PH – értéket nem szabályozzák, az rövid idő alatt eltér az ideálistól. A
							vízegyensúly beállításához általában a víz pH értékét csökkenteni kell (DINAX MÍNUSZ P
							vegyszerrel vagy PH csökkentő granulátummal).
						</p>
						<h2 className="pt-8 pb-2 text-2xl leading-tight font-semibold">Fertőtlenítés</h2>
						<p className="mt-3">Fertőtlenítés nélkül elszaporodnak a baktériumok</p>
						<p className="mt-3 font-semibold">Medence víz kezelés klórral</p>
						<p className="mt-3">
							A medencevíz fertőtlenítéséhez a klór ( BLUE SUPER TABS T,{" "}
							<AnchorLink to="/termekek#stabil_klor" className="link">
								STABIL KLÓR
							</AnchorLink>
							, KLÓR GRANULÁTUM) a leggyakrabban alkalmazott módszer. Kiválóan alkalmas szerves
							szennyeződések oxidációjára és a legnagyobb hatékonysággal elpusztítja a baktériumokat. A
							klór felhasználható folyamatos fertőtlenítésre és sokk-kezelésre.
						</p>
						<p className="mt-3 italic">Ki választja a klórt?</p>
						<p className="mt-1">
							Medencetulajdonosok, akik biztonságos és megbízható fertőtlenítési módszert akarnak, amely
							garantálja a higiénikus vizet.
						</p>
						<p className="mt-3 font-semibold">Medencevíz kezelés klórmentes aktív oxigén alapján</p>
						<p className="mt-3">
							A klórmentes vízdezinfekció aktív oxigén alapján a klór gyengéd alternatívája. Az aktív
							oxigénnel kezelt víz lágy a szemre, a bőrre és a hajra.
						</p>
						<p className="mt-3 italic">Ki választja az aktív oxigént?</p>
						<p className="mt-3">
							Medencetulajdonosok, akik kristálytiszta és kellemes medencevizet akarnak, klórtartalom
							nélkül. Különösen alkalmas bőr allergiájú fürdőzők számára.
						</p>
						<h2 className="pt-8 pb-2 text-2xl leading-tight font-semibold">Algaképződés megakadályozása</h2>
						<p className="mt-3">
							Az algaképződés elleni vegyszeres kezelés nélkül a medence vize rövid idő alatt bezöldül. A
							kerti medencék porterhelése és ezzel együtt az alga-spóra terhelése is sokkal nagyobb, mint
							zárt tér esetén. Ebből következik, hogy jobban oda kell figyelni a pelyhesítőszer (DINAX
							FLOCK P) használatra és az alganövekedést gátló szerek (PELYHESÍTŐ GÉLTABLETTA vagy TOP
							FLOCK PELYHESÍTŐ FOLYADÉK) alkalmazására.
						</p>
						<h2 className="pt-8 pb-2 text-2xl leading-tight font-semibold">Vízkő megakadályozása</h2>
						<p className="mt-3">
							Az algaképződés elleni vegyszeres kezelés nélkül a medence vize rövid idő alatt bezöldül. A
							kerti medencék porterhelése és ezzel együtt az alga-spóra terhelése is sokkal nagyobb, mint
							zárt tér esetén. Ebből következik, hogy jobban oda kell figyelni a pelyhesítőszer (DINAX
							FLOCK P) használatra és az alganövekedést gátló szerek (PELYHESÍTŐ GÉLTABLETTA vagy TOP
							FLOCK PELYHESÍTŐ FOLYADÉK) alkalmazására.
						</p>
						<h2 className="pt-8 pb-2 text-2xl leading-tight font-semibold">
							Esetleges problémák kialakulásának okai és megoldásuk
						</h2>
						<p className="mt-3">
							Ha nincs automata szabályozó berendezésünk és nem figyeljük naponta a víz pH értékét és a
							fertőtlenítőszer szintet, könnyen előfordul, hogy beindul a medencevíz algásodása. Ezt a víz
							opálossá válása és a medencefalak síkossá válása jelzi. Ha nem lépünk azonnal, a medencevíz
							hamarosan zöldes színű átláthatatlan pocsolyává alakul. Ennek megakadályozására vagy ha már
							bekövetkezett a megszüntetésére használjuk az ún. sokkolás műveletét. Ilyenkor rövid időn
							belül a sokszorosára növeljük a fertőtlenítőszer szintet (
							<AnchorLink to="/termekek#alga_sokk_p" className="link">
								ALGA-SOKK P
							</AnchorLink>
							-vel). Ez elpusztítja az algákat és leülepedés után porszívóval el lehet azokat távolítani a
							medencéből. A vízkezelés mért értékeinek beállításához megfelelő mérőcsíkok állnak
							rendelkezésre.
						</p>
					</div>
					<div className="p-8 w-full xl:w-1/2">
						<Img fluid={fluidPool} alt="medence" />
					</div>
					<div className="w-full xl:w-1/2">
						<h1 className="pt-12 text-4xl leading-tight font-semibold">Algásodási problémák</h1>
						<h2 className="pt-8 pb-2 text-2xl leading-tight font-semibold">
							A legfontosabb módszer a megelőzés
						</h2>
						<p className="mt-3">Mérjük rendszeresen a fertőtlenítőszer-koncentrációt</p>
						<p className="mt-3">
							Ne hagyjuk, hogy nullára csökkenjen, mert ebben az esetben ugrásszerű szaporodásnak indulnak
							az algák.
						</p>
						<p className="mt-3">
							Terhelt, kültéri medencék esetében folyamatosan alkalmazzunk algásodás- megelőző szert!
						</p>
						<h2 className="pt-8 pb-2 text-2xl leading-tight font-semibold">Ha már megtörtént a baj</h2>
						<p className="mt-3">
							Az algásodás mértékétől függően az algák kiirtása akár több napig is eltarthat.
						</p>
						<p className="mt-3">Nagyon fontos, hogy az algamentesítést nem szabad félbehagyni!</p>
						<h1 className="pt-12 text-4xl leading-tight font-semibold">Sokkolás</h1>
						<p className="mt-3">A sokkolást célszerű a délutáni órákra időzíteni</p>
						<p className="mt-3">
							Állítsa be a víz pH-értékét 7,2-7,4 közé, Dinax Mínusz P segítségével. (Ritkán előfordul,
							hogy a pH-értéket növelni kell, ebben az esetben a pH korrigálását ráér a sokkolás után
							elvégezni, mert a klórgranulátum 6-os pH-értéken a leghatékonyabb.)
						</p>
						<p className="mt-3">
							A vízbe a sokkoló kezeléshez előírt mennyiségű (általában 10 m3 -hez fél kg), előzőleg
							vízben feloldott klórgranulátumot adagolunk (
							<AnchorLink to="/termekek#alga_sokk_p" className="link">
								ALGA-SOKK P
							</AnchorLink>
							). – Megkezdjük a medencevíz forgatását.
						</p>
						<p className="mt-3">
							A forgatás megkezdése után két-három órával pelyhesítőszert adagolunk a vízhez (Dinax Flock
							F 100 ml), a vízfelszínen egyenletesen elosztva.
						</p>
						<p className="mt-3">
							A pelyhesítőszer beadagolása után folytatjuk a forgatást 1-2 óráig, majd lekapcsoljuk a
							szivattyút.
						</p>
						<p className="mt-3">
							Éjszaka a klór megöli az algákat, a pelyhesítőszer pedig összetapasztja őket kiporszívózható
							pelyhekké.
						</p>
						<p className="mt-3">
							Reggel alaposan porszívózza ki a medencét, a kiszívott vizet csatornára engedje, hogy az
							elpusztult alga ne szennyezze a szűrőjét.
						</p>
						<p className="mt-3">Mossa vissza a szűrőt is.</p>
						<p className="mt-3">
							Mérje meg a klórkoncentrációt! Ha a klórszint 24 óra alatt 1 mg/l koncentráció alá csökken,
							ez arra utal, hogy a medencében még van alga. Ebben az esetben ismételje meg a sokkolást!
						</p>
						<p className="mt-3">
							Ha a klórszint magas, és az is marad, a sokkolás sikeres volt, de Ön nem tud a medencében
							fürdeni, mivel a túl magas klórszint egészségünket veszélyeztetheti.
						</p>
						<p className="mt-3">
							Két dolgot tehet:
							<ul className="list-disc list-inside">
								<li>megvárja, míg a szabad aktív klórtartalom nullára csökken</li>
								<li>
									használhat Nulla-klór granulátumot, melynek segítségével a klórszint gyorsan
									lecsökkenthető a kívánt szintre
								</li>
							</ul>
						</p>
					</div>
					<div className="p-8 w-full xl:w-1/2">
						<Img fluid={fluidAlgae} alt="alga" />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default UsefulInfoPage;