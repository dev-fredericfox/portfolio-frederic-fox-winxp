import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Globe, MapPin, Languages, Quote } from "lucide-react";

export default function ResumePage() {
	return (
		<main className="min-h-screen bg-slate-50 p-6 md:p-12 print:p-0 print:bg-white font-sans text-slate-900">
			{/* Container: Max width for web, full width for print */}
			<div className="mx-auto max-w-4xl bg-white shadow-sm print:shadow-none print:w-full print:max-w-none rounded-xl p-8 print:p-0">
				{/* Header Section */}
				<header className="flex flex-col md:flex-row justify-between items-start md:items-end md:gap-24">
					<div>
						<h1 className="text-4xl font-bold tracking-tight text-slate-900 print:text-2xl">Frederic Fox</h1>
						<h2 className="text-xl font-medium text-slate-600 mt-1">Full Stack TypeScript Developer</h2>
						<p className="text-sm text-slate-500 max-w-2xl mt-4">
							Full Stack Developer combining deep technical expertise in the MERN stack with a proven track record as an entrepreneurial founder. Specializing
							in robust API design and scalable web applications, with a personal passion for C++ and Unreal Engine.
						</p>
					</div>

					<div className="mt-6 md:mt-0 flex flex-col items-start md:items-end text-sm text-slate-600 print:flex-row print:items-center print:gap-6 print:mt-2">
						<a href="https://www.frederic-fox.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-slate-900">
							<Globe className="h-4 w-4" /> frederic-fox.com
						</a>
						<span className="flex items-center gap-2">
							<MapPin className="h-4 w-4" /> Frankfurt / Remote
						</span>
						<span className="flex items-center gap-2 whitespace-nowrap">
							<Languages className="h-4 w-4" />
							English, French, German
						</span>
					</div>
				</header>
				<Separator className="my-6 print:my-2" />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:gap-2">
					{/* Main Content Column (2/3 width) */}
					<div className="md:col-span-2 space-y-6 print:space-y-2">
						<section>
							<h3 className="text-lg font-semibold text-slate-900 mb-3">Experience</h3>
							<div className="space-y-5 print:space-y-2">
								{/* Role 1 */}
								<div className="break-inside-avoid">
									<div className="flex justify-between items-baseline mb-1">
										<h4 className="font-semibold text-slate-900">Freelance Full Stack Developer</h4>
										<span className="text-xs text-slate-500 font-medium whitespace-nowrap">Aug 2023 - Present</span>
									</div>
									<p className="text-sm text-slate-600 mb-2">Remote · Frankfurt Rhine-Main Area</p>
									<p className="text-sm text-slate-700 leading-relaxed">
										Architecting and developing custom full-stack solutions for diverse clients using modern web technologies including TypeScript, React,
										Next.js, Node.js, Express, MongoDB, PayloadCMS, and Strapi.
									</p>
									<div className="flex flex-row gap-2 mt-1 print:gap-0.75 flex-wrap">
										<p className="text-sm text-slate-700 leading-relaxed">Projects:</p>
										{["Eintracht Frankfurt", "VfB Stuttgart", "Yum", "Koenig + Neurath"].map((skill) => (
											<Badge
												key={skill}
												variant="secondary"
												className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 print:border print:border-slate-300 print:bg-transparent">
												{skill}
											</Badge>
										))}
									</div>
								</div>

								{/* Role 2 */}
								<div className="break-inside-avoid">
									<div className="flex justify-between items-baseline mb-1">
										<h4 className="font-semibold text-slate-900">Full Stack Developer</h4>
										<span className="text-xs text-slate-500 font-medium">Jun 2022 - Jul 2023</span>
									</div>
									<p className="text-sm text-slate-600 mb-2">Brickwise · Remote</p>
									<ul className="text-sm text-slate-700 list-disc list-outside ml-4 space-y-1.5 marker:text-slate-400 print:space-y-0">
										<li>Developed and maintained robust TypeScript MERN stack applications.</li>
										<li>Automated customized PDF generation for the compliance team, drastically reducing manual processing time.</li>
										<li>Built a tax reporting system that generated compliant XMLs for direct upload to German/Austrian authorities.</li>
										<li>Designed features for dynamic CSV report generation and data consumption, streamlining data interactions.</li>
										<li>Optimized CI/CD pipelines and created internal packages for shared code, boosting deployment speed.</li>
									</ul>
								</div>

								{/* Role 3 */}
								<div className="break-inside-avoid">
									<div className="flex justify-between items-baseline mb-1">
										<h4 className="font-semibold text-slate-900">Co-Founder</h4>
										<span className="text-xs text-slate-500 font-medium">Nov 2018 - Jan 2023</span>
									</div>
									<p className="text-sm text-slate-600 mb-2">BF International Foods GmbH (Krakenkind) · Freiburg, Germany</p>
									<p className="text-sm text-slate-700 leading-relaxed">
										Founded and scaled an e-commerce brand distributing international snacks. Architected the digital storefront, achieving a 4.9★ customer
										satisfaction score across 300+ reviews while handling all technical and operational logistics.
									</p>
								</div>

								{/* Role 4 */}
								<div className="break-inside-avoid">
									<div className="flex justify-between items-baseline mb-1">
										<h4 className="font-semibold text-slate-900">Co-Founder</h4>
										<span className="text-xs text-slate-500 font-medium">Jan 2015 - Dec 2019</span>
									</div>
									<p className="text-sm text-slate-600 mb-2">Traffic Hunter GmbH · Berlin Area, Germany</p>
									<p className="text-sm text-slate-700 leading-relaxed">
										Led a performance marketing agency specializing in gaming and entertainment. Directed data-driven campaigns for top-tier clients.
									</p>
									<div className="flex flex-row gap-2 mt-1 print:gap-0.75 flex-wrap">
										<p className="text-sm text-slate-700 leading-relaxed">Projects:</p>
										{[
											"Blizzard: Hearthstone",
											"CD Projekt Red: The Witcher",
											"Square Enix: Final Fantasy XIV, Deus Ex",
											"King: Candy Crush",
											"Dr. Wolff-Gruppe: Kinder Karex",
											"Casavo",
											"Gremco",
											"Berliner Philharmoniker",
										].map((skill) => (
											<Badge
												key={skill}
												variant="secondary"
												className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 print:border print:border-slate-300 print:bg-transparent">
												{skill}
											</Badge>
										))}
									</div>
								</div>
							</div>
						</section>
					</div>

					{/* Sidebar Column (1/3 width) */}
					<div className="space-y-6 print:space-y-2">
						{/* Skills */}
						<section className="break-inside-avoid">
							<h3 className="text-lg font-semibold text-slate-900 mb-3 print:mb-1">Core Skills</h3>
							<div className="flex flex-wrap gap-2 print:gap-0.75">
								{[
									"TypeScript",
									"React",
									"Next",
									"Node",
									"Docker",
									"React Native",
									"Express",
									"MongoDB",
									"Jest",
									"PayloadCMS",
									"C++",
									"Unreal Engine",
									"CI/CD",
								].map((skill) => (
									<Badge
										key={skill}
										variant="secondary"
										className="font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 print:border print:border-slate-300 print:bg-transparent">
										{skill}
									</Badge>
								))}
							</div>
						</section>

						{/* Recommendations */}
						<section className="break-inside-avoid print:hidden">
							<Card className="bg-slate-50 border-none shadow-none print:p-0 print:bg-transparent">
								<CardHeader className="p-4 pb-0 print:p-0 print:pb-2">
									<CardTitle className="text-sm font-semibold flex items-center gap-2">
										<Quote className="w-4 h-4 text-slate-400" />
										Recommendation
									</CardTitle>
								</CardHeader>
								<CardContent className="p-4 pt-0 text-sm text-slate-600 italic">
									&quot;Frederic is a diligent person and always seeks best practices to deliver with the highest quality. A fast learner and passionate about
									absorbing knowledge. It would be an honor to work with him again!&quot;
									<div className="mt-2 text-xs font-semibold not-italic text-slate-900">— Poorshad S., Senior Software Engineer at Red Bull GmbH</div>
								</CardContent>
							</Card>
						</section>

						{/* Education */}
						<section className="break-inside-avoid mt-4">
							<h3 className="text-lg font-semibold text-slate-900 mb-3">Education & Certifications</h3>
							<div className="space-y-1">
								<div>
									<h4 className="text-sm font-semibold text-slate-900">Machine Learning</h4>
									<p className="text-xs text-slate-600">Stanford Online / Coursera (2021)</p>
								</div>
								<div>
									<h4 className="text-sm font-semibold text-slate-900">Bachelor&apos;s Degree, E-Marketing</h4>
									<p className="text-xs text-slate-600">Aix Marseille Université (2011 - 2012)</p>
								</div>
								<div>
									<h4 className="text-sm font-semibold text-slate-900">Associate&apos;s Degree, Management</h4>
									<p className="text-xs text-slate-600">IAE Caen (2009 - 2011)</p>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
}
