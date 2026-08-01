import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
    tagTypes: ["Application"],
    endpoints: (builder) => ({
        getApplications: builder.query({
            query: () => "applications/",
            providesTags: ["Application"],
        }),
    }),
});

export const { useGetApplicationsQuery } = apiSlice;
