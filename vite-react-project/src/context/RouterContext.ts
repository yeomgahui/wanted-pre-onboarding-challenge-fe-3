import React from "react";

export interface RouterContext {
    path: string;
    handleChangePath(value:string): void
}

export const routerContext = React.createContext<RouterContext>({path: '/', handleChangePath: () => undefined});

routerContext.displayName = "RouterContext"