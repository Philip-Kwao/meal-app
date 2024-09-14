import React from "react";

export function PageHeader({children}: {children: React.ReactNode}){
    return(
        <h4 className="font-bold text-lg">{children}</h4>
    )
}