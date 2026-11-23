import React from 'react';
// import { ArrowRight, BookOpen, LoaderCircle, Plus, Search } from 'lucide-react';
import { IconArrowBadgeRight, IconBrandTabnine, IconDevices2, IconCirclePlus, IconSearch } from '@tabler/icons-react';

export default function PostList({
  posts,
  query,
  onQueryChange,
  loading,
  error,
  onCreate,
  onSelect
}) {
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
      {posts.map((post, index) => <button className="post-card" key={post.id} onClick={() => onSelect(post)}>
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
          <div className="card-bottom">
            <span>See build</span>
            <IconArrowBadgeRight size={17} />
          </div>
        </div>
      </button>)}
    </div>}
  </main>;
}
