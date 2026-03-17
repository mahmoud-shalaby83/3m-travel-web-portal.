import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, MapPin, Calendar, Users, 
  CheckCircle, Star, ChevronDown, Menu, X, 
  Phone, Mail, Instagram, Facebook, Camera,
  ArrowLeft, Timer, Zap, Shield, Headset, RefreshCw
} from 'lucide-react';

// --- Configuration & Constants (Marketing 5.0 - Data Centralization) ---
const CONFIG = {
  WA_NUMBER: "201226292894",
  PHONE_DISPLAY: "01226292894",
  LOGO_PATH: "WhatsApp Image 2026-02-12 at 7.07.38 PM.jpeg", // تأكد من وجود هذا الملف في مجلد public
  BRAND_COLORS: {
    blue: '#003B73',
    sand: '#F5F5DC',
    lightSand: '#FAFAEE'
  }
};

const getWaLink = (message) => 
  `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(message)}`;

// --- Custom Hooks ---
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// --- Reusable Components (Brand Identity Maintenance) ---
const Logo = ({ className }) => (
  <img 
    src={CONFIG.LOGO_PATH} 
    alt="3M Travel" 
    className={`object-contain ${className}`} 
  />
);

const SectionHeading = ({ title, subtitle, titleClassName = "text-[#003B73]", subtitleClassName = "text-gray-600", lineColor = "bg-[#003B73]" }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`text-center mb-12 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${titleClassName}`}>{title}</h2>
      {subtitle && <p className={`text-lg max-w-2xl mx-auto ${subtitleClassName}`}>{subtitle}</p>}
      <div className={`w-24 h-1 mx-auto mt-6 rounded-full ${lineColor}`}></div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// --- Helper Function for Scroll & Autofill (Friction Reduction) ---
const scrollToBooking = (destinationName, setGlobalDestination) => {
  setGlobalDestination(destinationName);
  const element = document.getElementById('booking');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- Page Data ---
const PAGE_DATA = {
  'sharm-el-sheikh-trip': {
    title: 'رحلات شرم الشيخ', destinationValue: 'شرم الشيخ',
    heroImg: 'https://images.unsplash.com/photo-1582650831633-90d23f79391e?auto=format&fit=crop&w=1920&q=80',
    desc: 'اكتشف سحر شرم الشيخ، مدينة السلام. استمتع بأفضل الفنادق، الشعاب المرجانية، والرحلات البحرية الرائعة.',
    packages: [
      { title: 'عرض فندق مارينا شرم', dest: 'شرم الشيخ', duration: '4 أيام / 3 ليالي', hotel: 'فندق مارينا شرم', features: ['موقع ممتاز بخليج نعمة', 'نصف إقامة', 'انتقالات ذهاب وعودة'], tag: 'عرض خاص' },
      { title: 'شرم الشيخ 4 أيام', dest: 'شرم الشيخ', duration: '4 أيام / 3 ليالي', hotel: 'فنادق 4 و 5 نجوم', features: ['انتقالات ذهاب وعودة', 'وجبات شاملة', 'رحلة بحرية مجانية'], tag: 'الأكثر مبيعاً' },
      { title: 'شرم الشيخ VIP', dest: 'شرم الشيخ', duration: '5 أيام / 4 ليالي', hotel: 'فنادق 5 نجوم ديلوكس', features: ['سيارة خاصة', 'غرف مطلة على البحر', 'عشاء رومانسي'], tag: 'VIP' }
    ]
  },
  'hurghada-trip': {
    title: 'رحلات الغردقة', destinationValue: 'الغردقة',
    heroImg: 'https://images.unsplash.com/photo-1623868222624-817f69468087?auto=format&fit=crop&w=1920&q=80',
    desc: 'الغردقة، عاصمة البحر الأحمر. مثالية للعائلات وعشاق الأكوا بارك والرحلات الاستكشافية الممتعة.',
    packages: [
      { title: 'الغردقة العائلية', dest: 'الغردقة', duration: '4 أيام / 3 ليالي', hotel: 'فنادق 5 نجوم', features: ['أكوا بارك ضخمة', 'إقامة كاملة', 'رحلة سفاري'], tag: 'عائلي' },
      { title: 'الغردقة اقتصادية', dest: 'الغردقة', duration: '3 أيام / 2 ليالي', hotel: 'فنادق 3 و 4 نجوم', features: ['انتقالات', 'نصف إقامة', 'رحلة جزر'], tag: 'توفير' }
    ]
  },
  'dahab-trip': {
    title: 'رحلات دهب', destinationValue: 'دهب',
    heroImg: 'https://images.unsplash.com/photo-1605342416347-190ab7ed184c?auto=format&fit=crop&w=1920&q=80',
    desc: 'ملاذ المغامرين والباحثين عن الهدوء. تجربة فريدة بين الغطس في البلو هول والسفاري الجبلية.',
    packages: [
      { title: 'دهب مغامرات', dest: 'دهب', duration: '3 أيام / 2 ليالي', hotel: 'كامبات وفنادق', features: ['غطس في البلو هول', 'سفاري وادي الوشواش', 'سهرة بدوية'], tag: 'شبابي' },
      { title: 'دهب استجمام', dest: 'دهب', duration: '4 أيام / 3 ليالي', hotel: 'فنادق 4 نجوم', features: ['إفطار', 'غرف مطلة على البحر', 'يوجا'], tag: 'استرخاء' }
    ]
  },
  'matrouh-trip': {
    title: 'رحلات مرسى مطروح', destinationValue: 'مرسى مطروح',
    heroImg: 'https://images.unsplash.com/photo-1622080775837-77cfba17326e?auto=format&fit=crop&w=1920&q=80',
    desc: 'مالديف مصر. استمتع بالمياه الفيروزية والرمال البيضاء الناعمة في أجواء عائلية مميزة.',
    packages: [
      { title: 'مطروح الصيفية', dest: 'مرسى مطروح', duration: '5 أيام / 4 ليالي', hotel: 'شقق فندقية وفنادق', features: ['قريب من الشاطئ', 'مواصلات داخلية', 'رحلة لشاطئ عجيبة'], tag: 'صيفي' }
    ]
  },
  'sokhna-trip': {
    title: 'رحلات العين السخنة', destinationValue: 'العين السخنة',
    heroImg: 'https://images.unsplash.com/photo-1596484552993-80b6a22c544a?auto=format&fit=crop&w=1920&q=80',
    desc: 'أقرب منتجعات البحر الأحمر للقاهرة، استجمام سريع ومريح في عطلات نهاية الأسبوع.',
    packages: [
      { title: 'ويك إند السخنة', dest: 'العين السخنة', duration: 'يومين / ليلة', hotel: 'فنادق 4 نجوم', features: ['شاطئ رملي', 'حمامات سباحة دافئة', 'إفطار وعشاء'], tag: 'سريع' }
    ]
  }
};

// --- Destination Page Component ---
const DestinationPage = ({ route, goBack }) => {
  const data = PAGE_DATA[route];
  const [formDestination, setFormDestination] = useState(data ? data.destinationValue : '');

  useEffect(() => { window.scrollTo(0, 0); }, [route]);

  if (!data) return <div className="p-20 text-center text-xl font-bold mt-20">عذراً، الوجهة غير متوفرة حالياً. <button onClick={goBack} className="text-blue-600 underline block mt-4 mx-auto">العودة للرئيسية</button></div>;

  return (
    <div dir="rtl" className="font-sans text-gray-800 antialiased" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <nav className="fixed w-full z-40 bg-white shadow-md py-4">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <button onClick={goBack} className="flex items-center gap-2 text-[#003B73] font-bold hover:text-yellow-500 transition">
            <ArrowLeft size={20} /> العودة للرئيسية
          </button>
          <Logo className="h-10 md:h-12 mix-blend-multiply" />
        </div>
      </nav>

      <section className="relative h-[60vh] flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImg} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-black mb-4">{data.title}</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">{data.desc}</p>
            <button onClick={() => scrollToBooking(data.destinationValue, setFormDestination)} className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white text-lg font-bold py-3 px-8 rounded-full transition shadow-lg">
              <CheckCircle size={24} /> احجز باقتك الآن
            </button>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-[#f4f7fa]">
        <div className="container mx-auto px-4">
          <SectionHeading title={`باقات ${data.title}`} subtitle="اختر العرض الأنسب لاحتياجاتك" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.packages.map((pkg, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-t-4 border-[#003B73] relative h-full flex flex-col">
                  <span className="absolute -top-4 right-6 bg-yellow-400 text-blue-900 text-xs font-black px-3 py-1 rounded-full shadow-md">{pkg.tag}</span>
                  {pkg.tag === 'عرض خاص' && <div className="flex items-center gap-1 text-red-500 text-xs font-bold mt-2 animate-pulse mb-2"><Timer size={14} /> متبقي 3 أماكن فقط!</div>}
                  <h3 className="text-xl font-bold text-[#003B73] mb-4 mt-2">{pkg.title}</h3>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-center gap-3 text-gray-700 font-medium"><Calendar size={18} className="text-[#003B73]" /> {pkg.duration}</li>
                    <li className="flex items-center gap-3 text-gray-700 font-medium"><Star size={18} className="text-[#003B73]" /> {pkg.hotel}</li>
                    <li className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2 font-bold">مميزات الرحلة:</p>
                      {pkg.features.map((feat, i) => (<div key={i} className="flex items-center gap-2 text-gray-700 text-sm mb-1.5"><CheckCircle size={14} className="text-[#25D366]" /> {feat}</div>))}
                    </li>
                  </ul>
                  <button onClick={() => scrollToBooking(data.destinationValue, setFormDestination)} className="w-full bg-[#003B73] hover:bg-blue-800 text-white text-center py-3.5 rounded-xl font-bold transition flex justify-center items-center gap-2 mt-auto">
                    <ArrowLeft size={18} /> احجز الباقة الآن
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-[#FAFAEE] rounded-3xl shadow-xl p-8 border border-gray-100">
            <SectionHeading title="طلب حجز سريع" subtitle="سجل بياناتك وسيتم التواصل معك فوراً للتأكيد" />
            <BookingForm prefilledDestination={formDestination} />
          </div>
        </div>
      </section>

      {/* Dynamic Floating Button for Sub-pages */}
      <a href={getWaLink(`مرحباً فريق مبيعات 3M Travel، أستفسر عن عروض ${data.title}.`)} target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center group">
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">استفسر عن {data.title}</span>
      </a>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeFilter, setActiveFilter] = useState('الكل');
  
  // State for Auto-filling form
  const [globalFormDestination, setGlobalFormDestination] = useState('');

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.head.removeChild(link);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      setCurrentRoute(hash.startsWith('#/') ? hash.replace('#/', '') : '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentRoute !== '/' && currentRoute !== '') {
    return <DestinationPage route={currentRoute} goBack={() => { window.location.hash = ''; }} />;
  }

  // --- Data Full Reset ---
  const destinations = [
    { id: 'sharm-el-sheikh-trip', name: 'شرم الشيخ', img: 'https://images.unsplash.com/photo-1582650831633-90d23f79391e?auto=format&fit=crop&w=600&q=80', desc: 'مدينة السلام والجمال، حيث الشواطئ الساحرة والشعاب المرجانية.' },
    { id: 'hurghada-trip', name: 'الغردقة', img: 'https://images.unsplash.com/photo-1623868222624-817f69468087?auto=format&fit=crop&w=600&q=80', desc: 'عاصمة السحر والجمال بالبحر الأحمر، مثالية للغطس والرحلات البحرية.' },
    { id: 'dahab-trip', name: 'دهب', img: 'https://images.unsplash.com/photo-1605342416347-190ab7ed184c?auto=format&fit=crop&w=600&q=80', desc: 'ملاذ الباحثين عن الهدوء والمغامرة بين الجبال والبحر.' },
    { id: 'matrouh-trip', name: 'مرسى مطروح', img: 'https://images.unsplash.com/photo-1622080775837-77cfba17326e?auto=format&fit=crop&w=600&q=80', desc: 'شواطئ برمال بيضاء ومياه فيروزية لا مثيل لها.' },
    { id: 'sokhna-trip', name: 'العين السخنة', img: 'https://images.unsplash.com/photo-1596484552993-80b6a22c544a?auto=format&fit=crop&w=600&q=80', desc: 'أقرب منتجعات البحر الأحمر للقاهرة، استجمام سريع ومريح.' }
  ];

  const packages = [
    { title: 'عرض فندق مارينا شرم', dest: 'شرم الشيخ', duration: '4 أيام / 3 ليالي', hotel: 'مارينا شرم (خليج نعمة)', features: ['إطلالة مباشرة على البحر', 'نصف إقامة', 'موقع استراتيجي'], tag: 'عرض خاص' },
    { title: 'رحلات شرم الشيخ', dest: 'شرم الشيخ', duration: '4 أيام / 3 ليالي', hotel: 'فنادق 4 و 5 نجوم', features: ['انتقالات ذهاب وعودة', 'وجبات شاملة', 'رحلة بحرية مجانية'], tag: 'الأكثر مبيعاً' },
    { title: 'رحلات الغردقة', dest: 'الغردقة', duration: '4 أيام / 3 ليالي', hotel: 'فنادق 5 نجوم', features: ['أكوا بارك', 'إقامة كاملة', 'رحلة سفاري'], tag: 'عائلي' },
    { title: 'رحلات دهب مغامرات', dest: 'دهب', duration: '3 أيام / 2 ليالي', hotel: 'كامبات وفنادق', features: ['غطس في البلو هول', 'سفاري وادي الوشواش', 'سهرة بدوية'], tag: 'شبابي' },
    { title: 'رحلات شهر عسل', dest: 'شرم الشيخ', duration: '5 أيام / 4 ليالي', hotel: 'أجنحة فاخرة', features: ['تزيين الغرفة', 'عشاء رومانسي', 'استقبال VIP'], tag: 'خاص' },
    { title: 'رحلات VIP', dest: 'الغردقة', duration: 'حسب الطلب', hotel: 'أفخم الفنادق', features: ['سيارة خاصة', 'مرشد سياحي', 'يخت خاص'], tag: 'VIP' },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1582650831633-90d23f79391e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1623868222624-817f69468087?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605342416347-190ab7ed184c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622080775837-77cfba17326e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596484552993-80b6a22c544a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534335446059-cb14e08283a0?auto=format&fit=crop&w=800&q=80'
  ];

  const reviews = [
    { name: 'أحمد محمود', text: 'التنظيم كان ممتاز والرحلة كانت رائعة. شكراً لفريق 3M Travel على الاهتمام بالتفاصيل.', rating: 5 },
    { name: 'سارة خالد', text: 'أفضل أسعار حصلت عليها مقارنة بالشركات الأخرى، وفندق الغردقة كان فوق الممتاز.', rating: 5 },
    { name: 'محمد علي', text: 'دعم سريع وتجاوب ممتاز على الواتساب. رحلة دهب كانت مغامرة لا تنسى.', rating: 5 }
  ];

  const filterOptions = ['الكل', 'الأكثر مبيعاً', 'عائلي', 'شبابي', 'VIP', 'عرض خاص'];

  return (
    <div dir="rtl" className="font-sans text-gray-800 antialiased overflow-x-hidden" style={{ fontFamily: "'Cairo', sans-serif" }}>
      
      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <Logo className={`h-10 md:h-12 transition-all duration-300 ${isScrolled ? 'mix-blend-multiply' : 'invert grayscale brightness-200 mix-blend-screen opacity-90'}`} />
          </div>
          <div className={`hidden md:flex items-center gap-8 font-semibold ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            <a href="#destinations" className="hover:text-yellow-400 transition">الوجهات</a>
            <a href="#packages" className="hover:text-yellow-400 transition">الباقات</a>
            <a href="#gallery" className="hover:text-yellow-400 transition">المعرض</a>
            <a href="#reviews" className="hover:text-yellow-400 transition">الآراء</a>
            <button onClick={() => scrollToBooking('', setGlobalFormDestination)} className="bg-[#25D366] hover:bg-[#20b958] text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition shadow-lg">
              <MessageCircle size={18} /> طلب حجز
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} className={isScrolled ? 'text-[#003B73]' : 'text-white'} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#003B73] z-50 flex flex-col p-6 text-white">
          <div className="flex justify-between items-center mb-10">
            <Logo className="h-10 invert grayscale brightness-200 mix-blend-screen" />
            <button onClick={() => setMobileMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-6 text-xl font-semibold">
            <a href="#destinations" onClick={() => setMobileMenuOpen(false)}>الوجهات السياحية</a>
            <a href="#packages" onClick={() => setMobileMenuOpen(false)}>باقات الرحلات</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>معرض الصور</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>تجارب العملاء</a>
            <button onClick={() => { setMobileMenuOpen(false); scrollToBooking('', setGlobalFormDestination); }} className="text-right">طلب حجز سريع</button>
          </div>
          <div className="mt-auto mb-10">
             <a href={getWaLink("مرحباً فريق مبيعات 3M Travel، أحتاج مساعدة.")} target="_blank" rel="noreferrer" className="bg-[#25D366] text-white w-full py-4 rounded-xl flex justify-center items-center gap-2 text-lg font-bold shadow-lg">
              <MessageCircle size={24} /> تواصل معنا واتساب
            </a>
          </div>
        </div>
      )}

      {/* Hero (Marketing 6.0 Integration - Local Videos Can Be Added Here) */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105">
            {/* لتطبيق مهاراتك في صناعة الفيديو، استبدل هذا الرابط بمسار محلي مثل /videos/promo.mp4 */}
            <source src="https://cdn.pixabay.com/video/2020/05/25/40141-425148332_large.mp4" type="video/mp4" />
            <img src="https://images.unsplash.com/photo-1534335446059-cb14e08283a0?auto=format&fit=crop&w=1920&q=80" alt="شواطئ مصر الساحرة" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#003B73]/80 via-[#003B73]/50 to-black/70 pointer-events-none"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white mt-16 md:mt-0">
          <FadeIn>
            <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-4 py-1.5 rounded-full mb-6 text-sm md:text-base">الخيار الأول لرحلاتك في مصر</span>
          </FadeIn>
          <FadeIn delay={150}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">اكتشف أفضل الرحلات <br className="hidden md:block"/> داخل مصر مع 3M Travel</h1>
          </FadeIn>
          <FadeIn delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button onClick={() => scrollToBooking('', setGlobalFormDestination)} className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b958] text-white text-lg font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.4)]">
                <Calendar size={24} /> سجل طلب حجزك الآن
              </button>
              <a href="#destinations" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-lg font-bold py-4 px-8 rounded-full transition-all">استعرض الرحلات</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us - Enhanced USPs */}
      <section className="py-16 bg-[#FAFAEE]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { icon: <Zap size={40}/>, title: 'تأكيد فوري للحجوزات', desc: 'لا وقت للانتظار، خطوات سريعة ومضمونة' },
              { icon: <Shield size={40}/>, title: 'شفافية الأسعار', desc: 'لا توجد أي رسوم خفية أو مفاجآت' },
              { icon: <Headset size={40}/>, title: 'مستشار سياحي خاص', desc: 'دعم على مدار الساعة طوال رحلتك' },
              { icon: <RefreshCw size={40}/>, title: 'مرونة في التعديل', desc: 'خيارات مرنة لتعديل مواعيد الرحلة' },
            ].map((feat, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 h-full">
                  <div className="text-[#003B73] mb-4 bg-blue-50 p-4 rounded-full">{feat.icon}</div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{feat.title}</h3>
                  <p className="text-gray-500 text-sm font-medium">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="أشهر الوجهات السياحية" subtitle="اكتشف سحر الطبيعة المصرية مع باقاتنا المتنوعة" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 flex flex-col h-full">
                  <div className="relative h-60 overflow-hidden">
                    {/* استبدل الروابط الخارجية بمسارات محلية لتفادي أخطاء الـ CORS */}
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                    <h3 className="absolute bottom-4 right-4 text-2xl font-bold text-white">{dest.name}</h3>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 mb-6 flex-grow">{dest.desc}</p>
                    <a href={`#/${dest.id}`} className="w-full bg-white border-2 border-[#003B73] hover:bg-blue-50 text-[#003B73] text-center py-3 rounded-xl font-bold flex items-center justify-center transition">
                      عرض باقات {dest.name}
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 bg-[#f4f7fa]">
        <div className="container mx-auto px-4">
          <SectionHeading title="عروض الباقات الحالية" subtitle="استخدم الفلتر لاختيار الباقة التي تناسب تطلعاتك" />
          <FadeIn>
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
              {filterOptions.map(filter => (
                <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-6 py-2 rounded-full font-bold transition-all ${activeFilter === filter ? 'bg-[#003B73] text-white shadow-lg scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#003B73] hover:text-[#003B73]'}`}>
                  {filter}
                </button>
              ))}
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.filter(pkg => activeFilter === 'الكل' || pkg.tag === activeFilter || pkg.tag.includes(activeFilter)).map((pkg, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-t-4 border-[#003B73] relative h-full flex flex-col">
                  <span className="absolute -top-4 right-6 bg-yellow-400 text-blue-900 text-xs font-black px-3 py-1 rounded-full shadow-md">{pkg.tag}</span>
                  {pkg.tag === 'عرض خاص' && <div className="flex items-center gap-1 text-red-500 text-xs font-bold mt-2 animate-pulse mb-2"><Timer size={14} /> متبقي 3 أماكن فقط!</div>}
                  <h3 className="text-xl font-bold text-[#003B73] mb-4 mt-2">{pkg.title}</h3>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-center gap-3 text-gray-700 font-medium"><Calendar size={18} className="text-[#003B73]" /> {pkg.duration}</li>
                    <li className="flex items-center gap-3 text-gray-700 font-medium"><Star size={18} className="text-[#003B73]" /> {pkg.hotel}</li>
                    <li className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2 font-bold">المميزات:</p>
                      {pkg.features.map((feat, i) => (<div key={i} className="flex items-center gap-2 text-gray-700 text-sm mb-1.5"><CheckCircle size={14} className="text-[#25D366]" /> {feat}</div>))}
                    </li>
                  </ul>
                  <button onClick={() => scrollToBooking(pkg.dest, setGlobalFormDestination)} className="w-full bg-[#003B73] hover:bg-blue-800 text-white text-center py-3.5 rounded-xl font-bold transition flex justify-center items-center gap-2 mt-auto">
                    <ArrowLeft size={18} /> احجز الباقة الآن
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="معرض الصور" subtitle="لقطات من رحلاتنا السابقة وجمال الوجهات السياحية." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {gallery.map((img, idx) => (
              <FadeIn key={idx} delay={idx * 50}>
                <div className="relative h-40 md:h-64 overflow-hidden rounded-lg cursor-pointer group" onClick={() => setLightboxImg(img)}>
                  <img src={img} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Camera size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 text-white bg-white/20 p-2 rounded-full hover:bg-white/40 transition"><X size={24} /></button>
          <img src={lightboxImg} alt="Preview" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-[#003B73] text-white">
        <div className="container mx-auto px-4">
          <SectionHeading title={<span className="text-white">آراء عملائنا</span>} subtitle={<span className="text-gray-300">نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل تجربة سياحية.</span>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative">
                  <div className="flex text-yellow-400 mb-4">{[...Array(rev.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}</div>
                  <p className="text-lg mb-6 leading-relaxed font-medium text-gray-100">"{rev.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">{rev.name.charAt(0)}</div>
                    <div><h4 className="font-bold">{rev.name}</h4><span className="text-sm text-gray-400">عميل 3M Travel</span></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Main Booking Form */}
      <section id="booking" className="py-20 bg-[#FAFAEE]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#003B73] mb-3">طلب حجز سريع</h2>
              <p className="text-gray-600">سجل بياناتك وسيتم توجيهك لفريق المبيعات لتأكيد الحجز.</p>
            </div>
            <BookingForm prefilledDestination={globalFormDestination} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-right">
            <div>
              <Logo className="h-16 mb-6 mx-auto md:mx-0 invert grayscale brightness-200 mix-blend-screen opacity-80" />
              <p className="text-gray-400 leading-relaxed mb-6">
                نقدم أفضل البرامج السياحية داخل مصر بأعلى معايير الجودة والاحترافية لضمان راحة وسعادة عملائنا.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#003B73] hover:text-white transition"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#003B73] hover:text-white transition"><Instagram size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white text-xl font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3 inline-block text-right">
                <li><a href="#destinations" className="hover:text-yellow-400 transition flex items-center gap-2"><ArrowLeft size={16}/> الوجهات السياحية</a></li>
                <li><a href="#packages" className="hover:text-yellow-400 transition flex items-center gap-2"><ArrowLeft size={16}/> باقات الرحلات</a></li>
                <li><button onClick={() => scrollToBooking('', setGlobalFormDestination)} className="hover:text-yellow-400 transition flex items-center gap-2"><ArrowLeft size={16}/> طلب حجز</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xl font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-4 inline-block text-right">
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-yellow-400" />
                  <span dir="ltr" className="font-semibold">{CONFIG.PHONE_DISPLAY}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-yellow-400" />
                  <span>info@3mtravel.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={20} className="text-yellow-400" />
                  <span>العاشر من رمضان</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm font-medium">
            جميع الحقوق محفوظة © {new Date().getFullYear()} - 3M Travel
          </div>
        </div>
      </footer>

      {/* Dynamic Floating WhatsApp Button - Home Page Context */}
      <a href={getWaLink("مرحباً فريق 3M Travel، أحتاج لمساعدة في اختيار رحلتي القادمة.")} target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center group">
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">تواصل معنا المبيعات</span>
      </a>
    </div>
  );
}

// --- Isolated Booking Form Component (With Strict Validation - Marketing 5.0) ---
function BookingForm({ prefilledDestination }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', destination: '', pax: '', date: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync prop changes (Auto-fill)
  useEffect(() => {
    if (prefilledDestination) {
      setFormData(prev => ({ ...prev, destination: prefilledDestination }));
    }
  }, [prefilledDestination]);

  const generateWaMessage = () => {
    return `مرحباً فريق مبيعات 3M Travel،\nأرغب في تأكيد حجز جديد:\n- الاسم: ${formData.name}\n- الوجهة: ${formData.destination}\n- الأفراد: ${formData.pax}\n- التاريخ: ${formData.date}\nبرجاء التأكيد.`;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'يجب إدخال 3 أحرف على الأقل.';
    }
    if (!formData.phone || !/^\d{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'برجاء إدخال رقم هاتف صحيح.';
    }
    if (!formData.destination) {
      newErrors.destination = 'برجاء اختيار الوجهة.';
    }
    if (!formData.pax || formData.pax < 1 || formData.pax > 100) {
      newErrors.pax = 'برجاء إدخال عدد صحيح (1 - 100).';
    }
    if (!formData.date) {
      newErrors.date = 'برجاء تحديد تاريخ الرحلة.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const waMessage = generateWaMessage();
    setIsSubmitted(true);
    
    // Marketing 4.0: Seamless Handoff
    setTimeout(() => { window.location.href = getWaLink(waMessage); }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={40} className="text-green-500" /></div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">تم تجهيز طلبك بنجاح!</h3>
        <p className="text-gray-600 mb-8 text-lg">سيتم توجيهك الآن إلى واتساب لإرسال التفاصيل.<br/> إذا لم يتم التوجيه، يرجى الضغط أدناه:</p>
        <a href={getWaLink(generateWaMessage())} className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white font-bold py-4 px-8 rounded-xl transition shadow-lg w-full md:w-auto justify-center">
          <MessageCircle size={24} /> إرسال التفاصيل عبر واتساب
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-right">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">الاسم بالكامل</label>
          <input 
            type="text" name="name" value={formData.name} onChange={handleChange} 
            className={`w-full border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#003B73]'} rounded-xl p-3.5 focus:ring-2 focus:border-transparent outline-none transition bg-gray-50`} 
            placeholder="أدخل اسمك" 
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">رقم الهاتف</label>
          <input 
            type="tel" name="phone" value={formData.phone} onChange={handleChange} dir="ltr" 
            className={`w-full border ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#003B73]'} rounded-xl p-3.5 focus:ring-2 focus:border-transparent outline-none transition bg-gray-50 text-right`} 
            placeholder="010xxxxxxxxx" 
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-2">الوجهة (يتم اختيارها تلقائياً)</label>
        <select 
          name="destination" value={formData.destination} onChange={handleChange} 
          className={`w-full border ${errors.destination ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#003B73]'} rounded-xl p-3.5 focus:ring-2 focus:border-transparent outline-none transition bg-gray-50 font-bold text-[#003B73]`}
        >
          <option value="">اختر الوجهة</option>
          <option value="شرم الشيخ">شرم الشيخ</option>
          <option value="الغردقة">الغردقة</option>
          <option value="دهب">دهب</option>
          <option value="مرسى مطروح">مرسى مطروح</option>
          <option value="العين السخنة">العين السخنة</option>
        </select>
        {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">عدد الأشخاص</label>
          <input 
            type="number" min="1" max="100" name="pax" value={formData.pax} onChange={handleChange} 
            className={`w-full border ${errors.pax ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#003B73]'} rounded-xl p-3.5 focus:ring-2 focus:border-transparent outline-none transition bg-gray-50`} 
            placeholder="عدد الأفراد" 
          />
          {errors.pax && <p className="text-red-500 text-sm mt-1">{errors.pax}</p>}
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">تاريخ الرحلة المقترح</label>
          <input 
            type="date" min={today} name="date" value={formData.date} onChange={handleChange} 
            className={`w-full border ${errors.date ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-[#003B73]'} rounded-xl p-3.5 focus:ring-2 focus:border-transparent outline-none transition bg-gray-50`} 
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
      </div>
      <button type="submit" className="w-full bg-[#003B73] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition text-lg mt-4 flex justify-center items-center gap-2">
         تأكيد وتحويل لواتساب <ArrowLeft size={20} />
      </button>
    </form>
  );
}
