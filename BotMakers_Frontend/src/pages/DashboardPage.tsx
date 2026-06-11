import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Navbar from "../components/layout/Navbar";
import {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../api/tasks";
import { useAuthStore } from "../store/authStore";
import type { Task } from "../types/index";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN";
  const queryClient = useQueryClient();

  // Form State for Create & Edit
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [errorMsg, setErrorMsg] = useState("");

  // View Modal State
  const [viewingTaskId, setViewingTaskId] = useState<number | null>(null);

  // -- Queries --
  const { data: tasks, isLoading: tasksLoading } = useQuery(
    "tasks",
    fetchTasks,
  );

  // Query for individual task (only runs when viewingTaskId is not null)
  const { data: singleTask, isLoading: singleTaskLoading } = useQuery(
    ["task", viewingTaskId],
    () => fetchTaskById(viewingTaskId!),
    { enabled: !!viewingTaskId },
  );

  // -- Mutations --
  const createMutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      resetForm();
    },
    onError: (err: any) =>
      setErrorMsg(err.response?.data?.title || "Failed to create task"),
  });

  const updateMutation = useMutation(
    (params: { id: number; payload: any }) =>
      updateTask(params.id, params.payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
        resetForm();
      },
      onError: (err: any) =>
        setErrorMsg(err.response?.data?.title || "Failed to update task"),
    },
  );

  const deleteMutation = useMutation(deleteTask, {
    onSuccess: () => queryClient.invalidateQueries("tasks"),
  });

  // -- Handlers --
  const resetForm = () => {
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
    setStatus("PENDING");
    setErrorMsg("");
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg("Title is required");
      return;
    }

    if (editingTaskId) {
      updateMutation.mutate({
        id: editingTaskId,
        payload: { title, description, status },
      });
    } else {
      createMutation.mutate({ title, description, status: "PENDING" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8 animate-fade-up">
          <h1 className="font-display font-bold text-3xl text-slate-900">
            Task Dashboard
          </h1>
          <p className="text-slate-500 font-body text-sm mt-1">
            Manage your pending operations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Create / Edit Form */}
          <div className="md:col-span-1">
            <div className="card sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800">
                  {editingTaskId ? "Edit Task" : "New Task"}
                </h2>
                {editingTaskId && (
                  <button
                    onClick={resetForm}
                    className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                    placeholder="E.g., Design API"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field min-h-[100px] resize-y"
                    placeholder="Add details..."
                  />
                </div>

                {/* Show status dropdown only when editing */}
                {editingTaskId && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="input-field"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                )}

                {errorMsg && (
                  <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={
                    createMutation.isLoading || updateMutation.isLoading
                  }
                  className="btn-primary"
                >
                  {editingTaskId ? "Update Task" : "Add Task"}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Task List */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Your Tasks</h2>

            {tasksLoading ? (
              <p className="text-slate-500 text-sm">Loading tasks...</p>
            ) : tasks?.length === 0 ? (
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center">
                <p className="text-slate-500 font-medium">
                  No tasks found. Create one to get started.
                </p>
              </div>
            ) : (
              tasks?.map((task) => (
                <div
                  key={task.id}
                  className="section-card flex justify-between items-start"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-slate-900 text-lg">
                        {task.title}
                      </h3>
                      <span
                        className={`badge ${
                          task.status === "COMPLETED"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : task.status === "IN_PROGRESS"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-600 border-blue-200"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                      {task.description}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setViewingTaskId(task.id)}
                        className="text-xs px-3 py-1.5 rounded bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleEditClick(task)}
                        className="text-xs px-3 py-1.5 rounded bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* RBAC: Only Admin can delete */}
                  {isAdmin && (
                    <button
                      onClick={() => deleteMutation.mutate(task.id)}
                      disabled={deleteMutation.isLoading}
                      className="text-xs px-3 py-1.5 rounded bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* VIEW TASK MODAL */}
      {viewingTaskId && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative animate-fade-up">
            <button
              onClick={() => setViewingTaskId(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 font-bold"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Task Details (GET /api/v1/tasks/{viewingTaskId})
            </h2>

            {singleTaskLoading ? (
              <p className="text-slate-500 text-sm py-4">
                Fetching data from API...
              </p>
            ) : singleTask ? (
              <div className="space-y-4 text-sm font-mono">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p>
                    <span className="text-slate-400 font-bold">ID:</span>{" "}
                    <span className="text-slate-800">{singleTask.id}</span>
                  </p>
                  <p className="mt-2">
                    <span className="text-slate-400 font-bold">TITLE:</span>{" "}
                    <span className="text-indigo-600">{singleTask.title}</span>
                  </p>
                  <p className="mt-2">
                    <span className="text-slate-400 font-bold">DESC:</span>{" "}
                    <span className="text-slate-800">
                      {singleTask.description}
                    </span>
                  </p>
                  <p className="mt-2">
                    <span className="text-slate-400 font-bold">STATUS:</span>{" "}
                    <span className="text-slate-800">{singleTask.status}</span>
                  </p>
                  <p className="mt-2">
                    <span className="text-slate-400 font-bold">USER_ID:</span>{" "}
                    <span className="text-slate-800">{singleTask.userId}</span>
                  </p>
                  <p className="mt-2">
                    <span className="text-slate-400 font-bold">CREATED:</span>{" "}
                    <span className="text-slate-800">
                      {new Date(singleTask.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p className="mt-2">
                    <span className="text-slate-400 font-bold">UPDATED:</span>{" "}
                    <span className="text-slate-800">
                      {new Date(singleTask.updatedAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-red-500 py-4">Error loading task details.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
