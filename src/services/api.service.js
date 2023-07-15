import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { refreshAccessToken } from "../utils/Auth";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { API_URL } from "../config";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers, { getState }) => {
      const accessToken = Cookies.get("accessToken");

      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const expiresAt = decodedToken.exp * 1000; // Thời gian hết hạn tính bằng milisecond
        const now = Date.now(); // Thời gian hiện tại tính bằng milisecond

        if (now > expiresAt) {
          const refreshToken = Cookies.get("refreshTkn");
          const newAccessToken = await refreshAccessToken(refreshToken);

          if (newAccessToken) {
            headers.set("Authorization", `Bearer ${newAccessToken}`);
            Cookies.set("accessToken", newAccessToken);
          } else {
            // Handle failed token refresh, e.g., redirect to login page
            Cookies.remove("accessToken");
            Cookies.remove("refreshTkn");
            Cookies.remove("user");
            window.location.href = "/";
          }
        } else {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
    
  }),
  endpoints: (builder) => ({
    //   auth service
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "auth/signup",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    getAuth: builder.query({
      query: (id) => `auth/glv/${id}`,
    }),
    logout: builder.mutation({
      query: () => ({
        url: `auth/logout`,
        method: "PUT",
      }),
    }),
    // Class service methods
    getAllCourse: builder.query({
      query: () => `course`,
      providesTags: ["Course"],
    }),
    getAllGradeByCourseId: builder.query({
      query: (id) => `grade/course/${id}`,
      providesTags: ["Grade"],
    }),
    getAllClassByGradeId: builder.query({
      query: (id) => `classes/grade/${id}`,
      providesTags: ["Class"],
    }),
    updateCourse: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `course/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `course/complete/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Course"],
    }),
    updateGrade: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `grade/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Grade"],
    }),
    deleteGrade: builder.mutation({
      query: ({ id }) => ({
        url: `grade/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Grade"],
    }),
    updateClass: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `classes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Class"],
    }),
    deleteClass: builder.mutation({
      query: ({ id }) => ({
        url: `classes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Class"],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: `course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    addGrade: builder.mutation({
      query: (data) => ({
        url: `grade`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Grade"],
    }),
    addClass: builder.mutation({
      query: (data) => ({
        url: `classes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Class"],
    }),
    //   glv service
    getAllGLV: builder.query({
      query: (id) => `glv`,
      providesTags: ["glvs"],
    }),
    addGLV: builder.mutation({
      query: (data) => ({
        url: `glv`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["glvs"],
    }),
    updateGLV: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `glv/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["glvs"],
    }),
    deleteGLV: builder.mutation({
      query: ({ id }) => ({
        url: `glv/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["glvs"],
    }),
    // user service
    getProfile: builder.query({
      query: (id) => `auth/${id}`,
      providesTags: ["auth"],
    }),
  }),
});
export const {
  useLoginMutation,
  useSignupMutation,
  useGetAllCourseQuery,
  useGetAllGradeByCourseIdQuery,
  useGetAllClassByGradeIdQuery,
  useUpdateCourseMutation,
  useUpdateGradeMutation,
  useUpdateClassMutation,
  useAddCourseMutation,
  useAddGradeMutation,
  useAddClassMutation,
  useLazyGetAllGradeByCourseIdQuery,
  useGetAllGLVQuery,
  useAddGLVMutation,
  useUpdateGLVMutation,
  useDeleteGLVMutation,
  useGetProfileQuery,
  useGetAuthQuery,
  useLogoutMutation,
  useDeleteClassMutation,
  useDeleteGradeMutation,
  useDeleteCourseMutation,
} = api;
