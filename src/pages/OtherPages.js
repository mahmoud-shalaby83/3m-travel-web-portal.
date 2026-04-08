import React from 'react';
import { MapPin, CheckCircle } from 'lucide-react';

// ============================================================
// 📌 لتغيير الصور: استبدل الروابط في IMAGES فقط
// ============================================================
const IMAGES = {
  hurghada_hero:  "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1920&q=80",
  hurghada_aqua:  "https://images.unsplash.com/photo-1560275619-4cc5fa59d3ae?auto=format&fit=crop&w=800&q=80",
  hurghada_dive:  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  hurghada_hotel: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",

  dahab_hero:     "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=1920&q=80",
  dahab_blue:     "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
  dahab_camp:     "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",

  matrouh_hero:   "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1920&q=80",
  matrouh_beach:  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  matrouh_agiba:  "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",

  sokhna_hero:    "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=1920&q=80",
  sokhna_resort:  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  sokhna_sea:     "https://images.unsplash.com/photo-1506929197327-040b396e9596?auto=format&fit=crop&w=800&q=80",
};

// ============================================================
// مكوّنات مشتركة داخل الملف
// ============================================================
const PageHero = ({ img, city, country, tagline }) => (
  <section className="relative h-[55vh] flex items-end justify-center pb-12">
    <div className="absolute inset-0">
      <img src={img} alt={city} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    </div>
    <div className="relative z-10 text-center text-white px-4">
      <div className="flex items-center justify-center gap-2 mb-3 text-yellow-400">
        <MapPin size={18}/> <span className="text-sm">{country}</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-black mb-3">{city}</h1>
      <p className="text-lg text-gray-200 max-w-xl mx-auto">{tagline}</p>
    </div>
  </section>
);

const StatsBar = ({ stats }) => (
  <section className="py-12 bg-white">
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="grid grid-cols-3 gap-6 text-center">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#FAFAEE] rounded-2xl p-6">
            <div className="text-4xl font-black text-[#003B73] mb-2">{s.num}</div>
            <div className="text-gray-600 text-sm">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-gray-700 text-lg leading-relaxed text-center">{stats.desc}</p>
    </div>
  </section>
);

const LandmarkGrid = ({ landmarks }) => (
  <section className="py-14 bg-[#FAFAEE]">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-black text-[#003B73] mb-10 text-center">أبرز المعالم</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landmarks.map((lm, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-48 overflow-hidden">
              <img src={lm.img} alt={lm.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-[#003B73] mb-2">{lm.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{lm.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PackagesSection = ({ packages, onBook }) => (
  <section className="py-14 bg-white">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-3xl font-black text-[#003B73] mb-10 text-center">الباقات المتاحة</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {packages.map((pkg, i) => (
          <div key={i} className="bg-[#FAFAEE] rounded-2xl p-6 border border-gray-100">
            <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${pkg.tagColor || 'bg-[#003B73]'}`}>{pkg.tag}</span>
            <h3 className="text-xl font-bold text-[#003B73] mt-3 mb-1">{pkg.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{pkg.duration}</p>
            <ul className="space-y-2 mb-5">
              {pkg.includes.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={15} className="text-green-500 shrink-0" />{item}
                </li>
              ))}
            </ul>
            <p className="font-black text-[#003B73] mb-4">{pkg.price}</p>
            <button
              onClick={() => onBook && onBook(pkg.title)}
              className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-green-600 transition"
            >
              احجز الآن
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================
// صفحة الغردقة
// ============================================================
export function HurghadaPage({ onBook }) {
  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <PageHero img={IMAGES.hurghada_hero} city="الغردقة" country="البحر الأحمر، مصر" tagline="عاصمة الغطس والمنتجعات العائلية على ساحل البحر الأحمر" />

      <StatsBar stats={[
        { num: "40+", label: "منتجع فاخر" },
        { num: "100+", label: "موقع غطس" },
        { num: "330", label: "يوم مشمس سنوياً" },
        desc: "الغردقة هي الوجهة المثالية للعائلات والأزواج على حدٍّ سواء. تتميز بمنتجعاتها الشاملة ذات الخدمات العالمية، وشواطئها الرملية الممتدة، وألعابها المائية الترفيهية التي تجعلها وجهة لا تُنسى للجميع."
      ]} />

      <LandmarkGrid landmarks={[
        { img: IMAGES.hurghada_aqua, name: "هرغادا جراند أكوا بارك", desc: "أكبر حديقة مائية في محافظة البحر الأحمر، توفر أكثر من 35 لعبة مائية مناسبة لجميع الأعمار." },
        { img: IMAGES.hurghada_dive, name: "جزيرة جفتون", desc: "جزيرة مرجانية ساحرة على بُعد 45 دقيقة بالقارب، تُعدّ من أفضل مواقع السنوركلينج في البحر الأحمر." },
        { img: IMAGES.hurghada_hotel, name: "الغردقة مارينا", desc: "ميناء سياحي فاخر يضم مطاعم عالمية ومحلات تسوق وقوارب فاخرة لرحلات البحر." },
      ]} />

      <PackagesSection onBook={(t) => onBook && onBook('الغردقة', t)} packages={[
        {
          title: "عرض الغردقة العائلي",
          duration: "4 ليالي / 5 أيام",
          price: "ابتداءً من 6,500 جنيه/فرد",
          tag: "عائلي",
          tagColor: "bg-blue-500",
          includes: ["منتجع مع أكوا بارك", "إقامة شاملة", "رحلة جفتون البحرية", "انتقالات مطار"],
        },
        {
          title: "عرض الغطس والمغامرة",
          duration: "3 ليالي / 4 أيام",
          price: "ابتداءً من 5,200 جنيه/فرد",
          tag: "مغامرة",
          tagColor: "bg-orange-500",
          includes: ["إقامة نصف بنسيون", "3 جلسات غطس احترافية", "معدات غطس كاملة", "مرشد بحري"],
        },
      ]} />
    </div>
  );
}

// ============================================================
// صفحة دهب
// ============================================================
export function DahabPage({ onBook }) {
  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <PageHero img={IMAGES.dahab_hero} city="دهب" country="جنوب سيناء، مصر" tagline="ملاذ المغامرين والباحثين عن الهدوء بين الجبال والبحر" />

      <StatsBar stats={[
        { num: "1", label: "ثقب أزرق أشهر عالمياً" },
        { num: "60m", label: "عمق الثقب الأزرق" },
        { num: "15°C", label: "متوسط درجة الحرارة شتاءً" },
        desc: "دهب مدينة صغيرة بروح كبيرة. تجذب كل عام آلاف المغامرين من جميع أنحاء العالم بسبب ثقبها الأزرق الأسطوري وهدوئها الفريد الذي يختلف تماماً عن صخب شرم الشيخ والغردقة."
      ]} />

      <LandmarkGrid landmarks={[
        { img: IMAGES.dahab_blue, name: "الثقب الأزرق", desc: "من أشهر مواقع الغطس في العالم، يبلغ عمقه 130 متراً ويعج بالحياة البحرية النادرة. وجهة إجبارية لكل غواص." },
        { img: IMAGES.dahab_camp, name: "مخيمات الصحراء", desc: "تجربة تخييم فريدة في قلب سيناء، مع ليالٍ مضاءة بالنجوم ورحلات جبلية إلى وادي غني." },
      ]} />

      <PackagesSection onBook={(t) => onBook && onBook('دهب', t)} packages={[
        {
          title: "عرض دهب للمغامرين",
          duration: "3 ليالي / 4 أيام",
          price: "ابتداءً من 3,800 جنيه/فرد",
          tag: "مغامرة",
          tagColor: "bg-orange-500",
          includes: ["إقامة في شاليه بحري", "جلستا غطس في الثقب الأزرق", "رحلة صحراوية ليلية", "إفطار يومي"],
        },
        {
          title: "عرض دهب للاسترخاء",
          duration: "4 ليالي / 5 أيام",
          price: "ابتداءً من 4,500 جنيه/فرد",
          tag: "استرخاء",
          tagColor: "bg-teal-500",
          includes: ["شاليه مطل على البحر", "جلسة يوغا صباحية", "سنوركلينج حر", "وجبات كاملة"],
        },
      ]} />
    </div>
  );
}

// ============================================================
// صفحة مرسى مطروح
// ============================================================
export function MatrouhPage({ onBook }) {
  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <PageHero img={IMAGES.matrouh_hero} city="مرسى مطروح" country: "الساحل الشمالي الغربي، مصر" tagline="شواطئ برمال بيضاء ومياه فيروزية لا تجدها إلا هنا" />

      <StatsBar stats={[
        { num: "300km", label: "ساحل بحري نظيف" },
        { num: "22°C", label: "متوسط درجة حرارة المياه" },
        { num: "6", label: "شواطئ طبيعية فريدة" },
        desc: "مرسى مطروح جوهرة الساحل الشمالي الغربي لمصر، تتميز بمياه فيروزية شفافة لا مثيل لها في البحر المتوسط، وشواطئ رملية ناعمة تُذكّرك بالمالديف. وجهة مثالية للهروب من حرارة الصيف."
      ]} />

      <LandmarkGrid landmarks={[
        { img: IMAGES.matrouh_beach, name: "شاطئ كليوباترا", desc: "يُقال إن كليوباترا كانت تستحم في مياهه. شاطئ صخري فريد محاط بمياه زرقاء شفافة يجعله تجربة استثنائية." },
        { img: IMAGES.matrouh_agiba, name: "شاطئ عجيبة", desc: "يُصنَّف من أجمل شواطئ البحر الأبيض المتوسط، تحيط به جبال بيضاء وتغمره مياه فيروزية تخطف الأنفاس." },
      ]} />

      <PackagesSection onBook={(t) => onBook && onBook('مرسى مطروح', t)} packages={[
        {
          title: "عرض مطروح الصيفي",
          duration: "3 ليالي / 4 أيام",
          price: "ابتداءً من 3,200 جنيه/فرد",
          tag: "صيفي",
          tagColor: "bg-cyan-500",
          includes: ["شاليه بحري", "زيارة شاطئ كليوباترا وعجيبة", "إفطار يومي", "انتقالات داخلية"],
        },
        {
          title: "عرض مطروح العائلي",
          duration: "4 ليالي / 5 أيام",
          price: "ابتداءً من 5,000 جنيه/فرد",
          tag: "عائلي",
          tagColor: "bg-blue-500",
          includes: ["شقة عائلية على الشاطئ", "جميع الوجبات", "رحلة بحرية", "أنشطة أطفال"],
        },
      ]} />
    </div>
  );
}

// ============================================================
// صفحة العين السخنة
// ============================================================
export function SokhnaPage({ onBook }) {
  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      <PageHero img={IMAGES.sokhna_hero} city="العين السخنة" country="خليج السويس، مصر" tagline="أقرب منتجعات البحر الأحمر للقاهرة — مسافة ساعة ونصف فقط" />

      <StatsBar stats={[
        { num: "130km", label: "من القاهرة" },
        { num: "50+", label: "منتجع وشاليه" },
        { num: "12", label: "شهراً مناخ ملائم" },
        desc: "العين السخنة الاختيار الذكي للقاهريين الباحثين عن استجمام سريع دون عناء السفر الطويل. تجمع بين مياه البحر الأحمر الدافئة ومنتجعات عالمية المستوى في أقل من ساعتين من القاهرة."
      ]} />

      <LandmarkGrid landmarks={[
        { img: IMAGES.sokhna_resort, name: "منتجعات البورتو", desc: "من أكبر مجمعات المنتجعات في العين السخنة، يضم حمامات سباحة ومطاعم وملاعب رياضية وشاطئاً خاصاً." },
        { img: IMAGES.sokhna_sea, name: "شواطئ البحر الأحمر", desc: "مياه البحر الأحمر الدافئة طوال العام جعلت السخنة وجهة مثالية في الشتاء أيضاً للاسترخاء والسباحة." },
      ]} />

      <PackagesSection onBook={(t) => onBook && onBook('العين السخنة', t)} packages={[
        {
          title: "عرض ويك إند السخنة",
          duration: "ليلتان / 3 أيام",
          price: "ابتداءً من 2,500 جنيه/فرد",
          tag: "ويك إند",
          tagColor: "bg-purple-500",
          includes: ["شاليه على الشاطئ", "إفطار يومي", "استخدام حمامات السباحة", "انتقالات من القاهرة"],
        },
        {
          title: "عرض السخنة الممتد",
          duration: "3 ليالي / 4 أيام",
          price: "ابتداءً من 4,000 جنيه/فرد",
          tag: "استرخاء",
          tagColor: "bg-teal-500",
          includes: ["غرفة مطلة على البحر", "نصف إقامة", "رياضة الكايت سرفينج", "رحلة سنوركلينج"],
        },
      ]} />
    </div>
  );
}