import { app } from '.';

app.listen(process.env.PORT_SERVER, () => {
  console.warn('🚀 Server is running on PORT', process.env.PORT_SERVER);
});
