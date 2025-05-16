import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
      providesTags: ['Todos'],
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
      async onQueryStarted(todo, { dispatch, queryFulfilled }) {
        const fakeId = Date.now();
        const patch = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            draft.unshift({ ...todo, id: fakeId });
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          todosApi.util.updateQueryData('getTodos', undefined, (draft) => {
            return draft.filter((todo) => todo.id !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...fields }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: fields,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todosApi;
