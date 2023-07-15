import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../config';


export const studentApi = createApi({
    reducerPath: 'studentApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => `students`,
        }),
        getAllStudentByClassId: builder.query({
            query: (id) => `students/${id}`,
            providesTags: ['Students'],
        }),
        addStudent: builder.mutation({
            query: (data) => ({
                url: `students`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Students'],
        }),
        updateStudent: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `students/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Students'],
        }),
        deleteStudent: builder.mutation({
            query: ({ id }) => ({
                url: `students/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Students'],
        }),
        getInfoStudent: builder.query({
            query: (id) => `students/info/${id}`,
        })
    })

})

export const { useGetAllStudentByClassIdQuery , useAddStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
    useGetAllQuery,
    useGetInfoStudentQuery
} = studentApi