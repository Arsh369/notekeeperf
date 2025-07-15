import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import NoteCard from "../components/NoteCard";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data);
    } catch (err) {
      alert("Failed to fetch notes");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/notes", form);
      setNotes([res.data, ...notes]);
      setForm({ title: "", content: "" });
    } catch (err) {
      alert("Failed to create note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      alert("Failed to delete note");
    }
  };

  const handleUpdate = async (id, updatedNote) => {
    try {
      const res = await API.put(`/notes/${id}`, updatedNote);
      setNotes(notes.map((n) => (n._id === id ? res.data : n)));
    } catch (err) {
      alert("Failed to update note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user.name}
        </Typography>
        <Box mt={4} display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
        </Box>

        <form onSubmit={handleCreate}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Content"
            name="content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 1 }}>
            Add Note
          </Button>
        </form>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          {notes
            .filter(
              (note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note._id}>
                <NoteCard
                  note={note}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
