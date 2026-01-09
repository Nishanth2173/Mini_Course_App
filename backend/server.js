require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const courseRoutes = require('./src/routes/course.routes');
const subscriptionRoutes = require('./src/routes/subscription.route');
const myCourseRoutes = require('./src/routes/myCourse.route');
const app = express();

app.use(cors({
  origin:'*',
  methods:['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization']
}));
app.options('*', cors());
app.use(express.json());



app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/subscriptions", subscriptionRoutes);
app.use("/my-courses", myCourseRoutes);

// app.use('/', (req, res) => {
//     res.send('Api is running');
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);

// });

module.exports = app;