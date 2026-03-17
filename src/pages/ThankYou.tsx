import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Users, TrendingUp, Sparkles, ChevronDown } from "lucide-react";
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

const benefits = [
  {
    icon: TrendingUp,
    title: "Ative a sua Carteira Infinita",
    description:
      "Deixe de depender apenas do seu esforço individual e utilize a força da rede para captar novos clientes.",
    boldParts: ["força da rede", "captar novos clientes"],
  },
  {
    icon: Sparkles,
    title: "Ponte de Valor",
    description:
      "Rentabilize indicações por meio do Hub. Quanto mais negócios gerar, maior será o seu percentual de ganho.",
    boldParts: ["Rentabilize indicações", "percentual de ganho"],
  },
  {
    icon: Shield,
    title: "Selo de Autoridade",
    description:
      "Posicione-se como um Práticer Member e diferencie-se com autoridade em um mercado cada vez mais competitivo.",
    boldParts: ["Práticer Member", "autoridade"],
  },
  {
    icon: Users,
    title: "Networking de Elite",
    description:
      "Conecte-se a parceiros estratégicos e acesse conteúdos e mentorias exclusivos.",
    boldParts: ["parceiros estratégicos", "mentorias exclusivos"],
  },
];

const faqItems = [
  {
    question: "Como acesso o Hub após concluir o cadastro?",
    answer:
      "O acesso é realizado exclusivamente pelo aplicativo oficial. Assim que enviar seus dados, você receberá o link para download. Importante: você deve ativar sua conta no App utilizando o mesmo e-mail preenchido neste formulário para que sua aprovação prioritária e benefícios sejam vinculados corretamente ao seu perfil.",
  },
  {
    question: "Como funcionam os ganhos financeiros e a evolução de nível?",
    answer:
      "A nossa principal proposta de valor é a Ponte de Valor (indicações qualificadas). Ao realizar essas conexões, você entra em uma trilha de monetização onde recebe bonificações financeiras por negócios validados. Além do dinheiro, você ganha pontos que fazem seu perfil subir de nível; quanto mais você evolui, maiores se tornam seus percentuais de ganho e acessos dentro do Hub.",
  },
  {
    question: "Qual o diferencial do Selo de Autoridade Prátice Member?",
    answer:
      "Ao ativar seu perfil, você deixa de ser um profissional isolado para integrar um movimento de elite. O selo confere autoridade imediata perante o mercado, sinalizando que você utiliza inteligência estratégica e fiscal para garantir máxima rentabilidade e segurança em suas obras e projetos.",
  },
  {
    question: "Existe suporte para aprender a utilizar as ferramentas?",
    answer:
      "Com certeza. Dentro do App, você terá acesso às Trilhas de Evolução: mentorias e conteúdos práticos desenhados para ensinar como rentabilizar sua rede de contatos, gerir suas Pontes de Valor e escalar seu posicionamento como um profissional de elite da construção civil.",
  },
  {
    question: "Qual o investimento para ativar meu perfil?",
    answer:
      "Como você chegou através de um canal oficial de prospecção do Grupo Prátice, seu perfil possui validação prioritária e a ativação do seu cadastro é isenta. O modelo é estruturado para que o próprio faturamento gerado pelas suas parcerias e negócios dentro do ecossistema impulsione e sustente o crescimento da sua operação.",
  },
];

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const nome = (location.state as { nome?: string })?.nome || "Profissional";
  const firstName = nome.split(" ")[0];

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
      <section className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
        <img
          src={logo}
          alt="Prátice Hub"
          className="w-40 md:w-52 mb-8"
        />

        <div className="max-w-2xl">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10">
            <span className="text-primary text-xs font-medium tracking-wider uppercase">
              Acesso Prioritário Aprovado
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Parabéns{" "}
            <span className="text-primary">{firstName}</span>, seu{" "}
            <span className="text-primary font-extrabold">acesso prioritário</span> foi aprovado!
          </h1>

          <div className="glass-card mt-8 text-left space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-destructive text-sm">⏳</span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                Para manter o equilíbrio da rede liberei um{" "}
                <strong className="text-foreground">
                  número restrito de acessos sem custo de adesão
                </strong>{" "}
                por região.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-destructive text-sm">⚠️</span>
              </div>
              <p className="text-white/90 text-sm leading-relaxed">
                A demora na ativação pode{" "}
                <strong className="text-foreground">
                  liberar sua posição na fila regional
                </strong>{" "}
                para outro profissional.
              </p>
            </div>
          </div>

          <p className="text-foreground font-medium mt-8 mb-6 text-lg">
            Baixe o app e cadastre sua senha de acesso
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
              href="https://play.google.com"
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

        <div className="absolute bottom-10 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
        </div>
      </section>

      {/* ──── HERO 02 — Benefícios ──── */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium tracking-wider uppercase">
              Benefícios Exclusivos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              <span className="text-primary font-extrabold">Promessas</span> de Valor
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="glass-card flex gap-5 items-start group hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                  <b.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold text-lg mb-2">
                    {b.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed">
                    {b.boldParts
                      ? b.description.split(new RegExp(`(${b.boldParts.join("|")})`, "g")).map((part, idx) =>
                        b.boldParts!.includes(part) ? (
                          <strong key={idx} className="text-foreground">{part}</strong>
                        ) : (
                          <span key={idx}>{part}</span>
                        )
                      )
                      : b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── HERO 02.5 — Quem Sou Eu ──── */}
      <section className="relative z-10 py-24 px-6 bg-black/20 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Lado Esquerdo: Foto */}
            <div className="relative flex justify-center order-1">
              <div className="relative w-full max-w-md lg:max-w-xl">
                {/* Efeito de brilho de fundo */}
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <img
                  src={pauloRobsonImg}
                  alt="Engenheiro Paulo Robson"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Lado Direito: Texto */}
            <div className="space-y-6 order-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-[1.3] mb-8">
                O Prátice Hub nasce de uma <span className="text-primary">história que pouca gente conhece de verdade.</span>
              </h2>

              <div className="space-y-6 text-base leading-relaxed text-white">
                <p>
                  A história do <strong>Engenheiro Paulo Robson</strong>… um menino pobre, de uma cidade de apenas 14 mil habitantes no interior do Ceará, que <strong>decidiu vencer através da construção civil</strong>. Sem contatos. Sem atalhos. Só decisão. Por muito tempo, tentou crescer sozinho. E como acontece com a maioria… <strong>evoluiu, mas travou</strong>.
                </p>
                <p>
                  Até que em 2024, ele entendeu que para faturar mais e ganhar autoridade, precisava <strong>se conectar com profissionais e empresários em outro nível</strong>. Foi ali que <strong>o jogo virou</strong>: as <strong>conexões viraram negócios</strong>, os <strong>relacionamentos viraram oportunidades</strong> e as <strong>oportunidades viraram escala</strong>. Aquele engenheiro do interior se tornou a <strong>maior referência do Brasil</strong> em regularização de INSS de obras, economizando <strong>mais de 10 milhões em impostos</strong> e gerenciando <strong>mais de meio bilhão em obras</strong>.
                </p>
                <p>
                  Mas o mais importante foi entender que <strong>ninguém cresce grande jogando sozinho</strong>, e é exatamente daí que nasce o Prátice Hub. Um ecossistema onde profissionais <strong>deixam de crescer isolados</strong> e passam a <strong>gerar oportunidades conectando-se uns aos outros</strong>. Paulo Robson decidiu abrir essa porta <strong>sem custo nenhum</strong>, mas essa condição <strong>pode ser encerrada a qualquer momento</strong>. Então a pergunta é simples: você vai continuar tentando sozinho… ou vai <strong>entrar no jogo de quem cresce de verdade?</strong>
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
              Perguntas Frequentes
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Não perca sua <span className="text-primary font-extrabold">posição</span>
            </h2>
            <p className="text-white/90 text-sm mb-8 leading-relaxed">
              Baixe o app agora e garanta seu <strong className="text-foreground">acesso prioritário</strong> antes que sua
              vaga seja liberada para outro profissional da sua região.
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
                href="https://play.google.com"
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
