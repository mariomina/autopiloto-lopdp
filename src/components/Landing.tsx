"use client";

import React, { useState } from 'react';
import { ViewState } from '@/types';
import { HeroSection } from '@/components/landing/HeroSection';
import { ValuePropositionSection } from '@/components/landing/ValuePropositionSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { RoiCalculatorSection } from '@/components/landing/RoiCalculatorSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { ComparisonTableSection } from '@/components/landing/ComparisonTableSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { CtaSection } from '@/components/landing/CtaSection';
import { Footer } from '@/components/landing/Footer';
import { Minus, Plus, CheckCircle2 } from 'lucide-react';

interface LandingProps {
   setView: (view: ViewState) => void;
}

export const Landing: React.FC<LandingProps> = ({ setView }) => {
   const [openFaq, setOpenFaq] = useState<number | null>(0);

   const toggleFaq = (index: number) => {
      setOpenFaq(openFaq === index ? null : index);
   };

   const faqs = [
      {
         q: "¿Cuánto cuesta ENEXT?",
         a: "Desde $1,200/mes para hasta 500 verificaciones. Sin costos ocultos, sin contratos anuales. Incluye soporte 24/7, integraciones ilimitadas y actualizaciones automáticas."
      },
      {
         q: "¿Es legalmente vinculante la firma electrónica?",
         a: "Sí. Cumplimos con todas las normativas de Comercio Electrónico y LOPDP de Ecuador. Nuestras firmas tienen la misma validez legal que una firma manuscrita ante un juez."
      },
      {
         q: "¿Qué pasa con mis datos actuales?",
         a: "Migración gratuita incluida. Nuestro equipo importa tus datos existentes en menos de 24 horas sin interrumpir tus operaciones. Todos los datos son encriptados con AES-256."
      },
      {
         q: "¿Necesito equipo técnico para implementar?",
         a: "No. Setup guiado en 5 minutos sin código. Si necesitas integración custom con tu CRM o ERP, nuestro equipo lo hace gratis en 48 horas con soporte completo."
      },
      {
         q: "¿Cómo manejan la privacidad de los datos biométricos?",
         a: "Los datos biométricos son encriptados en tránsito y en reposo con estándares militares (AES-256). Nunca almacenamos la imagen biométrica cruda, solo vectores matemáticos irreversibles (hashes). Cumplimiento LOPDP 100%."
      },
      {
         q: "¿Qué garantías ofrecen?",
         a: "✓ 14 días de prueba gratis sin tarjeta\n✓ Garantía de uptime 99.9% con SLA\n✓ Reembolso completo si no cumple expectativas en 30 días\n✓ Soporte 24/7 en español incluido"
      },
      {
         q: "¿Se integra con mi CRM o ERP actual?",
         a: "Absolutamente. Nuestra API RESTful se integra fácilmente con Salesforce, SAP, HubSpot, Zoho y sistemas bancarios core en menos de 48 horas. También ofrecemos SDKs para iOS, Android y Web."
      },
      {
         q: "¿Qué pasa si la IA falla al reconocer una cara?",
         a: "El sistema cuenta con un flujo de 'fallback' configurable. Si la confianza biométrica es baja (<95%), se deriva automáticamente a revisión manual o solicita un segundo factor de autenticación. Tú decides el nivel de seguridad."
      }
   ];

   return (
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-midnight transition-colors duration-300">
         {/* 1. Hero Section - Rediseñado */}
         <HeroSection setView={setView} />

         {/* 2. Logos Section - Inline */}
         <section className="border-y border-white/5 bg-white/[0.02] py-12">
            <div className="container mx-auto px-6 text-center">
               <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-8">
                  Confían en nosotros las instituciones líderes de Ecuador
               </p>
               <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-slate-600"></div>
                     <span className="font-bold text-lg">BANCO ANDINO</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded bg-slate-600"></div>
                     <span className="font-bold text-lg">FINANCIERA DEL SUR</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full border-2 border-slate-600"></div>
                     <span className="font-bold text-lg">GRUPO FUTURO</span>
                  </div>
               </div>
            </div>
         </section>

         {/* 3. Value Proposition - NUEVO */}
         <ValuePropositionSection />

         {/* 4. Benefits Section - NUEVO (reemplaza Features) */}
         <BenefitsSection />

         {/* 5. ROI Calculator - NUEVO */}
         <RoiCalculatorSection setView={setView} />

         {/* 6. How It Works - Simplificado */}
         <HowItWorksSection />

         {/* 7. Comparison Table - NUEVO (reemplaza Comparison) */}
         <ComparisonTableSection />

         {/* 8. Testimonials - Mejorado */}
         <TestimonialsSection />

         {/* 9. CTA Section - Rediseñado */}
         <CtaSection setView={setView} />

         {/* 10. FAQ Section - Mejorado */}
         <section className="py-24 bg-midnight" id="faq">
            <div className="container mx-auto px-6 max-w-4xl">
               <div className="text-center mb-16">
                  <span className="text-accent text-sm font-bold uppercase tracking-wider mb-4 block">
                     Preguntas Frecuentes
                  </span>
                  <h2 className="text-4xl font-bold mb-4">
                     Todo lo que Necesitas Saber
                  </h2>
                  <p className="text-slate-400">
                     Respuestas claras a las preguntas más comunes
                  </p>
               </div>

               <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                     <div key={idx} className="bg-surface-dark border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-all">
                        <button
                           onClick={() => toggleFaq(idx)}
                           className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                           <span className="font-bold text-white text-base pr-8">{faq.q}</span>
                           {openFaq === idx ? (
                              <Minus size={20} className="text-accent shrink-0" />
                           ) : (
                              <Plus size={20} className="text-slate-500 shrink-0" />
                           )}
                        </button>
                        {openFaq === idx && (
                           <div className="px-6 pb-6 pt-2 text-slate-300 text-sm leading-relaxed animate-fade-in">
                              {faq.a.split('\n').map((line, i) => (
                                 <p key={i} className="mb-2 last:mb-0">
                                    {line.startsWith('✓') ? (
                                       <span className="flex items-start gap-2">
                                          <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                          <span>{line.substring(2)}</span>
                                       </span>
                                    ) : (
                                       line
                                    )}
                                 </p>
                              ))}
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 11. Footer */}
         <Footer />
      </div>
   );
};
