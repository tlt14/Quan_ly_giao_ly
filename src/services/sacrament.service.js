import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config";

export const sacramentApi = createApi({
    reducerPath: "sacramentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    tagTypes: ["Sacrament"],
    endpoints: (builder) => ({
        getAllSacrament: builder.query({
            query: () => `sacrament`,
            providesTags: ["Sacrament"],
        }),
        getSacrementByStudentId:builder.query({
            query: (id) => `sacrament/student/${id}`,
            providesTags: ["Sacrament"],
        }),
        addScaramentWithStudentId: builder.mutation({
            query: (data) => ({
                url: `sacrament`,
                method: "POST",
                body: data,
            }),
        }),
        updateSacrament: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `sacrament/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Sacrament"],
        })
    }),

})
export const {useGetAllSacramentQuery,useGetSacrementByStudentIdQuery,useAddScaramentWithStudentIdMutation,useUpdateSacramentMutation} = sacramentApi

