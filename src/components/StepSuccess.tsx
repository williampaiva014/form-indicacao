import { motion } from "framer-motion";
import logo from "@/assets/logo-prata.png";

const StepSuccess = () => {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center"
    >
      <img src={logo} alt="Prátice Hub" className="w-36 md:w-44 mb-4 opacity-80" />

      <div className="glass-card max-w-md">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-8 mx-auto border border-primary/30"
        >
          <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
          <span className="text-primary font-bold">Cadastro realizado!</span>
        </h2>
        <p className="text-white/90 text-sm leading-relaxed">
          Em breve você receberá as <strong className="text-foreground">melhores oportunidades</strong> e <strong className="text-foreground">conexões</strong> da sua região.
        </p>
      </div>
    </motion.div>
  );
};

export default StepSuccess;
