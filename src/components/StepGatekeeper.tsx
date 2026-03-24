import { motion } from "framer-motion";
import logo from "@/assets/logo-prata.png";
import TextReveal from "./TextReveal";

interface StepGatekeeperProps {
  onYes: () => void;
  onNo: () => void;
}

const StepGatekeeper = ({ onYes, onNo }: StepGatekeeperProps) => {
  return (
    <motion.div
      key="gatekeeper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center"
    >
      <motion.img
        src={logo}
        alt="Prátice Hub"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        whileHover={{
          scale: 1.08,
          filter: "drop-shadow(0 0 30px hsl(42 78% 55% / 0.5))",
        }}
        className="w-64 md:w-80 mb-6 cursor-pointer transition-all duration-500"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="glass-card w-full max-w-[520px]"
      >
        <p className="text-lg md:text-xl text-foreground/80 mb-6 text-balance">
          Você está prestes a <strong className="text-white">convidar alguém</strong> para o <strong className="text-white">Prátice Hub</strong>
        </p>
        <h1 className="text-2xl md:text-4xl font-semibold tracking-tight leading-tight text-foreground text-balance mb-10">
          Esse profissional tem perfil para <span className="text-primary font-bold">crescer</span>, <span className="text-primary font-bold">gerar negócios</span> e <span className="text-primary font-bold">contribuir com a rede</span>?
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 35px hsl(42 78% 55% / 0.5)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={onYes}
            className="flex-1 py-4 px-8 rounded-xl btn-gold text-lg transition-all duration-300 hover:brightness-110"
          >
            Sim
          </motion.button>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            whileHover={{
              scale: 1.04,
              backgroundColor: "hsl(228 25% 22% / 0.8)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={onNo}
            className="flex-1 py-4 px-8 rounded-xl border border-border/50 bg-accent/30 text-foreground font-semibold text-lg backdrop-blur-sm transition-all duration-300"
          >
            Não
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StepGatekeeper;
