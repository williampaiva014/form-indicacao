import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import StepGatekeeper from "@/components/StepGatekeeper";
import StepHeadline from "@/components/StepHeadline";
import StepContact from "@/components/StepContact";
import StepImpactBridge from "@/components/StepImpactBridge";
import StepProfile from "@/components/StepProfile";
import StepSuccess from "@/components/StepSuccess";
import ConstellationOverlay from "@/components/ConstellationOverlay";
import FloatingLogos from "@/components/FloatingLogos";
import GoldLightBeams from "@/components/GoldLightBeams";
import GlowOrbs from "@/components/GlowOrbs";
import Footer from "@/components/Footer";

type Step = "gatekeeper" | "headline" | "contact" | "impact" | "profile" | "success";

const PROGRESS: Record<Step, number> = {
  gatekeeper: 0,
  headline: 10,
  contact: 30,
  impact: 50,
  profile: 70,
  success: 100,
};

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("gatekeeper");
  const [contactData, setContactData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    instagram: "",
  });
  const [profileData, setProfileData] = useState({
    nome: "",
    whatsapp: "",
    areas: [] as string[],
  });

  const handleNo = () => {
    window.location.href = "https://www.engpaulorobson.com.br/";
  };

  const handleImpactComplete = useCallback(() => {
    setStep("profile");
  }, []);

  const handleSubmit = () => {
    console.log("Lead data:", { ...contactData, ...profileData });
    navigate("/obrigado", { 
      state: { 
        nome: contactData.nome,
        emailInclusao: contactData.email,
        nomeConvidado: profileData.nome,
        whatsappConvidado: profileData.whatsapp
      } 
    });
  };

  return (
    <div
      className="min-h-[100dvh] overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #121724 0%, #1a1f30 40%, #2a2520 70%, #1a1510 100%)",
      }}
    >
      {/* Gold gradient overlay */}
      <div className="fixed inset-0 z-0" style={{
        background: "radial-gradient(ellipse at 20% 50%, hsl(42 78% 55% / 0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, hsl(42 78% 55% / 0.04) 0%, transparent 60%)",
      }} />

      <GlowOrbs />
      <ConstellationOverlay />
      <FloatingLogos />
      <GoldLightBeams />

      <div className="relative z-10">
        {step !== "gatekeeper" && <ProgressBar progress={PROGRESS[step]} />}

        <AnimatePresence mode="wait">
          {step === "gatekeeper" && (
            <StepGatekeeper onYes={() => setStep("headline")} onNo={handleNo} />
          )}
          {step === "headline" && (
            <StepHeadline onNext={() => setStep("contact")} />
          )}
          {step === "contact" && (
            <StepContact
              data={contactData}
              onChange={setContactData}
              onNext={() => setStep("impact")}
            />
          )}
          {step === "impact" && (
            <StepImpactBridge onComplete={handleImpactComplete} />
          )}
          {step === "profile" && (
            <StepProfile
              data={profileData}
              onChange={setProfileData}
              onSubmit={handleSubmit}
            />
          )}
          {step === "success" && <StepSuccess />}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
