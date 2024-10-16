import { Link } from "@/i18n/routing";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { JSX } from "react";
import rehypeSlug from "rehype-slug";
import { highlight } from "sugar-high";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Code = ({ children, ...props }: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
	const codeHTMl = highlight(children as string);
	return <code dangerouslySetInnerHTML={{ __html: codeHTMl }} {...props} />;
};

const CustomHeader = (as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") => {
	return function header({
		id,
		...rest
	}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) {
		const Comp = as;
		if (id) {
			return (
				<Link href={`#${id}`}>
					<Comp {...rest} id={id} />
				</Link>
			);
		}

		return <Comp {...rest} />;
	};
};


const components = {
	code: Code,
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	h1: CustomHeader("h1"),
	h2: CustomHeader("h2"),
};

export default function MDXContent(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
	return (
		<MDXRemote
			{...props}
			components={{ ...components, ...(props.components || {}) }}
			options={{
				mdxOptions: {
					rehypePlugins: [{ plugins: [rehypeSlug] }],
				},
			}}
		/>
	);
}
