import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  FileText, 
  Image, 
  FileIcon, 
  Video,
  Upload,
  Eye,
  Download
} from 'lucide-react';
import { Note } from '../../hooks/usePhysicalHealthData';

interface NotesProps {
  notes: Note[];
  isAdmin: boolean;
  isEditMode: boolean;
  onAddNote: (type: 'text' | 'image' | 'pdf' | 'video' | 'file', title: string, content: string, fileName?: string, fileSize?: string) => void;
  onRemoveNote: (id: string) => void;
  onUpdateNote: (id: string, field: string, value: string) => void;
}

const Notes: React.FC<NotesProps> = ({
  notes,
  isAdmin,
  isEditMode,
  onAddNote,
  onRemoveNote,
  onUpdateNote
}) => {
  const [showAddNote, setShowAddNote] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({
    type: 'text' as 'text' | 'image' | 'pdf' | 'video' | 'file',
    title: '',
    content: ''
  });

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      onAddNote(newNote.type, newNote.title, newNote.content);
      setNewNote({ type: 'text', title: '', content: '' });
      setShowAddNote(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'pdf' | 'video' | 'file') => {
    const file = event.target.files?.[0];
    if (file) {
      const fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      const fileName = file.name;
      
      // For demo purposes, we'll just store the file name and size
      // In a real application, you would upload the file to a server
      const fileUrl = URL.createObjectURL(file);
      
      onAddNote(type, fileName, fileUrl, fileName, fileSize);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'pdf': return <FileIcon className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'file': return <FileIcon className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'image': return 'text-green-600 bg-green-50 border-green-200';
      case 'pdf': return 'text-red-600 bg-red-50 border-red-200';
      case 'video': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'file': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderNoteContent = (note: Note) => {
    if (note.type === 'text') {
      return (
        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{note.content}</p>
        </div>
      );
    } else if (note.type === 'image') {
      return (
        <div className="space-y-2">
          <img 
            src={note.content} 
            alt={note.title}
            className="max-w-full h-auto rounded-lg border"
          />
          {note.fileName && (
            <p className="text-sm text-gray-600">
              {note.fileName} ({note.fileSize})
            </p>
          )}
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          {getTypeIcon(note.type)}
          <div className="flex-1">
            <p className="font-medium">{note.fileName || note.title}</p>
            {note.fileSize && (
              <p className="text-sm text-gray-600">{note.fileSize}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-600 hover:text-blue-800">
              <Eye className="w-4 h-4" />
            </button>
            <button className="text-green-600 hover:text-green-800">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }
  };

  if (notes.length === 0 && (!isAdmin || !isEditMode)) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Additional Notes</h2>
        {isAdmin && isEditMode && (
          <button
            onClick={() => setShowAddNote(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </button>
        )}
      </div>

      {/* Add Note Modal */}
      {showAddNote && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Add New Note</h3>
          
          {/* Note Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Note Type</label>
            <div className="flex flex-wrap gap-2">
              {[
                { type: 'text', label: 'Text Note', icon: FileText },
                { type: 'image', label: 'Image', icon: Image },
                { type: 'pdf', label: 'PDF', icon: FileIcon },
                { type: 'video', label: 'Video', icon: Video },
                { type: 'file', label: 'File', icon: FileIcon }
              ].map(({ type, label, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => setNewNote({ ...newNote, type: type as any })}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    newNote.type === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {newNote.type === 'text' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter note title..."
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter note content..."
                />
              </div>
            </>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload {newNote.type}</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, newNote.type as any)}
                  accept={
                    newNote.type === 'image' ? 'image/*' :
                    newNote.type === 'pdf' ? '.pdf' :
                    newNote.type === 'video' ? 'video/*' : '*'
                  }
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </label>
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={handleAddNote}
              disabled={!newNote.title.trim() || (!newNote.content.trim() && newNote.type === 'text')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Note
            </button>
            <button
              onClick={() => {
                setShowAddNote(false);
                setNewNote({ type: 'text', title: '', content: '' });
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className={`border rounded-lg p-4 ${getTypeColor(note.type)}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(note.type)}
                {editingNote === note.id ? (
                  <input
                    type="text"
                    value={note.title}
                    onChange={(e) => onUpdateNote(note.id, 'title', e.target.value)}
                    className="font-semibold bg-transparent border-b border-current focus:outline-none"
                  />
                ) : (
                  <h3 className="font-semibold">{note.title}</h3>
                )}
                <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                  {note.type.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {formatDate(note.createdAt)}
                </span>
                {isAdmin && isEditMode && (
                  <>
                    {editingNote === note.id ? (
                      <button
                        onClick={() => setEditingNote(null)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingNote(note.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveNote(note.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="mt-3">
              {editingNote === note.id && note.type === 'text' ? (
                <textarea
                  value={note.content}
                  onChange={(e) => onUpdateNote(note.id, 'content', e.target.value)}
                  rows={4}
                  className="w-full p-2 bg-white bg-opacity-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                renderNoteContent(note)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes; 