import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const NoteCard = ({ note, onDelete, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    content: note.content,
  });

  const handleEditChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    onUpdate(note._id, editedNote);
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ minHeight: 150 }}>
        <CardContent>
          <Typography variant="h6">{note.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {note.content}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton onClick={() => setOpen(true)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(note._id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Note</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={editedNote.title}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="content"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={editedNote.content}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoteCard;
