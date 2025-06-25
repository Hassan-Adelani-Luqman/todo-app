import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Trash2, Edit2, Plus, Search, Filter, GripVertical } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() === '') return
    
    const todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      priority: 'medium',
      dueDate: null,
      createdAt: new Date().toISOString(),
      order: todos.length
    }
    
    setTodos([...todos, todo])
    setNewTodo('')
  }

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id)
    setEditingText(text)
  }

  // Save edit
  const saveEdit = () => {
    if (editingText.trim() === '') return
    
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
    ))
    setEditingId(null)
    setEditingText('')
  }

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  // Update priority
  const updatePriority = (id, priority) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, priority } : todo
    ))
  }

  // Update due date
  const updateDueDate = (id, dueDate) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, dueDate } : todo
    ))
  }

  // Handle drag end
  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(filteredTodos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update the order in the original todos array
    const updatedTodos = todos.map(todo => {
      const newIndex = items.findIndex(item => item.id === todo.id)
      if (newIndex !== -1) {
        return { ...todo, order: newIndex }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  // Filter todos
  const filteredTodos = todos
    .filter(todo => {
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'active' && !todo.completed) || 
        (filter === 'completed' && todo.completed)
      
      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      
      return matchesFilter && matchesSearch
    })
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-orange-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  // Check if due date is overdue
  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">My To-Do List</CardTitle>
            <p className="text-gray-600 mt-2">Stay organized and productive</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Add new todo */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1"
              />
              <Button onClick={addTodo} className="px-4">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            {/* Search and filter controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                  size="sm"
                >
                  All ({todos.length})
                </Button>
                <Button
                  variant={filter === 'active' ? 'default' : 'outline'}
                  onClick={() => setFilter('active')}
                  size="sm"
                >
                  Active ({activeCount})
                </Button>
                <Button
                  variant={filter === 'completed' ? 'default' : 'outline'}
                  onClick={() => setFilter('completed')}
                  size="sm"
                >
                  Completed ({completedCount})
                </Button>
              </div>
            </div>

            {/* Todo list with drag and drop */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="todos">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {filteredTodos.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        {todos.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match your current filter.'}
                      </div>
                    ) : (
                      filteredTodos.map((todo, index) => (
                        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-md ${
                                todo.completed ? 'bg-gray-50 opacity-75' : 'bg-white'
                              } ${snapshot.isDragging ? 'shadow-lg rotate-1' : ''}`}
                            >
                              {/* Drag handle */}
                              <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                <GripVertical className="w-4 h-4 text-gray-400" />
                              </div>

                              {/* Checkbox */}
                              <Checkbox
                                checked={todo.completed}
                                onCheckedChange={() => toggleTodo(todo.id)}
                              />

                              {/* Priority indicator */}
                              <div className={`w-3 h-3 rounded-full ${getPriorityColor(todo.priority)}`} />

                              {/* Todo content */}
                              <div className="flex-1 min-w-0">
                                {editingId === todo.id ? (
                                  <div className="flex gap-2">
                                    <Input
                                      value={editingText}
                                      onChange={(e) => setEditingText(e.target.value)}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') saveEdit()
                                        if (e.key === 'Escape') cancelEdit()
                                      }}
                                      onBlur={saveEdit}
                                      autoFocus
                                      className="flex-1"
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <p className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                      {todo.text}
                                    </p>
                                    {todo.dueDate && (
                                      <p className={`text-sm ${isOverdue(todo.dueDate) ? 'text-red-500' : 'text-gray-500'}`}>
                                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Priority selector */}
                              {editingId !== todo.id && (
                                <Select value={todo.priority} onValueChange={(value) => updatePriority(todo.id, value)}>
                                  <SelectTrigger className="w-20 h-8">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Med</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}

                              {/* Due date input */}
                              {editingId !== todo.id && (
                                <Input
                                  type="date"
                                  value={todo.dueDate || ''}
                                  onChange={(e) => updateDueDate(todo.id, e.target.value)}
                                  className="w-32 h-8"
                                />
                              )}

                              {/* Action buttons */}
                              {editingId !== todo.id && (
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => startEditing(todo.id, todo.text)}
                                    className="p-2"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                  
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="sm" className="p-2 text-red-500 hover:text-red-700">
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Task</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to delete this task? This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteTodo(todo.id)}>
                                          Delete
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            {/* Clear completed button */}
            {completedCount > 0 && (
              <div className="flex justify-center pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-500 hover:text-red-700">
                      Clear Completed ({completedCount})
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear Completed Tasks</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove all completed tasks? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={clearCompleted}>
                        Clear All
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

