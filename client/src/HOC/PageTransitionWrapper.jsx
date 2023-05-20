import { motion } from "framer-motion";

const PageWrapper =(Page) =>{
  function HOC() {
    return (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        exit={{ opacity: "1" }}
      >
        <Page />
      </motion.div>
    );
  }
}

export default PageWrapper;