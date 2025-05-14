"use client";
import AccountSidebar from '@/components/AccountSidebar';
import { useState } from 'react';
import { Unbounded } from 'next/font/google';

const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: 'swap',
});

export default function RegisterSellerPage() {
  const [agreed, setAgreed] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!agreed) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/account/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_seller: true })
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to register as seller');
      }
  
      alert('Registered as a seller!');
      window.location.href = '/account'; // Redirect to account page after successful registration
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error: Could not register as seller.');
    }
  };

  return (
    <div className="min-h-screen bg-reu-cream flex">
      <AccountSidebar active="sell" />
      <div className="flex-1 flex flex-col items-center justify-center px-2">
        <section className="w-full max-w-4xl bg-[#FFF6D6] rounded-2xl px-8 py-10 mb-8 mt-16">
          <h1 className={`text-3xl md:text-4xl font-bold text-[#fa6a5b] text-center mb-2 tracking-tight ${unbounded.className}`}>Before You Start Selling</h1>
          <h2 className={`text-lg md:text-xl font-semibold text-reu-brown text-center mb-4 ${unbounded.className}`}>A Little Something from Us</h2>
          <div className="w-16 h-1 bg-[#fa6a5b] rounded mx-auto mb-6" />
          <p className="text-reu-brown text-base md:text-lg leading-relaxed text-center mb-6">
            ที่ Re:U เราเชื่อว่า ของทุกชิ้นมีเรื่องราว และทุกคนควรได้โอกาสในการค้นพบสิ่งของเหล่านั้น<br /><br />
            การเลือกขายของกับเรา ไม่ใช่แค่การเคลียร์พื้นที่ในห้อง แต่มันคือการช่วยกันสร้างสังคมแห่งการแบ่งปัน ที่หมุนเวียนของใช้ดี ๆ ในรั้วธรรมศาสตร์
            ให้ของชิ้นเดิม ได้เริ่มต้นใหม่ ให้เพื่อนนักศึกษาด้วยกัน ได้ประหยัด ได้ใช้ และได้รู้สึกว่าพื้นที่นี้คือพื้นที่แห่งการแลกเปลี่ยนของเรา<br /><br />
            <span className="font-semibold">ก่อนจะลงขายของชิ้นแรก เราอยากให้คุณร่วมแบ่งปันแนวคิดนี้กับเรา:</span>
          </p>
          <ul className="text-reu-brown text-base md:text-lg list-disc list-inside mb-6 space-y-1">
            <li>ตั้งราคาที่เป็นธรรม</li>
            <li>ลงรายละเอียดสินค้าให้ตรงไปตรงมา</li>
            <li>พูดคุยกับผู้ซื้ออย่างให้เกียรติ</li>
            <li>และอย่าลืมว่า จุดมุ่งหมายของเราไม่ใช่เพียงแค่การขายของ แต่คือการหมุนเวียนคุณค่าของสิ่งของ</li>
          </ul>
          <p className="text-reu-brown text-base md:text-lg text-center mb-2">
            หากคุณอยากจะขายเพราะอยากได้เงินเก็บเพิ่ม
            หรือจะขายเพราะอยากลดของในหอ<br />
            ขอแค่คุณขายเพราะเชื่อว่า เราควรมีพื้นที่แห่งการแบ่งปัน และความยั่งยืน<br />
            ก็ถือว่า 
            <span className="font-bold text-[#fa6a5b]"> คุณมาถูกที่แล้ว</span>
          </p>
          <p className="text-reu-brown text-base md:text-lg text-center font-semibold">พร้อมที่จะส่งต่อหรือยัง?</p>
        
        </section>
        <form onSubmit={handleRegister} className="w-full max-w-2xl flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <input
              id="agree"
              type="checkbox"
              checked={agreed}
              onChange={e => setAgreed(e.target.checked)}
              className="h-5 w-5 text-reu-red focus:ring-reu-red border-gray-300 rounded"
              required
            />
            <label htmlFor="agree" className="text-reu-brown text-base select-none">
              I agree to the <a href="#" className="underline hover:text-reu-red">terms and conditions</a>
            </label>
          </div>
          <button
            type="submit"
            disabled={!agreed}
            className="px-8 py-3 rounded-lg bg-[#fa6a5b] text-white font-semibold text-base hover:bg-[#e65c4d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Registering as a seller
          </button>
        </form>
      </div>
    </div>
  );
}
