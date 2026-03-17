import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Building2, Briefcase, Users, Target, ChevronDown, Rocket, Check } from "lucide-react";
import logo from "@/assets/logo_pratice3.png";

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",
  "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];

const SERVICOS = [
  "Projetos Arquitetônicos",
  "Projetos Complementares",
  "Execução de Obras",
  "Execução de Reformas",
  "Avaliador Credenciado (CAIXA / BB)",
  "Regularização de Imóveis e Projetos",
  "INSS de Obras (Redução e Regularização)",
  "Financiamento Imobiliário",
  "Venda de Imóveis / Corretagem",
  "Materiais, Equipamentos e Suprimentos",
  "Outros",
];

const OBJETIVOS = [
  "Ter uma carteira infinita de clientes.",
  "Economizar nos impostos das obras e faturar com a indicação deste serviço.",
  "Aumentar minha autoridade e posicionamento no mercado.",
  "Conectar com pessoas relevantes do setor.",
  "Receber indicações de parceiros qualificados.",
  "Ser bonificado ao indicar parceiros.",
  "Me qualificar com acesso a cursos e mentorias na plataforma.",
  "Pegar minhas primeiras obras/serviços.",
];

interface ProfileData {
  estado: string;
  cidade: string;
  servicos: string[];
  clientes: string;
  objetivo: string[];
}

interface StepProfileProps {
  data: ProfileData;
  onChange: (data: ProfileData) => void;
  onSubmit: () => void;
}

type DropdownKey = "estado" | "cidade" | "clientes" | "servicos" | "objetivo" | null;

const StepProfile = ({ data, onChange, onSubmit }: StepProfileProps) => {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [cidades, setCidades] = useState<string[]>([]);
  const [loadingCidades, setLoadingCidades] = useState(false);
  const [cidadeFilter, setCidadeFilter] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click only (not on scroll inside dropdown)
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

  useEffect(() => {
    if (!data.estado) {
      setCidades([]);
      return;
    }
    setLoadingCidades(true);
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${data.estado}/municipios?orderBy=nome`)
      .then(res => res.json())
      .then((municipios: { nome: string }[]) => {
        setCidades(municipios.map(m => m.nome));
      })
      .catch(() => setCidades([]))
      .finally(() => setLoadingCidades(false));
  }, [data.estado]);

  const filteredCidades = cidadeFilter
    ? cidades.filter(c => c.toLowerCase().includes(cidadeFilter.toLowerCase()))
    : cidades;

  const toggle = (key: DropdownKey) => {
    setOpenDropdown(prev => (prev === key ? null : key));
    if (key === "cidade") setCidadeFilter("");
  };

  const update = (field: keyof ProfileData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const toggleMulti = (field: "servicos" | "objetivo", value: string, max: number) => {
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

  const isValid = data.estado && data.cidade.trim() && data.servicos.length > 0 && data.clientes && data.objetivo.length > 0;

  const clienteOptions = ["Obras de Pessoa Física", "Obras de Pessoa Jurídica", "Ambos"];

  const renderSelect = (
    key: DropdownKey,
    label: string,
    value: string,
    placeholder: string,
    options: string[],
    field: keyof ProfileData,
    Icon: React.ElementType
  ) => (
    <div className="relative">
      <label className="cinema-input-label mb-1.5 block">{label}</label>
      <button
        type="button"
        onClick={() => toggle(key)}
        className="cinema-input text-left flex items-center gap-2"
      >
        <Icon className="w-4 h-4 cinema-input-icon shrink-0" />
        <span className={`truncate flex-1 ${value ? "" : "opacity-50"}`}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 opacity-50 transition-transform shrink-0 ${openDropdown === key ? "rotate-180" : ""}`} />
      </button>
      {openDropdown === key && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-20 top-full left-0 right-0 mt-1 rounded-xl max-h-[60vh] sm:max-h-48 overflow-y-auto glass-card !p-0"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                if (field === "estado") {
                  onChange({ ...data, estado: opt, cidade: "" });
                } else {
                  update(field, opt);
                }
                setOpenDropdown(null);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary/20 transition-colors first:rounded-t-xl last:rounded-b-xl"
            >
              {opt}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );

  const renderMultiSelect = (
    key: DropdownKey,
    label: string,
    selected: string[],
    placeholder: string,
    options: string[],
    field: "servicos" | "objetivo",
    max: number,
    Icon: React.ElementType
  ) => {
    const atLimit = selected.length >= max;
    const summary = selected.length > 0
      ? `${selected.length}/${max} selecionado${selected.length > 1 ? "s" : ""}`
      : "";

    return (
      <div className="relative">
        <div className="flex items-center justify-between mb-1.5">
          <label className="cinema-input-label">{label}</label>
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

        {/* Selected tags */}
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
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${
                    isDisabled
                      ? "opacity-40 cursor-not-allowed"
                      : "hover:bg-primary/20 cursor-pointer"
                  } ${isSelected ? "text-gold" : "text-foreground"}`}
                >
                  <span className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${
                    isSelected
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
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-6">
          Perfil Profissional
        </h2>

        <div className="space-y-4">
          {renderSelect("estado", "Estado", data.estado, "Selecione seu estado", ESTADOS, "estado", MapPin)}

          <div className="relative">
            <label className="cinema-input-label mb-1.5 block">Cidade</label>
            <button
              type="button"
              onClick={() => { if (data.estado) toggle("cidade"); }}
              className={`cinema-input text-left flex items-center gap-2 ${!data.estado ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Building2 className="w-4 h-4 cinema-input-icon shrink-0" />
              <span className={`truncate flex-1 ${data.cidade ? "" : "opacity-50"}`}>
                {loadingCidades ? "Carregando cidades..." : data.cidade || (data.estado ? "Selecione sua cidade" : "Selecione um estado primeiro")}
              </span>
              <ChevronDown className={`w-4 h-4 opacity-50 transition-transform shrink-0 ${openDropdown === "cidade" ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === "cidade" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-20 top-full left-0 right-0 mt-1 rounded-xl max-h-[60vh] sm:max-h-60 overflow-hidden glass-card !p-0 flex flex-col"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-2 border-b border-white/10">
                  <input
                    type="text"
                    value={cidadeFilter}
                    onChange={(e) => setCidadeFilter(e.target.value)}
                    placeholder="Buscar cidade..."
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    autoFocus
                  />
                </div>
                <div className="overflow-y-auto max-h-[50vh] sm:max-h-48">
                  {filteredCidades.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      {loadingCidades ? "Carregando..." : "Nenhuma cidade encontrada"}
                    </div>
                  ) : (
                    filteredCidades.map((cidade) => (
                      <button
                        key={cidade}
                        type="button"
                        onClick={() => { update("cidade", cidade); setOpenDropdown(null); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-primary/20 transition-colors"
                      >
                        {cidade}
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {renderMultiSelect("servicos", "Quais serviços você presta?", data.servicos, "Selecione seus serviços", SERVICOS, "servicos", 3, Briefcase)}

          {renderSelect("clientes", "Seus clientes são principalmente", data.clientes, "Selecione uma opção", clienteOptions, "clientes", Users)}

          {renderMultiSelect("objetivo", "Qual seu maior objetivo no hub?", data.objetivo, "Selecione seus objetivos", OBJETIVOS, "objetivo", 2, Target)}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={!isValid}
          className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isValid
              ? "btn-gold animate-pulse-glow"
              : "bg-muted/30 text-muted-foreground cursor-not-allowed"
          }`}
        >
          <Rocket className="w-5 h-5" />
          Finalizar e Acessar Oportunidades
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StepProfile;
