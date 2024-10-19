"use client";
import { Progress } from "./ui/progress";

export default function Skills() {
	const skills = [
		{ name: "Typescript", experience: 90, years: 3 },
		{ name: "React", experience: 80, years: 3 },
		{ name: "Next.js", experience: 75, years: 3 },
		{ name: "Tailwind CSS", experience: 85, years: 3 },
		{ name: "Node.js", experience: 70, years: 2 },
		{ name: "Angular", experience: 20, years: 0.9 },
	];
	return (
		<section className="pb-24">
			<h2 className="title mb-12">Vaardigheden</h2>

			<ul className="flex flex-col gap-4">
				{skills.map((skill) => (
					<Skill key={skill.name} {...skill} />
				))}
			</ul>
		</section>
	);
}

function Skill({ name, experience, years }: { name: string; experience: number; years: number }) {
	// calculate years of experience based on the experience percentage
	const yearsString = calculateYearsOfExperience(years);
	return (
		<li className="flex flex-col">
			<div className="flex justify-between">
				<p>{name}</p>
				<p className="font-light text-muted-foreground">{yearsString}</p>
			</div>
			<Progress value={experience} />
		</li>
	);
}

const calculateYearsOfExperience = (years: number) => {
	const months = years * 12;
	const yearsOfExperience = Math.floor(months / 12);
	const monthsOfExperience = Math.floor(months % 12);

	if (yearsOfExperience >= 1) {
		return `${yearsOfExperience}+ years`;
	} else {
		return `${monthsOfExperience}+ months`;
	}
};
