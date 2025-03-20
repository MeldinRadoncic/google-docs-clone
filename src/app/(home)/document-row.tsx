import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";
import { SiGoogledocs } from "react-icons/si";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface DocumentRowProps {
    document: Doc<'documents'>;
}   


export const DocumentRow = ({ document }: DocumentRowProps) => {
    return (

        <TableRow key={document._id} className="cursor-pointer">
        <TableCell className="w-[50px]">
            <SiGoogledocs className="size-6 fill-blue-500" />
        </TableCell>
        <TableCell className="truncate">{document.title}</TableCell>
        <TableCell className="hidden md:flex items=center gap-2">
            {document.organizationId ? <Building2Icon className="size-4" /> : <CircleUserIcon className="size-4" />}
            {document.organizationId ? "Organization" : "Personal"}
        </TableCell>
        <TableCell className="hidden md:table-cell">
            {format(new Date(document._creationTime), "MMM dd, yyyy")}
        </TableCell>
        <TableCell className="w-[50px] text-right">
            <Button variant="ghost" size="icon">
                <MoreVertical className="size-4" />
            </Button>
        </TableCell>
    </TableRow>
    )
};