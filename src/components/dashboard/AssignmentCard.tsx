interface Props {
    title: string;
    subject: string;
    date: string;
    priority: string;
}

function AssignmentCard({
                            title,
                            subject,
                            date,
                            priority,
                        }: Props) {
    return (
        <div className="flex gap-4">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700">
                {date}
            </div>

            <div>
                <h4 className="font-bold">
                    {title}
                </h4>

                <p className="text-slate-500 text-sm">
                    {subject}
                </p>

                <span className="inline-block mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {priority}
        </span>
            </div>
        </div>
    );
}

export default AssignmentCard;