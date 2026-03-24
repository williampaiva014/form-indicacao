import { motion } from "framer-motion";
import { useState } from "react";
import { User, Mail, Phone, Instagram, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-prata.png";

interface ContactData {
  nome: string;
  email: string;
  whatsapp: string;
  instagram: string;
}

interface StepContactProps {
  data: ContactData;
  onChange: (data: ContactData) => void;
  onNext: () => void;
}

const formatPhone = (value: string) => {
  let digits = value.replace(/\D/g, "");
  // Tratamento de autocomplete: se começar com 55 (Brasil) e o número estiver completo
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }
  digits = digits.slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const fields = [
  { key: "nome" as const, label: "Seu nome completo", placeholder: "Ex: João Silva", type: "text", autoComplete: "name", icon: User },
  { key: "whatsapp" as const, label: "Seu WhatsApp", placeholder: "(99) 99999-9999", type: "tel", autoComplete: "tel", icon: Phone },
  { key: "email" as const, label: "Seu e-mail cadastrado na plataforma", placeholder: "joao@empresa.com", type: "email", autoComplete: "email", icon: Mail },
];

const StepContact = ({ data, onChange, onNext }: StepContactProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: keyof ContactData, value: string) => {
    if (field === "whatsapp") value = formatPhone(value);
    onChange({ ...data, [field]: value });
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.nome.trim()) e.nome = "Nome é obrigatório";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Email inválido";
    const digits = data.whatsapp.replace(/\D/g, "");
    if (digits.length < 11) e.whatsapp = "WhatsApp inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isValid = data.nome.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && data.whatsapp.replace(/\D/g, "").length >= 11;

  const handleSubmit = () => {
    if (validate()) onNext();
  };

  return (
    <motion.div
      key="contact"
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center min-h-[100dvh] px-6 pt-10"
    >
      <img src={logo} alt="Prátice Hub" className="w-36 md:w-44 mb-3" />

      <div className="glass-card w-full max-w-[480px]">
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-1.5 text-balance">
            Agora precisamos <span className="text-primary font-bold">identificar você</span> dentro do <span className="text-primary font-bold">Prátice Hub</span>
          </h2>
          <p className="text-sm text-foreground/70">
            Todos os campos com <span className="text-primary font-bold">*</span> são obrigatórios
          </p>
        </div>

        <div className="space-y-4">
          {fields.map(({ key, label, placeholder, type, autoComplete, icon: Icon }) => (
            <div key={key} className="relative">
              <label className="cinema-input-label mb-1.5 block">
                {label} <span className="text-primary font-bold ml-0.5">*</span>
              </label>
              <div className="relative">
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 cinema-input-icon" />
                <input
                  type={type}
                  inputMode={type === "tel" ? "tel" : undefined}
                  autoComplete={autoComplete}
                  value={data[key]}
                  onChange={(e) => update(key, e.target.value)}
                  placeholder={placeholder}
                  className="cinema-input !pl-10"
                />
              </div>
              {errors[key] && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-destructive text-xs mt-1"
                >
                  {errors[key]}
                </motion.p>
              )}
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            isValid
              ? "btn-gold"
              : "bg-muted/30 text-muted-foreground cursor-not-allowed"
          }`}
        >
          Continuar Convite
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StepContact;
