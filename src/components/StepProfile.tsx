import { motion } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { User, Phone, Briefcase, ChevronDown, Check, Rocket } from "lucide-react";
import logo from "@/assets/logo-prata.png";

const AREAS = [
  "Projetos Arquitetônicos",
  "Projetos Complementares",
  "Execução de Obras",
  "Prestação de Serviços",
  "Avaliador Credenciado CAIXA / BB",
  "INSS de Obras",
  "Financiamento Imobiliário",
  "Venda de Imóveis",
  "Fornecedor da construção",
  "Não sei informar",
];

interface ProfileData {
  nome: string;
  whatsapp: string;
  areas: string[];
}

interface StepProfileProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
  onSubmit: () => void;
}

const formatPhone = (value: string) => {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }
  digits = digits.slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

type DropdownKey = "areas" | null;

const StepProfile = ({ data, onChange, onSubmit }: StepProfileProps) => {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key in NonNullable<DropdownKey>]?: HTMLDivElement | null }>({});

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null);
  }, []);

  useEffect(() => {
    if (!openDropdown) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [openDropdown, closeDropdown]);

  const toggle = (key: DropdownKey) => {
    setOpenDropdown(prev => (prev === key ? null : key));
    if (key && window.innerWidth < 768) {
      setTimeout(() => {
        dropdownRefs.current[key as "areas"]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const updateText = (field: keyof ProfileData, value: string) => {
    if (field === "whatsapp") value = formatPhone(value);
    onChange({ ...data, [field]: value });
  };

  const toggleMulti = (field: "areas", value: string, max: number) => {
    const current = data[field];
    if (current.includes(value)) {
      onChange({ ...data, [field]: current.filter((v) => v !== value) });
    } else if (current.length < max) {
      const newSelection = [...current, value];
      onChange({ ...data, [field]: newSelection });
      if (newSelection.length >= max) {
        setOpenDropdown(null);
      }
    }
  };

  const isValid = data.nome.trim() && data.whatsapp.replace(/\D/g, "").length >= 11 && data.areas.length > 0;

  const renderMultiSelect = (
    key: "areas",
    label: string,
    selected: string[],
    placeholder: string,
    options: string[],
    field: "areas",
    max: number,
    Icon: React.ElementType
  ) => {
    const atLimit = selected.length >= max;
    const summary = selected.length > 0
      ? `${selected.length}/${max} selecionado${selected.length > 1 ? "s" : ""}`
      : "";

    return (
      <div className="relative" ref={el => dropdownRefs.current[key] = el}>
        <div className="flex items-center justify-between mb-1.5">
          <label className="cinema-input-label">{label} <span className="text-primary font-bold ml-0.5">*</span></label>
          <span className={`text-xs font-medium ${atLimit ? "text-gold" : "text-muted-foreground"}`}>
            Máx. {max}
          </span>
        </div>
        <button
          type="button"
          onClick={() => toggle(key)}
          className="cinema-input text-left flex items-center gap-2"
        >
          <Icon className="w-4 h-4 cinema-input-icon shrink-0" />
          <span className={`truncate flex-1 ${selected.length > 0 ? "" : "opacity-50"}`}>
            {summary || placeholder}
          </span>
          <ChevronDown className={`w-4 h-4 opacity-50 transition-transform shrink-0 ${openDropdown === key ? "rotate-180" : ""}`} />
        </button>

        {selected.length > 0 && openDropdown !== key && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {selected.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gold/20 text-gold border border-gold/30 cursor-pointer hover:bg-gold/30 transition-colors"
                onClick={() => toggleMulti(field, s, max)}
              >
                {s.length > 25 ? s.slice(0, 25) + "…" : s}
                <span className="text-[10px] opacity-70">✕</span>
              </span>
            ))}
          </div>
        )}

        {openDropdown === key && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-20 top-full left-0 right-0 mt-1 rounded-xl max-h-[60vh] sm:max-h-52 overflow-y-auto glass-card !p-0"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="px-3 py-2 border-b border-white/10 text-xs text-muted-foreground">
              Selecione até {max} opções ({selected.length}/{max})
            </div>
            {options.map((opt) => {
              const isSelected = selected.includes(opt);
              const isDisabled = !isSelected && atLimit;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => !isDisabled && toggleMulti(field, opt, max)}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${isDisabled
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-primary/20 cursor-pointer"
                    } ${isSelected ? "text-gold" : "text-foreground"}`}
                >
                  <span className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${isSelected
                    ? "bg-gold border-gold"
                    : "border-white/30"
                    }`}>
                    {isSelected && <Check className="w-3 h-3 text-background" />}
                  </span>
                  <span className="flex-1 leading-snug">{opt}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-start min-h-[100dvh] px-4 sm:px-6 py-6 pt-8 sm:pt-10 sm:justify-center overflow-y-auto"
    >
      <img src={logo} alt="Prátice Hub" className="w-36 md:w-44 mb-3" />

      <div ref={containerRef} className="glass-card w-full max-w-[480px]">
        <div className="mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-1.5 text-balance">
            Quem é o profissional que você quer <span className="text-primary font-bold">trazer para o Hub</span>?
          </h2>
          <p className="text-sm text-foreground/70">
            Todos os campos com <span className="text-primary font-bold">*</span> são obrigatórios
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="cinema-input-label mb-1.5 block">
              Nome do convidado <span className="text-primary font-bold ml-0.5">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 cinema-input-icon" />
              <input
                type="text"
                value={data.nome}
                onChange={(e) => updateText("nome", e.target.value)}
                placeholder="Ex: João Silva"
                className="cinema-input !pl-10 w-full"
              />
            </div>
          </div>

          <div className="relative">
            <label className="cinema-input-label mb-1.5 block">
              WhatsApp do convidado <span className="text-primary font-bold ml-0.5">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 cinema-input-icon" />
              <input
                type="tel"
                value={data.whatsapp}
                onChange={(e) => updateText("whatsapp", e.target.value)}
                placeholder="(99) 99999-9999"
                className="cinema-input !pl-10 w-full"
              />
            </div>
          </div>

          {renderMultiSelect("areas", "Em quais áreas esse profissional atua?", data.areas, "Selecione as opções", AREAS, "areas", 3, Briefcase)}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={!isValid}
          className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${isValid
            ? "btn-gold animate-pulse-glow"
            : "bg-muted/30 text-muted-foreground cursor-not-allowed"
            }`}
        >
          <Rocket className="w-5 h-5" />
          Enviar Convite e gerar pontos
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StepProfile;
