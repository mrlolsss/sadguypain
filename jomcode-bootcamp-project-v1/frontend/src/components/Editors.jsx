import React from 'react';
// import { Check, ImagePlus, LoaderCircle, X } from 'lucide-react';
import { IconCheck, IconBrandTabnine, IconPhotoUp, IconXMark } from '@tabler/icons-react';

import { api } from '../lib/api';
export default function Editors({
    post,
    onRequest,
    onClose,
    onSaved,
}) {
  const [buildname, setBuildname] = React.useState(post?.build_name || "")
  const [cpu, setCpu] = React.useState(post?.cpu || "");
  const [cpucooler, setCpucooler] = React.useState(post?.cpu_cooler || "");
  const [gpu, setGpu] = React.useState(post?.graphic_card || "")
  const [mobo, setMobo] = React.useState(post?.motherboard || "");
  const [ram, setRam] = React.useState(post?.ram || "");
  const [psu, setPsu] = React.useState(post?.power_supply || "");
  const [casing, setCasing] = React.useState(post?.pc_case || "");
  const [storage, setStorage] = React.useState(post?.storage_drive || "");
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
    "Solid State Drive + Standard Hard Drive": 25, 
    "NVME Drive + Standard Hard Drive": 32,
    "NVME Drive + Solid State Drive": 17,
    "NVME Drive + Solid State Drive + Standard Hard Drive": 37,
    // ram
    "1x 8gb GeIL DDR4 2666MHz": 3,
    "2x 8gb (16gb) GeIL DDR4 2666MHz": 6,
    "1x 8gb Kingston FURY Beast DDR5 5600MHz": 3,
    "2x 8gb (16gb) Kingston FURY Beast DDR5 5600MHz": 6,
    "1x 16gb Corsair Vengeance DDR5 5600MHz": 4,
    "2x 16gb (32gb) Corsair Vengeance DDR5 5600MHz": 8,
    // power supply
    "FSP HV PRO 550W": 550,
    "Segotep BN350 350W": 350,
    "Corsair CX650 650W 80 PLUS Bronze": 650,
    "Corsair RM750e 750W 80 PLUS Gold": 750,
  }
  const totalwattage = (watts[cpu] || 0) + (watts[cpucooler] || 0) + (watts[gpu] || 0) + (watts[mobo] || 0) + (watts[ram] || 0) + (watts[storage] || 0);
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
  const ramtype = {
    // mobo type
    "Soyo SY-Kuanglong B460M": "DDR4",
    "ASUS Prime A520M-K": "DDR4",
    "MSI PRO B650M-P": "DDR5",
    "ASUS PRIME H610M-E D4": "DDR4",
    "MSI B550M PRO-VDH WIFI": "DDR4",
    // ram
    "1x 8gb GeIL DDR4 2666MHz": "DDR4",
    "2x 8gb (16gb) GeIL DDR4 2666MHz": "DDR4",
    "1x 8gb Kingston FURY Beast DDR4 3200MHz": "DDR4",
    "2x 8gb (16gb) Kingston FURY Beast DDR4 3200MHz": "DDR4",
    "2x 8gb (16gb) Corsair Vengeance LPX DDR4 3600MHz": "DDR4",
    "2x 16gb (32gb) Corsair Vengeance LPX DDR4 3600MHz": "DDR4",
    "1x 8gb Kingston FURY Beast DDR5 5600MHz": "DDR5",
    "2x 8gb (16gb) Kingston FURY Beast DDR5 5600MHz": "DDR5",
    "1x 16gb Corsair Vengeance DDR5 5600MHz": "DDR5",
    "2x 16gb (32gb) Corsair Vengeance DDR5 6000MHz": "DDR5",
  }
  const [image, setImage] = React.useState(null);
  const [removeImage, setRemoveimage] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const preview = React.useMemo(() => image ? URL.createObjectURL(image) : null, [image]);
  React.useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);
  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
        const form = new FormData();
        form.append("build_name", buildname.trim());
        form.append("cpu", cpu.trim());
        form.append("cpu_cooler", cpucooler.trim());
        form.append("graphic_card", gpu.trim());
        form.append("motherboard", mobo.trim());
        form.append("ram", ram.trim());
        form.append("power_supply", psu.trim());
        form.append("storage_drive", storage.trim());
        form.append("pc_case", casing.trim());
        if (image) form.append('image', image);
        if (removeImage) form.append('remove_existing_image', 'true');
        await api(post ? `/Build-PC/${post.id}` : "/Build-PC", {
            method: post ? 'PUT' : 'POST',
            body: form
          });
          await onSaved();
        } catch (err) {
          setError(err.message);
        } finally {
          setBusy(false);
        }
    }
    return <div className="modal-backdrop" onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
    }}>
    <div className="modal editor-modal">
          <div className="modal-head">
            <div>
              <div className="eyebrow muted">Component List:</div>
              <h3>
                {post ? 'Edit your build' : 'Pick a component'}
              </h3>
            </div>
            <button className="icon-button" onClick={onClose} aria-label="Close">
              <IconXMark size={21} />
            </button>
            </div>
            <form onSubmit={submit}>
              <label>Build name<input type="text" placeholder="name.." value={buildname} onChange={(e) => setBuildname(e.target.value)} required/></label>
              <label>CPU:</label>
              <select value={cpu} onChange={(e) => setCpu(e.target.value)}>  
                <option value="">select cpu</option>
                <option value="Intel® Core™ i3-10105F Processor">Intel® Core™ i3-10105F Processor LGA 1200 65W</option>
                <option value="AMD Ryzen™ 5 5500F">AMD Ryzen™ 5 5500F AM4 65W</option>
                <option value="AMD Ryzen™ 5 7600">AMD Ryzen™ 5 7600 AM5 65W</option>
                <option value="Intel® Core™ i5-12400F Processor">Intel® Core™ i5-12400F Processor 65W LGA 1700</option>
                <option value="AMD Ryzen™ 7 5800X3D">AMD Ryzen™ 7 5800X3D AM4 105W</option>
              </select>
              <label>CPU cooler:</label>
              <select value={cpucooler} onChange={(e) => setCpucooler(e.target.value)}>
                 <option value="">select cooler</option>
                 <option value="ARCTIC Liquid Freezer III 240">ARCTIC Liquid Freezer III 240 AIO</option>
                 <option value="Thermalright Peerless Assassin 120 SE">Thermalright Peerless Assassin 120 SE</option>
              </select>
              <label>Graphic card:</label>
              <select value={gpu} onChange={(e) => setGpu(e.target.value)}>
                 <option value="">select graphic card</option>
                 <option value="SAPPHIRE NITRO+ AMD RX 590 8G G5 SE">SAPPHIRE NITRO+ AMD RX 590 8G G5 SE 225W</option>
                 <option value="Sapphire PULSE RX 9050 8G">Sapphire PULSE RX 9050 8G GDDR6 100W</option>
                 <option value="SAPPHIRE PULSE AMD Radeon™ RX 6600 8GB">SAPPHIRE PULSE AMD Radeon™ RX 6600 8GB 132W</option>
                 <option value="ASUS Dual GeForce RTX™ 4060 OC Edition 8GB">ASUS Dual GeForce RTX™ 4060 OC Edition 8GB 115W</option>
                 <option value="ASUS PRIME GeForce RTX™ 5070 OC Edition 12GB">ASUS PRIME GeForce RTX™ 5070 OC Edition 12GB 250W</option>
              </select>
              <label>Motherboard:</label>
              <select value={mobo} onChange={(e) => setMobo(e.target.value)}>
                 <option value="">select motherboard</option>
                 <option value="Soyo SY-Kuanglong B460M">梅捷 SY-狂龙B460M Soyo SY-Kuanglong B460M LGA1200 45W</option>
                 <option value="ASUS Prime A520M-K">ASUS Prime A520M-K AM4 45W</option>
                 <option value="MSI PRO B650M-P">MSI PRO B650M-P AM5 45W</option>
                 <option value="ASUS PRIME H610M-E D4">ASUS PRIME H610M-E LGA 1700 D4 45W</option>
                 <option value="MSI B550M PRO-VDH WIFI">MSI B550M PRO-VDH WIFI AM4 45W</option>
              </select>
              <label>RAM:</label>
              <select value={ram} onChange={(e) => setRam(e.target.value)}> 
                 <option value="1x 8gb GeIL DDR4 2666MHz">1x 8GB GeIL DDR4 2666MHz (3W)</option>
                 <option value="2x 8gb (16gb) GeIL DDR4 2666MHz">2x 8GB (16GB) GeIL DDR4 2666MHz (6W)</option>
                 <option value="1x 8gb Kingston FURY Beast DDR4 3200MHz">1x 8GB Kingston FURY Beast DDR4 3200MHz (3W)</option>
                 <option value="2x 8gb (16gb) Kingston FURY Beast DDR4 3200MHz">2x 8GB (16GB) Kingston FURY Beast DDR4 3200MHz (6W)</option>
                 <option value="2x 8gb (16gb) Corsair Vengeance LPX DDR4 3600MHz">2x 8GB (16GB) Corsair Vengeance LPX DDR4 3600MHz (6W)</option>
                 <option value="2x 16gb (32gb) Corsair Vengeance LPX DDR4 3600MHz">2x 16GB (32GB) Corsair Vengeance LPX DDR4 3600MHz (8W)</option>
                 <option value="1x 8gb Kingston FURY Beast DDR5 5600MHz">1x 8GB Kingston FURY Beast DDR5 5600MHz (3W)</option>
                 <option value="2x 8gb (16gb) Kingston FURY Beast DDR5 5600MHz">2x 8GB (16GB) Kingston FURY Beast DDR5 5600MHz (6W)</option>
                 <option value="1x 16gb Corsair Vengeance DDR5 5600MHz">1x 16GB Corsair Vengeance DDR5 5600MHz (4W)</option>
                 <option value="2x 16gb (32gb) Corsair Vengeance DDR5 6000MHz">2x 16GB (32GB) Corsair Vengeance DDR5 6000MHz (8W)</option>
              </select>
              <label>Storage drive:</label>
              <select value={storage} onChange={(e) => setStorage(e.target.value)}>
                 <option value="">select storage</option>
                 <option value="Standard Hard Drive">Standard Hard Drive 2.5/3.5 inch (HDD) 20W</option>
                 <option value="Solid State Drive">Solid State Drive (SSD) 5W</option>
                 <option value="NVME Drive">NVME drive 12W</option>
                 <option value="Solid State Drive + Standard Hard Drive">SSD + HDD 25W</option>
                 <option value="NVME Drive + Standard Hard Drive">NVME + HDD 32W</option>
                 <option value="NVME Drive + Solid State Drive">NVME + SSD 17W</option>
                 <option value="NVME Drive + Solid State Drive + Standard Hard Drive">NVME + SSD + HDD 37W</option>
              </select>
              <label>Casing:</label>
              <select value={casing} onChange={(e) => setCasing(e.target.value)}>
                <option value="">select case</option>
                <option value="Cooler Master MasterBox Q300L">Cooler Master MasterBox Q300L (M-ATX)</option>
                <option value="Tecware Neo M2">Tecware Neo M2(M-ATX)</option>
                <option value="Corsair 4000D Airflow">Corsair 4000D Airflow (ATX)</option>
                <option value="Lian Li Lancool 207">Lian Li Lancool 207 (ATX)</option>
              </select>
              <p className="warning">{sockets[cpu] && sockets[mobo] && (sockets[cpu] !== sockets[mobo] ? "Warning: !!!incompatible CPU and motherboard (wrong socket)" : "")}</p>
              <p className="warning">{ramtype[mobo] && ramtype[ram] && (ramtype[mobo] !== ramtype[ram] ? "Warning: !!!incompatible RAM and motherboard — match DDR4 or DDR5" : "")}</p>
              <h3>Total Wattage: {totalwattage}W</h3>
              <p className="totalwatt">{watts[psu] === 0 ? "select power supply.." : totalwattage <= watts[psu] ? "Power Supply: good to go" : "Power Supply: too weak! select Power Supply with more wattage"}</p>
              <label>Power supply</label>
              <select value={psu} onChange={(e) => setPsu(e.target.value)}>
                <option value="">select power supply</option>
                <option value="FSP HV PRO 550W">FSP HV PRO 550W</option>
                <option value="Segotep BN350 350W">Segotep BN350 350W</option>
                <option value="Corsair CX650 650W 80 PLUS Bronze">Corsair CX650 650W 80 PLUS Bronze</option>
                <option value="Corsair RM750e 750W 80 PLUS Gold">Corsair RM750e 750W 80 PLUS Gold</option>
              </select>
              <label className="image-label">Upload image <span>Optional PNG, JPG or WebP max 5 MB</span></label>
              <label className="upload-box">
                {preview || post?.image_url && !removeImage ? <img src={preview || post.image_url} alt="Cover preview" /> : <>
                <IconPhotoUp size={25} />
                <span>Click to upload an image</span>
                </>}
              <input type="file" accept="image/png,image/jpeg,image/webp" onChange={event => {
                setImage(event.target.files?.[0] || null);
                setRemoveimage(false);
              }} />
              </label>
              {post?.image_url && !image && !removeImage && <button className="remove-image" type="button" onClick={() => setRemoveimage(true)}>Remove current image</button>}
              {error && <div className="notice error">
                {error}
                </div>}
      <div className="modal-actions">
                <button className="button button-outline" type="button" onClick={onClose}>Cancel</button>
                <button className="button button-dark" disabled={busy}>
                  {busy ? <IconBrandTabnine className="spin" size={17} /> : <IconCheck size={17} />}
                  {" "}
                  {busy ? 'Saving...' : post ? 'Save changes' : 'Create build'}
                </button>
              </div>
            </form>
            <button type="button" className="text-action" onClick={onRequest}><p className="request">item not listed? click here to suggest maybe..</p></button>
     </div>       
  </div>
    

}