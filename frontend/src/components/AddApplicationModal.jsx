import { useState } from "react";
import { useCreateApplicationMutation } from "../slices/apiSlice";
import toast from "react-hot-toast";

const initialForm = {
    company: "",
    role: "",
    status: "applied",
    job_url: "",
    notes: "",
    applied_date: "",
    follow_up_date: "",
};

function AddApplicationModal({ onClose }) {
    const [form, setForm] = useState(initialForm);
    const [createApplication, { isLoading }] = useCreateApplicationMutation();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.company || !form.role) return;

        const payload = {
            ...form,
            applied_date: form.applied_date || null,
            follow_up_date: form.follow_up_date || null,
        };

        try {
            const result = await createApplication(payload).unwrap();
            toast.success(`Added ${result.role} at ${result.company}`);
            onClose();
        } catch (err) {
            const data = err?.data;
            if (data && typeof data === "object") {
                const firstField = Object.keys(data)[0];
                const firstMessage = Array.isArray(data[firstField])
                    ? data[firstField][0]
                    : data[firstField];
                toast.error(`${firstField}: ${firstMessage}`);
            } else {
                toast.error(
                    "Failed to add application. Please check your input."
                );
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">
                    Add Application
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="company"
                        placeholder="Company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <input
                        name="role"
                        placeholder="Role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="wishlist">Wishlist</option>
                        <option value="applied">Applied</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <input
                        name="job_url"
                        placeholder="Job URL"
                        value={form.job_url}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <textarea
                        name="notes"
                        placeholder="Notes"
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        rows={3}
                    />
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs text-slate-500">
                                Applied date
                            </label>
                            <input
                                type="date"
                                name="applied_date"
                                value={form.applied_date}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="text-xs text-slate-500">
                                Follow-up date
                            </label>
                            <input
                                type="date"
                                name="follow_up_date"
                                value={form.follow_up_date}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded text-slate-600 hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? "Saving..." : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddApplicationModal;
