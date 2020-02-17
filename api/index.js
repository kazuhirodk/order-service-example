import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import bookRoutes from './server/routes/BookRoutes';
import userRoutes from './server/routes/UserRoutes';
import offerRoutes from './server/routes/OfferRoutes';

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/v1/books', bookRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/offers', offerRoutes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
