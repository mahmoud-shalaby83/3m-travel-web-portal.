import React, { useState } from 'react';
import { MapPin, Star, Wifi, Car, Utensils, Waves, Dumbbell, Wind, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

// ============================================================
// 📌 لتغيير الصور لاحقاً: استبدل الروابط في SHARM_IMAGES فقط
// ============================================================
const SHARM_IMAGES = {
  hero:    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1920&q=80",
  marina1: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  marina2: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
  marina3: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  marina4: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80",
  naama:   "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800&q=80",
  coral:   "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
  ras_um:  "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80",
  old_mkt: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
};

// ============================================================
// 📌 بيانات الفندق — عدّل هنا فقط عند الحاجة
// ============================================================
const MARINA_HOTEL = {
  name: "فندق مارينا شرم",
  stars: 4,
  location: "خليج نعمة، شرم الشيخ",
  rating: 4.7,
  reviews: 1240,
  description: "فندق مارينا شرم يقع في قلب خليج نعمة، أكثر المواقع حيوية في شرم الشيخ. يتميز بإطلالات رائعة على البحر الأحمر وقربه المباشر من أفضل الشعاب المرجانية في العالم.",
  images: [SHARM_IMAGES.marina1, SHARM_IMAGES.marina2, SHARM_IMAGES.marina3, SHARM_IMAGES.marina4],
  amenities: [
    { icon: <Wifi size={22}/>,      label: "واي فاي مجاني" },
    { icon: <Waves size={22}/>,     label: "حمام سباحة على البحر" },
    { icon: <Utensils size={22}/>,  label: "3 مطاعم ومقاهي" },
    { icon: <Dumbbell size={22}/>,  label: "صالة رياضية مجهزة" },
    { icon: <Car size={22}/>,       label: "موقف سيارات مجاني" },
    { icon: <Wind size={22}/>,      label: "تكييف مركزي" },
  ],
  packages: [
    {
      title: "عرض مارينا الاقتصادي",
      duration: "3 ليالي / 4 أيام",
      price: "ابتداءً من 4,500 جنيه/فرد",
      tag: "الأكثر طلباً",
      tagColor: "bg-green-500",
      includes: ["غرفة مزدوجة مع إفطار", "انتقالات مطار ذهاب وعودة", "جولة غطس مجانية", "استقبال VIP"],
    },
    {
      title: "عرض مارينا العائلي",
      duration: "4 ليالي / 5 أيام",
      price: "ابتداءً من 7,800 جنيه/فرد",
      tag: "مناسب للعائلات",
      tagColor: "bg-blue-500",
      includes: ["غرفة عائلية مطلة على البحر", "نصف إقامة (فطور + عشاء)", "انتقالات مطار", "رحلة سفاري صحراوية", "نشاط أطفال مجاني"],
    },
    {
      title: "عرض مارينا الرومانسي",
      duration: "3 ليالي / 4 أيام",
      price: "ابتداءً من 9,200 جنيه/للزوجين",
      tag: "للأزواج",
      tagColor: "bg-pink-500",
      includes: ["جناح مطل على البحر", "عشاء رومانسي على الشاطئ", "جلسة سبا للزوجين", "انتقالات خاصة", "زهور وفاكهة ترحيبية"],
    },
  ],
};

// ============================================================
// 📌 معالم شرم الشيخ — أضف أو عدّل هنا
// ============================================================
const LANDMARKS = [
  {
    name: "خليج نعمة",
    img: SHARM_IMAGES.naama,
    desc: "قلب شرم الشيخ النابض، يضم أفضل المطاعم والمحلات والحياة الليلية، ويعدّ نقطة انطلاق لجميع الرحلات البحرية.",
    tags: ["تسوق", "مطاعم", "حياة ليلية"],
  },
  {
    name: "محمية رأس محمد",
    img: SHARM_IMAGES.ras_um,
    desc: "محمية طبيعية بحرية من أجمل مواقع الغطس في العالم، تضم أكثر من 1000 نوع من الأسماك والشعاب المرجانية النادرة.",
    tags: ["غطس", "طبيعة", "محمية"],
  },
  {
    name: "شعاب مرجانية",
    img: SHARM_IMAGES.coral,
    desc: "تتميز شرم الشيخ بأكثر من 250 موقع غطس، من أبرزها شعاب الجاردن وشعاب الغضبان التي تعج بالحياة البحرية.",
    tags: ["غطس", "سنوركلينج"],
  },
  {
    name: "السوق القديم",
    img: SHARM_IMAGES.old_mkt,
    desc: "يُعدّ أحد أقدم أسواق شرم الشيخ، حيث يمكنك اقتناء التحف والهدايا التذكارية والتوابل بأسعار تنافسية.",
    tags: ["تسوق", "تراث"],
  },
];

// ============================================================
// المكونات الداخلية
// ============================================================
const StarRating = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const HotelGallery = ({ images }) => {
  const [main, setMain] = useState(0);
  return (
    <div>
      <div className="rounded-2xl overflow-hidden h-72 md:h-96 mb-3">
        <img src={images[main]} alt="صورة الفندق" className="w-full h-full object-cover transition-all duration-500" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setMain(i)}
            className={`rounded-xl overflow-hidden h-20 cursor-pointer border-2 transition-all ${main === i ? 'border-[#003B73] scale-95' : 'border-transparent'}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

const PackageCard = ({ pkg, onBook }) => (
  <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col">
    <div className={`${pkg.tagColor} text-white text-sm font-bold px-4 py-2 text-center`}>{pkg.tag}</div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-[#003B73] mb-1">{pkg.title}</h3>
      <p className="text-gray-500 text-sm mb-4">{pkg.duration}</p>
      <ul className="space-y-2 mb-6 flex-grow">
        {pkg.includes.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle size={16} className="text-green-500 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <p className="text-[#003B73] font-black text-lg mb-4">{pkg.price}</p>
      <button
        onClick={() => onBook(pkg.title)}
        className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-green-600 transition"
      >
        احجز هذا العرض
      </button>
    </div>
  </div>
);

const FAQ_DATA = [
  { q: "ما هو أفضل وقت لزيارة شرم الشيخ؟", a: "الفترة من سبتمبر حتى نوفمبر هي الأمثل، حيث تعتدل درجات الحرارة وتكون المياه صافية تماماً للغطس." },
  { q: "هل يشمل السعر تذاكر الطيران؟", a: "الأسعار المعروضة لا تشمل تذاكر الطيران. يمكننا ترتيب باقة شاملة بسعر مخصص عند الطلب." },
  { q: "ما هي سياسة الإلغاء؟", a: "يمكن الإلغاء مجاناً قبل 7 أيام من تاريخ السفر. إلغاء قبل 3 أيام يستحق 50% من القيمة." },
  { q: "هل الباقات مناسبة للأطفال؟", a: "نعم، الباقة العائلية مصممة خصيصاً للأطفال وتشمل أنشطة ترفيهية وحمام سباحة آمن." },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {FAQ_DATA.map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center p-4 text-right font-bold text-[#003B73] bg-white hover:bg-blue-50 transition"
          >
            {item.q}
            {open === i ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
          </button>
          {open === i && <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed bg-white">{item.a}</div>}
        </div>
      ))}
    </div>
  );
};

// ============================================================
// المكوّن الرئيسي للصفحة — يُستورد من App.js
// ============================================================
export default function SharmPage({ onBook }) {
  // onBook(destinationName, packageTitle) — يُمرَّر من App.js
  const handleBook = (pkgTitle) => {
    if (onBook) onBook('شرم الشيخ', pkgTitle);
  };

  return (
    <div dir="rtl" className="font-sans" style={{ fontFamily: "'Cairo', sans-serif" }}>

      {/* Hero */}
      <section className="relative h-[55vh] flex items-end justify-center pb-12">
        <div className="absolute inset-0">
          <img src={SHARM_IMAGES.hero} alt="شرم الشيخ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <div className="flex items-center justify-center gap-2 mb-3 text-yellow-400">
            <MapPin size={18}/> <span className="text-sm">جنوب سيناء، مصر</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-3">شرم الشيخ</h1>
          <p className="text-lg text-gray-200 max-w-xl mx-auto">مدينة السلام حيث تلتقي الجبال بأزرق البحر الأحمر</p>
        </div>
      </section>

      {/* نبذة عن المدينة */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-black text-[#003B73] mb-6 text-center">لماذا شرم الشيخ؟</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { num: "+250", label: "موقع غطس" },
              { num: "12°", label: "أدنى درجة حرارة شتاءً" },
              { num: "365", label: "يوم شمس في السنة" },
            ].map((s, i) => (
              <div key={i} className="bg-[#FAFAEE] rounded-2xl p-6">
                <div className="text-4xl font-black text-[#003B73] mb-2">{s.num}</div>
                <div className="text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-10 text-gray-700 text-lg leading-relaxed text-center">
            شرم الشيخ ليست مجرد وجهة سياحية، بل تجربة متكاملة تجمع بين روعة الطبيعة وعالمية الخدمات.
            من شعاب محمية رأس محمد إلى حياة خليج نعمة الليلية، تمنحك المدينة ذكريات لا تُنسى طوال العام.
          </p>
        </div>
      </section>

      {/* المعالم */}
      <section className="py-16 bg-[#FAFAEE]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-[#003B73] mb-10 text-center">أبرز المعالم</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LANDMARKS.map((lm, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-44 overflow-hidden">
                  <img src={lm.img} alt={lm.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#003B73] mb-2">{lm.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{lm.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {lm.tags.map((t, j) => (
                      <span key={j} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* فندق مارينا شرم */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-[#003B73] mb-2 text-center">الفندق المميز</h2>
          <p className="text-center text-gray-500 mb-10">شريكنا الفندقي الموصى به في شرم الشيخ</p>

          <div className="bg-[#FAFAEE] rounded-3xl p-6 md:p-10 border border-gray-100">
            {/* رأس الفندق */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-black text-[#003B73]">{MARINA_HOTEL.name}</h3>
                <StarRating count={MARINA_HOTEL.stars} />
                <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                  <MapPin size={14}/> {MARINA_HOTEL.location}
                </div>
              </div>
              <div className="bg-white rounded-2xl px-6 py-3 text-center shadow-sm border border-gray-100">
                <div className="text-3xl font-black text-[#003B73]">{MARINA_HOTEL.rating}</div>
                <div className="text-yellow-400 text-sm">★★★★★</div>
                <div className="text-gray-400 text-xs">{MARINA_HOTEL.reviews.toLocaleString()} تقييم</div>
              </div>
            </div>

            {/* معرض الصور */}
            <HotelGallery images={MARINA_HOTEL.images} />

            {/* الوصف */}
            <p className="mt-6 text-gray-700 leading-relaxed">{MARINA_HOTEL.description}</p>

            {/* المرافق */}
            <h4 className="font-bold text-[#003B73] mt-8 mb-4">مرافق الفندق</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {MARINA_HOTEL.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                  <span className="text-[#003B73]">{a.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* الباقات */}
      <section className="py-16 bg-[#FAFAEE]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-[#003B73] mb-2 text-center">اختر باقتك</h2>
          <p className="text-center text-gray-500 mb-10">جميع الباقات تشمل خدمات 3M Travel الكاملة</p>
          <div className="grid md:grid-cols-3 gap-6">
            {MARINA_HOTEL.packages.map((pkg, i) => (
              <PackageCard key={i} pkg={pkg} onBook={handleBook} />
            ))}
          </div>
        </div>
      </section>

      {/* أسئلة شائعة */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-[#003B73] mb-10 text-center">أسئلة شائعة</h2>
          <FAQ />
        </div>
      </section>

    </div>
  );
}