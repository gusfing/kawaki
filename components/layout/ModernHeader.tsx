"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function ModernHeader() {
  const [isServicesHovered, setIsServicesHovered] = useState(false);

  return (
    <>
      <div className='topbar' data-od-id='topbar'>
        <div className='container topbar-inner'>
          <span><b>OD / 2026</b> &nbsp;·&nbsp; Vol. 01 / Issue Nº 01</span>
          <span className='mid'>
            <span>Filed under <b className='coral'>Web Engineering · Editorial</b></span>
            <span>© 2026 · Made on Earth</span>
          </span>
          <span className='right'>
            <a className='topbar-link' href='#contact'><span className='pulse'></span>Live · v3.0</a>
            <span><b>EN</b> · HI</span>
          </span>
        </div>
      </div>

      <header className='nav relative z-50' data-od-id='nav'>
        <div className='container nav-inner'>
          <a href='#top' className='brand'>
            <img className='brand-mark' src='./assets/kawaki-logo.png' alt='Kawaki Studios logo' width='36' height='36' />
            <span>Kawaki</span>
            <span className='brand-meta'><b>Studio Nº 01</b>Delhi / Est. 2019</span>
          </a>
          <nav>
            <ul className='nav-links flex items-center gap-8'>
                <li 
                  className="relative"
                  onMouseEnter={() => setIsServicesHovered(true)}
                  onMouseLeave={() => setIsServicesHovered(false)}
                >
                  <a href='#capabilities' className="py-4">Services<span className='num'>08</span></a>
                  <AnimatePresence>
                    {isServicesHovered && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[750px] z-50"
                      >
                        <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.15)] border border-black/5 flex gap-12">
                          <div className="flex-1">
                            <h4 className="label mb-6">Capabilities</h4>
                            <ul className="flex flex-col gap-4 pl-9">
                              <li><a href="#web" className="text-[15px] font-sans text-ink font-medium hover:text-coral transition-colors flex items-center justify-between group">Web Engineering <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-coral">→</span></a></li>
                              <li><a href="#apps" className="text-[15px] font-sans text-ink font-medium hover:text-coral transition-colors flex items-center justify-between group">Application Design <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-coral">→</span></a></li>
                              <li><a href="#ecommerce" className="text-[15px] font-sans text-ink font-medium hover:text-coral transition-colors flex items-center justify-between group">Headless Commerce <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-coral">→</span></a></li>
                              <li><a href="#system" className="text-[15px] font-sans text-ink font-medium hover:text-coral transition-colors flex items-center justify-between group">Design Systems <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-coral">→</span></a></li>
                            </ul>
                          </div>
                          <div className="flex-1 bg-[var(--paper)] rounded-2xl p-8 border border-black/5">
                            <h4 className="label mb-6">Featured</h4>
                            <div className="pl-9">
                              <div className="w-full h-36 bg-gray-200 rounded-xl overflow-hidden mb-5 relative group">
                                 <img src="./assets/work-1.png" alt="Featured Work" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                              </div>
                              <p className="text-[13px] font-sans text-ink-soft leading-relaxed">Explore our latest award-winning projects in the work archive.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
                <li><a href='#method'>Process</a></li>
                <li><a href='#work'>Work<span className='num'>03</span></a></li>
                <li><a href='#labs'>Labs<span className='num'>05</span></a></li>
                <li><a href='#contact'>Contact</a></li>
            </ul>
          </nav>
          <div className='nav-side'>
            <a className='nav-cta' href='#contact'>Start a project</a>
            <span className='status-dot' aria-hidden='true'></span>
          </div>
        </div>
      </header>
    </>
  );
}
