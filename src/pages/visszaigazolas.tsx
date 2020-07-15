import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const ConfirmationPage = () => {
	return (
		<Layout>
			<SEO title="Visszaigazolás" />
			<div className="container px-4 py-4">
				<div className="flex justify-center">
					<div className="xl:w-1/2">
						<h1 className="text-3xl uppercase text-green-500 text-center font-semibold">
							Sikeres megrendelés
						</h1>
						<div className="py-2">
							<span className="text-xl">Megrendelési szám: </span>
							<span className="font-bold text-2xl whitespace-no-wrap">200707-123412344</span>
						</div>
						<div>
							<h2 className="pt-8 text-xl">Kedves megrendelő!</h2>
							<p className="py-2">
								Köszönjük, hogy nálunk vásárolt. Megrendeléséről emailben visszaigazolást küldünk.
							</p>
							<p className="py-2">
								Ha nem érkezne meg az email pár percen belül, kérem vegye fel ügyfélszolgálatunkkal a
								kapcsolatot emailben:{" "}
								<a className="text-brand-blue" href="mailto:info@tersus.hu">
									info@tersus.hu
								</a>{" "}
								vagy telefonon: <span className="text-brand-blue">+36 (30) 207 0883</span>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ConfirmationPage;
