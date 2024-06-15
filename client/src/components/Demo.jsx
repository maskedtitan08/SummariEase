import { useState, useEffect } from "react"
import { copy, linkIcon, loader, tick } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article"
import toast from "react-hot-toast";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "", })
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("")

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      console.log(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
    toast.success("URL Copied Successfully");
  }

  return (
    <section className="mt-16 w-full max-w-2xl">
      <div className="flex flex-col w-full">
        <form className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} alt="linkIcon" className="absolute left-0 my-2 ml-3 w-5" />
          <input type="url" placeholder="Enter URL of your Article" value={article.url} onChange={(e) => { setArticle({ ...article, url: e.target.value }) }} required className="url_input peer" />
          <button type="submit" className="submit_btn peer-focus:border-gray-800 peer-focus:text-gray-800">Submit</button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mt-3">
          {allArticles.map((item, index) => (
            <div key={`link-${index}`} onClick={() => { setArticle(item) }} className="link_card">
              <div className="copy_btn" onClick={()=> handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
              </div>
              <p className="flex-1 font-satoshi text-blue-800 font-medium text-sm truncate">{item.url}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <>
            <img src={loader} alt="loader" className="w-10 h-20 object-contain " />
            <h4 className="font-inter font-bold text-black text-center"> Will take few seconds to load !</h4>
          </>
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Error occured while fetching data !! <br />
            <span className="font-satoshi font-normal text-gray-800"> {error?.data?.error} </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 items-center">
              <h2 className="font-satoshi font-extrabold text-gray-800 text-2xl">
                Article <span className="orange_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-800">{article.summary}</p>
              </div>
            </div>
          )
        )}

      </div>
    </section>
  )
}

export default Demo












// import { useState, useEffect } from "react";
// import { copy, linkIcon, loader, tick } from "../assets";
// import { useLazyGetSummaryQuery, useLazyExtractArticleQuery } from "../services/article";
// import toast from "react-hot-toast";

// const Demo = () => {
//   const [article, setArticle] = useState({ url: "", summary: "" });
//   const [extractedData,setExtractedData] = useState({});
//   const [allArticles, setAllArticles] = useState([]);
//   const [copied, setCopied] = useState("");
//   const [isSummarizing, setIsSummarizing] = useState(true); // Flag to track whether to summarize or extract

//   // RTK lazy queries
//   const [getSummary, { error: summaryError, isFetching: isFetching }] = useLazyGetSummaryQuery();
//   const [extractArticle, { error: extractError, isFetching: isExtracting }] = useLazyExtractArticleQuery();

//   // Load data from localStorage on mount
//   useEffect(() => {
//     const articlesFromLocalStorage = JSON.parse(
//       localStorage.getItem("articles")
//     );

//     if (articlesFromLocalStorage) {
//       setAllArticles(articlesFromLocalStorage);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isSummarizing) {
//       const { data } = await getSummary({ articleUrl: article.url });
//       if (data?.summary) {
//         const newArticle = { ...article, summary: data.summary };
//         const updatedAllArticles = [newArticle, ...allArticles];

//         // update state and local storage
//         setArticle(newArticle);
//         setAllArticles(updatedAllArticles);
//         localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
//       }
//     } else {
//       const { data } = await extractArticle({ articleUrl: article.url });
//       if (data) {
//         const newArticle = { ...article, summary: data.content }; // Assuming 'content' is the field containing extracted article content
//         const updatedAllArticles = [newArticle, ...allArticles];

//         // update state and local storage
//         setArticle(newArticle);
//         setAllArticles(updatedAllArticles);
//         localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
//       }
//     }
//   };

//   const handleCopy = (copyUrl) => {
//     setCopied(copyUrl);
//     navigator.clipboard.writeText(copyUrl);
//     setTimeout(() => setCopied(false), 3000);
//     toast.success("URL Copied Successfully");
//   };

//   return (
//     <section className="mt-16 w-full max-w-2xl">
//       <div className="flex flex-col w-full">
//         <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
//           <img src={linkIcon} alt="linkIcon" className="absolute left-0 my-2 ml-3 w-5" />
//           <input
//             type="url"
//             placeholder="Enter URL of your Article"
//             value={article.url}
//             onChange={(e) => setArticle({ ...article, url: e.target.value })}
//             required
//             className="url_input peer"
//           />
//           <div className="flex ">
//             {/* Button to toggle between summarizing and extracting */}
//             <button type="button" onClick={() => setIsSummarizing(true)} className={` peer-focus:border-gray-800 peer-focus:text-gray-800 ${isSummarizing ? 'bg-blue-500 text-white' : ''}`}>
//               Summarize
//             </button>
//             <button type="button" onClick={() => setIsSummarizing(false)} className={` peer-focus:border-gray-800 peer-focus:text-gray-800 ${!isSummarizing ? 'bg-blue-500 text-white' : ''}`}>
//               Extract
//             </button>
//           </div>
//           {/* <button type="submit" className="submit_btn peer-focus:border-gray-800 peer-focus:text-gray-800">Submit</button> */}
//         </form>
//         {/* Display list of articles */}
//         <div className="flex flex-col gap-1 max-h-60 overflow-y-auto mt-3">
//           {allArticles.map((item, index) => (
//             <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
//               <div className="copy_btn" onClick={() => handleCopy(item.url)}>
//                 <img src={copied === item.url ? tick : copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
//               </div>
//               <p className="flex-1 font-satoshi text-blue-800 font-medium text-sm truncate">{item.url}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Display summary or extracted article */}
//       <div className="my-10 max-w-full flex justify-center items-center">
//         {isSummarizing ? (
//           <>
//             {isSummarizing && (
//               <img src={loader} alt="loader" className="w-10 h-20 object-contain " />
//             )}
//             {summaryError ? (
//               <p className="font-inter font-bold text-black text-center">
//                 Error occurred while fetching summary !! <br />
//                 <span className="font-satoshi font-normal text-gray-800"> {summaryError?.data?.error} </span>
//               </p>
//             ) : (
//               article.summary && (
//                 <div className="flex flex-col gap-3 items-center">
//                   <h2 className="font-satoshi font-extrabold text-gray-800 text-2xl">
//                     Article <span className="orange_gradient">Summary</span>
//                   </h2>
//                   <div className="summary_box">
//                     <p className="font-inter font-medium text-sm text-gray-800">{article.summary}</p>
//                   </div>
//                 </div>
//               )
//             )}
//           </>
//         ) : (
//           <>
//             {isExtracting && (
//               <img src={loader} alt="loader" className="w-10 h-20 object-contain " />
//             )}
//             {extractError ? (
//               <p className="font-inter font-bold text-black text-center">
//                 Error occurred while extracting article !! <br />
//                 <span className="font-satoshi font-normal text-gray-800"> {extractError?.data?.error} </span>
//               </p>
//             ) : (
//               article.summary && (
//                 <div className="flex flex-col gap-3 items-center">
//                   <h2 className="font-satoshi font-extrabold text-gray-800 text-2xl">
//                     Extracted <span className="orange_gradient">Article</span>
//                   </h2>
//                   <div className="summary_box">
//                     <p className="font-inter font-medium text-sm text-gray-800">{article.title}</p>
//                     <p className="font-inter font-medium text-sm text-gray-800">{article.author}</p>
//                     <p className="font-inter font-medium text-sm text-gray-800">{article.published}</p>
//                     <p className="font-inter font-medium text-sm text-gray-800">{article.description}</p>
//                     <p className="font-inter font-medium text-sm text-gray-800">{article.content}</p>
//                   </div>
//                 </div>
//               )
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Demo;
