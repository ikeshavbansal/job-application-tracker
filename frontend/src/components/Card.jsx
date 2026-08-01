import { Draggable } from "@hello-pangea/dnd";

function Card({ application, index, onClick, isUpdating }) {
    return (
        <Draggable draggableId={String(application.id)} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick(application)}
                    className={`bg-white rounded-md shadow p-3 cursor-pointer hover:shadow-md transition-all ${
                        snapshot.isDragging ? "ring-2 ring-blue-400" : ""
                    } ${isUpdating ? "opacity-50" : ""}`}
                >
                    <p className="font-medium text-slate-800">
                        {application.role}
                    </p>
                    <p className="text-sm text-slate-500">
                        {application.company}
                    </p>
                    {application.follow_up_date && (
                        <p className="text-xs text-slate-400 mt-1">
                            Follow up: {application.follow_up_date}
                        </p>
                    )}
                </div>
            )}
        </Draggable>
    );
}

export default Card;
