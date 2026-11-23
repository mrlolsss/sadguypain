import React from 'react';
// import { BookOpen } from 'lucide-react';
import { IconDevices2 } from '@tabler/icons-react';

export default function Footer() {
  return <footer className="footer">
    <div className="wrap footer-inner">
      <span className="brand footer-brand"><span className="brand-mark">
          <IconDevices2 size={15} />
        </span>Build-PC<span className="brand-dot">.</span></span>
      <span>Just Showing PC build.</span>
    </div>
  </footer>;
}
