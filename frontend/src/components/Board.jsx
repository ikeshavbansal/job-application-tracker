import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import Card from "./Card";
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

function Board() {
    const { data, isLoading, error } = useGetApplicationsQuery();
    const [updateStatus] = useUpdateApplicationStatusMutation();

    if (isLoading) return <p className="p-6">Loading...</p>;
    if (error)
        return <p className="p-6 text-red-600">Error loading applications</p>;

    const handleDragEnd = (result) => {
        const { destination, draggableId } = result;

        if (!destination) return; // dropped outside any column

        const newStatus = destination.droppableId;
        updateStatus({ id: draggableId, status: newStatus });
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
