import BorderGroup from "@/components/atoms/BorderGroup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { envs } from "@/lib/envs";
import { Link2Icon, MapPinIcon, PrinterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function AboutMeContent() {
	return (
		<div className="w-full overflow-x-auto">
			<div className="flex flex-row p-6 gap-4">
				<div className="flex flex-col">
					<figure>
						<Image
							src={`${envs.NEXT_PUBLIC_BASE_PATH}/glazed/me-square-glaze-protected-intensity-HIGH-V2.jpeg`}
							alt="Frederic Fox Profile Picture"
							width={120}
							height={120}
							className=""
						/>
						<figcaption className="italic text-xs text-center mt-2 max-w-32">Protected from Gen-AI with Glazed.</figcaption>
					</figure>
				</div>
				<div>
					<p>Frederic Fox</p>
					<p>Software Developer</p>
					<p>
						<MapPinIcon size={14} className="inline-block mb-1 mr-1" />
						Freiburg, Germany
					</p>
					<p>
						<Link2Icon size={14} className="inline-block mb-1 mr-1" />
						<Link href="https://www.linkedin.com/in/foxfrederic" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
							https://www.linkedin.com/in/foxfrederic
						</Link>
					</p>
					<p>
						<PrinterIcon size={14} className="inline-block mb-1 mr-1" />
						<Link href="/resume" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
							Resume Printout
						</Link>
					</p>
					<p className="mt-3">English - German - French</p>
				</div>
			</div>
			<Tabs defaultValue="experience" className="p-3">
				<TabsList>
					<TabsTrigger className="" value="experience">
						<span className="hidden md:flex mr-1">Work </span> Experience
					</TabsTrigger>
					<TabsTrigger className="" value="skills">
						Skills
					</TabsTrigger>
					<TabsTrigger value="hobbies">Hobbies</TabsTrigger>
					<TabsTrigger value="achievements">Achievements</TabsTrigger>
				</TabsList>
				<TabsContent value="experience">
					<table className="w-full table-fixed text-left border-collapse">
						{/* columns: Year | Role | Location */}
						<colgroup>
							<col className="w-16 md:w-22" />
							<col />
							<col className="w-16" />
						</colgroup>
						<thead>
							<tr>
								<th className="px-2 py-1">Year</th>
								<th className="px-2 py-1">Role</th>
								<th className="px-2 py-1">Location</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="hidden md:block px-2 py-1">2025–{getThisYear({})}</td>
								<td className="md:hidden px-2 py-1">&apos;25–&apos;{getThisYear({ short: true })}</td>
								<td className="px-2 py-1">
									<div className="flex flex-col">
										<span>Founder — WyrdSoftware (Stealth)</span>
										<span>Self funded Indie Gaming Studio</span>
									</div>
								</td>
								<td className="px-2 py-1 text-nowrap">--</td>
							</tr>

							<tr>
								<td className="hidden md:block px-2 py-1">2021–{getThisYear({})}</td>
								<td className="md:hidden px-2 py-1">&apos;21–&apos;{getThisYear({ short: true })}</td>
								<td className="px-2 py-1">
									<div className="flex flex-col">
										<span>Freelance Software Developer</span>
										<span>
											<strong>Projects</strong>: Top football clubs, finance, retail
										</span>
									</div>
								</td>
								<td className="px-2 py-1">Freiburg Germany</td>
							</tr>

							<tr>
								<td className="hidden md:block px-2 py-1">2018–2021</td>
								<td className="md:hidden px-2 py-1">&apos;18–&apos;21</td>
								<td className="px-2 py-1">
									<div className="flex flex-col">
										<span>Founder / CEO — BF International Foods GmbH</span>
										<span>Brand: Krakenkind — International specialty foods retailer (online &amp; brick-and-mortar)</span>
									</div>
								</td>
								<td className="px-2 py-1">Berlin Germany</td>
							</tr>

							<tr>
								<td className="hidden md:block px-2 py-1">2015–2019</td>
								<td className="md:hidden px-2 py-1">&apos;15–&apos;19</td>
								<td className="px-2 py-1">
									<div className="flex flex-col">
										<span>Founder / CEO — Traffic Hunter GmbH</span>
										<span>Online Marketing Agency (Gaming)</span>
										<span>Clients: Blizzard, Square Enix, CD Projekt Red, Jamba</span>
									</div>
								</td>
								<td className="px-2 py-1">Berlin Germany</td>
							</tr>

							<tr>
								<td className="hidden md:block px-2 py-1">2012–2014</td>
								<td className="md:hidden px-2 py-1">&apos;12–&apos;14</td>
								<td className="px-2 py-1">
									<div className="flex flex-col">
										<span>Marketing Manager — GameGenetics GmbH</span>
										<span>Performance Marketing</span>
									</div>
								</td>
								<td className="px-2 py-1">Berlin Germany</td>
							</tr>
						</tbody>
					</table>
				</TabsContent>
				<TabsContent value="skills" className="flex flex-col gap-4">
					<fieldset className="border border-[#d0d0bf] rounded-sm py-2 px-3">
						<legend className="text-[#0046d5] p-1 bg-transparent">Software Languages</legend>
						<ul className="list-disc list-inside mb-4">
							<li>TypeScript / Javascript</li>
							<li>C++</li>
						</ul>
					</fieldset>
					<fieldset className="border border-[#d0d0bf] rounded-sm py-2 px-3">
						<legend className="text-[#0046d5] p-1 bg-transparent">Software Frameworks</legend>
						<ul className="list-disc list-inside mb-4">
							<li>React</li>
							<li>React Native</li>
							<li>Next.js</li>
							<li>Node.js</li>
							<li>Docker</li>
							<li>Express.js</li>
							<li>Tailwind CSS</li>
							<li>Unreal Engine</li>
						</ul>
					</fieldset>
					<fieldset className="border border-[#d0d0bf] rounded-sm py-2 px-3">
						<legend className="text-[#0046d5] p-1 bg-transparent">Soft Skills</legend>
						<ul className="list-disc list-inside mb-4">
							<li>Fluent in 3 Languages (English, French, German)</li>
							<li>Strong Communication Skills</li>
							<li>Team Leadership</li>
						</ul>
					</fieldset>
				</TabsContent>
				<TabsContent value="hobbies">
					<BorderGroup title="Hobbies & Interests">
						<ul className="list-disc list-inside mb-4">
							<li>Games</li>
							<li>Cooking</li>
							<li>Traveling</li>
							<li>Reading</li>
							<li>Music</li>
						</ul>
					</BorderGroup>
				</TabsContent>
				<TabsContent value="achievements">
					<BorderGroup title="Achievements">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr>
									<th className="px-2 py-1">Year</th>
									<th className="px-2 py-1">Achievement</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="px-2 py-1">2024</td>
									<td className="px-2 py-1">
										Opened and merged a PR{" "}
										<a
											href="https://github.com/EpicGames/UnrealEngine/commit/9ea82283f264b017f9870c79517218d4c1178ebf"
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 underline">
											(9ea8228)
										</a>{" "}
										into Unreal Engine&apos;s release branch
									</td>
								</tr>
								<tr>
									<td className="px-2 py-1">2018</td>
									<td className="px-2 py-1">Founded BF International Foods </td>
								</tr>
								<tr>
									<td className="px-2 py-1">2018</td>
									<td className="px-2 py-1">Participated in an AAA Publisher&apos;s game launch with an ad budget of over $3M</td>
								</tr>
								<tr>
									<td className="px-2 py-1">2016</td>
									<td className="px-2 py-1">Reached Profitability with Traffic Hunter</td>
								</tr>
								<tr>
									<td className="px-2 py-1">2015</td>
									<td className="px-2 py-1">Founded Traffic Hunter GmbH</td>
								</tr>
							</tbody>
						</table>
					</BorderGroup>
				</TabsContent>
			</Tabs>
		</div>
	);
}

type GetThisYearOptions = {
	short?: boolean;
};
function getThisYear({ short }: GetThisYearOptions) {
	const currentYear = new Date().getFullYear();
	return short ? String(currentYear).slice(-2) : String(currentYear);
}
