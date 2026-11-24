import React from 'react';
// import { ArrowRight, BookOpen, LoaderCircle, Plus, Search } from 'lucide-react';
import { IconArrowBadgeRight, IconChevronLeftPipe, IconChevronRightPipe, IconBrandTabnine, IconDevices2, IconCirclePlus, IconSearch } from '@tabler/icons-react';

export default function PostList({
  posts,
  query,
  onQueryChange,
  loading,
  error,
  onCreate,
  onSelect
}) {
  const[currentpage, setCurrentpage] = React.useState(1);
  const postsperpage = 6;

  // rest to page 1 when the search query changes
  React.useEffect(() => {
    setCurrentpage(1);
  }, [query]);

  const totalpages = Math.ceil(posts.length / postsperpage);
  const startindex = (currentpage - 1) * postsperpage;
  const currentposts = posts.slice(startindex, startindex + postsperpage);

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

 
  return <main className="wrap main-content">
    <div className="section-heading">
      <div>
        {/* <div className="eyebrow muted">FRESH PERSPECTIVES</div> */}
        <h3>Latest PC build<span className="accent-period">.</span></h3>
      </div>
      <button className="button button-outline new-post" onClick={onCreate}><IconCirclePlus size={20} /> New build</button>
    </div>
    <div className="toolbar">
      <div className="search-box">
        <IconSearch size={18} />
        <input value={query} onChange={event => onQueryChange(event.target.value)} placeholder="Search build..." aria-label="Search build" />
      </div>
      <span className="story-count">
        {posts.length}
        {" "}
        {posts.length === 1 ? 'build' : 'builds'}
      </span>
    </div>
    {error && <div className="notice error">
      {error}
    </div>}
    {loading ? <div className="empty"><IconBrandTabnine className="spin" /> Loading builds...</div> : posts.length === 0 ? <div className="empty">
      <IconDevices2 size={34} />
      <h3>
        {query ? 'No matching build' : 'Nothing to show add a new build'}
      </h3>
      <p>
        {query ? 'Try a different search.' : 'Create a new build.'}
      </p>
      <button className="button button-dark" onClick={onCreate}>Start building <IconArrowBadgeRight size={16} /></button>
    </div> : <div className="post-grid">
      {currentposts.map((post, index) => {
        const totalwattage = (watts[post.cpu] || 0) + (watts[post.cpu_cooler] || 0) + (watts[post.graphic_card] || 0) + (watts[post.motherboard] || 0) + (watts[post.ram] || 0) + (watts[post.storage_drive] || 0);
       return (      
      <button className="post-card" key={post.id} onClick={() => onSelect(post)}>
        <div className={`card-cover cover-${index % 4}`}>
          {post.image_url ? <img src={post.image_url} alt="" /> : <div className="cover-decoration">
            {/* <span>✦</span>
            <span>✳</span> */}
            <img src="/part/cover.png" alt="" style={{ width: '50%', height: '50%', objectFit: 'contain', margin: 'auto' }} />
          </div>}
        </div>
        <div className="card-content">
          <div className="card-date">
            {new Date(post.created_at).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <h3>
            {post.build_name}  
          </h3>
          <div className="listdetail">
          <p>{post.cpu}</p>
          <p>{post.graphic_card}</p>
          </div>
          <div className="watt">{totalwattage} W</div>
          <div className="card-bottom">
            <span>See build</span>
            <IconArrowBadgeRight size={17} />
          </div>
        </div>
      </button>)}
      )}
    </div>
    }
    {totalpages > 1 && (
    <div className="pagination">
      <button className="button button-outline" disabled={currentpage === 1} onClick={() => setCurrentpage(1)}><IconChevronLeftPipe size={17} /></button>
      <button className="button button-outline" disabled={currentpage === 1} onClick={() => setCurrentpage(p => p - 1)}>
        Previous
      </button>
      <span> Page {currentpage} of {totalpages} </span>
      <button className="button button-outline" disabled={currentpage === totalpages} onClick={() => setCurrentpage(p => p + 1)}>
        Next page
      </button>
      <button className="button button-outline" disabled={currentpage === totalpages} onClick={() => setCurrentpage(totalpages)}><IconChevronRightPipe size={17} /></button>

  </div>
  )}
  </main>;
}
