import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
    tagTypes: ["Application"],
    endpoints: (builder) => ({
        getApplications: builder.query({
            query: (search = "") =>
                `applications/${
                    search ? `?search=${encodeURIComponent(search)}` : ""
                }`,
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
        updateApplication: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `applications/${id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Application"],
        }),
        deleteApplication: builder.mutation({
            query: (id) => ({
                url: `applications/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Application"],
        }),
    }),
});

export const {
    useGetApplicationsQuery,
    useUpdateApplicationStatusMutation,
    useCreateApplicationMutation,
    useUpdateApplicationMutation,
    useDeleteApplicationMutation,
} = apiSlice;
