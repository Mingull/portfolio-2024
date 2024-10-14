import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { JSX } from "react";
import { highlight } from "sugar-high";

const Code: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = ({
	children,
	...props
}) => {
	const codeHTMl = highlight(children as string);
	return <code dangerouslySetInnerHTML={{ __html: codeHTMl }} {...props} />;
};

const components = {
	code: Code,
};

export default function MDXContent(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
	return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
