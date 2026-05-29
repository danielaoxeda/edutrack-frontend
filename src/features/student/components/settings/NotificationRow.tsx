interface Props {
    title: string;
    description: string;
    email: boolean;
    mobile: boolean;
}

function NotificationRow({
                             title,
                             description,
                             email,
                             mobile,
                         }: Props) {
    return (
        <tr className="border-b border-slate-100">
            <td className="py-6">
                <p className="font-semibold">
                    {title}
                </p>

                <p className="text-sm text-slate-500">
                    {description}
                </p>
            </td>

            <td className="text-center">
                <input
                    type="checkbox"
                    defaultChecked={email}
                    className="w-5 h-5"
                />
            </td>

            <td className="text-center">
                <input
                    type="checkbox"
                    defaultChecked={mobile}
                    className="w-5 h-5"
                />
            </td>
        </tr>
    );
}

export default NotificationRow;