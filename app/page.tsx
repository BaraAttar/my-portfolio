// app/page.tsx

import Header from "./components/Header";
import ParticleScene from "./components/ParticleScene";

export default function Home() {
  return (
    <main>
      {/* مشهد الـ Three.js في الخلفية */}
      <ParticleScene />

      {/* الأقنعة العلوية والسفلية */}
      <div className="mask">
        <div className="mask_top"></div>
        <div className="mask_right"></div>
        <div className="mask_left"></div>
        <div className="mask_bottom"></div>
      </div>

      {/* الإطار المحيط */}
      <div className="frame">
        <div className="frame_line frame_line-left"></div>
        <div className="frame_line frame_line-right"></div>
        <div className="frame_line frame_line-top"></div>
        <div className="frame_line frame_line-bottom"></div>
      </div>

      {/* الهيدر */}
      <Header />

      {/* يمكنك إضافة محتوى إضافي هنا */}
    </main>
  );
}