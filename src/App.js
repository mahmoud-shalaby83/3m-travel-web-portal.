import React, { useState, useEffect, useRef } from 'react';
import {
  MessageCircle,
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  Star,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Camera,
  ArrowLeft,
} from 'lucide-react';

// --- Configuration & Constants ---
const WA_NUMBER = '201226292894'; // Updated number format for WhatsApp API
const BRAND_COLORS = {
  blue: '#003B73',
  sand: '#F5F5DC',
  lightSand: '#FAFAEE',
};

const getWaLink = (message) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

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

// --- Reusable Components ---
const SectionHeading = ({ title, subtitle }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`text-center mb-12 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-[#003B73] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="w-24 h-1 bg-[#003B73] mx-auto mt-6 rounded-full"></div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Page Data ---
const PAGE_DATA = {
  'sharm-el-sheikh-trip': {
    title: 'رحلات شرم الشيخ',
    heroImg:
      'https://images.unsplash.com/photo-1582650831633-90d23f79391e?auto=format&fit=crop&w=1920&q=80',
    desc: 'اكتشف سحر شرم الشيخ، مدينة السلام. استمتع بأفضل الفنادق، الشعاب المرجانية، والرحلات البحرية الرائعة.',
    packages: [
      {
        title: 'عرض فندق مارينا شرم',
        duration: '4 أيام / 3 ليالي',
        hotel: 'فندق مارينا شرم',
        features: [
          'موقع ممتاز بخليج نعمة',
          'نصف إقامة (إفطار وعشاء)',
          'انتقالات ذهاب وعودة',
        ],
        tag: 'عرض خاص',
      },
      {
        title: 'شرم الشيخ 4 أيام',
        duration: '4 أيام / 3 ليالي',
        hotel: 'فنادق 4 و 5 نجوم',
        features: ['انتقالات ذهاب وعودة', 'وجبات شاملة', 'رحلة بحرية مجانية'],
        tag: 'الأكثر مبيعاً',
      },
      {
        title: 'شرم الشيخ VIP',
        duration: '5 أيام / 4 ليالي',
        hotel: 'فنادق 5 نجوم ديلوكس',
        features: ['سيارة خاصة', 'غرف مطلة على البحر', 'عشاء رومانسي'],
        tag: 'VIP',
      },
    ],
  },
  'hurghada-trip': {
    title: 'رحلات الغردقة',
    heroImg:
      'https://images.unsplash.com/photo-1623868222624-817f69468087?auto=format&fit=crop&w=1920&q=80',
    desc: 'الغردقة، عاصمة البحر الأحمر. مثالية للعائلات وعشاق الأكوا بارك والرحلات الاستكشافية الممتعة.',
    packages: [
      {
        title: 'الغردقة العائلية',
        duration: '4 أيام / 3 ليالي',
        hotel: 'فنادق 5 نجوم',
        features: ['أكوا بارك ضخمة', 'إقامة كاملة', 'رحلة سفاري'],
        tag: 'عائلي',
      },
      {
        title: 'الغردقة اقتصادية',
        duration: '3 أيام / 2 ليالي',
        hotel: 'فنادق 3 و 4 نجوم',
        features: ['انتقالات', 'نصف إقامة', 'رحلة جزر'],
        tag: 'توفير',
      },
    ],
  },
  'dahab-trip': {
    title: 'رحلات دهب',
    heroImg:
      'https://images.unsplash.com/photo-1605342416347-190ab7ed184c?auto=format&fit=crop&w=1920&q=80',
    desc: 'ملاذ المغامرين والباحثين عن الهدوء. تجربة فريدة بين الغطس في البلو هول والسفاري الجبلية.',
    packages: [
      {
        title: 'دهب مغامرات',
        duration: '3 أيام / 2 ليالي',
        hotel: 'كامبات وفنادق',
        features: ['غطس في البلو هول', 'سفاري وادي الوشواش', 'سهرة بدوية'],
        tag: 'شبابي',
      },
      {
        title: 'دهب استجمام',
        duration: '4 أيام / 3 ليالي',
        hotel: 'فنادق 4 نجوم',
        features: ['إفطار', 'غرف مطلة على البحر', 'يوجا'],
        tag: 'استرخاء',
      },
    ],
  },
  'matrouh-trip': {
    title: 'رحلات مرسى مطروح',
    heroImg:
      'https://images.unsplash.com/photo-1622080775837-77cfba17326e?auto=format&fit=crop&w=1920&q=80',
    desc: 'مالديف مصر. استمتع بالمياه الفيروزية والرمال البيضاء الناعمة في أجواء عائلية مميزة.',
    packages: [
      {
        title: 'مطروح الصيفية',
        duration: '5 أيام / 4 ليالي',
        hotel: 'شقق فندقية وفنادق',
        features: ['قريب من الشاطئ', 'مواصلات داخلية', 'رحلة لشاطئ عجيبة'],
        tag: 'صيفي',
      },
    ],
  },
  'sokhna-trip': {
    title: 'رحلات العين السخنة',
    heroImg:
      'https://images.unsplash.com/photo-1596484552993-80b6a22c544a?auto=format&fit=crop&w=1920&q=80',
    desc: 'أقرب منتجعات البحر الأحمر للقاهرة، استجمام سريع ومريح في عطلات نهاية الأسبوع.',
    packages: [
      {
        title: 'ويك إند السخنة',
        duration: 'يومين / ليلة',
        hotel: 'فنادق 4 نجوم',
        features: ['شاطئ رملي', 'حمامات سباحة دافئة', 'إفطار وعشاء'],
        tag: 'سريع',
      },
    ],
  },
};

// --- Destination Page Component ---
const DestinationPage = ({ route, goBack }) => {
  const data = PAGE_DATA[route];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  if (!data)
    return (
      <div className="p-20 text-center text-xl font-bold mt-20">
        عذراً، الوجهة غير متوفرة حالياً.{' '}
        <button
          onClick={goBack}
          className="text-blue-600 underline block mt-4 mx-auto"
        >
          العودة للرئيسية
        </button>
      </div>
    );

  return (
    <div
      dir="rtl"
      className="font-sans text-gray-800 antialiased"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      {/* Navbar */}
      <nav className="fixed w-full z-40 bg-white shadow-md py-4">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[#003B73] font-bold hover:text-yellow-500 transition"
          >
            <ArrowLeft size={20} /> العودة للرئيسية
          </button>
          <img
            src="WhatsApp Image 2026-02-12 at 7.07.38 PM.jpeg"
            alt="3M Travel"
            className="h-10 md:h-12 w-auto object-contain mix-blend-multiply"
          />
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImg}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              {data.title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200">
              {data.desc}
            </p>
            <a
              href={getWaLink(`مرحباً، أود الاستفسار عن ${data.title}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white text-lg font-bold py-3 px-8 rounded-full transition shadow-lg"
            >
              <MessageCircle size={24} /> احجز الآن عبر واتساب
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-[#f4f7fa]">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={`باقات ${data.title}`}
            subtitle="اختر العرض الأنسب لاحتياجاتك"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.packages.map((pkg, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-t-4 border-[#003B73] relative h-full flex flex-col">
                  <span className="absolute -top-4 right-6 bg-yellow-400 text-blue-900 text-xs font-black px-3 py-1 rounded-full shadow-md">
                    {pkg.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#003B73] mb-4 mt-2">
                    {pkg.title}
                  </h3>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                      <Calendar size={18} className="text-[#003B73]" />{' '}
                      {pkg.duration}
                    </li>
                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                      <Star size={18} className="text-[#003B73]" /> {pkg.hotel}
                    </li>
                    <li className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2 font-bold">
                        مميزات الرحلة:
                      </p>
                      {pkg.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-gray-700 text-sm mb-1.5"
                        >
                          <CheckCircle size={14} className="text-[#25D366]" />{' '}
                          {feat}
                        </div>
                      ))}
                    </li>
                  </ul>
                  <a
                    href={getWaLink(`مرحباً، أريد حجز باقة: ${pkg.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#003B73] hover:bg-blue-800 text-white text-center py-3.5 rounded-xl font-bold transition flex justify-center items-center gap-2 mt-auto"
                  >
                    <MessageCircle size={18} /> تأكيد الحجز واتساب
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Fast Booking for this specific destination */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-[#FAFAEE] rounded-3xl shadow-xl p-8 border border-gray-100">
            <SectionHeading
              title="طلب حجز سريع"
              subtitle="سجل بياناتك وسيتم التواصل معك فوراً"
            />
            <BookingForm
              prefilledDestination={data.title.replace('رحلات ', '')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Inject Cairo font
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.head.removeChild(link);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle Routing Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        // إذا كان الرابط يبدأ بـ #/ فهو مسار لصفحة فرعية
        setCurrentRoute(hash.replace('#/', ''));
      } else {
        // إذا كان # فقط أو فارغاً، فهو تمرير داخل الصفحة الرئيسية
        setCurrentRoute('/');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Execute on initial mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Early return for sub-pages
  if (currentRoute !== '/' && currentRoute !== '') {
    return (
      <DestinationPage
        route={currentRoute}
        goBack={() => {
          window.location.hash = '';
        }}
      />
    );
  }

  // --- Data ---
  const destinations = [
    {
      id: 'sharm-el-sheikh-trip',
      name: 'شرم الشيخ',
      img: 'https://images.unsplash.com/photo-1582650831633-90d23f79391e?auto=format&fit=crop&w=600&q=80',
      desc: 'مدينة السلام والجمال، حيث الشواطئ الساحرة والشعاب المرجانية.',
    },
    {
      id: 'hurghada-trip',
      name: 'الغردقة',
      img: 'https://images.unsplash.com/photo-1623868222624-817f69468087?auto=format&fit=crop&w=600&q=80',
      desc: 'عاصمة السحر والجمال بالبحر الأحمر، مثالية للغطس والرحلات البحرية.',
    },
    {
      id: 'dahab-trip',
      name: 'دهب',
      img: 'https://images.unsplash.com/photo-1605342416347-190ab7ed184c?auto=format&fit=crop&w=600&q=80',
      desc: 'ملاذ الباحثين عن الهدوء والمغامرة بين الجبال والبحر.',
    },
    {
      id: 'matrouh-trip',
      name: 'مرسى مطروح',
      img: 'https://images.unsplash.com/photo-1622080775837-77cfba17326e?auto=format&fit=crop&w=600&q=80',
      desc: 'شواطئ برمال بيضاء ومياه فيروزية لا مثيل لها.',
    },
    {
      id: 'sokhna-trip',
      name: 'العين السخنة',
      img: 'https://images.unsplash.com/photo-1596484552993-80b6a22c544a?auto=format&fit=crop&w=600&q=80',
      desc: 'أقرب منتجعات البحر الأحمر للقاهرة، استجمام سريع ومريح.',
    },
  ];

  const packages = [
    {
      title: 'عرض فندق مارينا شرم',
      duration: '4 أيام / 3 ليالي',
      hotel: 'مارينا شرم (خليج نعمة)',
      features: ['إطلالة مباشرة على البحر', 'نصف إقامة', 'موقع استراتيجي'],
      tag: 'عرض خاص',
    },
    {
      title: 'رحلات شرم الشيخ',
      duration: '4 أيام / 3 ليالي',
      hotel: 'فنادق 4 و 5 نجوم',
      features: ['انتقالات ذهاب وعودة', 'وجبات شاملة', 'رحلة بحرية مجانية'],
      tag: 'الأكثر مبيعاً',
    },
    {
      title: 'رحلات الغردقة',
      duration: '4 أيام / 3 ليالي',
      hotel: 'فنادق 5 نجوم',
      features: ['أكوا بارك', 'إقامة كاملة', 'رحلة سفاري'],
      tag: 'عائلي',
    },
    {
      title: 'رحلات دهب مغامرات',
      duration: '3 أيام / 2 ليالي',
      hotel: 'كامبات وفنادق',
      features: ['غطس في البلو هول', 'سفاري وادي الوشواش', 'سهرة بدوية'],
      tag: 'شبابي',
    },
    {
      title: 'رحلات شهر عسل',
      duration: '5 أيام / 4 ليالي',
      hotel: 'أجنحة فاخرة',
      features: ['تزيين الغرفة', 'عشاء رومانسي', 'استقبال VIP'],
      tag: 'خاص',
    },
    {
      title: 'رحلات VIP',
      duration: 'حسب الطلب',
      hotel: 'أفخم الفنادق',
      features: ['سيارة خاصة', 'مرشد سياحي', 'يخت خاص'],
      tag: 'VIP',
    },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1582650831633-90d23f79391e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1623868222624-817f69468087?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605342416347-190ab7ed184c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622080775837-77cfba17326e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596484552993-80b6a22c544a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534335446059-cb14e08283a0?auto=format&fit=crop&w=800&q=80',
  ];

  const reviews = [
    {
      name: 'أحمد محمود',
      text: 'التنظيم كان ممتاز والرحلة كانت رائعة. شكراً لفريق 3M Travel على الاهتمام بالتفاصيل.',
      rating: 5,
    },
    {
      name: 'سارة خالد',
      text: 'أفضل أسعار حصلت عليها مقارنة بالشركات الأخرى، وفندق الغردقة كان فوق الممتاز.',
      rating: 5,
    },
    {
      name: 'محمد علي',
      text: 'دعم سريع وتجاوب ممتاز على الواتساب. رحلة دهب كانت مغامرة لا تنسى.',
      rating: 5,
    },
  ];

  return (
    <div
      dir="rtl"
      className="font-sans text-gray-800 antialiased overflow-x-hidden"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      {/* --- Sticky Navbar --- */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="WhatsApp Image 2026-02-12 at 7.07.38 PM.jpeg"
              alt="3M Travel"
              className={`h-10 md:h-12 w-auto object-contain transition-all duration-300 ${
                isScrolled
                  ? 'mix-blend-multiply'
                  : 'invert grayscale brightness-200 mix-blend-screen opacity-90'
              }`}
            />
          </div>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex items-center gap-8 font-semibold ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            <a
              href="#destinations"
              className="hover:text-yellow-400 transition"
            >
              الوجهات
            </a>
            <a href="#packages" className="hover:text-yellow-400 transition">
              باقات الرحلات
            </a>
            <a href="#reviews" className="hover:text-yellow-400 transition">
              آراء العملاء
            </a>
            <a
              href={getWaLink('مرحباً، أريد الاستفسار عن عروض الرحلات.')}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20b958] text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition shadow-lg"
            >
              <MessageCircle size={18} />
              احجز عبر واتساب
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu
              size={28}
              className={isScrolled ? 'text-[#003B73]' : 'text-white'}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#003B73] z-50 flex flex-col p-6 text-white">
          <div className="flex justify-between items-center mb-10">
            <img
              src="WhatsApp Image 2026-02-12 at 7.07.38 PM.jpeg"
              alt="3M Travel"
              className="h-10 w-auto object-contain invert grayscale brightness-200 mix-blend-screen"
            />
            <button onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-6 text-xl font-semibold">
            <a href="#destinations" onClick={() => setMobileMenuOpen(false)}>
              الوجهات السياحية
            </a>
            <a href="#packages" onClick={() => setMobileMenuOpen(false)}>
              باقات وعروض الرحلات
            </a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>
              تجارب العملاء
            </a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)}>
              طلب حجز سريع
            </a>
          </div>
          <div className="mt-auto mb-10">
            <a
              href={getWaLink('مرحباً، أريد الاستفسار عن عروض الرحلات.')}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white w-full py-4 rounded-xl flex justify-center items-center gap-2 text-lg font-bold shadow-lg"
            >
              <MessageCircle size={24} />
              تواصل معنا واتساب
            </a>
          </div>
        </div>
      )}

      {/* --- Hero Section --- */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534335446059-cb14e08283a0?auto=format&fit=crop&w=1920&q=80"
            alt="شواطئ مصر الساحرة"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003B73]/80 via-[#003B73]/60 to-black/70"></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center text-white mt-16 md:mt-0">
          <FadeIn>
            <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-4 py-1.5 rounded-full mb-6 text-sm md:text-base">
              الخيار الأول لرحلاتك في مصر
            </span>
          </FadeIn>
          <FadeIn delay={150}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              اكتشف أفضل الرحلات <br className="hidden md:block" /> داخل مصر مع
              3M Travel
            </h1>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-lg md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto font-medium">
              رحلات منظمة إلى شرم الشيخ – الغردقة – دهب – مرسى مطروح – العين
              السخنة
            </p>
          </FadeIn>

          <FadeIn delay={450}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href={getWaLink('مرحباً، أريد حجز رحلة مع 3M Travel.')}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b958] text-white text-lg font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(37,211,102,0.4)]"
              >
                <MessageCircle size={24} />
                احجز الآن عبر واتساب
              </a>
              <a
                href="#destinations"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-lg font-bold py-4 px-8 rounded-full transition-all"
              >
                استعرض الرحلات
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={600}>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-yellow-400" /> تنظيم
                احترافي
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-yellow-400" /> أفضل أسعار
                الفنادق
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-yellow-400" /> دعم مباشر
                عبر واتساب
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block text-white/70">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* --- Why Choose Us (Features) --- */}
      <section className="py-16 bg-[#FAFAEE]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { icon: <MapPin size={40} />, title: 'رحلات منظمة بالكامل' },
              { icon: <Star size={40} />, title: 'أفضل أسعار الفنادق' },
              { icon: <Users size={40} />, title: 'خبرة في تنظيم الرحلات' },
              { icon: <Phone size={40} />, title: 'دعم سريع عبر واتساب' },
            ].map((feat, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100 h-full">
                  <div className="text-[#003B73] mb-4 bg-blue-50 p-4 rounded-full">
                    {feat.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {feat.title}
                  </h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Destinations Section --- */}
      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="أشهر الوجهات السياحية"
            subtitle="اكتشف سحر الطبيعة المصرية مع باقاتنا المتنوعة المصممة خصيصاً لراحتك."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 flex flex-col h-full">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                    <h3 className="absolute bottom-4 right-4 text-2xl font-bold text-white">
                      {dest.name}
                    </h3>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 mb-6 flex-grow">{dest.desc}</p>
                    <div className="flex flex-col gap-3 mt-auto">
                      <a
                        href={`#/${dest.id}`}
                        className="w-full bg-white border-2 border-[#003B73] hover:bg-blue-50 text-[#003B73] text-center py-3 rounded-xl font-bold flex items-center justify-center transition"
                      >
                        عرض تفاصيل الوجهة
                      </a>
                      <a
                        href={getWaLink(
                          `مرحباً، أود معرفة تفاصيل أكثر عن رحلات ${dest.name}.`
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#20b958] text-white text-center py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                      >
                        <MessageCircle size={20} /> احجز عبر واتساب
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Featured Packages Section --- */}
      <section id="packages" className="py-20 bg-[#f4f7fa]">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="باقات وعروض الرحلات"
            subtitle="اختر الباقة التي تناسبك واستمتع بتجربة سياحية متكاملة بأفضل الأسعار."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-t-4 border-[#003B73] relative h-full flex flex-col">
                  <span className="absolute -top-4 right-6 bg-yellow-400 text-blue-900 text-xs font-black px-3 py-1 rounded-full shadow-md">
                    {pkg.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#003B73] mb-4 mt-2">
                    {pkg.title}
                  </h3>

                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                      <Calendar size={18} className="text-[#003B73]" />{' '}
                      {pkg.duration}
                    </li>
                    <li className="flex items-center gap-3 text-gray-700 font-medium">
                      <Star size={18} className="text-[#003B73]" /> {pkg.hotel}
                    </li>
                    <li className="pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-2 font-bold">
                        مميزات الرحلة:
                      </p>
                      {pkg.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-gray-700 text-sm mb-1.5"
                        >
                          <CheckCircle size={14} className="text-[#25D366]" />{' '}
                          {feat}
                        </div>
                      ))}
                    </li>
                  </ul>

                  <a
                    href={getWaLink(`مرحباً، أريد حجز باقة: ${pkg.title}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#003B73] hover:bg-blue-800 text-white text-center py-3.5 rounded-xl font-bold transition flex justify-center items-center gap-2 mt-auto"
                  >
                    <MessageCircle size={18} /> احجز الآن عبر واتساب
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Photo Gallery --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="معرض الصور"
            subtitle="لقطات من رحلاتنا السابقة وجمال الوجهات السياحية."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {gallery.map((img, idx) => (
              <FadeIn key={idx} delay={idx * 50}>
                <div
                  className="relative h-40 md:h-64 overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => setLightboxImg(img)}
                >
                  <img
                    src={img}
                    alt="Gallery"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Camera
                      size={32}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxImg(null)}
        >
          <button className="absolute top-6 right-6 text-white bg-white/20 p-2 rounded-full hover:bg-white/40 transition">
            <X size={24} />
          </button>
          <img
            src={lightboxImg}
            alt="Preview"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* --- Social Proof (Reviews) --- */}
      <section id="reviews" className="py-20 bg-[#003B73] text-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={<span className="text-white">آراء عملائنا</span>}
            subtitle={
              <span className="text-gray-300">
                نفتخر بثقة عملائنا ونسعى دائماً لتقديم أفضل تجربة سياحية.
              </span>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <FadeIn key={idx} delay={idx * 100}>
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed font-medium text-gray-100">
                    "{rev.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{rev.name}</h4>
                      <span className="text-sm text-gray-400">
                        عميل 3M Travel
                      </span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- Fast Booking Form --- */}
      <section id="booking" className="py-20 bg-[#FAFAEE]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#003B73] mb-3">
                طلب حجز سريع
              </h2>
              <p className="text-gray-600">
                سجل بياناتك الآن وسيقوم فريقنا بالتواصل معك لتأكيد الحجز.
              </p>
            </div>

            <BookingForm />
          </div>
        </div>
      </section>

      {/* --- Final CTA Section --- */}
      <section className="py-24 bg-gradient-to-r from-[#003B73] to-[#00509E] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              جاهز لرحلتك القادمة؟
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              لا تفوت الفرصة، تواصل معنا الآن لمعرفة أحدث العروض والخصومات
              الحصرية.
            </p>
            <a
              href={getWaLink('مرحباً، أريد الاستفسار عن رحلات 3M Travel.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20b958] text-white text-xl font-bold py-5 px-10 rounded-full transition-transform hover:scale-105 shadow-[0_0_30px_rgba(37,211,102,0.5)]"
            >
              <MessageCircle size={28} />
              تواصل معنا الآن عبر واتساب
            </a>
          </FadeIn>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div>
              <img
                src="WhatsApp Image 2026-02-12 at 7.07.38 PM.jpeg"
                alt="3M Travel"
                className="h-16 w-auto mb-6 object-contain invert grayscale brightness-200 mix-blend-screen opacity-80"
              />
              <p className="text-gray-400 leading-relaxed mb-6">
                نقدم أفضل البرامج السياحية داخل مصر بأعلى معايير الجودة
                والاحترافية لضمان راحة وسعادة عملائنا.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#003B73] hover:text-white transition"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#003B73] hover:text-white transition"
                >
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-xl font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#destinations"
                    className="hover:text-yellow-400 transition flex items-center gap-2"
                  >
                    <ArrowLeft size={16} /> الوجهات السياحية
                  </a>
                </li>
                <li>
                  <a
                    href="#packages"
                    className="hover:text-yellow-400 transition flex items-center gap-2"
                  >
                    <ArrowLeft size={16} /> باقات الرحلات
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    className="hover:text-yellow-400 transition flex items-center gap-2"
                  >
                    <ArrowLeft size={16} /> آراء العملاء
                  </a>
                </li>
                <li>
                  <a
                    href="#booking"
                    className="hover:text-yellow-400 transition flex items-center gap-2"
                  >
                    <ArrowLeft size={16} /> طلب حجز
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xl font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone size={20} className="text-yellow-400 mt-1" />
                  <span dir="ltr" className="font-semibold">
                    002 01226292894
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={20} className="text-yellow-400 mt-1" />
                  <span>info@3mtravel.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-yellow-400 mt-1" />
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

      {/* --- Sticky WhatsApp Button --- */}
      <a
        href={getWaLink('مرحباً، أريد الاستفسار عن رحلات 3M Travel.')}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden md:block">
          تواصل معنا الآن!
        </span>
      </a>
    </div>
  );
}

// --- Isolated Booking Form Component ---
function BookingForm({ prefilledDestination = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    destination: prefilledDestination,
    pax: '',
    date: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. تجميع البيانات بصيغة JSON (لإرسالها لاحقاً لـ CRM أو Google Sheets)
    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    };

    // مثال لربط مستقبلي مع Webhook:
    // fetch('YOUR_WEBHOOK_URL', { method: 'POST', body: JSON.stringify(payload) });

    // 2. هندسة الـ Prompt الخاص برسالة الواتساب ليكون احترافياً ومفصلاً
    const waMessage = `مرحباً فريق مبيعات 3M Travel،
أرغب في تأكيد حجز جديد بالتفاصيل التالية:
- الاسم: ${formData.name}
- الوجهة: ${formData.destination}
- عدد الأفراد: ${formData.pax}
- التاريخ المقترح: ${formData.date}
برجاء التواصل معي لتأكيد الترتيبات.`;

    // 3. فتح الواتساب وإظهار رسالة النجاح
    window.open(getWaLink(waMessage), '_blank');
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          تم استلام طلبك بنجاح!
        </h3>
        <p className="text-gray-600 mb-8 text-lg">
          سيقوم أحد ممثلي خدمة العملاء بالتواصل معك قريباً.
          <br /> يمكنك أيضاً التواصل مباشرة عبر واتساب لتأكيد الحجز فوراً.
        </p>
        <a
          href={getWaLink(
            `مرحباً، قمت بتسجيل طلب حجز باسم ${formData.name} وأريد التأكيد.`
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b958] text-white font-bold py-4 px-8 rounded-xl transition shadow-lg w-full md:w-auto justify-center"
        >
          <MessageCircle size={24} />
          تأكيد الحجز عبر واتساب
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            الاسم بالكامل
          </label>
          <input
            required
            type="text"
            name="name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-[#003B73] focus:border-transparent outline-none transition bg-gray-50"
            placeholder="أدخل اسمك"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            رقم الهاتف (يفضل واتساب)
          </label>
          <input
            required
            type="tel"
            name="phone"
            onChange={handleChange}
            dir="ltr"
            className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-[#003B73] focus:border-transparent outline-none transition bg-gray-50 text-right"
            placeholder="010xxxxxxxxx"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-2">
          الوجهة المطلوبة
        </label>
        <select
          required
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-[#003B73] focus:border-transparent outline-none transition bg-gray-50"
        >
          <option value="">اختر الوجهة</option>
          <option value="شرم الشيخ">شرم الشيخ</option>
          <option value="الغردقة">الغردقة</option>
          <option value="دهب">دهب</option>
          <option value="مرسى مطروح">مرسى مطروح</option>
          <option value="العين السخنة">العين السخنة</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            عدد الأشخاص
          </label>
          <input
            required
            type="number"
            min="1"
            name="pax"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-[#003B73] focus:border-transparent outline-none transition bg-gray-50"
            placeholder="عدد الأفراد"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            تاريخ الرحلة المقترح
          </label>
          <input
            required
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-[#003B73] focus:border-transparent outline-none transition bg-gray-50"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#003B73] hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition text-lg mt-4"
      >
        إرسال طلب الحجز
      </button>

      <div className="text-center pt-4">
        <p className="text-gray-500 mb-3 text-sm font-medium">
          أو احجز مباشرة وبشكل أسرع عبر واتساب
        </p>
        <a
          href={getWaLink('مرحباً، أريد تسجيل طلب حجز مباشر.')}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-[#25D366] font-bold hover:text-[#1da851] transition"
        >
          <MessageCircle size={20} />
          تواصل مع المبيعات الآن
        </a>
      </div>
    </form>
  );
}
