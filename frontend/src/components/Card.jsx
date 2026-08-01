import { Draggable } from "@hello-pangea/dnd";

function Card({ application, index }) {
    return (
        <Draggable draggableId={String(application.id)} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-white rounded-md shadow p-3 ${
                        snapshot.isDragging ? "ring-2 ring-blue-400" : ""
                    }`}
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
