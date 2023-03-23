import React, { PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ITransitionLayoutProps {}

const TransitionLayout = ({
  children,
}: PropsWithChildren<ITransitionLayoutProps>) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionLayout;
