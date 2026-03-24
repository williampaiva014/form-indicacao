import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import logo from "@/assets/logo-prata.png";

interface StepImpactBridgeProps {
  onComplete: () => void;
}

const DURATION = 7;

const StepImpactBridge = ({ onComplete }: StepImpactBridgeProps) => {
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 100], ["0%", "100%"]);
  const [displayPercent, setDisplayPercent] = useState(0);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: DURATION,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setDisplayPercent(Math.round(v)),
      onComplete: () => {
        setTimeout(onComplete, 400);
      },
    });
    return () => controls.stop();
  }, [onComplete, progress]);

  return (
    <motion.div
      key="impact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center"
    >
      <img src={logo} alt="Prátice Hub" className="w-36 md:w-44 mb-4 opacity-80" />

      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.2em" }}
        animate={{ opacity: 1, letterSpacing: "0.02em" }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="text-lg md:text-2xl font-medium text-white/90 leading-relaxed text-balance max-w-md mb-10"
      >
        Identificamos seu perfil no Hub. <strong className="text-foreground">Liberando acesso de indicação...</strong>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">
              Configurando seus benefícios de pontuação...
            </span>
          </div>
          <span className="text-sm font-bold text-primary tabular-nums">
            {displayPercent}%
          </span>
        </div>

        <div className="w-full h-4 rounded-full bg-muted/30 overflow-hidden backdrop-blur-sm border border-gold/20">
          <motion.div
            className="h-full rounded-full"
            style={{
              width,
              background: "linear-gradient(90deg, hsl(var(--gold-dark)), hsl(var(--gold)), hsl(var(--gold-light)))",
              boxShadow: "0 0 20px hsl(42 78% 55% / 0.6)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StepImpactBridge;
