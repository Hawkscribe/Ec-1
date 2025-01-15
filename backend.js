// App setup
const app = express();
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v2/contractor", contractorRouter);

app.listen(3000, () => {
  console.log("The website is running on port 3000");
});