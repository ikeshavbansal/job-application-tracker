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
        updateApplicationStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `applications/${id}/`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Application"],
        }),
        createApplication: builder.mutation({
            query: (body) => ({
                url: "applications/",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Application"],
        }),
    }),
});

export const {
    useGetApplicationsQuery,
    useUpdateApplicationStatusMutation,
    useCreateApplicationMutation,
} = apiSlice;
