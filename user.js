userRouter.post("/signup", async (req, res) => {
    const { email, name, password } = req.body;
  
    const userSchema = z.object({
      email: z.string().email(),
      name: z.string().min(2),
      password: z.string().min(6),
    });
  
    const validation = userSchema.safeParse(req.body);
  
    if (!validation.success) {
      return res.status(400).json({ msg: "Validation error", errors: validation.error });
    }
  
    try {
      await userModel.create({ email, name, password });
      res.status(201).json({ msg: "User signed up successfully" });
    } catch (err) {
      res.status(500).json({ msg: "Error in user creation", error: err.message });
    }
  });
  
  // User signin
  userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email, password });
      if (!user) {
        return res.status(401).json({ msg: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id }, JWT_PASS);
      res.json({ msg: "Login successful", token });
    } catch (err) {
      res.status(500).json({ msg: "Error during login", error: err.message });
    }
  });
  
  // App setup
//   const app = express();
//   app.use(express.json());
//   app.use("/api/v1/user", userRouter);
//   app.use("/api/v2/contractor", contractorRouter);
  
//   app.listen(3000, () => {
//     console.log("The website is running on port 3000");
//   });