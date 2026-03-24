import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/logo-prata.png";
import pauloRobsonImg from "@/assets/paulo_robson.png";
import ConstellationOverlay from "@/components/ConstellationOverlay";
import GlowOrbs from "@/components/GlowOrbs";
import GoldLightBeams from "@/components/GoldLightBeams";
import FloatingLogos from "@/components/FloatingLogos";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.33, 1, 0.68, 1] as const },
  }),
};

const faqItems = [
  {
    question: "1. O que eu ganho ao indicar um novo convidado?",
    answer: "Sua influência no ecossistema é recompensada com pontos imediatos para subir de nível. Ao subir de nível, você ganha acesso a mentorias exclusivas e ao nosso Network de Elite. Você também libera Conteúdos VIP, como trilhas avançadas de gestão e vendas. O maior benefício é o aumento real no seu percentual de bonificação em todas as trilhas de monetização da plataforma.",
  },
  {
    question: "2. Qual é a vantagem para o meu convidado?",
    answer: "Como ele foi selecionado por um membro ativo, ele terá isenção total da taxa de acesso ao Prátice Hub. O convidado entra no ecossistema com uma \"vaga custo zero\" garantida por você. Ele passa a ter acesso à \"Carteira Infinita de Clientes\" e a parcerias que geram negócios reais diariamente.",
  },
  {
    question: "3. Como o meu convidado recebe o convite?",
    answer: "Assim que você finaliza o formulário, o sistema dispara automaticamente uma mensagem via WhatsApp para ele. A mensagem menciona que você o selecionou pessoalmente para integrar o movimento.",
  },
  {
    question: "4. Existe um prazo para o convidado aceitar?",
    answer: "Sim, a condição especial de isenção total de custos é por tempo limitado. O convite com esta condição exclusiva ficará ativo por apenas 7 dias.",
  },
  {
    question: "5. Quando os meus pontos e bônus são atualizados?",
    answer: "A pontuação é contabilizada no momento em que o convidado ativa o perfil no app. A atualização é realizada uma vez a cada mês.",
  },
];

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any || {};
  const nome = state.nome || "Profissional";
  const firstName = nome.split(" ")[0];
  const emailInclusao = state.emailInclusao || "";
  const nomeConvidado = state.nomeConvidado || "Seu Convidado";
  const whatsappConvidado = state.whatsappConvidado || "";

  const whatsappMsgText = `Fala *${nomeConvidado}*! \uD83E\uDD1D

Te convidei para o *Prátice Hub* \u2014 o maior ecossistema de negócios da construção no Brasil \uD83C\uDFD7\uFE0F.

Eu já faço parte. Lá dentro, geramos *conexões, parcerias e faturamento* através de indicações \uD83D\uDCB8.

\uD83D\uDCF2 *Clica no link abaixo* e ativa teu acesso no app.

\u23F3 Corre, seu convite *expira em 7 dias*.

Ah, não esquece de informar meu e-mail *${emailInclusao}*, assim consigo evoluir no hub \uD83D\uDE80.

\uD83D\uDC49 *LINK:* https://engpaulorobson.com.br/praticehubconvidado/`;

  const whatsappMsgUrl = `https://wa.me/55${whatsappConvidado.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMsgText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMsgText).then(() => {
      alert("Mensagem copiada para a área de transferência!");
    });
  };

  const renderVisualText = (text: string) => {
    return text.split('*').map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="text-white font-extrabold">{part}</strong> : part
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="min-h-[100dvh] relative"
      style={{
        background: "linear-gradient(135deg, #121724 0%, #1a1f30 40%, #2a2520 70%, #1a1510 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="fixed inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 20% 50%, hsl(42 78% 55% / 0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsl(42 78% 55% / 0.04) 0%, transparent 60%)",
      }} />
      <GlowOrbs />
      <ConstellationOverlay />
      <FloatingLogos />
      <GoldLightBeams />

      {/* ──── HERO 01 ──── */}
      <section className="relative z-10 w-full min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-20 text-center overflow-x-hidden">
        <img
          src={logo}
          alt="Prátice Hub"
          className="w-32 sm:w-40 md:w-52 mb-6 sm:mb-8"
        />

        <div className="w-full max-w-2xl px-2 sm:px-0">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 mb-6 sm:mb-8 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.15)] text-primary justify-center w-auto max-w-full">
            <div className="relative flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-40"></span>
              <div className="relative flex items-center justify-center w-full h-full rounded-full bg-primary/20 border border-primary/50">
                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" strokeWidth={3} />
              </div>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase mt-0.5 text-center leading-tight truncate">
              Convite enviado com sucesso
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.2] sm:leading-[1.1] mb-6 px-1 sm:px-0">
            Parabéns,{" "}
            <span className="text-primary break-words">{firstName}</span>. <br className="hidden sm:block" />Mais um convite foi enviado e você acaba de{" "}
            <span className="text-primary font-extrabold">fortalecer a sua rede</span>!
          </h1>

          <h2 className="text-base sm:text-xl md:text-2xl font-semibold text-foreground mt-8 sm:mt-10 mb-6 text-balance px-2">
            Agora aumente as chances de ativação do seu convidado.
          </h2>

          <div className="glass-card !p-4 sm:!p-8 mt-2 text-left relative group w-full max-w-full mx-auto" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h3 className="text-primary font-semibold text-[13px] sm:text-sm tracking-wide leading-snug">
                Copie e envie essa mensagem para o seu convidado
              </h3>
              <button 
                onClick={handleCopy}
                className="p-2 sm:p-2.5 rounded-md bg-white/5 hover:bg-white/10 transition-colors shrink-0 border border-white/10 w-full sm:w-auto flex items-center justify-center gap-2 group-hover:bg-white/10"
                title="Copiar mensagem"
              >
                <span className="text-xs text-white uppercase font-bold tracking-wider">Copiar Texto</span>
                <Copy className="w-4 h-4 text-white group-hover:text-primary transition-colors" />
              </button>
            </div>

            <div className="bg-black/30 p-4 sm:p-5 rounded-lg border border-white/10 whitespace-pre-wrap text-white/90 text-[13px] sm:text-[15px] leading-relaxed font-medium overflow-hidden" style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
              {renderVisualText(whatsappMsgText)}
            </div>

            <a
              href={whatsappMsgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 sm:mt-6 w-full px-4 py-3.5 sm:py-4 rounded-xl font-bold text-[13px] sm:text-[15px] md:text-lg transition-all duration-300 flex items-center justify-center gap-2 btn-gold hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.2)] text-center leading-snug whitespace-normal"
            >
              Envie sua mensagem para o seu convidado
            </a>
          </div>
        </div>
      </section>

      {/* ──── BLOCO 02 — RECOMPENSA ──── */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card !p-6 sm:!p-10 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">
              Sua <span className="text-primary">recompensa</span> já está a caminho
            </h2>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-8">
              Assim que o novo Práticer Member ativar o acesso, <strong className="text-white">seus pontos de indicação serão contabilizados</strong>. Com isso, você avança de nível dentro do Hub, desbloqueia novos acessos, conteúdos e aumenta seus percentuais de bonificação.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3.5 rounded-xl font-semibold text-[15px] sm:text-lg transition-all duration-300 btn-gold hover:brightness-110 shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              👉 Indicar outro profissional
            </button>
          </div>
        </div>
      </section>

      {/* ──── BLOCO 03 — MENSAGEM DE PROPÓSITO ──── */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 bg-black/20 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Esquerda: Foto */}
            <div className="relative flex justify-center order-1 md:order-none">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <img
                  src={pauloRobsonImg}
                  alt="Engenheiro Paulo Robson"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Direita: Texto */}
            <div className="space-y-6 order-2 md:order-none text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                Um <span className="text-primary">propósito</span> muito maior
              </h2>
              <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-white/90">
                <p>
                  Você não está apenas convidando alguém.
                </p>
                <p>
                  Você está ajudando a construir, junto comigo, um ecossistema que conecta profissionais, gera negócios reais e eleva o nível da construção no Brasil.
                </p>
                <p className="font-semibold text-white text-lg mt-4">
                  Esse é o propósito do Prátice Hub. E você faz parte disso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── HERO 03 — FAQ ──── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-wider uppercase">
              Sua Entrada no Ecossistema Prátice Hub
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              <span className="text-primary font-extrabold">FAQ</span>
            </h2>
          </div>

          <div>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, i) => (
                <div key={i}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="glass-card !p-0 border-none"
                  >
                    <AccordionTrigger className="px-6 py-5 text-foreground text-left font-medium hover:no-underline hover:text-primary transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5 text-white/90 text-sm leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ──── CTA Final ──── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-card">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-balance leading-tight">
              Você já instalou o App do <span className="text-primary font-extrabold">Prátice Hub?</span>
            </h2>
            <p className="text-white/90 text-[15px] sm:text-base mb-10 leading-relaxed text-balance">
              Para acompanhar a ativação dos seus convidados, somar seus pontos de influência e receber suas bonificações <strong className="text-foreground">(Ponte de Valor)</strong>, é fundamental que você tenha nosso aplicativo instalado no seu celular. Caso ainda não tenha baixado, acesse agora:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-12"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.praticehub.comunidade"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default ThankYou;
