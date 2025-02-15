"use client";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Book = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
};

const BookIndex = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/books") // APIから本を取得
      .then((res) => res.json())
      .then((books) => setBooks(books));
  }, []);

  const selectedBook = books.find((book) => book.id === selectedBookId);

  const handleShowDetails = (id?: number) => setSelectedBookId(id || null);

  const deleteBook = async (id: number) => {
    await axios.delete(`http://localhost:3000/books/${id}`);
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <>
      <Typography variant="h4" align="center">
        Book List
      </Typography>
      <Button
        variant="contained"
        color="success"
        onClick={() => router.push("/books/new")}
        sx={{ marginBottom: 2 }}
      >
        Create New Book
      </Button>
      <TableContainer>
        <Table sx={{ maxWidth: 650 }} align="center">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
              <TableCell colSpan={3}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => {
              return (
                <TableRow key={book.id}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.body}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleShowDetails(book.id)}
                    >
                      SHOW
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => router.push(`/books/${book.id}/edit`)}
                    >
                      EDIT
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      startIcon={<DeleteForeverIcon />}
                      onClick={() => deleteBook(book.id)}
                    >
                      DESTROY
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedBook && (
        <Modal open>
          <Box /* モーダルの表示 */></Box>
        </Modal>
      )}
    </>
  );
};

export default BookIndex;
