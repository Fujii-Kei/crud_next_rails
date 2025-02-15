"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

const EditBookPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`).then((res) => {
      setTitle(res.data.title);
      setBody(res.data.body);
    });
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/books/${id}`, {
      book: { title, body },
    });
    router.push("/books"); // 更新後に一覧ページへリダイレクト
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Edit Book
      </Typography>
      <form onSubmit={handleUpdate}>
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
          Update
        </Button>
      </form>
    </Container>
  );
};

export default EditBookPage;
