import React from 'react';
// import { ArrowLeft, Sparkles, Trash2 } from 'lucide-react';
import { IconArrowBadgeLeft, IconTopologyStarRing3, IconTrashX } from '@tabler/icons-react';

export default function PostDetail({
  post,
  isOwner,
  onBack,
  onChat,
  onEdit,
  onDelete
}) {
  const watts = {
    "": 0,
    // processor
    "Intel® Core™ i3-10105F Processor": 65,
    "AMD Ryzen™ 5 5500F": 65,
    "AMD Ryzen™ 5 7600": 65,
    "Intel® Core™ i5-12400F Processor": 65,
    "AMD Ryzen™ 7 5800X3D": 105,
    // graphic card
    "SAPPHIRE NITRO+ AMD RX 590 8G G5 SE": 225,
    "Sapphire PULSE RX 9050 8G": 100,
    "SAPPHIRE PULSE AMD Radeon™ RX 6600 8GB": 132,
    "ASUS Dual GeForce RTX™ 4060 OC Edition 8GB": 115,
    "ASUS PRIME GeForce RTX™ 5070 OC Edition 12GB": 250,
    // motherboard
    "Soyo SY-Kuanglong B460M": 45,
    "ASUS Prime A520M-K": 45,
    "MSI PRO B650M-P": 45,
    "ASUS PRIME H610M-E D4": 45,
    "MSI B550M PRO-VDH WIFI": 45,
    // cpu cooler
    "ARCTIC Liquid Freezer III 240": 15,
    "Thermalright Peerless Assassin 120 SE": 10,
    // hard drive type
    "Standard Hard Drive": 20,
    "Solid State Drive": 5,
    "NVME Drive": 12,
    // ram
    "1x 8gb GeIL DDR4 2666MHz": 3,
    "2x 8gb (16gb) GeIL DDR4 2666MHz": 6,
    // power supply
    "FSP HV PRO 550W": 550,
    "Segotep BN350 350W": 350,
    "Corsair CX650 650W 80 PLUS Bronze": 650,
    "Corsair RM750e 750W 80 PLUS Gold": 750,
  }
  const totalwattage = (watts[post.cpu] || 0) + (watts[post.cpu_cooler] || 0) + (watts[post.graphic_card] || 0) + (watts[post.motherboard] || 0) + (watts[post.ram] || 0) + (watts[post.storage_drive] || 0);
  const sockets = {
    // intel socket
    "Intel® Core™ i3-10105F Processor": "1200",
    "Soyo SY-Kuanglong B460M": "1200",
    "Intel® Core™ i5-12400F Processor": "1700",
    "ASUS PRIME H610M-E D4": "1700",
    // amd socket
    "AMD Ryzen™ 5 5500F": "AM4",
    "AMD Ryzen™ 5 7600": "AM5",
    "AMD Ryzen™ 7 5800X3D": "AM4",
    "ASUS Prime A520M-K": "AM4",
    "MSI PRO B650M-P": "AM5",
    "MSI B550M PRO-VDH WIFI": "AM4",
  }
  const itemdetail = {
    // processor
    "AMD Ryzen™ 7 5800X3D": "https://www.amd.com/en/products/processors/desktops/ryzen/5000-series/amd-ryzen-7-5800x3d.html",
    "AMD Ryzen™ 5 5500F": "https://www.amd.com/en/products/processors/desktops/ryzen/5000-series/amd-ryzen-5-5500f.html",
    "AMD Ryzen™ 5 7600": "https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-5-7600.html",
    "Intel® Core™ i3-10105F Processor": "https://www.intel.com/content/www/us/en/products/sku/203474/intel-core-i310105f-processor-6m-cache-up-to-4-40-ghz/specifications.html",
    "Intel® Core™ i5-12400F Processor": "https://www.intel.com/content/www/us/en/products/sku/134587/intel-core-i512400f-processor-18m-cache-up-to-4-40-ghz/specifications.html",
    // gpu
    "ASUS PRIME GeForce RTX™ 5070 OC Edition 12GB": "https://www.techpowerup.com/gpu-specs/geforce-rtx-5070.c4218",
    "SAPPHIRE NITRO+ AMD RX 590 8G G5 SE": "https://www.techpowerup.com/gpu-specs/radeon-rx-590.c3322",
    "Sapphire PULSE RX 9050 8G": "https://www.techpowerup.com/gpu-specs/radeon-rx-9050.c4424",
    "SAPPHIRE PULSE AMD Radeon™ RX 6600 8GB": "https://www.techpowerup.com/gpu-specs/radeon-rx-6600.c3696",
    "ASUS Dual GeForce RTX™ 4060 OC Edition 8GB": "https://www.techpowerup.com/gpu-specs/geforce-rtx-4060.c4107",
    // mobo
    "Soyo SY-Kuanglong B460M": "https://www.soyocn.net/2020/0508/2779.html",
    "ASUS Prime A520M-K": "https://www.asus.com/my/motherboards-components/motherboards/prime/prime-a520m-k/",
    "MSI PRO B650M-P": "https://www.msi.com/Motherboard/PRO-B650M-P",
    "ASUS PRIME H610M-E D4": "https://www.asus.com/my/motherboards-components/motherboards/prime/prime-h610m-e-d4/",
    "MSI B550M PRO-VDH WIFI": "https://www.msi.com/Motherboard/B550M-PRO-VDH-WIFI",
  }
  return <article className="detail wrap">
    <button className="back-link" onClick={onBack}><IconArrowBadgeLeft size={17} /> All build</button>
    <div className="detail-content">
      <h2>
        {post.build_name}
      </h2>
      <div className="post-meta"><span className="tiny-avatar">
          {post.author_id.slice(0, 1).toUpperCase()}
        </span> Community author <span className="meta-dot">·</span> {new Date(post.created_at).toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })}</div>
      {post.image_url && <img className="detail-image" src={post.image_url} alt="" />}
      <div className="detail-body">
        <p>CPU: {post.cpu || "None"} {itemdetail[post.cpu] && (<a className="detail-link"href={itemdetail[post.cpu]}target="_blank"rel="noreferrer">detail<IconArrowBadgeLeft size={12} /></a>)}</p>
        <p>CPU cooler: {post.cpu_cooler || "Stock cooler"}</p> 
        <p>GPU: {post.graphic_card || "None"} {itemdetail[post.graphic_card] && (<a className="detail-link"href={itemdetail[post.graphic_card]}target="_blank"rel="noreferrer">detail<IconArrowBadgeLeft size={12} /></a>)}</p>
        <p>Motherboard: {post.motherboard || "None"} {itemdetail[post.motherboard] && (<a className="detail-link"href={itemdetail[post.motherboard]}target="blank"rel="noreferrer">detail<IconArrowBadgeLeft size={12} /></a>)}</p>
        <p>RAM: {post.ram || "None"}</p>
        <p>Storage: {post.storage_drive || "None"}</p>
        <p>Power Supply: {post.power_supply || "None"}</p>
        <p>Case: {post.pc_case || "None"}</p>
        <span className="warning">{sockets[post.cpu] && sockets[post.motherboard] && (sockets[post.cpu] !== sockets[post.motherboard] ? "Warning: !!!wrong socket incompatible CPU and motherboard" : "")}</span>
        <h2>Total wattage: {totalwattage}W</h2>
      </div>
      <div className="detail-footer">
        <button className="text-action" onClick={onChat}><IconTopologyStarRing3 size={17} /> Ask AI about this PC build</button>
        {isOwner && <div className="owner-actions">
          <button onClick={onEdit}>Edit build</button>
          <button className="danger" onClick={onDelete}><IconTrashX size={15} /> Delete</button>
        </div>}
      </div>
    </div>
  </article>;
}
