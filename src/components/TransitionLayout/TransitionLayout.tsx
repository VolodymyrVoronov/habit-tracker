import React, { PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

interface ITransitionProps {}

const Transition = ({ children }: PropsWithChildren<ITransitionProps>) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
