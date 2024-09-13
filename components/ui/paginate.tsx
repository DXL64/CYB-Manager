import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { InputProps } from "./input";
import React from "react";

const Paginate = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            // <input
            //     type={type}
            //     className={cn(
            //         "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            //         className
            //     )}
            //     ref={ref}
            //     {...props}
            // />
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                    Showing 1 to 8 of 32 results
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline">1</Button>
                    <Button variant="outline">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">4</Button>
                    <Button variant="outline">5</Button>
                    <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        )
    }
)

Paginate.displayName = 'Paginate'

export { Paginate }
// export default function Paginate() {
//     <div className="flex items-center justify-between mt-4">
//         <div className="text-sm text-gray-500">
//             Showing 1 to 8 of 32 results
//         </div>
//         <div className="flex space-x-2">
//             <Button variant="outline" size="icon">
//                 <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Button variant="outline">1</Button>
//             <Button variant="outline">2</Button>
//             <Button variant="outline">3</Button>
//             <Button variant="outline">4</Button>
//             <Button variant="outline">5</Button>
//             <Button variant="outline" size="icon">
//                 <ChevronRight className="h-4 w-4" />
//             </Button>
//         </div>
//     </div>
// }