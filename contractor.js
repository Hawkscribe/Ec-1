const express = require("express");
const { z } = require("zod");

const contractorRouter = express.Router();
const userRouter = express.Router();

// Contractor signup
contractorRouter.post("/signup", async (req, res) => {
  const { email, name, mobileno } = req.body;

  const contractorSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2),
    mobileno: z.number().min(1000000000),
  });

  const validation = contractorSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({ msg: "Validation error", errors: validation.error });
  }

  try {
    await contractorModel.create({ email, name, mobileno });
    res.status(201).json({ msg: "Contractor signed up successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error in contractor creation", error: err.message });
  }
});

// Contractor signin
contractorRouter.post("/signin", async (req, res) => {
  const { email, mobileno } = req.body;

  try {
    const contractor = await contractorModel.findOne({ email, mobileno });
    if (!contractor) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: contractor._id }, JWT_PASS);
    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: "Error during login", error: err.message });
  }
});
