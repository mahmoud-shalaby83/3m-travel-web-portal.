import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, MapPin, Calendar, Users, 
  CheckCircle, Star, ChevronDown, Menu, X, 
  Phone, Mail, Instagram, Facebook, Camera,
  ArrowLeft, Timer, Zap, Shield, Headset, RefreshCw
} from 'lucide-react';

// --- الإعدادات والروابط الأساسية ---
const WA_NUMBER = "201226292894";
const getWaLink = (message) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

// --- روابط الصور الاحترافية للوجهات (Stock Photos) ---
const IMAGES = {
  sharm: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
  hurghada: "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=80",
  dahab: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1200&q=80",
  matrouh: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=80",
  sokhna: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=1200&q=80",
  hero_fallback: "https://images.unsplash.com/photo-1506929197327-040b396e9596?auto=format&fit=crop&w=1920&q=80"
};

// --- Custom Hooks ---
const useScrollReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

// --- المكونات القابلة لإعادة الاستخدام ---
const SectionHeading = ({ title, subtitle }) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={`text-center mb-12 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-[#003B73] mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>}
      <div className="w-24 h-1 bg-[#003B73] mx-auto mt-6 rounded-full"></div>
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

const scrollToBooking = (destinationName, setGlobalDestination) => {
  setGlobalDestination(destinationName);
  const element = document.getElementById('booking');
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

// --- بيانات الوجهات (مكتملة بالصور) ---
const PAGE_DATA = {
  'sharm-el-sheikh-trip': {
    title: 'رحلات شرم الشيخ', destinationValue: 'شرم الشيخ', heroImg: IMAGES.sharm,
    desc: 'مدينة السلام والجمال، حيث تلتقي الجبال بمياه البحر الأحمر الصافية.',
    packages: [
      { title: 'عرض مارينا شرم', duration: '4 أيام / 3 ليالي', hotel: 'فندق مارينا شرم', features: ['موقع ممتاز بخليج نعمة', 'نصف إقامة', 'انتقالات ذهاب وعودة'], tag: 'عرض خاص' },
      { title: 'شرم الشيخ VIP', duration: '5 أيام', hotel: 'فنادق 5 نجوم', features: ['سيارة خاصة', 'غرفة مطلة على البحر', 'عشاء رومانسي'], tag: 'VIP' }
    ]
  },
  'hurghada-trip': {
    title: 'رحلات الغردقة', destinationValue: 'الغردقة', heroImg: IMAGES.hurghada,
    desc: 'عاصمة السحر والجمال، الوجهة المثالية للعائلات وعشاق الألعاب المائية.',
    packages: [
      { title: 'الغردقة العائلية', duration: '4 أيام', hotel: 'منتجعات أكوا بارك', features: ['إقامة شاملة', 'رحلة سفاري', 'ألعاب مائية'], tag: 'عائلي' }
    ]
  },
  'dahab-trip': { title: 'رحلات دهب', destinationValue: 'دهب', heroImg: IMAGES.dahab, desc: 'ملاذ المغامرين والباحثين عن الهدوء بين الجبال والبحر.' },
  'matrouh-trip': { title: 'رحلات مرسى مطروح', destinationValue: 'مرسى مطروح', heroImg: IMAGES.matrouh, desc: 'شواطئ برمال بيضاء ومياه فيروزية لا مثيل لها.' },
  'sokhna-trip': { title: 'رحلات العين السخنة', destinationValue: 'العين السخنة', heroImg: IMAGES.sokhna, desc: 'أقرب منتجعات البحر الأحمر للقاهرة لاستجمام سريع ومريح.' }
};

// --- المكون الفرعي لصفحة الوجهة ---
const DestinationPage = ({ route, goBack }) => {
  const data = PAGE_DATA[route];
  const [formDest, setFormDest] = useState(data ? data.destinationValue : '');
  useEffect(() => { window.scrollTo(0, 0); }, [route]);
  if (!data) return <div className="p-20 text-center">عذراً، الوجهة غير متوفرة. <button onClick={goBack} className="text-blue-600 underline">العودة</button></div>;

  return (
    <div dir="rtl" className="font-sans antialiased" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <nav className="fixed w-full z-40 bg-white shadow-md py-4 px-4 flex justify-between items-center">
        <button onClick={goBack} className="flex items-center gap-2 text-[#003B73] font-bold"><ArrowLeft size={20} /> العودة للرئيسية</button>
        <span className="text-2xl font-black text-[#003B73]">3M Travel</span>
      </nav>

      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImg} alt={data.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-black mb-4">{data.title}</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-200">{data.desc}</p>
          <button onClick={() => scrollToBooking(data.destinationValue, setFormDest)} className="bg-[#25D366] text-white font-bold py-3 px-8 rounded-full shadow-lg">احجز باقتك الآن</button>
        </div>
      </section>

      <section id="booking" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-[#FAFAEE] rounded-3xl shadow-xl p-8 border border-gray-100">
            <SectionHeading title="طلب حجز سريع" subtitle="سجل بياناتك وسيتم التواصل معك فوراً للتأكيد" />
            <BookingForm prefilledDestination={formDest} />
          </div>
        </div>
      </section>
    </div>
  );
};

// --- المكون الرئيسي App ---
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalDest, setGlobalDest] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    const handleHash = () => { const hash = window.location.hash; setCurrentRoute(hash.startsWith('#/') ? hash.replace('#/', '') : '/'); };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('hashchange', handleHash); };
  }, []);

  if (currentRoute !== '/' && currentRoute !== '') return <DestinationPage route={currentRoute} goBack={() => { window.location.hash = ''; }} />;

  const destinations = [
    { id: 'sharm-el-sheikh-trip', name: 'شرم الشيخ', img: IMAGES.sharm, desc: 'مدينة السلام والجمال، وشواطئ الشعاب المرجانية.' },
    { id: 'hurghada-trip', name: 'الغردقة', img: IMAGES.hurghada, desc: 'عاصمة البحر الأحمر المثالية للغطس والرحلات البحرية.' },
    { id: 'dahab-trip', name: 'دهب', img: IMAGES.dahab, desc: 'ملاذ الهدوء والمغامرة بين الجبال والبحر.' },
    { id: 'matrouh-trip', name: 'مرسى مطروح', img: IMAGES.matrouh, desc: 'مياه فيروزية ورمال بيضاء ناعمة لا تُنسى.' },
    { id: 'sokhna-trip', name: 'العين السخنة', img: IMAGES.sokhna, desc: 'أقرب منتجعات البحر الأحمر للقاهرة لاستجمام سريع.' }
  ];

  return (
    <div dir="rtl" className="font-sans antialiased overflow-x-hidden" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className={`text-2xl font-black ${isScrolled ? 'text-[#003B73]' : 'text-white'}`}>3M <span className="text-yellow-400">Travel</span></span>
          <div className={`hidden md:flex gap-8 font-semibold ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            <a href="#destinations">الوجهات</a>
            <a href="#packages">الباقات</a>
            <button onClick={() => scrollToBooking('', setGlobalDest)} className="bg-[#25D366] text-white px-5 py-2 rounded-full">طلب حجز</button>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}><Menu className={isScrolled ? 'text-[#003B73]' : 'text-white'} size={28} /></button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="https://cdn.pixabay.com/video/2020/05/25/40141-425148332_large.mp4" type="video/mp4" />
            <img src={IMAGES.hero_fallback} alt="Background" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <FadeIn><h1 className="text-4xl md:text-7xl font-black mb-6">اكتشف سحر مصر مع <br/> 3M Travel</h1></FadeIn>
          <FadeIn delay={200}><p className="text-xl md:text-2xl mb-10 text-gray-200">رحلاتنا تأخذك إلى أجمل شواطئ البحر الأحمر والمتوسط</p></FadeIn>
          <FadeIn delay={400}><button onClick={() => scrollToBooking('', setGlobalDest)} className="bg-[#25D366] text-lg font-bold py-4 px-10 rounded-full shadow-2xl">سجل طلب حجزك الآن</button></FadeIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#FAFAEE]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          {[ { icon: <Zap size={40}/>, title: 'تأكيد فوري' }, { icon: <Shield size={40}/>, title: 'شفافية الأسعار' }, { icon: <Headset size={40}/>, title: 'دعم 24/7' }, { icon: <RefreshCw size={40}/>, title: 'مرونة التعديل' } ].map((f, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="text-[#003B73] mb-4 flex justify-center">{f.icon}</div>
              <h3 className="font-bold text-lg">{f.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations Section (الصور تظهر هنا) */}
      <section id="destinations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading title="أشهر الوجهات السياحية" subtitle="اختر وجهتك القادمة واستمتع بأفضل العروض" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((dest, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col">
                  <div className="h-64 overflow-hidden">
                    <img src={dest.img} alt={dest.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold text-[#003B73] mb-3">{dest.name}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{dest.desc}</p>
                    <a href={`#/${dest.id}`} className="block w-full text-center py-3 border-2 border-[#003B73] text-[#003B73] font-bold rounded-xl hover:bg-blue-50">عرض التفاصيل</a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-20 bg-[#FAFAEE]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <SectionHeading title="طلب حجز سريع" subtitle="اترك بياناتك وسنقوم بالرد على استفسارك خلال دقائق" />
            <BookingForm prefilledDestination={globalDest} />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-500 py-12 text-center">
        <span className="text-2xl font-black text-white">3M Travel</span>
        <p className="mt-4">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
      </footer>

      {/* Floating WA Button */}
      <a href={getWaLink("مرحباً فريق 3M Travel، أحتاج للمساعدة.")} target="_blank" rel="noreferrer" className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform">
        <MessageCircle size={32} />
      </a>
    </div>
  );
}

// --- Booking Form Component ---
function BookingForm({ prefilledDestination }) {
  const [formData, setFormData] = useState({ name: '', phone: '', destination: '', pax: '', date: '' });
  const [isSub, setIsSub] = useState(false);
  useEffect(() => { if (prefilledDestination) setFormData(p => ({ ...p, destination: prefilledDestination })); }, [prefilledDestination]);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `حجز جديد من الموقع:\nالاسم: ${formData.name}\nالوجهة: ${formData.destination}\nالعدد: ${formData.pax}\nالتاريخ: ${formData.date}`;
    setIsSub(true);
    setTimeout(() => { window.location.href = getWaLink(msg); }, 500);
  };
  if (isSub) return <div className="text-center py-10 font-bold text-green-600">جاري توجيهك إلى واتساب...</div>;
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input required name="name" onChange={handleChange} className="w-full p-4 bg-gray-50 border rounded-xl outline-none" placeholder="الاسم بالكامل" />
      <input required name="phone" type="tel" onChange={handleChange} className="w-full p-4 bg-gray-50 border rounded-xl outline-none" placeholder="رقم الهاتف" />
      <select required name="destination" value={formData.destination} onChange={handleChange} className="w-full p-4 bg-gray-50 border rounded-xl outline-none">
        <option value="">اختر الوجهة</option>
        <option value="شرم الشيخ">شرم الشيخ</option><option value="الغردقة">الغردقة</option><option value="دهب">دهب</option><option value="مرسى مطروح">مرسى مطروح</option><option value="العين السخنة">العين السخنة</option>
      </select>
      <div className="grid grid-cols-2 gap-4">
        <input required name="pax" type="number" onChange={handleChange} className="p-4 bg-gray-50 border rounded-xl outline-none" placeholder="عدد الأفراد" />
        <input required name="date" type="date" onChange={handleChange} className="p-4 bg-gray-50 border rounded-xl outline-none" />
      </div>
      <button className="w-full bg-[#003B73] text-white font-bold py-4 rounded-xl hover:bg-blue-900 transition">تأكيد وتحويل لواتساب</button>
    </form>
  );
}
