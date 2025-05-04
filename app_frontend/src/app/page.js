'use client';

import Image from "next/image";
import { useRef } from 'react';

export default function Home() {
  const collectionRef = useRef(null);

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-t from-reu-cream to-reu-red min-h-screen">
        <div className="relative h-screen">
          <div className="absolute inset-0"/>
          <div className="absolute inset-0 flex items-center justify-center mx-2">
            <div className="text-center text-reu-brown">
              <h2 className="text-4xl font-bold mb-6">Re:U Life, TU Style</h2>
              <h1 className="text-7xl font-extrabold tracking-wider text-reu-cream mb-12" style={{
                WebkitTextStroke: '2px #501c17',
                letterSpacing: '0.05em',
                filter: 'drop-shadow(2px 2px 0 #501c17)',
                paddingBottom: '0.1em',
                lineHeight: '1.2',
              }}>Your Stuff, Their Story</h1>
              <div className="grid grid-cols-3 gap-6 mt-8 mx-4">
                <div className="flex flex-col items-center justify-center h-full">
                  <h2 className="text-2xl font-medium mb-2">Find your next favorite</h2>
                  <p className="text-sm max-w-xs">
                    From books to bags to bikes discover what your campus has to offer without breaking your wallet.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-2xl font-medium mb-2">Make it Yours</h3>
                  <p className="text-sm max-w-xs">
                    Style it, use it, show it off with pride
                    and purpose. Every item has a story,
                    now it continues with you.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                  <h3 className="text-2xl font-medium mb-2">Send it on its way</h3>
                  <p className="text-sm max-w-xs">
                    Let your unused stuff spark joy again
                    for someone else in TU who'll love it just as much.
                  </p>
                </div>
              </div>
              <button 
                onClick={scrollToCollection}
                className="px-8 py-3 bg-gradient-to-r from-reu-cream to-reu-pink text-reu-brown rounded-full border-2 border-reu-brown hover:opacity-90 transition-all font-normal mt-12"
              >
                Explore Now!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Collection part */}
      <section ref={collectionRef} className="py-20 bg-reu-cream overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4">COLLECTION</h2>
            <p className="text-xl mb-8">Discover sustainable fashion that tells a story.</p>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
              {/* Collection Item 1 */}
              <div className="min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden snap-center">
                <div className="relative h-[400px]">
                  <Image
                    src="/images/less-trash.jpg"
                    alt="Less Trash Collection"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-medium mb-2">Less Trash</h3>
                  <p className="text-gray-600 mb-4">Give your unused items a second life</p>
                  <button className="w-full bg-reu-red text-white py-2 rounded-lg hover:bg-reu-red/90 transition-colors">
                    View Collection
                  </button>
                </div>
              </div>

              {/* Collection Item 2 */}
              <div className="min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden snap-center">
                <div className="relative h-[400px]">
                  <Image
                    src="/images/u-jean.jpg"
                    alt="U-Jean Collection"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-medium mb-2">U-Jean</h3>
                  <p className="text-gray-600 mb-4">Sustainable denim with a story</p>
                  <button className="w-full bg-reu-red text-white py-2 rounded-lg hover:bg-reu-red/90 transition-colors">
                    View Collection
                  </button>
                </div>
              </div>

              {/* Collection Item 3 */}
              <div className="min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden snap-center">
                <div className="relative h-[400px]">
                  <Image
                    src="/images/accessories.jpg"
                    alt="Accessories Collection"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-medium mb-2">Accessories</h3>
                  <p className="text-gray-600 mb-4">Complete your look sustainably</p>
                  <button className="w-full bg-reu-red text-white py-2 rounded-lg hover:bg-reu-red/90 transition-colors">
                    View Collection
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              <button className="w-3 h-3 rounded-full bg-reu-red"></button>
              <button className="w-3 h-3 rounded-full bg-reu-red/30"></button>
              <button className="w-3 h-3 rounded-full bg-reu-red/30"></button>
            </div>
          </div>
        </div>
      </section>

      {/* Sell ads part */}
      <section className="min-h-screen bg-gradient-to-b from-reu-cream to-reu-pink flex items-center justify-center text-reu-brown">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-medium mb-8">Share What You Don't Use</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              try contact ur mom first i guess
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-reu-cream to-reu-pink text-reu-brown rounded-full border-2 border-reu-brown hover:opacity-90 transition-all font-normal">
              Sell with us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-reu-pink text-reu-brown pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Re:U description*/}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-4">Re:U</h2>
              <p className="text-sm max-w-md mb-4">
              Give your pre-loved items a second life — right here on campus. Re:U makes it easy to buy, sell, and circulate quality finds, while reducing waste one swap at a time.
              </p>
            </div>

            {/* Site Map */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Site Map</h3>
              <ul className="space-y-2">
                <li><a href="/" className="hover:text-reu-red transition-colors">Home</a></li>
                <li><a href="/products" className="hover:text-reu-red transition-colors">Products</a></li>
                <li><a href="/about" className="hover:text-reu-red transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-reu-red transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@reu.com" className="hover:text-reu-red transition-colors">pls don't</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-reu-brown/20 my-8"></div>

          {/* Bottom Footer */}
          <div className="text-center text-sm">
            <p className="mb-2">CN334 Web Development Final Project</p>
            <p className="mb-2">Re:U — Re you at University</p>
            <p className="text-reu-brown/70">Used2BeCool Group.</p>
          </div>
        </div>
      </footer>
    </main>
  );
} 