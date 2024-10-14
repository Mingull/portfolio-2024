"use client";
// import "client-only";
import { motion, useInView } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export default function FadeUp({
	children,
	delay = 0,
	duration = 0.5,
}: {
	children: ReactNode;
	delay?: number;
	duration?: number;
}) {
	const ref = useRef(null);
	const isInView = useInView(ref);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (isInView && !isVisible) {
			setIsVisible(true);
		}
	}, [isInView, isVisible]);

	return (
		<motion.div
			ref={ref}
			variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
			initial="hidden"
			animate={isVisible ? "visible" : "hidden"}
			transition={{ delay, duration }}
		>
			{children}
		</motion.div>
	);
}
