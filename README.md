# My To-Do List Application

A modern, feature-rich To-Do application built with React, Tailwind CSS, and shadcn/ui components. This application provides a comprehensive task management solution with advanced features like drag-and-drop reordering, priority levels, due dates, and more.

## Features

### Core Functionality
- ✅ **Add New To-Do**: Create new tasks with a simple input field
- ✅ **View To-Do List**: Display all tasks in a clean, organized list
- ✅ **Mark Complete/Incomplete**: Toggle task completion status with checkboxes
- ✅ **Edit To-Do Text**: Double-click or use edit button to modify task text
- ✅ **Delete To-Do**: Remove tasks with confirmation modal
- ✅ **Persist Data**: All data is saved to browser's localStorage

### Advanced Features
- ✅ **Filter To-Dos**: Filter by All, Active, or Completed tasks
- ✅ **Clear Completed**: Remove all completed tasks with confirmation
- ✅ **Search To-Dos**: Real-time search through task text
- ✅ **Drag-and-Drop Reordering**: Reorder tasks by dragging
- ✅ **Priority Levels**: Assign Low, Medium, or High priority with color indicators
- ✅ **Due Dates**: Set and display due dates with overdue highlighting
- ✅ **Confirmation Modals**: Prevent accidental deletions

### UI/UX Features
- 🎨 **Modern Design**: Clean, minimalist interface with Tailwind CSS
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile
- 🎯 **Intuitive**: Easy-to-use interface with clear visual feedback
- 🌈 **Color-Coded**: Priority levels and completion status are visually distinct
- ⚡ **Fast**: Optimized performance with React and Vite

## Technology Stack

- **Frontend**: React 19.1.0
- **Styling**: Tailwind CSS 4.1.7
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Drag & Drop**: react-beautiful-dnd
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Getting Started

### Prerequisites
- Node.js (version 20 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm run build
```

The built files will be available in the `dist` directory.

## Usage

### Adding Tasks
1. Type your task in the "Add a new task..." input field
2. Press Enter or click the "Add Task" button
3. The task will appear in your list with default medium priority

### Managing Tasks
- **Complete**: Click the checkbox next to any task
- **Edit**: Click the edit icon (pencil) or double-click the task text
- **Delete**: Click the delete icon (trash) and confirm in the modal
- **Set Priority**: Use the dropdown to select Low, Medium, or High priority
- **Set Due Date**: Use the date picker to assign a due date
- **Reorder**: Drag tasks by the grip handle to reorder them

### Filtering and Searching
- **Filter**: Use the All, Active, or Completed buttons to filter tasks
- **Search**: Type in the search box to find specific tasks
- **Clear Completed**: Use the "Clear Completed" button to remove all finished tasks

## Data Persistence

All task data is automatically saved to your browser's localStorage, ensuring your tasks persist between sessions. No server or account required!

## Browser Compatibility

This application works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- localStorage API

## Contributing

This project was built as a demonstration of modern React development practices. Feel free to fork and modify for your own use!

## License

This project is open source and available under the MIT License.

