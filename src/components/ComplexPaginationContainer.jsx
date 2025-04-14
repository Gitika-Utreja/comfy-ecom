import { useLoaderData, useNavigate, useLocation } from "react-router-dom"
export default function ComplexPaginationContainer() {
    const {orders, meta } = useLoaderData();
    const {pageCount, page} = meta.pagination;
    const {search, pathname} = useLocation();
    const navigate = useNavigate();
    const handlePageChange = (pageNumber) => {
      const searchParams = new URLSearchParams(search);
      searchParams.set('page', pageNumber);
      navigate(`${pathname}?${searchParams.toString()}`);
    };
    const addPageButton = ({pageNumber, activeClass}) =>{
      return(
        <button className={`btn btn-sm join-item sm:btn-md border-none ${activeClass ? 'bg-base-300 border-base-300' : '' } `} 
        key={pageNumber} onClick={()=>handlePageChange(pageNumber)}
         >{pageNumber}</button>
      );
    };
    const renderPageButton = () =>{
      const pageButton = [];
      pageButton.push(addPageButton({pageNumber:1, activeClass: page ===1}));
      if(page>2){
        pageButton.push(<button className="btn btn-sm join-item sm:btn-md" key='dots-1' > ... </button>);
      }

      if(page!== 1 && page!==pageCount){
        pageButton.push(addPageButton({pageNumber:page, activeClass:true}));
      }
      if(page<pageCount-1){
        pageButton.push(<button className="btn btn-sm join-item sm:btn-md" key='dots-2' >...</button>)
      }
      pageButton.push(addPageButton({pageNumber:pageCount , activeClass:page === pageCount}));
      return pageButton;
    }
    if(pageCount<2) return null;
  return (
    <div className="mt-16 flex justify-end"> 
      <div className="join">
        <button
          className="btn btn-sm sm:btn-md join-item"
        onClick={() =>{
          let prevPage = page-1;
          if(prevPage<1) prevPage = pageCount;
          handlePageChange(prevPage);
        }} >Prev</button>
        {renderPageButton()}
        <button 
          className="btn btn-sm sm:btn-md join-item"
        onClick={() =>{
          let nextPage = page+1;
          if(nextPage>pageCount) nextPage = 1;
          handlePageChange(nextPage);
        }} >Next</button>
      </div>
    </div>
  )
}
