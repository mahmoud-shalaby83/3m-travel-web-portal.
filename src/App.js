import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MessageCircle, MapPin, Calendar, Users, CheckCircle, Star,
  Menu, X, Phone, Facebook, Instagram, ArrowLeft, ShieldCheck,
  CreditCard, Clock, ArrowRight, Waves, Hotel, Sparkles, Send,
  Loader2, Quote, HelpCircle, Palmtree, Anchor, Sun, Utensils,
  Compass, Heart, Bell, Table as TableIcon
} from 'lucide-react';
 
// ============================================================
// 🌳 شجرة الإعدادات
// ============================================================
 
const CONFIG = {
  waNumber: '201226292894',       
  phoneDisplay: '01226292894',    
  address: 'مصر — العاشر من رمضان',
  fbLink: 'https://www.facebook.com/Dahab3M',
  logoUrl: 'https://ui-avatars.com/api/?name=3M&background=003B73&color=FFD700&rounded=true&bold=true&size=128',
  fallbackImg: 'https://images.unsplash.com/photo-1507528367768-6c518b01ba90?fm=webp&fit=crop&w=800&q=75',
};
 
// ============================================================
// 🌳 شجرة الـ SEO
// ============================================================
const SEO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "3M Travel",
  "url": "https://www.3mtravel.com",
  "telephone": "01108020868",
  "email": "3mgs.eg@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Belbeis",
    "addressCountry": "EG"
  },
  "description": "وكالة سياحة داخلية متخصصة في تقديم برامج وعروض متكاملة لأفضل الوجهات في مصر تشمل شرم الشيخ، الغردقة، دهب، مرسى مطروح، ومرسى علم.",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "برامج السياحة الداخلية",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "TouristDestination", "name": "شرم الشيخ", "description": "عروض الإقامة والرحلات البحرية في شرم الشيخ." } },
      { "@type": "Offer", "itemOffered": { "@type": "TouristDestination", "name": "مارينا شرم", "description": "إقامات فاخرة وبرامج ترفيهية في قلب مارينا شرم." } },
      { "@type": "Offer", "itemOffered": { "@type": "TouristDestination", "name": "الغردقة", "description": "بكجات عائلية ورحلات غوص في الغردقة." } },
      { "@type": "Offer", "itemOffered": { "@type": "TouristDestination", "name": "دهب", "description": "رحلات استكشافية ومخيمات اقتصادية في دهب للبلو هول وأبو جالوم." } },
      { "@type": "Offer", "itemOffered": { "@type": "TouristDestination", "name": "مرسى مطروح", "description": "حجز شاليهات وفنادق للإجازات الصيفية على شواطئ مرسى مطروح." } },
      { "@type": "Offer", "itemOffered": { "@type": "TouristDestination", "name": "مرسى علم", "description": "برامج سياحة علاجية ورحلات سفاري وغوص في مرسى علم." } }
    ]
  },
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "ما هي الوجهات التي تغطيها 3M Travel؟", "acceptedAnswer": { "@type": "Answer", "text": "نغطي أبرز وجهات السياحة الداخلية في مصر: شرم الشيخ، مارينا شرم، الغردقة، دهب، مرسى مطروح، ومرسى علم." } },
      { "@type": "Question", "name": "كيف يمكنني حجز رحلة سياحية داخلية؟", "acceptedAnswer": { "@type": "Answer", "text": "يمكنك الحجز والاستعلام عن أحدث العروض والأسعار من خلال التواصل المباشر عبر الهاتف أو البريد الإلكتروني الخاص بالشركة." } }
    ]
  }
};

// ============================================================
// 🌳 شجرة الوجهات والباقات
// ============================================================
 
const TRAVEL_DATA = [
  {
    id: 'sharm-el-sheikh-trip',
    name: 'شرم الشيخ',
    mainImg: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?fm=webp&fit=crop&w=800&q=75',
    desc: 'دليلك الشامل لرحلات شرم الشيخ 2026. اكتشف خدمات حجز اليخوت من فندق مارينا شرم وأفضل أنشطة الغوص في محمية رأس محمد.',
    cityFeatures: [
      { icon: Anchor,   text: 'أفضل مناطق الغوص والسنوركلينج عالمياً' },
      { icon: Sun,      text: 'أجواء مشمسة دافئة طوال العام' },
      { icon: Utensils, text: 'تنوع المطاعم العالمية في خليج نعمة' },
    ],
    packages: [
      {
        id: 'p1',
        title: 'عرض فندق مارينا شرم',
        hotel: 'مارينا شرم (خليج نعمة)',
        price: '11,700',
        duration: '4 أيام / 3 ليالي',
        category: 'عرض خاص',
        tag: 'متبقي 3 أماكن فقط!',
        features: ['إقامة فندقية فاخرة', 'إطلالة مباشرة على البحر', 'نصف إقامة (فطار + عشاء)', 'انتقالات ذهاب وعودة'],
      },
      {
        id: 'p2',
        title: 'رحلات شرم الشيخ VIP',
        hotel: 'فنادق 5 نجوم ديلوكس',
        price: '12,500',
        duration: '5 أيام / 4 ليالي',
        category: 'VIP',
        tag: 'الأكثر مبيعاً',
        features: ['سيارة خاصة', 'مرشد سياحي', 'يخت خاص', 'إقامة كاملة'],
      }
    ],
    geoData: {
      priceTable: [
        { activity: 'رحلة يخت محمية رأس محمد', price: 'طلب سعر', type: 'شامل الغداء' },
        { activity: 'سنوركلينج جزيرة تيران',   price: 'طلب سعر', type: 'يوم كامل' },
      ],
      faq: [
        { q: 'أين يقع فندق مارينا شرم؟', a: 'يقع في خليج نعمة، قلب شرم الشيخ السياحي.' },
        { q: 'ما هي الأنشطة المتاحة؟',   a: 'الغوص، السنوركلينج، رحلات السفاري، واليخوت الخاصة.' },
      ],
    },
  },
  {
    id: 'hurghada-trip',
    name: 'الغردقة',
    mainImg: 'https://images.unsplash.com/photo-1600289031464-74d374b64991?fm=webp&fit=crop&w=800&q=75',
    desc: 'عروض الغردقة 2026: رحلات جزيرة الجفتون وألعاب الأكوا بارك العالمية.',
    cityFeatures: [
      { icon: Waves,  text: 'أكبر مدن الألعاب المائية' },
      { icon: Anchor, text: 'رحلات الجزر البحرية' },
    ],
    packages: [
      {
        id: 'p3',
        title: 'رحلات الغردقة عائلية',
        hotel: 'فنادق 5 نجوم (أكوا بارك)',
        price: '6,900',
        duration: '4 أيام / 3 ليالي',
        category: 'عائلي',
        tag: 'عائلي مميز',
        features: ['أكوا بارك مجاني', 'إقامة كاملة', 'رحلة سفاري', 'نادي للأطفال'],
      },
    ],
    geoData: {
      priceTable: [{ activity: 'جزيرة الجفتون', price: 'طلب سعر', type: 'يوم كامل' }],
      faq: [{ q: 'ما هي أفضل الفنادق للعائلات؟', a: 'تعتبر فنادق الأكوا بارك هي الخيار الأمثل.' }],
    },
  },
  {
    id: 'marsa-alam-trip',
    name: 'مرسى علم',
    mainImg: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?fm=webp&fit=crop&w=800&q=75',
    desc: 'استكشف الطبيعة البكر في مرسى علم: الغوص مع الدلافين وشواطئ فيروزية.',
    cityFeatures: [{ icon: Compass, text: 'مشاهدة الدلافين والسلاحف' }],
    packages: [
      {
        id: 'p4',
        title: 'استجمام مرسى علم',
        hotel: 'فنادق 5 نجوم لاكشري',
        price: '9,500',
        duration: '5 أيام',
        category: 'VIP',
        tag: 'استجمام',
        features: ['بيت الدلافين', 'شاطئ النيزك', 'إقامة هادئة'],
      },
    ],
    geoData: {
      priceTable: [{ activity: 'بيت الدلافين', price: 'طلب سعر', type: 'رحلة بحرية' }],
      faq: [{ q: 'لماذا مرسى علم؟', a: 'بسبب الشعاب المرجانية البكر والهدوء التام.' }],
    },
  },
  {
    id: 'north-coast-trip',
    name: 'الساحل الشمالي',
    mainImg: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?fm=webp&fit=crop&w=800&q=75',
    desc: 'الساحل الشمالي 2026: باقات العلمين الجديدة وسيدي عبد الرحمن.',
    cityFeatures: [{ icon: Palmtree, text: 'أرقى القرى السياحية' }],
    packages: [
      {
        id: 'p5',
        title: 'باقة VIP العلمين',
        hotel: 'أبراج العلمين',
        price: 'حسب الطلب',
        duration: '4 أيام',
        category: 'VIP',
        tag: 'VIP',
        features: ['سيارة خاصة', 'دخول الشواطئ الخاصة', 'إطلالة بانورامية'],
      },
    ],
    geoData: {
      priceTable: [{ activity: 'إيجار شاليهات', price: 'طلب سعر', type: 'يومي' }],
      faq: [{ q: 'متى يبدأ الموسم؟', a: 'من مايو حتى سبتمبر.' }],
    },
  },
  {
    id: 'dahab-trip',
    name: 'دهب',
    mainImg: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?fm=webp&fit=crop&w=800&q=75',
    desc: 'مغامرات دهب 2026: البلو هول، سفاري الجبال، وأجواء بدوية.',
    cityFeatures: [{ icon: Compass, text: 'مغامرات جبلية وبحرية' }],
    packages: [
      {
        id: 'p6',
        title: 'رحلات دهب مغامرات',
        hotel: 'كامبات وفنادق مميزة',
        price: '3,500',
        duration: '3 أيام',
        category: 'شبابي',
        tag: 'شبابي نشط',
        features: ['البلو هول', 'سفاري الوشواش', 'سهرة بدوية'],
      },
    ],
    geoData: {
      priceTable: [{ activity: 'رحلة البلو هول', price: 'طلب سعر', type: 'يوم كامل' }],
      faq: [{ q: 'هل دهب مناسبة للشباب؟', a: 'نعم، هي الوجهة الأولى لمجتمع الشباب والمغامرين.' }],
    },
  },
  {
    id: 'matrouh-trip',
    name: 'مرسى مطروح',
    mainImg: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?fm=webp&fit=crop&w=800&q=75',
    desc: 'صيف مطروح 2026: مياه عجيبة الصافية ورمال الغرام الناعمة بأسعار عائلية.',
    cityFeatures: [{ icon: Waves, text: 'مياه فيروزية ساحرة' }],
    packages: [
      {
        id: 'p7',
        title: 'مطروح صيف 2026',
        hotel: 'أبراج فندقية مطلة',
        price: '5,800',
        duration: '5 أيام',
        category: 'عائلي',
        tag: 'صيفي',
        features: ['شاطئ عجيبة', 'سوق ليبيا', 'إقامة مريحة'],
      },
    ],
    geoData: {
      priceTable: [{ activity: 'إيجار شقق فندقية', price: 'طلب سعر', type: 'يومي' }],
      faq: [{ q: 'أشهر الشواطئ؟', a: 'عجيبة، الغرام، وروميل.' }],
    },
  },
  {
    id: 'honey-moon',
    name: 'شهر العسل',
    mainImg: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?fm=webp&fit=crop&w=800&q=75',
    desc: 'أجمل الوجهات الرومانسية لعروسين 2026.',
    cityFeatures: [{ icon: Heart, text: 'أجواء رومانسية خاصة' }],
    packages: [
      {
        id: 'p8',
        title: 'باقة شهر العسل الملكية',
        hotel: 'أجنحة فاخرة',
        price: 'حسب الطلب',
        duration: '5 أيام',
        category: 'عرض خاص',
        tag: 'رومانسي',
        features: ['تزيين الغرفة', 'عشاء رومانسي', 'تصوير خاص'],
      },
    ],
    geoData: {
      priceTable: [{ activity: 'جلسة تصوير خاصة', price: 'طلب سعر', type: 'VIP' }],
      faq: [{ q: 'ما هي أفضل الوجهات؟', a: 'مرسى علم وشرم الشيخ هما الأفضل للخصوصية.' }],
    },
  },
];
 
// ============================================================
// 🌳 شجرة التقييمات
// ============================================================
 
const REVIEWS_DATA = [
  { id: 1, user: 'م. أحمد سالم', rating: 5, comment: 'الالتزام بالمواعيد والأسعار كان دقيقاً جداً. فندق مارينا شرم كان اختياراً رائعاً.', result: 'دقة المواعيد' },
  { id: 2, user: 'سارة محمود', rating: 5, comment: 'خدمة العملاء سريعة جداً عبر واتساب. شكراً 3M ترافيل لتنسيق رحلتنا.', result: 'سرعة الاستجابة' },
  { id: 3, user: 'د. طارق زيدان', rating: 5, comment: 'باقة شهر العسل كانت منظمة باحترافية عالية، استمتعنا بكل لحظة.', result: 'جودة التنظيم' },
];
 
// ============================================================
// 🌳 شجرة إشعارات الحجز الاجتماعية
// ============================================================
 
const FAKE_BOOKINGS = [
  { name: 'أحمد',    city: 'القاهرة',      pkg: 'فندق مارينا شرم',       time: 'ساعتين' },
  { name: 'ملك',    city: 'الإسكندرية',   pkg: 'رحلات الغردقة عائلية',   time: '15 دقيقة' },
  { name: 'محمود',   city: 'المنصورة',     pkg: 'رحلات دهب مغامرات',      time: 'ساعة' },
  { name: 'د. يوسف', city: 'الجيزة',       pkg: 'باقة شهر العسل',         time: '3 ساعات' },
  { name: 'منى',     city: 'الساحل',       pkg: 'مطروح صيف 2026',         time: 'نصف ساعة' },
];
 
// ============================================================
// ─── مساعدات (لا تعدّل هنا) ──────────────────────────────
// ============================================================
 
const getWaLink = (msg) => `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(msg)}`;
 
// ── مكوّن الصورة مع صورة احتياطية عند الخطأ ──
const SafeImage = ({ src, alt, className, priority, ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src || CONFIG.fallbackImg);
  useEffect(() => setImgSrc(src || CONFIG.fallbackImg), [src]);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchpriority={priority ? "high" : "auto"}
      onError={() => setImgSrc(CONFIG.fallbackImg)}
      {...rest}
    />
  );
};
 
// ============================================================
// 🤖 مستشار الرحلات بالذكاء الاصطناعي (Anthropic API)
// ============================================================
 
const AITravelPlanner = ({ destination }) => {
  const [status, setStatus] = useState('idle');
  const [itinerary, setItinerary] = useState('');
 
  const generate = async () => {
    setStatus('loading');
    setItinerary('');
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: 'أنت خبير سياحي استراتيجي في مصر لشركة 3M Travel. صمم جدولاً منطقياً لمدة 4 أيام للوجهة المذكورة بلغة عربية جذابة. ابدأ مباشرةً بالجدول بدون أي مقدمة.',
          messages: [{ role: 'user', content: `خطط لرحلة إلى ${destination}.` }],
        }),
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      const text = data.content?.find((b) => b.type === 'text')?.text || '';
      setItinerary(text || 'لم يتم إنتاج محتوى. حاول مرة أخرى.');
      setStatus('done');
    } catch {
      setItinerary('عذراً، المستشار الذكي غير متاح حالياً. يرجى المحاولة لاحقاً.');
      setStatus('error');
    }
  };
 
  return (
    <div className="bg-gradient-to-br from-[#003B73] to-[#00264D] p-8 rounded-[2rem] text-white shadow-2xl mb-10 border border-blue-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Sparkles className="text-[#FFD700] animate-pulse" size={28} />
        <h3 className="text-2xl font-black tracking-tight">مستشار {destination} الذكي ✨</h3>
      </div>
      {status === 'idle' && (
        <button onClick={generate} className="w-full bg-[#FFD700] text-[#003B73] py-4 rounded-xl font-black text-lg hover:bg-white transition-colors shadow-lg relative z-10">
          خطط لرحلتي بذكاء
        </button>
      )}
      {status === 'loading' && (
        <div className="flex flex-col items-center py-10 relative z-10">
          <Loader2 className="animate-spin mb-4 text-[#FFD700]" size={40} />
          <p className="font-bold">جاري تصميم جدولك المخصص…</p>
        </div>
      )}
      {(status === 'done' || status === 'error') && (
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 relative z-10">
          <p className="text-blue-50 text-sm whitespace-pre-wrap leading-relaxed font-semibold">{itinerary}</p>
          <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-black text-[#FFD700] underline decoration-dotted underline-offset-4 hover:text-white transition-colors">
            إعادة التخطيط
          </button>
        </div>
      )}
    </div>
  );
};
 
// ============================================================
// قسم الباقات مع فلاتر
// ============================================================
 
const PackagesSection = () => {
  const [filter, setFilter] = useState('الكل');
  const allPackages = useMemo(() => TRAVEL_DATA.flatMap((city) => city.packages.map((p) => ({ ...p, cityName: city.name }))), []);
  const filtered = useMemo(() => filter === 'الكل' ? allPackages : allPackages.filter((p) => p.category === filter || p.tag.includes(filter)), [filter, allPackages]);
  const FILTER_OPTIONS = ['الكل', 'الأكثر مبيعاً', 'عائلي', 'شبابي', 'VIP', 'عرض خاص'];

  return (
    <section id="packages" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black text-[#003B73] mb-4 tracking-tighter">عروض الباقات الحالية</h2>
          <p className="text-gray-500 font-bold mb-6">استخدم الفلتر لاختيار الباقة التي تناسب تطلعاتك</p>
          <div className="w-20 h-1.5 bg-[#FFD700] mx-auto rounded-full" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {FILTER_OPTIONS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-8 py-3 rounded-full font-bold text-sm transition-all shadow-sm border ${filter === f ? 'bg-[#003B73] text-white border-[#003B73] scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-[#003B73]'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-[2rem] shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300">
              <div className="bg-[#FFD700] text-[#003B73] py-2 px-6 text-center text-xs font-black uppercase tracking-widest">{pkg.tag}</div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-center mb-8 border-b border-gray-100 pb-6">
                  <h3 className="text-2xl font-black text-[#003B73] mb-3">{pkg.title}</h3>
                  <div className="text-gray-500 font-bold mb-3 flex items-center justify-center gap-2">
                    <Calendar size={16} /> {pkg.duration}
                  </div>
                  <div className="text-[#003B73] font-bold flex items-center justify-center gap-2">
                    <Hotel size={18} className="text-[#FFD700]" /> {pkg.hotel}
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-700">
                      <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" /> {feat}
                    </li>
                  ))}
                </ul>
                <a
                  href={getWaLink(`مرحباً 3M Travel، أنا مهتم بحجز باقة [ ${pkg.title} ] لمدينة ${pkg.cityName}. برجاء الإفادة بالتفاصيل.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#003B73] text-white py-4 rounded-xl font-black shadow-md hover:bg-[#00264D] transition-colors flex items-center justify-center gap-2 group mt-auto"
                >
                  احجز الباقة الآن <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
 
// ============================================================
// صفحة الوجهة التفصيلية
// ============================================================
 
const DestinationPage = ({ data, goBack }) => (
  <div dir="rtl" className="bg-gray-50 min-h-screen pt-32 pb-20">
    <div className="container mx-auto px-6">
      <button onClick={goBack} className="bg-white text-[#003B73] border border-gray-200 px-6 py-2.5 rounded-full font-bold mb-10 flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
        <ArrowRight size={18} /> العودة للرئيسية
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl md:text-6xl font-black text-[#003B73] mb-6 tracking-tighter">{data.name}</h1>
          <p className="text-lg text-gray-600 font-bold leading-relaxed mb-10">{data.desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {data.cityFeatures?.map((f, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-3 font-bold text-[#003B73] shadow-sm">
                <f.icon size={22} className="text-[#FFD700] shrink-0" /> {f.text}
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-black text-[#003B73] mb-8 border-r-4 border-[#FFD700] pr-4">الفنادق والعروض في {data.name}</h2>
          <div className="space-y-6 mb-16">
            {data.packages?.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-md hover:shadow-xl transition-shadow relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#FFD700] text-[#003B73] px-6 py-1.5 text-xs font-black">{pkg.tag}</div>
                <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mt-4 xl:mt-0">
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-[#003B73] mb-3">{pkg.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500 font-bold mb-5"><Hotel size={18} className="text-[#FFD700]" /> {pkg.hotel}</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-bold"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" /> {feat}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right w-full xl:w-auto bg-gray-50 p-6 rounded-2xl border border-gray-100 shrink-0">
                    <div className="text-xs text-gray-500 font-bold mb-2">السعر التقديري للفرد</div>
                    <div className="text-3xl font-black text-[#003B73] mb-5">{pkg.price} <span className="text-lg">{pkg.price !== 'حسب الطلب' && 'ج.م'}</span></div>
                    <a
                      href={getWaLink(`مرحباً 3M Travel، أنا مهتم بحجز باقة [ ${pkg.title} ] لمدينة ${data.name}. برجاء الإفادة بالتفاصيل.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#003B73] text-white px-8 py-3 rounded-xl font-black text-sm shadow-md hover:bg-[#00264D] transition-colors flex items-center justify-center gap-2"
                    >
                      احجز الآن <ArrowLeft size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-black text-[#003B73] mb-6 flex items-center gap-2"><HelpCircle className="text-[#FFD700]" /> الأسئلة الشائعة</h2>
          <div className="space-y-4">
            {data.geoData?.faq?.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="font-black text-[#003B73] mb-2 leading-relaxed">س: {item.q}</h4>
                <p className="text-gray-600 font-semibold leading-relaxed">ج: {item.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <AITravelPlanner destination={data.name} />
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl sticky top-28">
            <h3 className="text-xl font-black text-[#003B73] mb-6 flex items-center gap-2"><TableIcon className="text-[#FFD700] shrink-0" /> قائمة الخدمات والأنشطة</h3>
            <div className="space-y-3">
              {data.geoData?.priceTable?.map((row, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl font-bold border border-gray-100">
                  <span className="text-gray-700 text-sm">{row.activity}</span>
                  <span className="text-green-600 font-black text-sm">{row.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-[#003B73] leading-relaxed text-center mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
              الأسعار المعروضة تقديرية وقد تختلف حسب تاريخ الحجز وتوافر الأماكن.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
 
// ============================================================
// التطبيق الرئيسي
// ============================================================
 
export default function App() {
  const [route, setRoute] = useState('/');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toastData, setToastData] = useState(null);
 
  // نموذج الحجز
  const [form, setForm] = useState({ name: '', phone: '', destination: '', travelers: '', date: '' });
  const [submittedData, setSubmittedData] = useState(null); // לחفظ البيانات المكتوبة لاستخدامها في النافذة المنبثقة

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // إزالة الفتح التلقائي للواتساب لتجنب حظر المتصفحات (Popup Blockers)
    // وحفظ البيانات للرابط الموجود داخل رسالة النجاح
    setSubmittedData(form);
    setShowSuccessModal(true);
    setForm({ name: '', phone: '', destination: '', travelers: '', date: '' });
  };
 
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
 
    const onHash = () => {
      const h = window.location.hash;
      setRoute(h.startsWith('#/') ? h.replace('#/', '') : '/');
    };
    window.addEventListener('hashchange', onHash);
    onHash();
 
    const toastTimer = setInterval(() => {
      const rand = FAKE_BOOKINGS[Math.floor(Math.random() * FAKE_BOOKINGS.length)];
      setToastData(rand);
      setTimeout(() => setToastData(null), 5000);
    }, 20000);
 
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHash);
      clearInterval(toastTimer);
    };
  }, []);
 
  const destData = TRAVEL_DATA.find((d) => d.id === route);
  if (destData) {
    return <DestinationPage data={destData} goBack={() => { window.location.hash = ''; setRoute('/'); }} />;
  }
 
  return (
    <div dir="rtl" className="font-sans antialiased bg-white text-gray-900" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* ── حقن بيانات الـ SEO المهيكلة بصيغة JSON-LD برمجياً ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SEO_SCHEMA) }} />

      <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet" />
 
      {/* ── مودال نجاح الحجز ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#003B73]/80 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full text-center relative shadow-2xl border-4 border-[#FFD700]">
            <button onClick={() => setShowSuccessModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#003B73] transition-colors"><X size={28} /></button>
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle size={50} className="text-green-500" /></div>
            <h3 className="text-3xl font-black text-[#003B73] mb-4">تم تسجيل طلبك بنجاح!</h3>
            <p className="text-gray-600 font-bold text-lg mb-8 leading-relaxed">
              تأكيد أخير متبقي ✨<br />
              اضغط على الزر أدناه لإرسال تفاصيل طلبك مباشرة لموظف الحجوزات عبر واتساب لتأكيد موعدك.
            </p>
            <div className="space-y-4">
              <a
                href={getWaLink(`مرحباً 3M Travel، أرغب في تأكيد حجز رحلتي.\nالاسم: ${submittedData?.name}\nالهاتف: ${submittedData?.phone}\nالوجهة المختارة: ${submittedData?.destination}\nعدد المسافرين: ${submittedData?.travelers}\nالتاريخ: ${submittedData?.date}`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-black shadow-md hover:bg-green-600 transition-colors flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} /> تأكيد الحجز وإرسال التفاصيل
              </a>
              <a 
                href={CONFIG.fbLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-blue-50 text-blue-600 border border-blue-200 py-4 rounded-xl font-black hover:bg-blue-100 transition-colors flex items-center justify-center gap-3"
              >
                <Facebook size={24} /> انضم لمجتمعنا على فيسبوك
              </a>
            </div>
          </div>
        </div>
      )}
 
      {/* ── إشعار الدليل المجتمعي ── */}
      {toastData && (
        <div className="fixed bottom-6 right-6 z-[100] bg-white border-r-4 border-[#FFD700] p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm animate-slide-up">
          <div className="bg-blue-50 p-3 rounded-full text-[#003B73] shrink-0"><Bell size={24} className="animate-pulse" /></div>
          <div>
            <p className="text-sm font-black text-[#003B73] leading-tight mb-1 text-right">{toastData.name} من {toastData.city}</p>
            <p className="text-xs font-bold text-gray-500 text-right">حجز <span className="text-[#003B73]">{toastData.pkg}</span> منذ {toastData.time}</p>
          </div>
        </div>
      )}
 
      {/* ── زر واتساب عائم ── */}
      <a 
        href={getWaLink('مرحباً 3M Travel، أرغب في الاستفسار عن العروض المتاحة')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform cursor-pointer group flex items-center justify-center"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-[#003B73] px-4 py-2 rounded-xl text-xs font-black shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block border border-gray-100">تواصل معنا الآن</span>
      </a>
 
      {/* ── شريط التنقل ── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-gradient-to-b from-black/60 to-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { window.location.hash = ''; setRoute('/'); }}>
            <div className="bg-white p-1 rounded-full shadow-md overflow-hidden">
              <SafeImage src={CONFIG.logoUrl} alt="3M Logo" className="h-10 w-10 object-contain" />
            </div>
            <span className={`text-2xl md:text-3xl font-black tracking-tighter transition-colors ${isScrolled ? 'text-[#003B73]' : 'text-white'}`}>3M TRAVEL</span>
          </div>
          <div className={`hidden md:flex gap-8 font-bold ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            <a href="#destinations" className="hover:text-[#FFD700] transition-colors">الوجهات</a>
            <a href="#packages" className="hover:text-[#FFD700] transition-colors">الباقات</a>
            <a href="#reviews" className="hover:text-[#FFD700] transition-colors">الآراء</a>
            <a href="#booking" className={`px-6 py-2 rounded-full shadow-md font-black transition-all ${isScrolled ? 'bg-[#003B73] text-white hover:bg-[#00264D]' : 'bg-[#FFD700] text-[#003B73] hover:bg-white'}`}>سجل طلبك</a>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden"><Menu size={28} className={isScrolled ? 'text-[#003B73]' : 'text-white'} /></button>
        </div>
      </nav>
 
      {/* ── قائمة موبايل ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#003B73]/95 backdrop-blur-lg z-[60] flex flex-col items-center justify-center text-white text-center px-10">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 bg-white/10 p-2 rounded-full"><X size={32} /></button>
          <div className="flex flex-col gap-8 text-2xl font-black">
            <a href="#destinations" onClick={() => setMobileMenuOpen(false)}>الوجهات السياحية</a>
            <a href="#packages" onClick={() => setMobileMenuOpen(false)}>عروض الباقات</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)}>تقييمات العملاء</a>
            <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="bg-[#FFD700] text-[#003B73] px-8 py-3 rounded-full mt-4">سجل طلبك الآن</a>
          </div>
        </div>
      )}
 
      {/* ── Hero ── */}
      <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden bg-[#003B73]">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <SafeImage
          priority={true}
          src={TRAVEL_DATA[0].mainImg}
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom"
          alt="Hero Background"
        />
        <div className="relative z-20 container mx-auto px-6 mt-16">
          <div className="bg-[#FFD700] text-[#003B73] px-6 py-2 rounded-full font-black text-xs md:text-sm mb-8 inline-flex items-center gap-2 shadow-xl animate-bounce tracking-wide">
            <Sparkles size={16} /> اكتشف عروض صيف 2026
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight drop-shadow-lg">وجهتك القادمة <br /> تبدأ من هنا</h1>
          <p className="text-lg md:text-2xl mb-12 max-w-3xl mx-auto font-bold opacity-95 leading-relaxed drop-shadow-md">أفضل عروض فندق مارينا شرم والوجهات المصرية الساحرة بتنظيم دقيق وموثوق.</p>
          <a href="#packages" className="bg-white text-[#003B73] px-10 py-4 rounded-full font-black text-lg shadow-2xl hover:bg-[#FFD700] transition-colors inline-flex items-center gap-3 group">
            استعرض الباقات <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </header>
 
      {/* ── لماذا 3M ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { icon: ShieldCheck, title: 'أمان وموثوقية', desc: 'أعلى معايير الجودة والأمان في كافة تعاملاتك وحجوزاتك.' },
            { icon: Clock,       title: 'تنسيق ميداني',  desc: 'فريق متواجد ميدانياً لخدمتك فور وصولك للوجهة.' },
            { icon: CreditCard,  title: 'قيمة حقيقية',   desc: 'أفضل قيمة مقابل السعر بفضل تعاقداتنا المباشرة.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 text-[#003B73]"><Icon size={32} /></div>
              <h3 className="text-xl font-black mb-3 text-[#003B73]">{title}</h3>
              <p className="font-semibold text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── شبكة الوجهات ── */}
      <section id="destinations" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-[#003B73] tracking-tighter">اكتشف وجهاتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TRAVEL_DATA.map((dest) => (
              <div key={dest.id} className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-gray-200">
                <SafeImage src={dest.mainImg} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 z-10" alt={dest.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B73]/90 via-[#003B73]/20 to-transparent z-20" />
                <div className="absolute bottom-0 p-8 text-white w-full text-right z-30 flex flex-col justify-end h-full">
                  <h3 className="text-4xl font-black mb-4 drop-shadow-md">{dest.name}</h3>
                  <a href={`#/${dest.id}`} className="inline-flex bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-bold text-sm items-center justify-center gap-2 hover:bg-[#FFD700] hover:text-[#003B73] hover:border-[#FFD700] transition-colors w-max">
                    عرض التفاصيل <ArrowLeft size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── الباقات ── */}
      <PackagesSection />
 
      {/* ── التقييمات ── */}
      <section id="reviews" className="py-24 bg-[#003B73] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tighter">قالوا عن 3M Travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-right">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 relative hover:bg-white/10 transition-colors">
                <Quote className="absolute top-6 left-6 text-white/5" size={60} />
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: rev.rating }).map((_, i) => (<Star key={i} size={18} className="fill-[#FFD700] text-[#FFD700]" />))}
                </div>
                <p className="text-base text-gray-200 font-semibold mb-8 italic leading-relaxed">"{rev.comment}"</p>
                <div className="flex justify-between items-center border-t border-white/10 pt-5">
                  <span className="font-black text-lg text-white flex items-center gap-2">{rev.user} <CheckCircle size={16} className="text-[#25D366]" /></span>
                  <span className="bg-[#FFD700] text-[#003B73] px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">{rev.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── نموذج الحجز ── */}
      <section id="booking" className="py-28 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-gray-50 rounded-[3rem] shadow-xl p-10 md:p-16 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-[#003B73] tracking-tighter">ابدأ التخطيط الآن</h2>
              <p className="text-gray-500 font-bold">سجل بياناتك وسيقوم أحد خبرائنا بالتواصل معك فوراً.</p>
            </div>
 
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 pr-2">الاسم بالكامل</label>
                  <input required name="name" value={form.name} onChange={handleFormChange} type="text" placeholder="مثال: أحمد محمد" className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-[#003B73] font-bold text-sm transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 pr-2">رقم الموبايل</label>
                  <input required name="phone" value={form.phone} onChange={handleFormChange} type="tel" placeholder="01xxxxxxxxx" dir="ltr" className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-[#003B73] text-right font-bold text-sm transition-colors" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 pr-2">الوجهة المطلوبة</label>
                  <select required name="destination" value={form.destination} onChange={handleFormChange} className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-[#003B73] font-bold text-sm text-gray-700 cursor-pointer transition-colors">
                    <option value="">اختر الوجهة</option>
                    {TRAVEL_DATA.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                    <option value="other">وجهة أخرى (حدد لاحقاً)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 pr-2">عدد المسافرين</label>
                  <select required name="travelers" value={form.travelers} onChange={handleFormChange} className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-[#003B73] font-bold text-sm text-gray-700 cursor-pointer transition-colors">
                    <option value="">اختر العدد</option>
                    {Array.from({ length: 10 }, (_, i) => (<option key={i + 1} value={i + 1}>{i + 1} فرد</option>))}
                    <option value="group">مجموعة (أكثر من 10)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 pr-2">تاريخ الرحلة المتوقع</label>
                  <input required name="date" value={form.date} onChange={handleFormChange} type="date" className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-[#003B73] font-bold text-sm text-gray-700 cursor-pointer transition-colors" />
              </div>
              
              <button type="submit" className="w-full bg-[#003B73] text-white py-5 rounded-xl font-black text-lg shadow-md hover:bg-[#00264D] transition-colors mt-4 flex items-center justify-center gap-3">
                تأكيد وإرسال الطلب <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>
 
      {/* ── الفوتر ── */}
      <footer className="bg-gray-900 text-gray-300 py-20 border-t border-gray-800">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-right">
          <div>
            <div className="bg-white inline-block p-2 rounded-full mb-6">
              <SafeImage src={CONFIG.logoUrl} alt="3M Footer" className="h-16 w-16 object-contain rounded-full" />
            </div>
            <div className="text-4xl font-black text-white mb-6 tracking-tighter">3M TRAVEL</div>
            <p className="text-gray-400 leading-relaxed text-sm font-semibold max-w-sm mx-auto md:mx-0">
              نصنع تجارب سفر لا تُنسى في أجمل الوجهات المصرية بمعايير جودة فائقة وأسعار تنافسية.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-[#FFD700] font-black text-xl">بيانات التواصل</h4>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <MapPin className="text-[#FFD700] shrink-0" size={20} /><span>{CONFIG.address}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="text-[#FFD700] shrink-0" size={20} /><span dir="ltr">{CONFIG.phoneDisplay}</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-[#FFD700] font-black text-xl">تابعنا</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href={CONFIG.fbLink} target="_blank" rel="noopener noreferrer" className="bg-white/10 p-4 rounded-xl hover:bg-[#FFD700] hover:text-[#003B73] transition-colors"><Facebook size={24} /></a>
              <a href="#" className="bg-white/10 p-4 rounded-xl hover:bg-[#FFD700] hover:text-[#003B73] transition-colors"><Instagram size={24} /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-20 pt-8 border-t border-white/5 font-black uppercase tracking-widest">
          © {new Date().getFullYear()} 3M TRAVEL
        </div>
      </footer>
 
      <style>{`
        @keyframes fadeIn    { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideUp   { from { opacity:0; transform:translateY(60px) scale(0.95) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes slow-zoom { from { transform:scale(1) } to { transform:scale(1.05) } }
        .animate-fade-in   { animation: fadeIn  0.6s ease-out forwards }
        .animate-slide-up  { animation: slideUp 0.5s cubic-bezier(.16,1,.3,1) forwards }
        .animate-slow-zoom { animation: slow-zoom 20s infinite alternate linear }
        html { scroll-behavior: smooth }
        ::-webkit-scrollbar       { width: 8px }
        ::-webkit-scrollbar-track { background: #f8fafc }
        ::-webkit-scrollbar-thumb { background: #003B73; border-radius: 8px }
      `}</style>
    </div>
  );
}
