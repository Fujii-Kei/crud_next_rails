"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const NewBookPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/books", {
      book: { title, body },
    });
    router.push("/books"); // 作成後に一覧ページへリダイレクト
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create New Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Body"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create
        </Button>
      </form>
    </Container>
  );
};

export default NewBookPage;
