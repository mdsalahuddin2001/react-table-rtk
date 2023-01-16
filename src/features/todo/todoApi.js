import { apiSlice } from "../api/apiSlice";

export const todoApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: (data) => {
                const { todoId, pageSize } = data || {};
                if (pageSize) {
                    return `todos/?_limit=${pageSize}`;
                } else return "todos";
            },
        }),
    }),
});

export const { useGetTodosQuery } = todoApi;
