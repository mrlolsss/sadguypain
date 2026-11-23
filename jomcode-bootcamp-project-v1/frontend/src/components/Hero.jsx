import React from 'react';
// import { ArrowRight, Sparkles } from 'lucide-react';
import { IconArrowBadgeRight, IconTopologyStarRing3 } from '@tabler/icons-react';
export default function Hero({
  onCreate,
  onChat
}) {
  return <section className="hero">
    <div className="wrap hero-inner">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> Pick and Choose</div>
        {/* <h1>PC Build <em>sharing.</em></h1> */}
        <h1>PC Build</h1>
        <p>Just a simple PC builder website</p>
        <div className="hero-buttons">
          <button className="button button-dark" onClick={onCreate}>Add a build <IconArrowBadgeRight size={18} /></button>
          <button className="button button-plain" onClick={onChat}><IconTopologyStarRing3 size={17} /> Explore with AI</button>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        {/* <div className="art-orbit orbit-one" />
        <div className="art-orbit orbit-two" />
        <div className="art-paper">
          <div className="art-line short" />
          <div className="art-line" />
          <div className="art-line medium" />
          <div className="art-line" />
          <div className="art-line tiny" />
        </div>
        <div className="art-sun" />
        <div className="art-star">✳</div> */}
        <img src="/part/hero.png" alt="PC Build" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    </div>
  </section>;
}
