import { motion } from "framer-motion";
import logo from "@/assets/logo-prata.png";
import TextReveal from "./TextReveal";

interface StepHeadlineProps {
  onNext: () => void;
}

const StepHeadline = ({ onNext }: StepHeadlineProps) => {
  return (
    <motion.div
      key="headline"
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
        className="w-48 md:w-64 mb-4"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="glass-card w-full max-w-[620px]"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-foreground text-balance mb-6">
          Traga profissionais que <span className="text-primary font-extrabold">desejam crescer, gerar valor</span> e <span className="text-primary font-extrabold">evoluir na rede.</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="text-base md:text-lg text-white/90 leading-relaxed text-balance mb-10"
        >
          Cada convite ativado <strong className="text-white">acelera sua evolução, amplia bônus</strong> e <strong className="text-white">libera novos acessos.</strong>
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.4 }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 35px hsl(42 78% 55% / 0.5)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full md:w-auto py-4 px-10 rounded-xl btn-gold text-lg transition-all duration-300 hover:brightness-110"
        >
          Quero evoluir no Prátice Hub
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default StepHeadline;
