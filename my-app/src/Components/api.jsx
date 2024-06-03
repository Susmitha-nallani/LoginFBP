export const signUpUser = async (formData) => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up user");
    }

    const data = await response.json();
    console.log("User signed up successfully:", data);

    return data;
  } catch (error) {
    console.error("Error signing up user:", error);
    throw error;
  }
};
