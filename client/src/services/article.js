import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            // encodeURIComponent() function encodes special characters that may be present in the parameter values
            // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=6`,
            // query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3&lang=en`,

        }),
    }),
})

export const { useLazyGetSummaryQuery } = articleApi 
// used lazy keyword because we want to trigger the hook when we enter the url








// // Article.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

// export const articleApi = createApi({
//     reducerPath: 'articleApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
//         prepareHeaders: (headers) => {
//             headers.set('X-RapidAPI-Key', rapidApiKey);
//             headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

//             return headers;
//         },
//     }),
//     endpoints: (builder) => ({
//         getSummary: builder.query({
//             query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=6`,
//         }),
//         // Define the new endpoint
//         extractArticle: builder.query({
//             query: (params) => `extract?url=${encodeURIComponent(params.articleUrl)}`,
//         }),
//     }),
// });

// export const { useLazyGetSummaryQuery, useLazyExtractArticleQuery } = articleApi;
// // Include the new hook for the new endpoint
