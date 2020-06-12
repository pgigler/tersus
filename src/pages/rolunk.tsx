import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const AboutUsPage = () => {
	return (
		<Layout>
			<SEO title="Rólunk" />
			<div className="container px-4">
				<h1 className="pt-12 text-4xl leading-tight font-semibold">Rólunk</h1>
				<p className="text-lg my-8">
					Cégünk kezdetben természetes alapanyagokból készült mosó- és tisztítószerek kis- és nagykereskedelmi
					értékesítésével foglalkozott, majd 2016-ban a piaci igényeket kielégítve kezdett el az uszodai
					vegyszerek értékesítésével is foglalkozni a nagy vállalkozások részére. A sikeres éveket követően
					született döntés 2020-ban, hogy jelenlegi tevékenységünket kibővítjük a magán medence tulajdonosok
					részére is.
				</p>

				<p className="text-lg mb-8">
					A medence víz PH értékének beállítása, a vízfertőtlenítés , az alga eltávolítás , a szűrőtartály
					tisztítása nagymértékben meghatározza , hogy kristály tiszta –e a medencénk vize vagy opálos,
					zavaros. Ahhoz, hogy élvezzük úszómedencénk vizét , különösen nagy figyelmet kell fordítsunk a
					medencevíz kezelésre. Ebben segítünk Önnek!
				</p>

				<p className="text-lg mb-8">
					Termékválasztékunkban megtalálhatók a kifejezetten magas minőségű uszodai vegyszerek, de az ár
					érzékeny vevők is találnak nálunk jó ár-érték arányú termékeket is. Elmondhatjuk magunkról, hogy jó
					nevű gyártóktól kifogástalan minőségű termékeket kínálunk.
				</p>

				<p className="text-lg mb-8">
					Mivel fontosnak tartjuk a környezetünk védelmét, vegyszer választékunkban szerepelnek klór mentes
					víztisztító szerek is.
				</p>

				<p className="text-lg my-8">
					Egy jövőbeni, megbízható kapcsolat reményében készséggel állunk a magán medence tulajdonosok
					rendelkezésére!
				</p>
			</div>
		</Layout>
	);
};

export default AboutUsPage;
