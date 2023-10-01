import express from 'express';
import {initTRPC} from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';

const app = express();
const PORT = 3000;
app.use(cors());

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

interface Todo {
    id: string;
    content: string;
}

const todoList: Todo[] = [
    {
        id: '1',
        content: "Description 1"
    },
    {
        id: '2',
        content: "Description 2"
    },
    {
        id: '3',
        content: "Description 3"
    }
];

const appRouter = router({
    test: publicProcedure.query(() => {
        return "TEST TRPC";
    }),
    getTodos: publicProcedure.query(() => {
        return todoList;
    }),
})

app.use('/trpc', trpcExpress.createExpressMiddleware({router: appRouter}));

app.listen(PORT);

export type AppRouter = typeof appRouter;