import React from 'react';
import { Plus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const faqs = [
    { q: "Will this really get me clients?", a: "Yes. Right now, you are invisible online. We make you visible to people actively searching for your services." },
    { q: "Is it worth it?", a: "Absolutely. Think of it as an investment. If you get just ONE new client from the website, it pays for itself 10 times over." },
    { q: "I'm not good with computers. Can I use it?", a: "Yes! If you can send an email, you can use our system. It is very simple and hands-off." },
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-display font-bold mb-12 text-center text-primary">Common Questions</h2>
      <div className="space-y-4">
        {faqs.map((item, i) => (
            <div key={i} className="border border-secondary/10 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                    <h4 className="text-xl font-bold mb-2 text-primary">{item.q}</h4>
                    <Plus className="text-accent" />
                </div>
                <p className="text-secondary pr-8">{item.a}</p>
            </div>
        ))}
      </div>
    </section>
  );
};