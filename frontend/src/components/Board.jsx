import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import Card from "./Card";
import BoardSkeleton from "./BoardSkeleton";
import {
    useGetApplicationsQuery,
    useUpdateApplicationStatusMutation,
} from "../slices/apiSlice";

const STATUSES = [
    { key: "wishlist", label: "Wishlist" },
    { key: "applied", label: "Applied" },
    { key: "interviewing", label: "Interviewing" },
    { key: "offer", label: "Offer" },
    { key: "rejected", label: "Rejected" },
];

function Board({ search, onCardClick }) {
    const { data, isLoading, error } = useGetApplicationsQuery(search);
    const [updateStatus] = useUpdateApplicationStatusMutation();
    const [updatingId, setUpdatingId] = useState(null);

    if (isLoading) return <BoardSkeleton />;
    if (error)
        return <p className="p-6 text-red-600">Error loading applications</p>;

    const handleDragEnd = async (result) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        setUpdatingId(draggableId);
        try {
            await updateStatus({
                id: draggableId,
                status: destination.droppableId,
            }).unwrap();
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto p-6">
                {STATUSES.map((s) => {
                    const cards = data.filter((a) => a.status === s.key);
                    return (
                        <Column
                            key={s.key}
                            id={s.key}
                            title={s.label}
                            count={cards.length}
                        >
                            {cards.map((a, index) => (
                                <Card
                                    key={a.id}
                                    application={a}
                                    index={index}
                                    onClick={onCardClick}
                                    isUpdating={updatingId === String(a.id)}
                                />
                            ))}
                        </Column>
                    );
                })}
            </div>
        </DragDropContext>
    );
}

export default Board;
