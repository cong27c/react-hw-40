import { useEffect, useState } from "react";
import "./App.css";
function App() {
  
  const [posts,setPosts] = useState([])
  const [filterPosts, setFilterPost] = useState([])
  const [page,setPage] = useState(1)
  const [limit,setLimit] = useState(25)
  const [skip, setSkip] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [loading,setLoading] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const pageLimit = 5

  useEffect(() => {
    setLoading(true)
    fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}`) 
    .then(res => res.json())
    .then(data =>{
      setPosts(data.posts)
      setTotalPage(Math.ceil(data.total / limit))
    })
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  },[skip,limit])



  const handlePage = (newPage) => {
    if (isNaN(newPage) || newPage < 1 || newPage > totalPage) return;
    newPage = Math.max(1,Math.min(newPage, totalPage))
    setPage(newPage)
    setSkip((newPage - 1) * limit)
  }




  const handleSearch = () => {
    if(searchInput && searchInput.length > 2) {
      const regex = new RegExp(searchInput)
      const filterPosts = posts.filter(item => regex.test(item.title.toLowerCase().trim()))
      setFilterPost(filterPosts)
    } else {
    setFilterPost([])
  }
}


  const displayPosts = filterPosts?.length > 0 ? filterPosts : posts
  


  const renderPageNumbers = () => {
    let pages = []
    let startPage = Math.max(1,page - Math.floor(pageLimit / 2))
    let endPage = Math.min(totalPage, startPage + pageLimit -1)
    if(endPage - startPage < pageLimit - 1) {
      startPage = Math.max(1, endPage - pageLimit + 1)
    }

    if (startPage > 1) {
      pages.push(<button key={1} onClick={() => handlePage(1)}>1</button>);
      if (startPage > 2) {
        pages.push(<span key="left-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button key={i} onClick={() => handlePage(i)} className={`page-btn ${page === i ? "active" : ""}  `}>
          {i}
        </button>
      );
    }
  
    if (endPage < totalPage) {
      if (endPage < totalPage - 1) {
        pages.push(<span key="right-ellipsis">...</span>);
      }
      pages.push(<button key={totalPage} onClick={() => handlePage(totalPage)}>{totalPage}</button>);
    }
    
    return pages
  }
  return (
    <div className="app">
      <h1>Danh sách bài viết</h1>

      {/* Search Input */}
       <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm bài viết..."
          onInput={(e) => {
            setSearchInput(e.target.value.trim())
            handleSearch()
          }}
        />
      </div>

      {/* Loading Overlay */}
      
        {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang tải dữ liệu...</p> 
        </div>
    )}

      {/* No Results Message */}
       {displayPosts.length === 0 && !loading && <p className="no-results">Không tìm thấy bài viết nào.</p>}

      {/* List of Posts */}
      <ul className="post-list">
         {displayPosts.map(post => 
        <li className="post-item" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          <div className="post-meta">
            <span className="views">👀 {post.views || 0}</span>
            <span className="likes">👍 {post.reactions?.likes || 0}</span>
            <span className="dislikes">👎 {post.reactions?.dislikes || 0}</span>
          </div>
          <div className="tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
          </div>
          </li>
          )}
          
      </ul>
      {/* Pagination */}
      {filterPosts.length === 0 && <div className="pagination-container">
        <div className="records-per-page">
          <label htmlFor="records">Hiển thị:</label>
          <select id="records" className="records-select" onChange={(e) => setLimit(Number(e.target.value))}>
            <option className="option-1" value="25">25</option>
            <option className="option-2" value="50">50</option>
            <option className="option-3" value="100">100</option>
            <option className="option-4" value="200">200</option>
          </select>
        </div>
        <div className="pagination" >
          <button className="page-btn prev" onClick={() => handlePage(page -1)} disabled={page === 1}>« Trước</button>
            {renderPageNumbers()}
          <button className="page-btn next" onClick={() => handlePage(page +1)} disabled={page === totalPage}>Sau »</button>
        </div>
      </div>}
    </div>
  );
}

export default App;



