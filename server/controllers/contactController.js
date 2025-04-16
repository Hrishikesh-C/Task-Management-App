export const sendMessage = (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    // Store in DB or send via email
    console.log("Contact message:", { name, email, message });
    res.status(200).json({ message: "Message received!" });
  };
  